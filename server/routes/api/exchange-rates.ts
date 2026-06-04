
interface ExchangeRateResponse {
  result: string
  base_code: string
  conversion_rates: Record<string, number>
}

export default defineEventHandler(async (): Promise<Record<string, number>> => {
  const apiKey = useRuntimeConfig().exchangeRateApiKey

  const data = await $fetch<ExchangeRateResponse>(
    `https://v6.exchangerate-api.com/v6/${apiKey}/latest/IDR`
  )

  return data.conversion_rates
})
