<script setup lang="ts">
import { useDashboardStore } from "~/stores/dashboard";

const { t } = useI18n();
const store = useDashboardStore();
const { $apolloClient } = useNuxtApp();

useHead({
  title: t("dashboard.title"),
  meta: [
    { name: "description", content: t("dashboard.meta.description") },
    { name: "keywords", content: t("dashboard.meta.keywords") },
  ],
});

definePageMeta({ middleware: ["auth"] });

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

const { data: periodData, pending: periodLoading } = useAsyncData(
  "dashboard-period",
  async () => {
    const result = await $apolloClient.query({
      query: GET_TRANSACTIONS,
      variables: {
        from: store.dateRangeParams.from,
        to: store.dateRangeParams.to,
      },
      fetchPolicy: "network-only",
    });
    return result.data.transactions;
  },
  { server: false, lazy: true, watch: [() => store.dateRangeParams] },
);

const { data: filteredData, pending: filteredLoading } = useAsyncData(
  "dashboard-filtered",
  async () => {
    const vars: Record<string, any> = { limit: 50 };
    if (store.dateRangeParams.from) vars.from = store.dateRangeParams.from;
    if (store.dateRangeParams.to) vars.to = store.dateRangeParams.to;
    if (store.filterType !== "all") vars.type = store.filterType;
    if (store.filterWalletId !== "all") vars.walletId = store.filterWalletId;
    const result = await $apolloClient.query({
      query: GET_TRANSACTIONS,
      variables: vars,
      fetchPolicy: "network-only",
    });
    return result.data.transactions;
  },
  {
    server: false,
    lazy: true,
    watch: [
      () => store.dateRangeParams,
      () => store.filterType,
      () => store.filterWalletId,
      () => store.filterCurrency,
    ],
  },
);

const wallets = computed(() => walletsData.value ?? []);
const recentTransactions = computed(() => recentData.value ?? []);
const periodTransactions = computed(() => periodData.value ?? []);
const filteredTransactions = computed(() => filteredData.value ?? []);

const availableCurrencies = computed(() => [
  "all",
  ...new Set(wallets.value.map((w: any) => w.currency).filter(Boolean)),
]);
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
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

    <DashboardFilterBar
      :wallets="wallets"
      :available-currencies="availableCurrencies"
    />

    <DashboardStatsCards
      :wallets="wallets"
      :period-transactions="periodTransactions"
      :wallets-loading="walletsLoading"
      :period-loading="periodLoading"
    />

    <DashboardQuickInsights
      :period-transactions="periodTransactions"
      :period-loading="periodLoading"
    />

    <DashboardFilteredTransactions
      :transactions="filteredTransactions"
      :filtered-loading="filteredLoading"
    />

    <DashboardRecentTransactions
      :transactions="recentTransactions"
      :loading="recentLoading"
    />
  </div>
</template>
