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
  const body = await readBody(event)
  const { amount, type, walletId, toWalletId, categoryId, description, date } = body

  const walletContextQuery = orgId
    ? eq(schema.wallets.organizationId, orgId)
    : and(eq(schema.wallets.userId, userId), isNull(schema.wallets.organizationId))

  try {
    await db.transaction(async (tx) => {
      const oldTransaction = await tx.query.transactions.findFirst({
        where: and(eq(schema.transactions.id, transactionId), eq(schema.transactions.userId, userId)),
      })
      if (!oldTransaction) throw new Error('Transaction not found')

      const { amount: oldAmount, type: oldType, walletId: oldWalletId, toWalletId: oldToWalletId } = oldTransaction

      const currentOldWalletSource = await tx.query.wallets.findFirst({
        where: and(eq(schema.wallets.id, oldWalletId), walletContextQuery),
      })
      if (!currentOldWalletSource) throw new Error('Old source wallet not found')

      if (oldType === 'income') {
        await tx.update(schema.wallets)
          .set({ balance: currentOldWalletSource.balance - oldAmount })
          .where(and(eq(schema.wallets.id, oldWalletId), walletContextQuery))
      } else if (oldType === 'expense') {
        await tx.update(schema.wallets)
          .set({ balance: currentOldWalletSource.balance + oldAmount })
          .where(and(eq(schema.wallets.id, oldWalletId), walletContextQuery))
      } else if (oldType === 'transfer' && oldToWalletId) {
        const currentOldWalletDest = await tx.query.wallets.findFirst({
          where: and(eq(schema.wallets.id, oldToWalletId), walletContextQuery),
        })
        if (!currentOldWalletDest) throw new Error('Old destination wallet not found')

        await tx.update(schema.wallets)
          .set({ balance: currentOldWalletSource.balance + oldAmount })
          .where(and(eq(schema.wallets.id, oldWalletId), walletContextQuery))
        await tx.update(schema.wallets)
          .set({ balance: currentOldWalletDest.balance - oldAmount })
          .where(and(eq(schema.wallets.id, oldToWalletId), walletContextQuery))
      }

      const newWalletSource = await tx.query.wallets.findFirst({
        where: and(eq(schema.wallets.id, walletId), walletContextQuery),
      })
      if (!newWalletSource) throw new Error('New source wallet not found')
      if (type !== 'income' && newWalletSource.balance < amount) throw new Error('INSUFFICIENT_BALANCE')

      if (type === 'transfer') {
        if (!toWalletId) throw new Error('Destination wallet required')
        const newWalletDest = await tx.query.wallets.findFirst({
          where: and(eq(schema.wallets.id, toWalletId), walletContextQuery),
        })
        if (!newWalletDest) throw new Error('New destination wallet not found')

        await tx.update(schema.wallets)
          .set({ balance: newWalletSource.balance - amount })
          .where(and(eq(schema.wallets.id, walletId), walletContextQuery))
        await tx.update(schema.wallets)
          .set({ balance: newWalletDest.balance + amount })
          .where(and(eq(schema.wallets.id, toWalletId), walletContextQuery))
      } else {
        const change = type === 'income' ? amount : -amount
        await tx.update(schema.wallets)
          .set({ balance: newWalletSource.balance + change })
          .where(and(eq(schema.wallets.id, walletId), walletContextQuery))
      }

      const updatePayload: any = {
        amount, type, description: description || null,
        walletId, userId, organizationId: orgId,
        date: new Date(date),
        toWalletId: type === 'transfer' ? (toWalletId || null) : null,
      }
      if (type !== 'transfer' && categoryId) updatePayload.categoryId = categoryId

      await tx.update(schema.transactions)
        .set(updatePayload)
        .where(eq(schema.transactions.id, transactionId))
    })

    await invalidateUserCache(userId, orgId)
    return { message: 'Transaksi berhasil diperbarui!' }
  } catch (e: unknown) {
    const message = e instanceof Error && e.message === 'INSUFFICIENT_BALANCE'
      ? 'Saldo tidak mencukupi'
      : 'Gagal memperbarui transaksi'
    throw createError({ statusCode: 400, message })
  }
})
