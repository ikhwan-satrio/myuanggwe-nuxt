import { Effect } from "effect";
import { eq, and } from "drizzle-orm";
import { DBServices } from "../lib/db/context";
import { RedisService } from "../lib/redis/context";
import { financialGoals } from "../lib/db/schemas";
import type { Context } from "../lib/graphql-context"

export class FinancialGoalService extends Effect.Service<FinancialGoalService>()('FinancialGoalService', {
  dependencies: [DBServices.Live, RedisService.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices
    const redis = yield* RedisService

    return {
      async getAllFinancialGoals(c: Context) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId ? `goals:org:${orgId}` : `goals:user:${c.user?.id}`

        return redis.withBackendCache(key, () => {
          return db.query.financialGoals.findMany({
            where: (g, { eq }) =>
              orgId ? eq(g.organizationId, orgId) : eq(g.userId, c.user?.id!),
            with: { wallet: true },
          })
        })
      },

      async getFinancialGoal(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId ? `goal:${id}:org:${orgId}` : `goal:${id}:user:${c.user?.id}`

        return redis.withBackendCache(key, async () => {
          return await db.query.financialGoals.findFirst({
            where: (g, { eq, and }) =>
              orgId
                ? and(eq(g.id, id), eq(g.organizationId, orgId))
                : and(eq(g.id, id), eq(g.userId, c.user?.id!)),
            with: { wallet: true },
          }) ?? null
        })
      },

      async createFinancialGoal(input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.insert(financialGoals).values({
          ...input,
          userId: c.user?.id!,
          organizationId: orgId ?? input.organizationId ?? null,
          deadline: input.deadline ? new Date(input.deadline) : undefined,
        } as any).returning()
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async updateFinancialGoal(id: string, input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.update(financialGoals)
          .set({ ...input, deadline: input.deadline ? new Date(input.deadline) : undefined })
          .where(
            orgId
              ? and(eq(financialGoals.id, id), eq(financialGoals.organizationId, orgId))
              : and(eq(financialGoals.id, id), eq(financialGoals.userId, c.user?.id!))
          )
          .returning()
        if (!result[0]) throw new Error('Financial goal not found')
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async deleteFinancialGoal(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        await db.delete(financialGoals).where(
          orgId
            ? and(eq(financialGoals.id, id), eq(financialGoals.organizationId, orgId))
            : and(eq(financialGoals.id, id), eq(financialGoals.userId, c.user?.id!))
        )
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return true
      },
    }
  })
}) { }
