import { Effect } from "effect";
import { eq, and, sql } from "drizzle-orm";
import { DBServices } from "../lib/db/context";
import { RedisService } from "../lib/redis/context";
import { wallets, transactions } from "../lib/db/schemas";
import type { Context } from "../lib/graphql-context"

const toDate = (date: string | Date): Date => new Date(date)

export class TransactionService extends Effect.Service<TransactionService>()('TransactionService', {
  dependencies: [DBServices.Live, RedisService.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices
    const redis = yield* RedisService

    async function applyBalanceChange(txType: string, amount: number, walletId: string, toWalletId: string | null | undefined, reverse: boolean, txnDb: typeof db = db) {
      const sign = reverse ? -1 : 1
      if (txType === 'expense') {
        await txnDb.update(wallets).set({ balance: sql`${wallets.balance} - ${amount * sign}` }).where(eq(wallets.id, walletId))
      } else if (txType === 'income') {
        await txnDb.update(wallets).set({ balance: sql`${wallets.balance} + ${amount * sign}` }).where(eq(wallets.id, walletId))
      } else if (txType === 'transfer') {
        await txnDb.update(wallets).set({ balance: sql`${wallets.balance} - ${amount * sign}` }).where(eq(wallets.id, walletId))
        if (toWalletId) {
          await txnDb.update(wallets).set({ balance: sql`${wallets.balance} + ${amount * sign}` }).where(eq(wallets.id, toWalletId))
        }
      }
    }

    async function checkSufficientBalance(walletId: string, amount: number) {
      const wallet = await db.query.wallets.findFirst({ where: eq(wallets.id, walletId) })
      if (!wallet) throw new Error('Wallet not found')
      if (wallet.balance < amount) throw new Error(`Insufficient balance in ${wallet.name} (available: ${wallet.balance})`)
    }

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

        if (input.type === 'expense' || input.type === 'transfer') {
          await checkSufficientBalance(input.walletId, input.amount)
        }
        if (input.type === 'transfer' && input.toWalletId) {
          const destWallet = await db.query.wallets.findFirst({ where: eq(wallets.id, input.toWalletId) })
          if (!destWallet) throw new Error('Destination wallet not found')
        }

        const result = await db.transaction(async (tx) => {
          const [txn] = await tx.insert(transactions).values({
            ...input,
            userId: c.user?.id!,
            organizationId: orgId ?? input.organizationId ?? null,
            date: toDate(input.date),
            currency: input.currency ?? 'IDR',
            exchangeRate: input.exchangeRate ?? 1000000,
          } as any).returning()

          if (txn) {
            const txType = txn.type
            const amt = txn.amount
            await applyBalanceChange(txType, amt, txn.walletId, txn.toWalletId, false, tx as any)
          }

          return txn
        })

        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result
      },

      async updateTransaction(id: string, input: Record<string, any>, c: Context) {
        const orgId = c.session?.activeOrganizationId

        const oldTxn = await db.query.transactions.findFirst({
          where: eq(transactions.id, id)
        })
        if (!oldTxn) throw new Error('Transaction not found')

        const newType = input.type ?? oldTxn.type
        const newAmount = input.amount ?? oldTxn.amount
        const newWalletId = input.walletId ?? oldTxn.walletId
        const newToWalletId = input.toWalletId !== undefined ? input.toWalletId : oldTxn.toWalletId

        const result = await db.transaction(async (tx) => {
          await applyBalanceChange(oldTxn.type, oldTxn.amount, oldTxn.walletId, oldTxn.toWalletId, true, tx as any)

          if (newType === 'expense' || newType === 'transfer') {
            const wallet = await tx.query.wallets.findFirst({ where: eq(wallets.id, newWalletId) })
            if (!wallet) throw new Error('Wallet not found')
            if (wallet.balance < newAmount) throw new Error(`Insufficient balance in ${wallet.name} (available: ${wallet.balance})`)
          }

          const updated = await tx.update(transactions)
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
          if (!updated[0]) throw new Error('Transaction not found')

          await applyBalanceChange(newType, newAmount, newWalletId, newToWalletId, false, tx as any)

          return updated[0]
        })

        await redis.invalidateUserCache(c.user?.id!, orgId)
        return result
      },

      async deleteTransaction(id: string, c: Context) {
        const orgId = c.session?.activeOrganizationId

        const txn = await db.query.transactions.findFirst({
          where: eq(transactions.id, id)
        })
        if (!txn) throw new Error('Transaction not found')

        await db.transaction(async (tx) => {
          await tx.delete(transactions).where(
            orgId
              ? and(eq(transactions.id, id), eq(transactions.organizationId, orgId))
              : and(eq(transactions.id, id), eq(transactions.userId, c.user?.id!))
          )

          await applyBalanceChange(txn.type, txn.amount, txn.walletId, txn.toWalletId, true, tx as any)
        })

        await redis.invalidateUserCache(c.user?.id!, orgId)
        return true
      },
    }
  })
}) { }
