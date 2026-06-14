import { Effect } from "effect";
import { eq, and } from "drizzle-orm";
import { DBServices } from "../lib/db/context";
import { RedisService } from "../lib/redis/context";
import { recurringTransactions } from "../lib/db/schemas";
import type { Context } from "../lib/graphql-context"

export class RecurringTransactionService extends Effect.Service<RecurringTransactionService>()('RecurringTransactionService', {
  dependencies: [DBServices.Live, RedisService.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices
    const redis = yield* RedisService

    return {
      async getAllRecurringTransactions(c: Context, isActive?: boolean | null) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId ? `recurring:org:${orgId}` : `recurring:user:${c.user?.id}`

        return redis.withBackendCache(key, () => {
          return db.query.recurringTransactions.findMany({
            where: (r, { eq, and }) => {
              const base = orgId ? eq(r.organizationId, orgId) : eq(r.userId, c.user?.id!)
              return isActive !== undefined ? and(base, eq(r.isActive, isActive as any)) : base
            },
            with: { wallet: true, category: true },
          })
        })
      },

      async getRecurringTransaction(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId ? `recurringTransaction:${id}:org:${orgId}` : `recurringTransaction:${id}:user:${c.user?.id}`

        return redis.withBackendCache(key, async () => {
          return await db.query.recurringTransactions.findFirst({
            where: (r, { eq, and }) =>
              orgId
                ? and(eq(r.id, id), eq(r.organizationId, orgId))
                : and(eq(r.id, id), eq(r.userId, c.user?.id!)),
            with: { wallet: true, category: true },
          }) ?? null
        })
      },

      async createRecurringTransaction(input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.insert(recurringTransactions).values({
          ...input,
          userId: c.user?.id!,
          organizationId: orgId ?? input.organizationId ?? null,
          startDate: new Date(input.startDate),
          nextRunDate: new Date(input.startDate),
        } as any).returning()
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async updateRecurringTransaction(id: string, input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.update(recurringTransactions)
          .set(input)
          .where(
            orgId
              ? and(eq(recurringTransactions.id, id), eq(recurringTransactions.organizationId, orgId))
              : and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, c.user?.id!))
          )
          .returning()
        if (!result[0]) throw new Error('Recurring transaction not found')
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async deleteRecurringTransaction(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        await db.delete(recurringTransactions).where(
          orgId
            ? and(eq(recurringTransactions.id, id), eq(recurringTransactions.organizationId, orgId))
            : and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, c.user?.id!))
        )
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return true
      },
    }
  })
}) { }
