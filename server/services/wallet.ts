import { Effect } from "effect";
import { eq, and } from "drizzle-orm";
import { DBServices } from "../lib/db/context";
import { RedisService } from "../lib/redis/context";
import { wallets } from "../lib/db/schemas";
import type { Context } from "../lib/graphql-context"

export class WalletService extends Effect.Service<WalletService>()('WalletService', {
  dependencies: [DBServices.Live, RedisService.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices
    const redis = yield* RedisService

    return {
      async getAllWallets(c: Context) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId ? `wallets:org:${orgId}` : `wallets:user:${c.user?.id}`

        return redis.withBackendCache(key, () => {
          return db.query.wallets.findMany({
            where: (wallets, { eq }) => eq(wallets.userId, c.user?.id!)
          })
        })
      },

      async getWallet(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId ? `wallet:${id}:org:${orgId}` : `wallet:${id}:user:${c.user?.id}`

        return redis.withBackendCache(key, async () => {
          return await db.query.wallets.findFirst({
            where: (w, { eq, and }) =>
              orgId
                ? and(eq(w.id, id), eq(w.organizationId, orgId))
                : and(eq(w.id, id), eq(w.userId, c.user?.id!)),
            with: { transactions: true, financialGoals: true },
          }) ?? null
        })
      },

      async createWallet(input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.insert(wallets).values({
          ...input,
          userId: c.user?.id!,
          organizationId: orgId ?? input.organizationId ?? null,
          balance: input.balance ?? 0,
          currency: input.currency ?? 'IDR',
        } as any).returning()
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async updateWallet(id: string, input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.update(wallets)
          .set(input)
          .where(
            orgId
              ? and(eq(wallets.id, id), eq(wallets.organizationId, orgId))
              : and(eq(wallets.id, id), eq(wallets.userId, c.user?.id!))
          )
          .returning()
        if (!result[0]) throw new Error('Wallet not found')
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async deleteWallet(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        await db.delete(wallets).where(
          orgId
            ? and(eq(wallets.id, id), eq(wallets.organizationId, orgId))
            : and(eq(wallets.id, id), eq(wallets.userId, c.user?.id!))
        )
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return true
      },
    }
  })
}) { }
