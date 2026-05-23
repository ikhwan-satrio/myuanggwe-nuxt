import { type } from 'arktype'

export const recurringTransactionSchema = type({
  amount: 'number > 0',
  type: '"income" | "expense" | "transfer"',
  frequency: '"daily" | "weekly" | "monthly" | "yearly"',
  startDate: 'string > 0',
  walletId: 'string > 0',
  'toWalletId?': 'string | null',
  'categoryId?': 'string | null',
  'description?': 'string | null',
})
