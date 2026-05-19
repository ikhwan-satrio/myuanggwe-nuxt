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
    await db.insert(schema.wallets).values({
      id: crypto.randomUUID(),
      name: body.name, type: body.type, balance: body.balance,
      userId, organizationId: orgId ?? null,
    })
    await invalidateUserCache(userId, orgId)
    return { message: 'Wallet created' }
  } catch {
    throw createError({ statusCode: 400, message: 'Gagal membuat dompet' })
  }
})
