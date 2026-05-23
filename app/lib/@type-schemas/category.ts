import { type } from 'arktype'

export const categorySchema = type({
  name: 'string > 0',
  type: '"income" | "expense"',
  icon: 'string > 0',
})
