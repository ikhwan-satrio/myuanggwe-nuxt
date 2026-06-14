import { Effect } from "effect";
import { eq, and } from "drizzle-orm";
import { DBServices } from "../lib/db/context";
import { RedisService } from "../lib/redis/context";
import { budgets } from "../lib/db/schemas";
import type { Context } from "../lib/graphql-context"

export class BudgetService extends Effect.Service<BudgetService>()('BudgetService', {
  dependencies: [DBServices.Live, RedisService.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices
    const redis = yield* RedisService

    return {
      async getAllBudgets(c: Context) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId ? `budgets:org:${orgId}` : `budgets:user:${c.user?.id}`

        return redis.withBackendCache(key, () => {
          return db.query.budgets.findMany({
            where: (b, { eq }) =>
              orgId ? eq(b.organizationId, orgId) : eq(b.userId, c.user?.id!),
            with: { category: true, wallet: true },
          })
        })
      },

      async getBudget(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId ? `budget:${id}:org:${orgId}` : `budget:${id}:user:${c.user?.id}`

        return redis.withBackendCache(key, async () => {
          return await db.query.budgets.findFirst({
            where: (b, { eq, and }) =>
              orgId
                ? and(eq(b.id, id), eq(b.organizationId, orgId))
                : and(eq(b.id, id), eq(b.userId, c.user?.id!)),
            with: { category: true, wallet: true },
          }) ?? null
        })
      },

      async createBudget(input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.insert(budgets).values({
          ...input,
          userId: c.user?.id!,
          organizationId: orgId ?? input.organizationId ?? null,
          period: input.period ?? 'monthly',
        } as any).returning()
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async updateBudget(id: string, input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.update(budgets)
          .set(input)
          .where(
            orgId
              ? and(eq(budgets.id, id), eq(budgets.organizationId, orgId))
              : and(eq(budgets.id, id), eq(budgets.userId, c.user?.id!))
          )
          .returning()
        if (!result[0]) throw new Error('Budget not found')
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async deleteBudget(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        await db.delete(budgets).where(
          orgId
            ? and(eq(budgets.id, id), eq(budgets.organizationId, orgId))
            : and(eq(budgets.id, id), eq(budgets.userId, c.user?.id!))
        )
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return true
      },
    }
  })
}) { }
