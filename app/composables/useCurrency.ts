export const useCurrency = () => {
  const { locale, locales } = useI18n()

  const fallbackLocale = computed(() =>
    locales.value.find((l: any) => l.code === locale.value)?.language ?? 'id-ID'
  )

  const formatCurrency = (amount: number, currencyCode?: string) => {
    const code = currencyCode ?? 'IDR'
    return new Intl.NumberFormat(fallbackLocale.value, {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return { formatCurrency }
}


export function getTransactionDisplay(tx: any) {
  if (tx.type === 'transfer') {
    return {
      label: `Transfer to ${tx.toWallet?.name ?? '-'}`,
      subtitle: tx.wallet?.name ?? '-',
      isExpense: true,
    }
  }
  return {
    label: tx.category?.name ?? tx.type,
    subtitle: tx.wallet?.name ?? '-',
    isExpense: tx.type === 'expense',
  }
}
