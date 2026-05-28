import { Effect } from "effect";
import { eq, and } from "drizzle-orm";
import { DBServices } from "../db/context";
import { RedisService } from "../redis/context";
import { transactions } from "../db/schemas";
import type { Context } from "../graphql-context"

const toDate = (date: string | Date): Date => new Date(date)

export class TransactionService extends Effect.Service<TransactionService>()('TransactionService', {
  dependencies: [DBServices.Live, RedisService.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices
    const redis = yield* RedisService

    return {
      async getAllTransactions(
        c: Context,
        filters?: {
          walletId?: string | null
          categoryId?: string | null
          type?: string | null
          from?: string | null
          to?: string | null
          limit?: number | null
          offset?: number | null
        }
      ) {
        const orgId = c.session?.activeOrganizationId

        const filterKey = [
          filters?.walletId,
          filters?.categoryId,
          filters?.type,
          filters?.from,
          filters?.to,
          filters?.limit,
          filters?.offset,
        ].filter(Boolean).join(':')

        const base = orgId
          ? `transactions:org:${orgId}`
          : `transactions:user:${c.user?.id}`
        const key = filterKey ? `${base}:${filterKey}` : base

        return redis.withBackendCache(key, () => {
          return db.query.transactions.findMany({
            where: (t, { eq, and, gte, lte }) => {
              const conditions = orgId
                ? [eq(t.organizationId, orgId)]
                : [eq(t.userId, c.user?.id!)]
              if (filters?.walletId) conditions.push(eq(t.walletId, filters.walletId))
              if (filters?.categoryId) conditions.push(eq(t.categoryId, filters.categoryId))
              if (filters?.type) conditions.push(eq(t.type, filters.type as any))
              if (filters?.from) conditions.push(gte(t.date, toDate(filters.from)))
              if (filters?.to) conditions.push(lte(t.date, toDate(filters.to)))
              return and(...conditions)
            },
            with: { wallet: true, toWallet: true, category: true },
            limit: filters?.limit ?? 50,
            offset: filters?.offset ?? 0,
            orderBy: (t, { desc }) => desc(t.date),
          })
        })
      },

      async getTransaction(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const key = orgId
          ? `transaction:${id}:org:${orgId}`
          : `transaction:${id}:user:${c.user?.id}`

        return redis.withBackendCache(key, async () => {
          return await db.query.transactions.findFirst({
            where: (t, { eq, and }) =>
              orgId
                ? and(eq(t.id, id), eq(t.organizationId, orgId))
                : and(eq(t.id, id), eq(t.userId, c.user?.id!)),
            with: { wallet: true, toWallet: true, category: true },
          }) ?? null
        })
      },

      async createTransaction(input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.insert(transactions).values({
          ...input,
          userId: c.user?.id!,
          organizationId: orgId ?? input.organizationId ?? null,
          date: toDate(input.date),
          currency: input.currency ?? 'IDR',
          exchangeRate: input.exchangeRate ?? 1000000,
        } as any).returning()
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async updateTransaction(id: string, input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId
        const result = await db.update(transactions)
          .set({
            ...input,
            date: input.date ? toDate(input.date) : undefined,
          })
          .where(
            orgId
              ? and(eq(transactions.id, id), eq(transactions.organizationId, orgId))
              : and(eq(transactions.id, id), eq(transactions.userId, c.user?.id!))
          )
          .returning()
        if (!result[0]) throw new Error('Transaction not found')
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result[0]
      },

      async deleteTransaction(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId
        await db.delete(transactions).where(
          orgId
            ? and(eq(transactions.id, id), eq(transactions.organizationId, orgId))
            : and(eq(transactions.id, id), eq(transactions.userId, c.user?.id!))
        )
        await redis.invalidateUserCache(c.user?.id!, orgId)
        return true
      },
    }
  })
}) { }
