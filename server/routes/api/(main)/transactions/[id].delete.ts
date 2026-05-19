import { eq, and, isNull } from 'drizzle-orm'
import { db } from '~~/server/lib/db'
import * as schema from '~~/server/lib/db/schemas'
import { auth } from '~~/server/lib/auth'
import { invalidateUserCache } from '~~/server/lib/redis'


export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const userId = session.user.id
  const orgId = session.session.activeOrganizationId ?? null
  const transactionId = getRouterParam(event, 'id')!

  const walletContextQuery = orgId
    ? eq(schema.wallets.organizationId, orgId)
    : and(eq(schema.wallets.userId, userId), isNull(schema.wallets.organizationId))

  try {
    await db.transaction(async (tx) => {
      const transaction = await tx.query.transactions.findFirst({
        where: and(eq(schema.transactions.id, transactionId), eq(schema.transactions.userId, userId)),
      })
      if (!transaction) throw new Error('Transaction not found')

      const { amount, type, walletId, toWalletId } = transaction
      const walletSource = await tx.query.wallets.findFirst({
        where: and(eq(schema.wallets.id, walletId), walletContextQuery),
      })
      if (!walletSource) throw new Error('Source wallet not found')

      if (type === 'income') {
        await tx.update(schema.wallets)
          .set({ balance: walletSource.balance - amount })
          .where(and(eq(schema.wallets.id, walletId), walletContextQuery))
      } else if (type === 'expense') {
        await tx.update(schema.wallets)
          .set({ balance: walletSource.balance + amount })
          .where(and(eq(schema.wallets.id, walletId), walletContextQuery))
      } else if (type === 'transfer' && toWalletId) {
        const walletDest = await tx.query.wallets.findFirst({
          where: and(eq(schema.wallets.id, toWalletId), walletContextQuery),
        })
        if (!walletDest) throw new Error('Destination wallet not found')

        await tx.update(schema.wallets)
          .set({ balance: walletSource.balance + amount })
          .where(and(eq(schema.wallets.id, walletId), walletContextQuery))
        await tx.update(schema.wallets)
          .set({ balance: walletDest.balance - amount })
          .where(and(eq(schema.wallets.id, toWalletId), walletContextQuery))
      }

      await tx.delete(schema.transactions).where(eq(schema.transactions.id, transactionId))
    })

    await invalidateUserCache(userId, orgId)
    return { message: 'Transaksi berhasil dihapus' }
  } catch (e: unknown) {
    throw createError({ statusCode: 400, message: e instanceof Error ? e.message : 'Gagal menghapus transaksi' })
  }
})
