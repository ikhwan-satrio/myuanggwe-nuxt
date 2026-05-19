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

  try {
    await db.insert(schema.budgets).values({
      id: crypto.randomUUID(),
      amount: body.amount, period: body.period, categoryId: body.categoryId,
      userId, organizationId: orgId ?? null,
    })
    await invalidateUserCache(userId, orgId)
    return { success: true, message: 'Budget created' }
  } catch {
    throw createError({ statusCode: 400, message: 'Gagal membuat anggaran' })
  }
})
