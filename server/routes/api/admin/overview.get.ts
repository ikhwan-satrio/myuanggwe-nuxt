import { count } from 'drizzle-orm'
import { db } from '~~/server/lib/db'
import { auth } from '~~/server/lib/auth'
import { user, organization, wallets, transactions, budgets, recurringTransactions, financialGoals } from '~~/server/lib/db/schemas'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session?.user || session.user.role !== 'developer') {
    throw createError({ statusCode: 403, message: 'Forbidden' })
  }

  const [userCount] = await db.select({ value: count() }).from(user)
  const [orgCount] = await db.select({ value: count() }).from(organization)
  const [walletCount] = await db.select({ value: count() }).from(wallets)
  const [txCount] = await db.select({ value: count() }).from(transactions)
  const [budgetCount] = await db.select({ value: count() }).from(budgets)
  const [recurringCount] = await db.select({ value: count() }).from(recurringTransactions)
  const [goalCount] = await db.select({ value: count() }).from(financialGoals)

  const roles = await db
    .select({ role: user.role, count: count() })
    .from(user)
    .groupBy(user.role)

  const recentUsers = await db
    .select({ id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt })
    .from(user)
    .orderBy(user.createdAt)
    .limit(10)

  const recentOrgs = await db
    .select({ id: organization.id, name: organization.name, slug: organization.slug, createdAt: organization.createdAt })
    .from(organization)
    .orderBy(organization.createdAt)
    .limit(10)

  return {
    totalUsers: userCount?.value ?? 0,
    totalOrganizations: orgCount?.value ?? 0,
    totalWallets: walletCount?.value ?? 0,
    totalTransactions: txCount?.value ?? 0,
    totalBudgets: budgetCount?.value ?? 0,
    totalRecurring: recurringCount?.value ?? 0,
    totalGoals: goalCount?.value ?? 0,
    usersByRole: roles,
    recentUsers,
    recentOrganizations: recentOrgs,
  }
})
