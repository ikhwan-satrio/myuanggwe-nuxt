interface ExchangeRateResponse {
  result: string
  base_code: string
  conversion_rates: Record<string, number>
}

export const useExchangeRate = () => {
  const runtimeConfig = useRuntimeConfig()

  const { data: rates, refresh, error } = useAsyncData<Record<string, number>>(
    'exchange-rates',
    async () => {
      const data = await $fetch<ExchangeRateResponse>(`https://v6.exchangerate-api.com/v6/${runtimeConfig.exchangeRateApiKey}/latest/IDR`)

      return data.conversion_rates
    },
    {
      server: false,
      lazy: true,
      getCachedData: (key, nuxtApp) => {
        const cached = nuxtApp.payload.data[key]
        if (!cached) return null
        // Cache 1 jam
        const cacheAge = Date.now() - (cached._fetchedAt ?? 0)
        if (cacheAge > 60 * 60 * 1000) return null
        return cached
      },
    }
  )
  
  function convert(amount: number, fromCurrency: string, toCurrency: string): number {
    if (!rates.value) return amount
    if (fromCurrency === toCurrency) return amount

    const fromRate = rates.value[fromCurrency] ?? 1
    const toRate = rates.value[toCurrency] ?? 1

    const inIDR = amount / fromRate
    return inIDR * toRate
  }

  return { rates, refresh, convert }
}
