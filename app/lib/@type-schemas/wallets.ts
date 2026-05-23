import { type } from 'arktype'

export const walletSchema = type({
  name: 'string > 0',
  type: '"cash" | "bank" | "credit_card"',
  balance: 'number >= 0',
  currency: '"IDR" | "USD" | "EUR" | "GBP" | "JPY"',
})
