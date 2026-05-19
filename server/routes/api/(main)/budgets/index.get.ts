import { eq, and, isNull, sql, gte } from 'drizzle-orm'
import { db } from '~~/server/lib/db'
import * as schema from '~~/server/lib/db/schemas'
import { withBackendCache } from '~~/server/lib/redis'
import { auth } from '~~/server/lib/auth'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user) throw createError({ statusCode: 401, message: 'Unauthorized' })

  const userId = session.user.id
  const orgId = session.session.activeOrganizationId ?? null
  const cacheKey = orgId ? `budgets:org:${orgId}` : `budgets:user:${userId}`

  const budgetList = await withBackendCache(cacheKey, async () => {
    const budgetsData = await db.query.budgets.findMany({
      where: orgId
        ? eq(schema.budgets.organizationId, orgId)
        : and(eq(schema.budgets.userId, userId), isNull(schema.budgets.organizationId)),
      with: { category: true },
      orderBy: (budgets, { desc }) => [desc(budgets.createdAt)],
    })

    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    return await Promise.all(budgetsData.map(async (budget) => {
      const contextQuery = orgId
        ? eq(schema.transactions.organizationId, orgId)
        : and(eq(schema.transactions.userId, userId), isNull(schema.transactions.organizationId))

      const spending = await db.select({
        total: sql<number>`cast(sum(${schema.transactions.amount}) as integer)`
      }).from(schema.transactions).where(and(
        contextQuery,
        eq(schema.transactions.categoryId, budget.categoryId),
        eq(schema.transactions.type, 'expense'),
        gte(schema.transactions.date, startOfMonth),
      ))

      return { ...budget, currentSpending: spending[0]?.total || 0 }
    }))
  })

  return { budgetList }
})
