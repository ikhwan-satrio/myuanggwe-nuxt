<script setup lang="ts">
import { useDashboardStore } from "~/stores/dashboard";
import { useExportCsv } from "~/composables/useExportCsv";
import { getTransactionDisplay } from "~/composables/useCurrency";

const store = useDashboardStore();
const { formatCurrency } = useCurrency();
const { downloadCsv } = useExportCsv();
const { t } = useI18n();

const props = defineProps<{
  transactions: any[];
  filteredLoading: boolean;
}>();

const searchedTransactions = computed(() => {
  const items = store.byCurrency(props.transactions, store.filterCurrency);
  if (!store.searchQuery) return items;
  const q = store.searchQuery.toLowerCase();
  const currency = store.filterCurrency?.toLowerCase();
  
  return items.filter(
    (tx: any) =>
      tx.wallet?.currency?.toLowerCase().includes(currency) ||
      tx.description?.toLowerCase().includes(q) ||
      tx.category?.name?.toLowerCase().includes(q) ||
      tx.wallet?.name?.toLowerCase().includes(q),
  );
});

function exportCsv() {
  const headers = [
    t("dashboard.csv.date"),
    t("dashboard.csv.type"),
    t("dashboard.csv.category"),
    t("dashboard.csv.description"),
    t("dashboard.csv.wallet"),
    t("dashboard.csv.amount"),
    t("dashboard.csv.currency"),
  ];
  const rows = searchedTransactions.value.map((tx: any) => [
    new Date(tx.date).toLocaleDateString("id-ID"),
    tx.type,
    tx.category?.name ?? "-",
    tx.description ?? "",
    tx.wallet?.name ?? "-",
    tx.type === "expense" || tx.type === "transfer" ? -tx.amount : tx.amount,
    tx.currency ?? "IDR",
  ]);
  downloadCsv(`transactions-${Date.now()}.csv`, headers, rows);
}
</script>

<template>
  <UiCard>
    <UiCardHeader
      class="flex flex-row items-center justify-between px-3 pt-3 sm:px-6 sm:pt-6"
    >
      <div class="min-w-0">
        <UiCardTitle class="text-sm sm:text-base">Transactions</UiCardTitle>
        <UiCardDescription class="text-xs sm:text-sm">
          {{ searchedTransactions.length }} transaction{{
            searchedTransactions.length !== 1 ? "s" : ""
          }}
          in selected period
        </UiCardDescription>
      </div>
      <UiButton
        variant="outline"
        size="xs"
        class="gap-1.5 shrink-0"
        @click="exportCsv"
      >
        <Icon name="lucide:download" class="h-3.5 w-3.5" /> CSV
      </UiButton>
    </UiCardHeader>
    <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
      <div v-if="filteredLoading" class="space-y-4 sm:space-y-6">
        <div v-for="i in 5" :key="i" class="flex items-center gap-3 sm:gap-4">
          <UiSkeleton class="h-8 w-8 sm:h-10 sm:w-10 rounded-full shrink-0" />
          <div class="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
            <UiSkeleton class="h-3.5 sm:h-4 w-24 sm:w-32" />
            <UiSkeleton class="h-3 w-16 sm:w-24" />
          </div>
          <UiSkeleton class="h-4 sm:h-5 w-16 sm:w-20 shrink-0" />
        </div>
      </div>
      <div v-else class="space-y-3 sm:space-y-4">
        <template v-if="searchedTransactions.length > 0">
          <div
            v-for="tx in searchedTransactions"
            :key="tx.id"
            class="flex items-center gap-3 sm:gap-4"
          >
            <div
              class="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full shrink-0"
              :class="{
                'bg-green-100 text-green-600 dark:bg-green-900/30':
                  tx.type === 'income',
                'bg-red-100 text-red-600 dark:bg-red-900/30':
                  tx.type === 'expense',
                'bg-blue-100 text-blue-600 dark:bg-blue-900/30':
                  tx.type === 'transfer',
              }"
            >
              <Icon
                v-if="tx.type === 'income'"
                name="lucide:arrow-down-left"
                class="h-3.5 w-3.5 sm:h-4 sm:w-4"
              />
              <Icon
                v-else-if="tx.type === 'expense'"
                name="lucide:arrow-up-right"
                class="h-3.5 w-3.5 sm:h-4 sm:w-4"
              />
              <Icon
                v-else
                name="lucide:arrow-left-right"
                class="h-3.5 w-3.5 sm:h-4 sm:w-4"
              />
            </div>
            <div class="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
              <p class="text-sm font-medium leading-none truncate">
                {{ tx.category?.icon }} {{ getTransactionDisplay(tx).label }}
              </p>
              <p class="text-xs text-muted-foreground truncate">
                {{
                  new Date(tx.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                }}
                — {{ tx.wallet?.name }}
              </p>
            </div>
            <div
              class="text-xs sm:text-sm font-bold shrink-0 whitespace-nowrap"
              :class="
                getTransactionDisplay(tx).isExpense
                  ? 'text-red-600'
                  : 'text-green-600'
              "
            >
              {{ getTransactionDisplay(tx).isExpense ? "-" : "+" }}
              {{
                formatCurrency(
                  tx.amount,
                  tx.wallet?.currency ?? tx.currency ?? "IDR",
                )
              }}
            </div>
          </div>
        </template>
        <div
          v-else
          class="py-8 sm:py-10 text-center text-muted-foreground text-xs sm:text-sm"
        >
          {{
            store.searchQuery
              ? "No transactions match your search."
              : "No transactions in this period."
          }}
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>
