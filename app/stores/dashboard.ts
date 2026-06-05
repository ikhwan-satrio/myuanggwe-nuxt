import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', () => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const dateRange = ref<{ start: Date | null; end: Date | null }>({
    start: startOfMonth,
    end: now,
  })

  const searchQuery = ref('')
  const filterType = ref('all')
  const filterWalletId = ref('all')
  const filterCurrency = ref('all')

  const selectedCurrency = computed(() => filterCurrency.value === 'all' ? null : filterCurrency.value)

  const dateRangeParams = computed(() => ({
    from: dateRange.value.start?.toISOString(),
    to: dateRange.value.end?.toISOString(),
  }))

  function byCurrency(items: any[], currency: string) {
    return currency === 'all' ? items : items.filter((i: any) => (i.wallet?.currency ?? i.currency) === currency)
  }

  function scopedTransactions(items: any[]) {
    let result = items
    if (filterCurrency.value !== 'all') result = result.filter((i: any) => (i.wallet?.currency ?? i.currency) === filterCurrency.value)
    if (filterWalletId.value !== 'all') result = result.filter((i: any) => i.walletId === filterWalletId.value)
    return result
  }

  function currencyWallets(wallets: any[]) {
    return filterCurrency.value === 'all'
      ? wallets
      : wallets.filter((w: any) => w.currency === filterCurrency.value)
  }

  return {
    dateRange, searchQuery, filterType, filterWalletId, filterCurrency,
    selectedCurrency, dateRangeParams, byCurrency, scopedTransactions, currencyWallets,
  }
})
