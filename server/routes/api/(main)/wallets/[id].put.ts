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
  const id = getRouterParam(event, 'id')!
  const body = await readBody(event)

  const walletContextQuery = orgId
    ? eq(schema.wallets.organizationId, orgId)
    : and(eq(schema.wallets.userId, userId), isNull(schema.wallets.organizationId))

  try {
    const result = await db.update(schema.wallets)
      .set({ name: body.name, type: body.type, balance: body.balance })
      .where(and(eq(schema.wallets.id, id), walletContextQuery))

    if (result.rowsAffected === 0)
      throw createError({ statusCode: 404, message: 'Wallet not found' })

    await invalidateUserCache(userId, orgId)
    return { message: 'Wallet updated' }
  } catch {
    throw createError({ statusCode: 400, message: 'Gagal update dompet' })
  }
})
