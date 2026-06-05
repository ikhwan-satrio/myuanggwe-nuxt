<script setup lang="ts">
import { useDashboardStore } from '~/stores/dashboard'

const store = useDashboardStore()
const { formatCurrency } = useCurrency()

const props = defineProps<{
  periodTransactions: any[]
  periodLoading: boolean
}>()

const scopedPeriodTransactions = computed(() => store.scopedTransactions(props.periodTransactions))

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
  <UiCard>
    <UiCardHeader class="flex flex-row items-center justify-between pb-2 px-3 pt-3 sm:px-6 sm:pt-6">
      <div class="min-w-0">
        <UiCardTitle class="text-sm sm:text-base">Quick Insights</UiCardTitle>
        <UiCardDescription class="text-xs sm:text-sm">Analysis based on your selected period</UiCardDescription>
      </div>
      <Icon name="lucide:zap" class="h-4 w-4 text-primary shrink-0" />
    </UiCardHeader>
    <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
      <div v-if="periodLoading" class="grid gap-3 sm:gap-4 sm:grid-cols-2">
        <div v-for="i in 2" :key="i" class="flex items-center gap-3 sm:gap-4 rounded-lg border bg-muted/30 p-3 sm:p-4">
          <UiSkeleton class="h-9 w-9 sm:h-12 sm:w-12 rounded-full shrink-0" />
          <div class="min-w-0 flex-1 space-y-2">
            <UiSkeleton class="h-3 sm:h-4 w-20 sm:w-28" />
            <UiSkeleton class="h-5 sm:h-7 w-24 sm:w-36" />
          </div>
        </div>
      </div>
      <div v-else class="grid gap-3 sm:gap-4 sm:grid-cols-2">
        <div class="flex items-center gap-3 sm:gap-4 rounded-lg border bg-muted/30 p-3 sm:p-4">
          <div class="rounded-full bg-primary/10 p-2 sm:p-3 shrink-0">
            <Icon name="lucide:trending-up" class="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div class="min-w-0">
            <p class="text-xs sm:text-sm font-medium">Period Savings</p>
            <p class="text-lg sm:text-2xl font-bold truncate">{{ fmt(periodIncome - periodExpense) }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3 sm:gap-4 rounded-lg border bg-muted/30 p-3 sm:p-4">
          <div class="rounded-full bg-muted p-2 sm:p-3 shrink-0">
            <Icon name="lucide:shield" class="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </div>
          <div class="min-w-0">
            <p class="text-xs sm:text-sm font-medium">Financial Status</p>
            <p class="text-xs sm:text-sm text-muted-foreground">
              <template v-if="periodIncome > periodExpense">
                Saving {{ ((1 - periodExpense / (periodIncome || 1)) * 100).toFixed(0) }}% of income.
              </template>
              <template v-else-if="periodIncome === 0 && periodExpense === 0">No activity in this period.</template>
              <template v-else>Spending exceeds earnings.</template>
            </p>
          </div>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>
