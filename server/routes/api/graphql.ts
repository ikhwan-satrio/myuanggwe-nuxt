import { typeDefs } from '#graphql/schema'
import { ApolloServer } from '@apollo/server'
import { startServerAndCreateH3Handler } from '@as-integrations/h3'
import { GraphQLScalarType, Kind } from 'graphql'
import { createContext } from '~~/server/lib/graphql-context'
import type { Context } from '~~/server/lib/graphql-context'
import { WalletService } from "~~/server/services/wallet"
import { CategoryService } from "~~/server/services/category"
import { TransactionService } from "~~/server/services/transaction"
import { BudgetService } from "~~/server/services/budget"
import { RecurringTransactionService } from "~~/server/services/recurring"
import { FinancialGoalService } from "~~/server/services/goal"
import { AdminService } from "~~/server/services/admin"
import { UserService } from "~~/server/services/user"
import { OrganizationService } from "~~/server/services/organization"
import { runEffect, requireAuth, requireDeveloper } from "~~/server/lib/composables"

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

      // Admin
      users: (_, __, c) => {
        requireDeveloper(c)
        return runEffect(AdminService, (svc) => svc.getUsers(c))
      },

      adminOverview: (_, __, c) => {
        requireDeveloper(c)
        return runEffect(AdminService, (svc) => svc.getAdminOverview(c))
      },

      // Wallets
      wallets: (_, __, c) => { requireAuth(c); return runEffect(WalletService, (svc) => svc.getAllWallets(c)) },
      wallet: (_, { id }, c) => { requireAuth(c); return runEffect(WalletService, (svc) => svc.getWallet(id, c)) },

      // Categories
      categories: (_, { type }, c) => { requireAuth(c); return runEffect(CategoryService, (svc) => svc.getAllCategories(c, type)) },
      category: (_, { id }, c) => { requireAuth(c); return runEffect(CategoryService, (svc) => svc.getCategory(id, c)) },

      // Transactions
      transactions: (_, { walletId, categoryId, type, from, to, limit, offset }, c) => {
        requireAuth(c)
        return runEffect(TransactionService, (svc) => svc.getAllTransactions(c, { walletId, categoryId, type, from, to, limit, offset }))
      },
      transaction: (_, { id }, c) => { requireAuth(c); return runEffect(TransactionService, (svc) => svc.getTransaction(id, c)) },

      // Budgets
      budgets: (_, __, c) => { requireAuth(c); return runEffect(BudgetService, (svc) => svc.getAllBudgets(c)) },
      budget: (_, { id }, c) => { requireAuth(c); return runEffect(BudgetService, (svc) => svc.getBudget(id, c)) },

      // Recurring Transactions
      recurringTransactions: (_, { isActive }, c) => { requireAuth(c); return runEffect(RecurringTransactionService, (svc) => svc.getAllRecurringTransactions(c, isActive)) },
      recurringTransaction: (_, { id }, c) => { requireAuth(c); return runEffect(RecurringTransactionService, (svc) => svc.getRecurringTransaction(id, c)) },

      // Financial Goals
      financialGoals: (_, __, c) => { requireAuth(c); return runEffect(FinancialGoalService, (svc) => svc.getAllFinancialGoals(c)) },
      financialGoal: (_, { id }, c) => { requireAuth(c); return runEffect(FinancialGoalService, (svc) => svc.getFinancialGoal(id, c)) },

      // Organization
      organization: (_, { id }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.getOrganization(id, c)) },
      organizations: (_, __, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.getOrganizations(c)) },
      organizationBySlug: (_, { slug }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.getOrganizationBySlug(slug, c)) },
      members: (_, { organizationId }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.getMembers(organizationId, c)) },

      // Invitations
      invitations: (_, __, c) => { requireAuth(c); return runEffect(UserService, (svc) => svc.getInvitations(c)) },
    },

    Mutation: {
      // Wallet
      createWallet: (_, { input }, c) => { requireAuth(c); return runEffect(WalletService, (svc) => svc.createWallet(input, c)) },
      updateWallet: (_, { id, input }, c) => { requireAuth(c); return runEffect(WalletService, (svc) => svc.updateWallet(id, input, c)) },
      deleteWallet: (_, { id }, c) => { requireAuth(c); return runEffect(WalletService, (svc) => svc.deleteWallet(id, c)) },

      // Category
      createCategory: (_, { input }, c) => { requireAuth(c); return runEffect(CategoryService, (svc) => svc.createCategory(input, c)) },
      updateCategory: (_, { id, input }, c) => { requireAuth(c); return runEffect(CategoryService, (svc) => svc.updateCategory(id, input, c)) },
      deleteCategory: (_, { id }, c) => { requireAuth(c); return runEffect(CategoryService, (svc) => svc.deleteCategory(id, c)) },

      // Transaction
      createTransaction: (_, { input }, c) => { requireAuth(c); return runEffect(TransactionService, (svc) => svc.createTransaction(input, c)) },
      updateTransaction: (_, { id, input }, c) => { requireAuth(c); return runEffect(TransactionService, (svc) => svc.updateTransaction(id, input, c)) },
      deleteTransaction: (_, { id }, c) => { requireAuth(c); return runEffect(TransactionService, (svc) => svc.deleteTransaction(id, c)) },

      // Budget
      createBudget: (_, { input }, c) => { requireAuth(c); return runEffect(BudgetService, (svc) => svc.createBudget(input, c)) },
      updateBudget: (_, { id, input }, c) => { requireAuth(c); return runEffect(BudgetService, (svc) => svc.updateBudget(id, input, c)) },
      deleteBudget: (_, { id }, c) => { requireAuth(c); return runEffect(BudgetService, (svc) => svc.deleteBudget(id, c)) },

      // Recurring Transaction
      createRecurringTransaction: (_, { input }, c) => { requireAuth(c); return runEffect(RecurringTransactionService, (svc) => svc.createRecurringTransaction(input, c)) },
      updateRecurringTransaction: (_, { id, input }, c) => { requireAuth(c); return runEffect(RecurringTransactionService, (svc) => svc.updateRecurringTransaction(id, input, c)) },
      deleteRecurringTransaction: (_, { id }, c) => { requireAuth(c); return runEffect(RecurringTransactionService, (svc) => svc.deleteRecurringTransaction(id, c)) },

      // Financial Goal
      createFinancialGoal: (_, { input }, c) => { requireAuth(c); return runEffect(FinancialGoalService, (svc) => svc.createFinancialGoal(input, c)) },
      updateFinancialGoal: (_, { id, input }, c) => { requireAuth(c); return runEffect(FinancialGoalService, (svc) => svc.updateFinancialGoal(id, input, c)) },
      deleteFinancialGoal: (_, { id }, c) => { requireAuth(c); return runEffect(FinancialGoalService, (svc) => svc.deleteFinancialGoal(id, c)) },

      // Auth
      signUp: (_, { input }, c) => runEffect(UserService, (svc) => svc.signUp(input, c)),
      signIn: (_, { input }, c) => runEffect(UserService, (svc) => svc.signIn(input, c)),
      signOut: (_, __, c) => { requireAuth(c); return runEffect(UserService, (svc) => svc.signOut(c)) },

      // User
      updateUser: (_, { input }, c) => { requireAuth(c); return runEffect(UserService, (svc) => svc.updateUser(input, c)) },
      changePassword: (_, { currentPassword, newPassword }, c) => { requireAuth(c); return runEffect(UserService, (svc) => svc.changePassword(currentPassword, newPassword, c)) },

      // Organization
      createOrganization: (_, { input }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.createOrganization(input, c)) },
      updateOrganization: (_, { id, input }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.updateOrganization(id, input, c)) },
      deleteOrganization: (_, { id }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.deleteOrganization(id, c)) },
      inviteMember: (_, { organizationId, email, role }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.createInvitation(organizationId, email, role, c)) },
      removeMember: (_, { memberId }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.removeMember(memberId, c)) },
      updateMemberRole: (_, { memberId, role }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.updateMemberRole(memberId, role, c)) },
      acceptInvitation: (_, { invitationId }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.acceptInvitation(invitationId, c)) },
      rejectInvitation: (_, { invitationId }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.rejectInvitation(invitationId, c)) },
      cancelInvitation: (_, { invitationId }, c) => { requireAuth(c); return runEffect(OrganizationService, (svc) => svc.cancelInvitation(invitationId, c)) },
    },

    DateTime: DateTimeScalar,
  },
})

export default startServerAndCreateH3Handler(apollo, {
  context: ({ event }) => createContext(event),
})
