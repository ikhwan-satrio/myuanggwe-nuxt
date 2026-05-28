import { typeDefs } from '#graphql/schema'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import { GraphQLScalarType, Kind } from 'graphql'
import { createContext } from '~~/server/lib/graphql-context'
import type { Context } from '~~/server/lib/graphql-context'
import { Effect } from "effect"
import { WalletService } from "~~/server/lib/services/wallet"
import { CategoryService } from "~~/server/lib/services/category"
import { TransactionService } from "~~/server/lib/services/transaction"
import { BudgetService } from "~~/server/lib/services/budget"
import { RecurringTransactionService } from "~~/server/lib/services/recurring"
import { FinancialGoalService } from "~~/server/lib/services/goal"

const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  serialize: (value: unknown) => (value instanceof Date ? value.toISOString() : String(value)),
  parseValue: (value: unknown) => new Date(value as string),
  parseLiteral: (ast) => (ast.kind === Kind.STRING ? new Date(ast.value) : null),
})

const apollo = new ApolloServer<Context>({
  typeDefs,
  resolvers: {
    Query: {
      me: async (_, __, { user }) => {
        if (!user) return null
        return user
      },

      // Wallets
      wallets: async (_, __, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const wallet = yield* WalletService
            return yield* Effect.promise(() => wallet.getAllWallets(c))
          }).pipe(Effect.provide(WalletService.Default))
        )
      },

      wallet: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const wallet = yield* WalletService
            return yield* Effect.promise(() => wallet.getWallet(id, c))
          }).pipe(Effect.provide(WalletService.Default))
        )
      },

      // Categories
      categories: async (_, { type }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* CategoryService
            return yield* Effect.promise(() => svc.getAllCategories(c, type))
          }).pipe(Effect.provide(CategoryService.Default))
        )
      },
      category: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* CategoryService
            return yield* Effect.promise(() => svc.getCategory(id, c))
          }).pipe(Effect.provide(CategoryService.Default))
        )
      },

      // Transactions
      transactions: async (_, { walletId, categoryId, type, from, to, limit, offset }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* TransactionService
            return yield* Effect.promise(() =>
              svc.getAllTransactions(c, { walletId, categoryId, type, from, to, limit, offset })
            )
          }).pipe(Effect.provide(TransactionService.Default))
        )
      },
      transaction: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* TransactionService
            return yield* Effect.promise(() => svc.getTransaction(id, c))
          }).pipe(Effect.provide(TransactionService.Default))
        )
      },

      // Budgets
      budgets: async (_, __, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* BudgetService
            return yield* Effect.promise(() => svc.getAllBudgets(c))
          }).pipe(Effect.provide(BudgetService.Default))
        )
      },
      budget: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* BudgetService
            return yield* Effect.promise(() => svc.getBudget(id, c))
          }).pipe(Effect.provide(BudgetService.Default))
        )
      },

      // Recurring Transactions
      recurringTransactions: async (_, { isActive }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* RecurringTransactionService
            return yield* Effect.promise(() => svc.getAllRecurringTransactions(c, isActive))
          }).pipe(Effect.provide(RecurringTransactionService.Default))
        )
      },
      recurringTransaction: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* RecurringTransactionService
            return yield* Effect.promise(() => svc.getRecurringTransaction(id, c))
          }).pipe(Effect.provide(RecurringTransactionService.Default))
        )
      },

      // Financial Goals
      financialGoals: async (_, __, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* FinancialGoalService
            return yield* Effect.promise(() => svc.getAllFinancialGoals(c))
          }).pipe(Effect.provide(FinancialGoalService.Default))
        )
      },
      financialGoal: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* FinancialGoalService
            return yield* Effect.promise(() => svc.getFinancialGoal(id, c))
          }).pipe(Effect.provide(FinancialGoalService.Default))
        )
      },
    },

    Mutation: {
      // Wallet
      createWallet: async (_, { input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* WalletService
            return yield* Effect.promise(() => svc.createWallet(input, c))
          }).pipe(Effect.provide(WalletService.Default))
        )
      },
      updateWallet: async (_, { id, input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* WalletService
            return yield* Effect.promise(() => svc.updateWallet(id, input, c))
          }).pipe(Effect.provide(WalletService.Default))
        )
      },
      deleteWallet: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* WalletService
            return yield* Effect.promise(() => svc.deleteWallet(id, c))
          }).pipe(Effect.provide(WalletService.Default))
        )
      },

      // Category
      createCategory: async (_, { input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* CategoryService
            return yield* Effect.promise(() => svc.createCategory(input, c))
          }).pipe(Effect.provide(CategoryService.Default))
        )
      },
      updateCategory: async (_, { id, input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* CategoryService
            return yield* Effect.promise(() => svc.updateCategory(id, input, c))
          }).pipe(Effect.provide(CategoryService.Default))
        )
      },
      deleteCategory: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* CategoryService
            return yield* Effect.promise(() => svc.deleteCategory(id, c))
          }).pipe(Effect.provide(CategoryService.Default))
        )
      },

      // Transaction
      createTransaction: async (_, { input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* TransactionService
            return yield* Effect.promise(() => svc.createTransaction(input, c))
          }).pipe(Effect.provide(TransactionService.Default))
        )
      },
      updateTransaction: async (_, { id, input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* TransactionService
            return yield* Effect.promise(() => svc.updateTransaction(id, input, c))
          }).pipe(Effect.provide(TransactionService.Default))
        )
      },
      deleteTransaction: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* TransactionService
            return yield* Effect.promise(() => svc.deleteTransaction(id, c))
          }).pipe(Effect.provide(TransactionService.Default))
        )
      },

      // Budget
      createBudget: async (_, { input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* BudgetService
            return yield* Effect.promise(() => svc.createBudget(input, c))
          }).pipe(Effect.provide(BudgetService.Default))
        )
      },
      updateBudget: async (_, { id, input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* BudgetService
            return yield* Effect.promise(() => svc.updateBudget(id, input, c))
          }).pipe(Effect.provide(BudgetService.Default))
        )
      },
      deleteBudget: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* BudgetService
            return yield* Effect.promise(() => svc.deleteBudget(id, c))
          }).pipe(Effect.provide(BudgetService.Default))
        )
      },

      // Recurring Transaction
      createRecurringTransaction: async (_, { input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* RecurringTransactionService
            return yield* Effect.promise(() => svc.createRecurringTransaction(input, c))
          }).pipe(Effect.provide(RecurringTransactionService.Default))
        )
      },
      updateRecurringTransaction: async (_, { id, input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* RecurringTransactionService
            return yield* Effect.promise(() => svc.updateRecurringTransaction(id, input, c))
          }).pipe(Effect.provide(RecurringTransactionService.Default))
        )
      },
      deleteRecurringTransaction: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* RecurringTransactionService
            return yield* Effect.promise(() => svc.deleteRecurringTransaction(id, c))
          }).pipe(Effect.provide(RecurringTransactionService.Default))
        )
      },

      // Financial Goal
      createFinancialGoal: async (_, { input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* FinancialGoalService
            return yield* Effect.promise(() => svc.createFinancialGoal(input, c))
          }).pipe(Effect.provide(FinancialGoalService.Default))
        )
      },
      updateFinancialGoal: async (_, { id, input }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* FinancialGoalService
            return yield* Effect.promise(() => svc.updateFinancialGoal(id, input, c))
          }).pipe(Effect.provide(FinancialGoalService.Default))
        )
      },
      deleteFinancialGoal: async (_, { id }, c) => {
        if (!c.user) throw new Error('Unauthorized')
        return Effect.runPromise(
          Effect.gen(function* () {
            const svc = yield* FinancialGoalService
            return yield* Effect.promise(() => svc.deleteFinancialGoal(id, c))
          }).pipe(Effect.provide(FinancialGoalService.Default))
        )
      },
    },

    DateTime: DateTimeScalar,
  },
})

export default startServerAndCreateH3Handler(apollo, {
  context: ({ event }) => createContext(event),
})
