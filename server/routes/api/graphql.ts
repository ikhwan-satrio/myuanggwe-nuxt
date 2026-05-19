import { typeDefs } from '#graphql/schema'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import { GraphQLScalarType, Kind } from 'graphql'
import { createContext } from '~~/server/lib/graphql/context'
import {
  wallets, categories, transactions, budgets,
  recurringTransactions, financialGoals,
  // organization, member, invitation,
} from '~~/server/lib/db/schemas'
import { eq, and } from 'drizzle-orm'

const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  serialize: (value: unknown) => (value instanceof Date ? value.toISOString() : String(value)),
  parseValue: (value: unknown) => new Date(value as string),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? new Date(ast.value) : null),
})

const apollo = new ApolloServer<Awaited<ReturnType<typeof createContext>>>({
  typeDefs,
  resolvers: {
    Query: {
      me: async (_, __, { user }) => {
        if (!user) return null
        return user
      },

      // Wallets
      wallets: async (_, __, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.wallets.findMany({
          where: (w, { eq }) =>
            orgId ? eq(w.organizationId, orgId) : eq(w.userId, user.id),
          with: { transactions: true, financialGoals: true },
        })
      },
      wallet: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.wallets.findFirst({
          where: (w, { eq, and }) =>
            orgId
              ? and(eq(w.id, id), eq(w.organizationId, orgId))
              : and(eq(w.id, id), eq(w.userId, user.id)),
          with: { transactions: true, financialGoals: true },
        }) ?? null
      },

      // Categories
      categories: async (_, { type }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.categories.findMany({
          where: (c, { eq, and }) => {
            const base = orgId ? eq(c.organizationId, orgId) : eq(c.userId, user.id)
            return type ? and(base, eq(c.type, type)) : base
          },
        })
      },
      category: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.categories.findFirst({
          where: (c, { eq, and }) =>
            orgId
              ? and(eq(c.id, id), eq(c.organizationId, orgId))
              : and(eq(c.id, id), eq(c.userId, user.id)),
        }) ?? null
      },

      // Transactions
      transactions: async (_, { walletId, categoryId, type, from, to, limit, offset }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.transactions.findMany({
          where: (t, { eq, and, gte, lte }) => {
            const conditions = orgId
              ? [eq(t.organizationId, orgId)]
              : [eq(t.userId, user.id)]
            if (walletId) conditions.push(eq(t.walletId, walletId))
            if (categoryId) conditions.push(eq(t.categoryId, categoryId))
            if (type) conditions.push(eq(t.type, type))
            if (from) conditions.push(gte(t.date, new Date(from)))
            if (to) conditions.push(lte(t.date, new Date(to)))
            return and(...conditions)
          },
          with: { wallet: true, toWallet: true, category: true },
          limit: limit ?? 50,
          offset: offset ?? 0,
          orderBy: (t, { desc }) => desc(t.date),
        })
      },
      transaction: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.transactions.findFirst({
          where: (t, { eq, and }) =>
            orgId
              ? and(eq(t.id, id), eq(t.organizationId, orgId))
              : and(eq(t.id, id), eq(t.userId, user.id)),
          with: { wallet: true, toWallet: true, category: true },
        }) ?? null
      },

      // Budgets
      budgets: async (_, __, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.budgets.findMany({
          where: (b, { eq }) =>
            orgId ? eq(b.organizationId, orgId) : eq(b.userId, user.id),
          with: { category: true },
        })
      },
      budget: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.budgets.findFirst({
          where: (b, { eq, and }) =>
            orgId
              ? and(eq(b.id, id), eq(b.organizationId, orgId))
              : and(eq(b.id, id), eq(b.userId, user.id)),
          with: { category: true },
        }) ?? null
      },

      // Recurring Transactions
      recurringTransactions: async (_, { isActive }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.recurringTransactions.findMany({
          where: (r, { eq, and }) => {
            const base = orgId ? eq(r.organizationId, orgId) : eq(r.userId, user.id)
            return isActive !== undefined ? and(base, eq(r.isActive, isActive)) : base
          },
          with: { wallet: true, category: true },
        })
      },
      recurringTransaction: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.recurringTransactions.findFirst({
          where: (r, { eq, and }) =>
            orgId
              ? and(eq(r.id, id), eq(r.organizationId, orgId))
              : and(eq(r.id, id), eq(r.userId, user.id)),
          with: { wallet: true, category: true },
        }) ?? null
      },

      // Financial Goals
      financialGoals: async (_, __, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.financialGoals.findMany({
          where: (g, { eq }) =>
            orgId ? eq(g.organizationId, orgId) : eq(g.userId, user.id),
          with: { wallet: true },
        })
      },
      financialGoal: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        return await db.query.financialGoals.findFirst({
          where: (g, { eq, and }) =>
            orgId
              ? and(eq(g.id, id), eq(g.organizationId, orgId))
              : and(eq(g.id, id), eq(g.userId, user.id)),
          with: { wallet: true },
        }) ?? null
      },

      // Organization
      organizations: async (_, __, { user, db }) => {
        if (!user) throw new Error('Unauthorized')
        const members = await db.query.member.findMany({
          where: (m, { eq }) => eq(m.userId, user.id),
          with: { organization: true },
        })
        return members.map((m) => m.organization)
      },
      organization: async (_, { id }, { user, db }) => {
        if (!user) throw new Error('Unauthorized')
        const m = await db.query.member.findFirst({
          where: (m, { eq, and }) =>
            and(eq(m.organizationId, id), eq(m.userId, user.id)),
          with: { organization: true },
        })
        return m?.organization ?? null
      },
    },

    Mutation: {
      // Wallet
      createWallet: async (_, { input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.insert(wallets).values({
          ...input,
          userId: user.id,
          organizationId: orgId ?? input.organizationId ?? null,
          balance: input.balance ?? 0,
          currency: input.currency ?? 'IDR',
        }).returning()
        return result[0]
      },
      updateWallet: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.update(wallets)
          .set(input)
          .where(
            orgId
              ? and(eq(wallets.id, id), eq(wallets.organizationId, orgId))
              : and(eq(wallets.id, id), eq(wallets.userId, user.id))
          )
          .returning()
        if (!result[0]) throw new Error('Wallet not found')
        return result[0]
      },
      deleteWallet: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        await db.delete(wallets).where(
          orgId
            ? and(eq(wallets.id, id), eq(wallets.organizationId, orgId))
            : and(eq(wallets.id, id), eq(wallets.userId, user.id))
        )
        return true
      },

      // Category
      createCategory: async (_, { input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.insert(categories).values({
          ...input,
          userId: user.id,
          organizationId: orgId ?? input.organizationId ?? null,
        }).returning()
        return result[0]
      },
      updateCategory: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.update(categories)
          .set(input)
          .where(
            orgId
              ? and(eq(categories.id, id), eq(categories.organizationId, orgId))
              : and(eq(categories.id, id), eq(categories.userId, user.id))
          )
          .returning()
        if (!result[0]) throw new Error('Category not found')
        return result[0]
      },
      deleteCategory: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        await db.delete(categories).where(
          orgId
            ? and(eq(categories.id, id), eq(categories.organizationId, orgId))
            : and(eq(categories.id, id), eq(categories.userId, user.id))
        )
        return true
      },

      // Transaction
      createTransaction: async (_, { input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.insert(transactions).values({
          ...input,
          userId: user.id,
          organizationId: orgId ?? input.organizationId ?? null,
          date: new Date(input.date),
          currency: input.currency ?? 'IDR',
          exchangeRate: input.exchangeRate ?? 1000000,
        }).returning()
        return result[0]
      },
      updateTransaction: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.update(transactions)
          .set({ ...input, date: input.date ? new Date(input.date) : undefined })
          .where(
            orgId
              ? and(eq(transactions.id, id), eq(transactions.organizationId, orgId))
              : and(eq(transactions.id, id), eq(transactions.userId, user.id))
          )
          .returning()
        if (!result[0]) throw new Error('Transaction not found')
        return result[0]
      },
      deleteTransaction: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        await db.delete(transactions).where(
          orgId
            ? and(eq(transactions.id, id), eq(transactions.organizationId, orgId))
            : and(eq(transactions.id, id), eq(transactions.userId, user.id))
        )
        return true
      },

      // Budget
      createBudget: async (_, { input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.insert(budgets).values({
          ...input,
          userId: user.id,
          organizationId: orgId ?? input.organizationId ?? null,
          period: input.period ?? 'monthly',
        }).returning()
        return result[0]
      },
      updateBudget: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.update(budgets)
          .set(input)
          .where(
            orgId
              ? and(eq(budgets.id, id), eq(budgets.organizationId, orgId))
              : and(eq(budgets.id, id), eq(budgets.userId, user.id))
          )
          .returning()
        if (!result[0]) throw new Error('Budget not found')
        return result[0]
      },
      deleteBudget: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        await db.delete(budgets).where(
          orgId
            ? and(eq(budgets.id, id), eq(budgets.organizationId, orgId))
            : and(eq(budgets.id, id), eq(budgets.userId, user.id))
        )
        return true
      },

      // Recurring Transaction
      createRecurringTransaction: async (_, { input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.insert(recurringTransactions).values({
          ...input,
          userId: user.id,
          organizationId: orgId ?? input.organizationId ?? null,
          startDate: new Date(input.startDate),
          nextRunDate: new Date(input.startDate),
        }).returning()
        return result[0]
      },
      updateRecurringTransaction: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.update(recurringTransactions)
          .set(input)
          .where(
            orgId
              ? and(eq(recurringTransactions.id, id), eq(recurringTransactions.organizationId, orgId))
              : and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, user.id))
          )
          .returning()
        if (!result[0]) throw new Error('Recurring transaction not found')
        return result[0]
      },
      deleteRecurringTransaction: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        await db.delete(recurringTransactions).where(
          orgId
            ? and(eq(recurringTransactions.id, id), eq(recurringTransactions.organizationId, orgId))
            : and(eq(recurringTransactions.id, id), eq(recurringTransactions.userId, user.id))
        )
        return true
      },

      // Financial Goal
      createFinancialGoal: async (_, { input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.insert(financialGoals).values({
          ...input,
          userId: user.id,
          organizationId: orgId ?? input.organizationId ?? null,
          deadline: input.deadline ? new Date(input.deadline) : undefined,
        }).returning()
        return result[0]
      },
      updateFinancialGoal: async (_, { id, input }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        const result = await db.update(financialGoals)
          .set({ ...input, deadline: input.deadline ? new Date(input.deadline) : undefined })
          .where(
            orgId
              ? and(eq(financialGoals.id, id), eq(financialGoals.organizationId, orgId))
              : and(eq(financialGoals.id, id), eq(financialGoals.userId, user.id))
          )
          .returning()
        if (!result[0]) throw new Error('Financial goal not found')
        return result[0]
      },
      deleteFinancialGoal: async (_, { id }, { user, db, session }) => {
        if (!user) throw new Error('Unauthorized')
        const orgId = session?.activeOrganizationId
        await db.delete(financialGoals).where(
          orgId
            ? and(eq(financialGoals.id, id), eq(financialGoals.organizationId, orgId))
            : and(eq(financialGoals.id, id), eq(financialGoals.userId, user.id))
        )
        return true
      },

    },

    DateTime: DateTimeScalar,
  },
})

export default startServerAndCreateH3Handler(apollo, {
  context: ({ event }) => createContext(event),
})
