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
  const body = await readBody(event)
  const { amount, type, walletId, toWalletId, categoryId, description, date } = body

  const walletContextQuery = orgId
    ? eq(schema.wallets.organizationId, orgId)
    : and(eq(schema.wallets.userId, userId), isNull(schema.wallets.organizationId))

  try {
    await db.transaction(async (tx) => {
      const walletSource = await tx.query.wallets.findFirst({
        where: and(eq(schema.wallets.id, walletId), walletContextQuery),
      })
      if (!walletSource) throw new Error('Source wallet not found or access denied')

      if (type !== 'income' && walletSource.balance < amount) {
        throw new Error('INSUFFICIENT_BALANCE')
      }

      if (type === 'transfer') {
        if (!toWalletId) throw new Error('Destination wallet required for transfer')

        await tx.update(schema.wallets)
          .set({ balance: walletSource.balance - amount })
          .where(and(eq(schema.wallets.id, walletId), walletContextQuery))

        const walletDest = await tx.query.wallets.findFirst({
          where: and(eq(schema.wallets.id, toWalletId), walletContextQuery),
        })
        if (!walletDest) throw new Error('Destination wallet not found or access denied')

        await tx.update(schema.wallets)
          .set({ balance: walletDest.balance + amount })
          .where(and(eq(schema.wallets.id, toWalletId), walletContextQuery))
      } else {
        const change = type === 'income' ? amount : -amount
        await tx.update(schema.wallets)
          .set({ balance: walletSource.balance + change })
          .where(and(eq(schema.wallets.id, walletId), walletContextQuery))
      }

      const insertPayload: any = {
        amount, type, description: description || null,
        walletId, userId, organizationId: orgId,
        date: new Date(date),
      }
      if (type === 'transfer') insertPayload.toWalletId = toWalletId
      else if (categoryId) insertPayload.categoryId = categoryId

      await tx.insert(schema.transactions).values(insertPayload)
    })

    await invalidateUserCache(userId, orgId)
    return { message: 'Transaksi berhasil!' }
  } catch (e: unknown) {
    const message = e instanceof Error && e.message === 'INSUFFICIENT_BALANCE'
      ? 'Saldo tidak mencukupi'
      : 'Gagal memproses transaksi'
    throw createError({ statusCode: 400, message })
  }
})
