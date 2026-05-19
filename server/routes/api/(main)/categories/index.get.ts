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
  const cacheKey = orgId ? `categories:org:${orgId}` : `categories:user:${userId}`

  return await withBackendCache(cacheKey, async () => {
    const activeOrg = orgId ? await db.query.organization.findFirst({
      where: eq(schema.organization.id, orgId),
    }) : null

    const categoryList = await db.query.categories.findMany({
      where: activeOrg
        ? eq(schema.categories.organizationId, activeOrg.id)
        : and(eq(schema.categories.userId, userId), isNull(schema.categories.organizationId)),
    })

    return { categoryList, activeOrg: activeOrg || null }
  })
})
