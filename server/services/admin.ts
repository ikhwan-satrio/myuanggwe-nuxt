import { Effect } from "effect";
import { count } from "drizzle-orm";
import { DBServices } from "../lib/db/context";
import { user, organization, wallets, transactions, budgets, recurringTransactions, financialGoals } from "../lib/db/schemas";
import type { Context } from "../lib/graphql-context"

export class AdminService extends Effect.Service<AdminService>()('AdminService', {
  dependencies: [DBServices.Live],
  effect: Effect.gen(function* () {
    const db = yield* DBServices

    return {
      async getUsers(c: Context) {
        return db.select().from(user)
      },

      async getAdminOverview(c: Context) {
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
          .select()
          .from(user)
          .orderBy(user.createdAt)
          .limit(10)

        const recentOrgs = await db
          .select()
          .from(organization)
          .orderBy(organization.createdAt)
          .limit(10)

        return {
          totalUsers: userCount?.value,
          totalOrganizations: orgCount?.value,
          totalWallets: walletCount?.value,
          totalTransactions: txCount?.value,
          totalBudgets: budgetCount?.value,
          totalRecurring: recurringCount?.value,
          totalGoals: goalCount?.value,
          usersByRole: roles,
          recentUsers,
          recentOrganizations: recentOrgs,
        }
      }
    }
  })
}) { }
