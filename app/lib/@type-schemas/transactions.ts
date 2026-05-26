import { type } from 'arktype'

export const transactionSchema = type({
  type: '"income" | "expense" | "transfer"',
  amount: 'number > 0',
  walletId: 'string > 0',
  'toWalletId?': 'string | null',
  'categoryId?': 'string | null',
  'description?': 'string | null',
  date: 'string > 0',
})
