<script setup lang="ts">
import { useDashboardStore } from '~/stores/dashboard'

const store = useDashboardStore()

defineProps<{
  wallets: any[]
  availableCurrencies: string[]
}>()
</script>

<template>
  <UiCard>
    <UiCardContent class="p-3 sm:p-6">
      <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <div class="space-y-1.5">
          <label class="text-xs font-medium text-muted-foreground">{{ $t('dashboard.filter.period') }}</label>
          <UtilsDateRangePicker v-model="store.dateRange" class="sm:w-70" />
        </div>
        <div class="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
          <div class="space-y-1.5 flex-1">
            <label class="text-xs font-medium text-muted-foreground">{{ $t('dashboard.filter.search') }}</label>
            <UiInput
              v-model="store.searchQuery"
              :placeholder="$t('dashboard.filter.searchPlaceholder')"
              class="w-full"
            />
          </div>
          <div class="flex flex-wrap items-end gap-3">
            <div class="space-y-1.5 min-w-0 flex-1 sm:flex-none">
              <label class="text-xs font-medium text-muted-foreground">{{ $t('dashboard.filter.type') }}</label>
              <UiSelect v-model="store.filterType">
                <UiSelectTrigger class="w-full sm:w-32.5">
                  <UiSelectValue :placeholder="$t('dashboard.filter.allTypes')" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="all">{{ $t('dashboard.filter.allTypes') }}</UiSelectItem>
                  <UiSelectItem value="income">{{ $t('dashboard.filter.income') }}</UiSelectItem>
                  <UiSelectItem value="expense">{{ $t('dashboard.filter.expense') }}</UiSelectItem>
                  <UiSelectItem value="transfer">{{ $t('dashboard.filter.transfer') }}</UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div class="space-y-1.5 min-w-0 flex-1 sm:flex-none">
              <label class="text-xs font-medium text-muted-foreground">{{ $t('dashboard.filter.wallet') }}</label>
              <UiSelect v-model="store.filterWalletId">
                <UiSelectTrigger class="w-full sm:w-37.5">
                  <UiSelectValue :placeholder="$t('dashboard.filter.allWallets')" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem value="all">{{ $t('dashboard.filter.allWallets') }}</UiSelectItem>
                  <UiSelectItem v-for="w in wallets" :key="w.id" :value="w.id">
                    {{ w.name }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
            <div class="space-y-1.5 min-w-0 flex-1 sm:flex-none">
              <label class="text-xs font-medium text-muted-foreground">{{ $t('dashboard.filter.currency') }}</label>
              <UiSelect v-model="store.filterCurrency">
                <UiSelectTrigger class="w-full sm:w-32">
                  <UiSelectValue :placeholder="$t('dashboard.filter.allCurrencies')" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="c in availableCurrencies" :key="c" :value="c">
                    {{ c === 'all' ? $t('dashboard.filter.allCurrencies') : c }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>
          </div>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>
