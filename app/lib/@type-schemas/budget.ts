import { type } from 'arktype'

export const budgetSchema = type({
  amount: 'number > 0',
  period: '"monthly" | "yearly"',
  categoryId: 'string > 0',
})
