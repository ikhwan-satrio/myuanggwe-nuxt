<script setup lang="ts">
import { useDashboardStore } from '~/stores/dashboard'
import { getTransactionDisplay } from '~/composables/useCurrency'

const store = useDashboardStore()
const { formatCurrency } = useCurrency()

defineProps<{
  transactions: any[]
  loading: boolean
}>()
</script>

<template>
  <UiCard>
    <UiCardHeader class="flex flex-row items-center justify-between px-3 pt-3 sm:px-6 sm:pt-6">
      <div class="min-w-0">
        <UiCardTitle class="text-sm sm:text-base">Recent Transactions</UiCardTitle>
        <UiCardDescription class="text-xs sm:text-sm">Latest activity from this account.</UiCardDescription>
      </div>
      <Icon name="lucide:history" class="h-4 w-4 text-muted-foreground shrink-0" />
    </UiCardHeader>
    <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
      <div v-if="loading" class="space-y-4 sm:space-y-6">
        <div v-for="i in 5" :key="i" class="flex items-center gap-3 sm:gap-4">
          <UiSkeleton class="h-8 w-8 sm:h-10 sm:w-10 rounded-full shrink-0" />
          <div class="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
            <UiSkeleton class="h-3.5 sm:h-4 w-24 sm:w-32" />
            <UiSkeleton class="h-3 w-16 sm:w-24" />
          </div>
          <UiSkeleton class="h-4 sm:h-5 w-16 sm:w-20 shrink-0" />
        </div>
      </div>
      <div v-else class="space-y-4 sm:space-y-6">
        <template v-if="transactions.length > 0">
          <div v-for="tx in store.byCurrency(transactions, store.filterCurrency)" :key="tx.id" class="flex items-center gap-3 sm:gap-4">
            <div
              class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full shrink-0"
              :class="{
                'bg-green-100 text-green-600 dark:bg-green-900/30': tx.type === 'income',
                'bg-red-100 text-red-600 dark:bg-red-900/30': tx.type === 'expense',
                'bg-blue-100 text-blue-600 dark:bg-blue-900/30': tx.type === 'transfer',
              }"
            >
              <Icon v-if="tx.type === 'income'" name="lucide:arrow-down-left" class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <Icon v-else-if="tx.type === 'expense'" name="lucide:arrow-up-right" class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <Icon v-else name="lucide:arrow-left-right" class="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <div class="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
              <p class="text-sm font-medium leading-none truncate">
                {{ tx.category?.icon }} {{ getTransactionDisplay(tx).label }}
              </p>
              <p class="text-xs text-muted-foreground truncate">{{ getTransactionDisplay(tx).subtitle }}</p>
            </div>
            <div
              class="text-xs sm:text-sm font-bold shrink-0 whitespace-nowrap"
              :class="getTransactionDisplay(tx).isExpense ? 'text-red-600' : 'text-green-600'"
            >
              {{ getTransactionDisplay(tx).isExpense ? '-' : '+' }}
              {{ formatCurrency(tx.amount, tx.wallet?.currency ?? tx.currency) }}
            </div>
          </div>
        </template>
        <div v-else class="py-8 sm:py-10 text-center text-muted-foreground text-xs sm:text-sm">No transactions yet.</div>
      </div>
    </UiCardContent>
    <UiCardFooter v-if="!loading && transactions.length > 0" class="px-3 pb-3 sm:px-6 sm:pb-6">
      <UiButton variant="ghost" class="w-full text-muted-foreground text-xs sm:text-sm" as-child>
        <NuxtLink to="/transactions">View all transactions</NuxtLink>
      </UiButton>
    </UiCardFooter>
  </UiCard>
</template>
