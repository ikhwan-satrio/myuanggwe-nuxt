<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('dashboard.title'),
  meta: [
    {
      name: "description",
      content:
        t('dashboard.meta.description'),
    },
    {
      name: "keywords",
      content: t('dashboard.meta.keywords'),
    },
  ],
});

definePageMeta({
  middleware: ["auth"],
});

const { $apolloClient } = useNuxtApp();
const { formatCurrency } = useCurrency();
const { downloadCsv } = useExportCsv();

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

const dateRange = ref<{ start: Date | null; end: Date | null }>({
  start: startOfMonth,
  end: now,
});

const searchQuery = ref("");
const filterType = ref<string>("all");
const filterWalletId = ref<string>("all");

const dateRangeParams = computed(() => {
  const s = dateRange.value.start?.toISOString();
  const e = dateRange.value.end?.toISOString();
  return { from: s, to: e };
});

const { data: walletsData, pending: walletsLoading } = useAsyncData(
  "dashboard-wallets",
  async () => {
    const result = await $apolloClient.query({
      query: GET_WALLETS,
      fetchPolicy: "network-only",
    });
    return result.data.wallets as {
      id: string;
      name: string;
      balance: number;
      currency: string;
      type: string;
    }[];
  },
  { server: false, lazy: true },
);

const { data: recentData, pending: recentLoading } = useAsyncData(
  "dashboard-recent",
  async () => {
    const result = await $apolloClient.query({
      query: GET_TRANSACTIONS,
      variables: { limit: 5 },
      fetchPolicy: "network-only",
    });
    return result.data.transactions;
  },
  { server: false, lazy: true },
);

// periodData — sudah pakai watch option, hapus dateRange watch manual
const { data: periodData, pending: periodLoading } = useAsyncData(
  "dashboard-period",
  async () => {
    const result = await $apolloClient.query({
      query: GET_TRANSACTIONS,
      variables: {
        from: dateRangeParams.value.from,
        to: dateRangeParams.value.to,
      },
      fetchPolicy: "network-only",
    })

    return result.data.transactions
  },
  { server: false, lazy: true, watch: [dateRangeParams] },
)

// filteredData — tambah watch option
const { data: filteredData, pending: filteredLoading } = useAsyncData(
  "dashboard-filtered",
  async () => {
    const vars: Record<string, any> = { limit: 50 }
    if (dateRangeParams.value.from) vars.from = dateRangeParams.value.from
    if (dateRangeParams.value.to) vars.to = dateRangeParams.value.to
    if (filterType.value !== "all") vars.type = filterType.value
    if (filterWalletId.value !== "all") vars.walletId = filterWalletId.value
    const result = await $apolloClient.query({
      query: GET_TRANSACTIONS,
      variables: vars,
      fetchPolicy: "network-only",
    })
    return result.data.transactions
  },
  { server: false, lazy: true, watch: [dateRangeParams, filterType, filterWalletId] }, // ✅
)

const wallets = computed(() => walletsData.value ?? []);
const recentTransactions = computed(() => recentData.value ?? []);
const periodTransactions = computed(() => periodData.value ?? []);
const filteredTransactions = computed(() => filteredData.value ?? []);

const totalBalance = computed(() =>
  wallets.value.reduce((sum: number, w: any) => sum + w.balance, 0),
);
const walletCount = computed(() => wallets.value.length);

const periodIncome = computed(() =>
  periodTransactions.value
    .filter((t: any) => t.type === "income")
    .reduce((sum: number, t: any) => sum + t.amount, 0),
);

const periodExpense = computed(() =>
  periodTransactions.value
    .filter((t: any) => t.type === "expense")
    .reduce((sum: number, t: any) => sum + t.amount, 0),
);

const searchedTransactions = computed(() => {
  if (!searchQuery.value) return filteredTransactions.value;
  const q = searchQuery.value.toLowerCase();
  return filteredTransactions.value.filter(
    (tx: any) =>
      tx.description?.toLowerCase().includes(q) ||
      tx.category?.name?.toLowerCase().includes(q) ||
      tx.wallet?.name?.toLowerCase().includes(q),
  );
});

function exportCsv() {
  const headers = [
    t('dashboard.csv.date'),
    t('dashboard.csv.type'),
    t('dashboard.csv.category'),
    t('dashboard.csv.description'),
    t('dashboard.csv.wallet'),
    t('dashboard.csv.amount'),
    t('dashboard.csv.currency'),
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
  <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Dashboard</h1>
        <p class="text-xs text-muted-foreground sm:text-sm">
          Financial overview
        </p>
      </div>
      <UiButton as-child size="sm" class="w-full sm:w-auto">
        <NuxtLink to="/transactions" class="gap-1.5">
          <Icon name="lucide:plus" class="h-4 w-4 shrink-0" /> New Transaction
        </NuxtLink>
      </UiButton>
    </div>

    <!-- Filter Bar -->
    <UiCard>
      <UiCardContent class="p-3 sm:p-6">
        <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
          <div class="space-y-1.5">
            <label class="text-xs font-medium text-muted-foreground"
                >{{ $t('dashboard.filter.period') }}</label
            >
            <UtilsDateRangePicker v-model="dateRange" class="sm:w-70" />
          </div>
          <div class="flex flex-1 flex-col gap-3 sm:flex-row sm:items-end">
            <div class="space-y-1.5 flex-1">
              <label class="text-xs font-medium text-muted-foreground"
                >{{ $t('dashboard.filter.search') }}</label
              >
              <UiInput
                v-model="searchQuery"
                :placeholder="$t('dashboard.filter.searchPlaceholder')"
                class="w-full"
              />
            </div>
            <div class="flex flex-wrap items-end gap-3">
              <div class="space-y-1.5 min-w-0 flex-1 sm:flex-none">
                <label class="text-xs font-medium text-muted-foreground"
                  >{{ $t('dashboard.filter.type') }}</label
                >
                <UiSelect v-model="filterType">
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
                <label class="text-xs font-medium text-muted-foreground"
                  >{{ $t('dashboard.filter.wallet') }}</label
                >
                <UiSelect v-model="filterWalletId">
                  <UiSelectTrigger class="w-full sm:w-37.5">
                    <UiSelectValue :placeholder="$t('dashboard.filter.allWallets')" />
                  </UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem value="all">{{ $t('dashboard.filter.allWallets') }}</UiSelectItem>
                    <UiSelectItem
                      v-for="w in wallets"
                      :key="w.id"
                      :value="w.id"
                    >
                      {{ w.name }}
                    </UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>
              <UiButton
                variant="outline"
                size="sm"
                class="w-full gap-1.5 sm:w-auto"
                @click="exportCsv"
              >
                <Icon name="lucide:download" class="h-4 w-4 shrink-0" />
                <span class="sm:hidden">Export</span>
                <span class="hidden sm:inline">Export CSV</span>
              </UiButton>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Stats Cards -->
    <div
      v-if="walletsLoading || periodLoading"
      class="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3"
    >
      <UiCard v-for="i in 3" :key="i">
        <UiCardHeader
          class="flex flex-row items-center justify-between pb-2 px-3 pt-3 sm:px-6 sm:pt-6"
        >
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
        <UiCardHeader
          class="flex flex-row items-center justify-between pb-2 px-3 pt-3 sm:px-6 sm:pt-6"
        >
          <UiCardTitle class="text-xs sm:text-sm font-medium"
            >Total Balance</UiCardTitle
          >
          <Icon
            name="lucide:wallet"
            class="h-4 w-4 text-muted-foreground shrink-0"
          />
        </UiCardHeader>
        <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
          <div class="text-xl sm:text-2xl font-bold truncate">
            {{ formatCurrency(totalBalance) }}
          </div>
          <p class="text-xs text-muted-foreground truncate">
            From {{ walletCount }} wallet{{ walletCount !== 1 ? "s" : "" }}
          </p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader
          class="flex flex-row items-center justify-between pb-2 px-3 pt-3 sm:px-6 sm:pt-6"
        >
          <UiCardTitle class="text-xs sm:text-sm font-medium"
            >Income</UiCardTitle
          >
          <Icon
            name="lucide:arrow-down-left"
            class="h-4 w-4 text-green-500 shrink-0"
          />
        </UiCardHeader>
        <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
          <div class="text-xl sm:text-2xl font-bold text-green-600 truncate">
            +{{ formatCurrency(periodIncome) }}
          </div>
          <p class="text-xs text-muted-foreground truncate">
            {{
              dateRange.start?.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })
            }}
            —
            {{
              dateRange.end?.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })
            }}
          </p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader
          class="flex flex-row items-center justify-between pb-2 px-3 pt-3 sm:px-6 sm:pt-6"
        >
          <UiCardTitle class="text-xs sm:text-sm font-medium"
            >Expenses</UiCardTitle
          >
          <Icon
            name="lucide:arrow-up-right"
            class="h-4 w-4 text-red-500 shrink-0"
          />
        </UiCardHeader>
        <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
          <div class="text-xl sm:text-2xl font-bold text-red-600 truncate">
            -{{ formatCurrency(periodExpense) }}
          </div>
          <p class="text-xs text-muted-foreground truncate">
            {{
              dateRange.start?.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })
            }}
            —
            {{
              dateRange.end?.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })
            }}
          </p>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Quick Insights -->
    <UiCard>
      <UiCardHeader
        class="flex flex-row items-center justify-between pb-2 px-3 pt-3 sm:px-6 sm:pt-6"
      >
        <div class="min-w-0">
          <UiCardTitle class="text-sm sm:text-base">Quick Insights</UiCardTitle>
          <UiCardDescription class="text-xs sm:text-sm">
            Analysis based on your selected period
          </UiCardDescription>
        </div>
        <Icon name="lucide:zap" class="h-4 w-4 text-primary shrink-0" />
      </UiCardHeader>
      <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
        <div v-if="periodLoading" class="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <div
            v-for="i in 2"
            :key="i"
            class="flex items-center gap-3 sm:gap-4 rounded-lg border bg-muted/30 p-3 sm:p-4"
          >
            <UiSkeleton class="h-9 w-9 sm:h-12 sm:w-12 rounded-full shrink-0" />
            <div class="min-w-0 flex-1 space-y-2">
              <UiSkeleton class="h-3 sm:h-4 w-20 sm:w-28" />
              <UiSkeleton class="h-5 sm:h-7 w-24 sm:w-36" />
            </div>
          </div>
        </div>
        <div v-else class="grid gap-3 sm:gap-4 sm:grid-cols-2">
          <div
            class="flex items-center gap-3 sm:gap-4 rounded-lg border bg-muted/30 p-3 sm:p-4"
          >
            <div class="rounded-full bg-primary/10 p-2 sm:p-3 shrink-0">
              <Icon
                name="lucide:trending-up"
                class="h-4 w-4 sm:h-5 sm:w-5 text-primary"
              />
            </div>
            <div class="min-w-0">
              <p class="text-xs sm:text-sm font-medium">Period Savings</p>
              <p class="text-lg sm:text-2xl font-bold truncate">
                {{ formatCurrency(periodIncome - periodExpense) }}
              </p>
            </div>
          </div>
          <div
            class="flex items-center gap-3 sm:gap-4 rounded-lg border bg-muted/30 p-3 sm:p-4"
          >
            <div class="rounded-full bg-muted p-2 sm:p-3 shrink-0">
              <Icon
                name="lucide:shield"
                class="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground"
              />
            </div>
            <div class="min-w-0">
              <p class="text-xs sm:text-sm font-medium">Financial Status</p>
              <p class="text-xs sm:text-sm text-muted-foreground">
                <template v-if="periodIncome > periodExpense">
                  Saving
                  {{
                    ((1 - periodExpense / (periodIncome || 1)) * 100).toFixed(
                      0,
                    )
                  }}% of income.
                </template>
                <template v-else-if="periodIncome === 0 && periodExpense === 0">
                  No activity in this period.
                </template>
                <template v-else> Spending exceeds earnings. </template>
              </p>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Filtered Transactions -->
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
          <Icon name="lucide:download" class="h-3.5 w-3.5" />
          CSV
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
                {{ formatCurrency(tx.amount, tx.currency ?? "IDR") }}
              </div>
            </div>
          </template>
          <div
            v-else
            class="py-8 sm:py-10 text-center text-muted-foreground text-xs sm:text-sm"
          >
            {{
              searchQuery
                ? "No transactions match your search."
                : "No transactions in this period."
            }}
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Recent Transactions -->
    <UiCard>
      <UiCardHeader
        class="flex flex-row items-center justify-between px-3 pt-3 sm:px-6 sm:pt-6"
      >
        <div class="min-w-0">
          <UiCardTitle class="text-sm sm:text-base"
            >Recent Transactions</UiCardTitle
          >
          <UiCardDescription class="text-xs sm:text-sm"
            >Latest activity from this account.</UiCardDescription
          >
        </div>
        <Icon
          name="lucide:history"
          class="h-4 w-4 text-muted-foreground shrink-0"
        />
      </UiCardHeader>
      <UiCardContent class="px-3 pb-3 sm:px-6 sm:pb-6">
        <div v-if="recentLoading" class="space-y-4 sm:space-y-6">
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
          <template v-if="recentTransactions.length > 0">
            <div
              v-for="tx in recentTransactions"
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
                  {{ getTransactionDisplay(tx).subtitle }}
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
                {{ formatCurrency(tx.amount, tx.currency) }}
              </div>
            </div>
          </template>
          <div
            v-else
            class="py-8 sm:py-10 text-center text-muted-foreground text-xs sm:text-sm"
          >
            No transactions yet.
          </div>
        </div>
      </UiCardContent>
      <UiCardFooter
        v-if="!recentLoading && recentTransactions.length > 0"
        class="px-3 pb-3 sm:px-6 sm:pb-6"
      >
        <UiButton
          variant="ghost"
          class="w-full text-muted-foreground text-xs sm:text-sm"
          as-child
        >
          <NuxtLink to="/transactions">View all transactions</NuxtLink>
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>
