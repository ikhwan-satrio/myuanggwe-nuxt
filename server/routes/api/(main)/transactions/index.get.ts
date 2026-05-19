import { eq, and, isNull } from 'drizzle-orm'
import { db } from '~~/server/lib/db'
import * as schema from '~~/server/lib/db/schemas'
import { withBackendCache } from '~~/server/lib/redis'
import { auth } from '~~/server/lib/auth'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const userId = session.user.id
  const orgId = session.session.activeOrganizationId ?? null

  const cacheKey = orgId ? `transactions:org:${orgId}` : `transactions:user:${userId}`

  const transactionList = await withBackendCache(cacheKey, async () => {
    return await db.query.transactions.findMany({
      where: orgId
        ? eq(schema.transactions.organizationId, orgId)
        : and(eq(schema.transactions.userId, userId), isNull(schema.transactions.organizationId)),
      with: { wallet: true, toWallet: true, category: true },
      orderBy: (transactions, { desc }) => [desc(transactions.date)],
    })
  })

  return { transactionList }
})
