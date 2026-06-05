import { type } from 'arktype'

export const budgetSchema = type({
  amount: 'number > 0',
  period: '"monthly" | "yearly"',
  walletId: 'string > 0',
  categoryId: 'string > 0',
})
