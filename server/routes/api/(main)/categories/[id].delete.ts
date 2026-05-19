import { eq, and } from 'drizzle-orm'
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

  try {
    await db.delete(schema.categories)
      .where(and(eq(schema.categories.userId, userId), eq(schema.categories.id, id)))
    await invalidateUserCache(userId, orgId)
    return { message: 'Category deleted' }
  } catch (e) {
    throw createError({ statusCode: 400, message: (e as Error).message })
  }
})
