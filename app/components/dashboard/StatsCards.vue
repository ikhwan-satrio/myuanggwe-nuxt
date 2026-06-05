<script setup lang="ts">
import { useDashboardStore } from '~/stores/dashboard'

const store = useDashboardStore()
const { formatCurrency } = useCurrency()

const props = defineProps<{
  wallets: any[]
  periodTransactions: any[]
  walletsLoading: boolean
  periodLoading: boolean
}>()

const currencyWallets = computed(() => store.currencyWallets(props.wallets))
const scopedPeriodTransactions = computed(() => store.scopedTransactions(props.periodTransactions))

const totalBalance = computed(() => currencyWallets.value.reduce((sum: number, w: any) => sum + w.balance, 0))
const walletCount = computed(() => currencyWallets.value.length)

const periodIncome = computed(() =>
  scopedPeriodTransactions.value
    .filter((t: any) => t.type === 'income')
    .reduce((sum: number, t: any) => sum + t.amount, 0),
)

const periodExpense = computed(() =>
  scopedPeriodTransactions.value
    .filter((t: any) => t.type === 'expense')
    .reduce((sum: number, t: any) => sum + t.amount, 0),
)

function fmt(amount: number) {
  return store.selectedCurrency
    ? formatCurrency(amount, store.selectedCurrency)
    : amount.toLocaleString('id-ID')
}
</script>

<template>
  <div v-if="walletsLoading || periodLoading" class="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
    <UiCard v-for="i in 3" :key="i">
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 px-3 pt-3 sm:px-6 sm:pt-6">
        <UiSkeleton class="h-3.5 sm:h-4 w-16 sm:w-24" />
        <UiSkeleton class="h-4 w-4 rounded-full" />
      </UiCardHeader>
      <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
        <UiSkeleton class="mb-2 h-6 sm:h-8 w-20 sm:w-32" />
        <UiSkeleton class="h-3 w-14 sm:w-20" />
      </UiCardContent>
    </UiCard>
  </div>
  <div v-else class="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 px-3 pt-3 sm:px-6 sm:pt-6">
        <UiCardTitle class="text-xs sm:text-sm font-medium">Total Balance</UiCardTitle>
        <Icon name="lucide:wallet" class="h-4 w-4 text-muted-foreground shrink-0" />
      </UiCardHeader>
      <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
        <div class="text-xl sm:text-2xl font-bold truncate">{{ fmt(totalBalance) }}</div>
        <p class="text-xs text-muted-foreground truncate">
          From {{ walletCount }} wallet{{ walletCount !== 1 ? 's' : '' }}
          <template v-if="store.selectedCurrency"> · {{ store.selectedCurrency }}</template>
        </p>
      </UiCardContent>
    </UiCard>

    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 px-3 pt-3 sm:px-6 sm:pt-6">
        <UiCardTitle class="text-xs sm:text-sm font-medium">Income</UiCardTitle>
        <Icon name="lucide:arrow-down-left" class="h-4 w-4 text-green-500 shrink-0" />
      </UiCardHeader>
      <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
        <div class="text-xl sm:text-2xl font-bold text-green-600 truncate">+{{ fmt(periodIncome) }}</div>
        <p class="text-xs text-muted-foreground truncate">
          <template v-if="store.selectedCurrency">{{ store.selectedCurrency }} · </template>
          {{ store.dateRange.start?.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}
          —
          {{ store.dateRange.end?.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}
        </p>
      </UiCardContent>
    </UiCard>

    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2 px-3 pt-3 sm:px-6 sm:pt-6">
        <UiCardTitle class="text-xs sm:text-sm font-medium">Expenses</UiCardTitle>
        <Icon name="lucide:arrow-up-right" class="h-4 w-4 text-red-500 shrink-0" />
      </UiCardHeader>
      <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
        <div class="text-xl sm:text-2xl font-bold text-red-600 truncate">-{{ fmt(periodExpense) }}</div>
        <p class="text-xs text-muted-foreground truncate">
          <template v-if="store.selectedCurrency">{{ store.selectedCurrency }} · </template>
          {{ store.dateRange.start?.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}
          —
          {{ store.dateRange.end?.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}
        </p>
      </UiCardContent>
    </UiCard>
  </div>
</template>
