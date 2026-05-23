import { type } from 'arktype'

export const financialGoalSchema = type({
  name: 'string > 0',
  targetAmount: 'number > 0',
  walletId: 'string > 0',
  'deadline?': 'string | null',
})
