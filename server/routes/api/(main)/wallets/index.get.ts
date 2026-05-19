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
  const cacheKey = orgId ? `wallets:org:${orgId}` : `wallets:user:${userId}`

  const walletList = await withBackendCache(cacheKey, async () => {
    return await db.query.wallets.findMany({
      where: orgId
        ? eq(schema.wallets.organizationId, orgId)
        : and(eq(schema.wallets.userId, userId), isNull(schema.wallets.organizationId)),
      orderBy: (wallets, { desc }) => [desc(wallets.createdAt)],
    })
  })

  return { walletList }
})
