<script setup lang="ts">
useHead({
  title: "Dasbor - MyUangGwe | Ringkasan Keuangan",
  meta: [
    {
      name: "description",
      content: "Pantau ringkasan keuangan Anda - saldo total, pemasukan, pengeluaran, dan anggaran bulanan dalam satu tampilan.",
    },
    {
      name: "keywords",
      content: "dasbor keuangan, ringkasan keuangan, saldo total, pemasukan pengeluaran, aplikasi keuangan",
    },
  ],
})

definePageMeta({
  middleware: ["auth"],
});

const { $apolloClient } = useNuxtApp();
const { formatCurrency } = useCurrency();

const now = new Date();
const startOfMonth = new Date(
  now.getFullYear(),
  now.getMonth(),
  1,
).toISOString();

const { data: walletsData, pending: walletsLoading } = await useAsyncData(
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
    }[];
  },
  { server: false },
);

const { data: recentData, pending: recentLoading } = await useAsyncData(
  "dashboard-recent",
  async () => {
    const result = await $apolloClient.query({
      query: GET_TRANSACTIONS,
      variables: { limit: 5 },
      fetchPolicy: "network-only",
    });
    return result.data.transactions;
  },
  { server: false },
);

const { data: monthlyData } = await useAsyncData(
  "dashboard-monthly",
  async () => {
    const result = await $apolloClient.query({
      query: GET_TRANSACTIONS,
      variables: { from: startOfMonth },
      fetchPolicy: "network-only",
    });
    return result.data.transactions;
  },
  { server: false },
);

const isLoading = computed(() => walletsLoading.value || recentLoading.value);
const wallets = computed(() => walletsData.value ?? []);
const recentTransactions = computed(() => recentData.value ?? []);
const monthlyTransactions = computed(() => monthlyData.value ?? []);

const totalBalance = computed(() =>
  wallets.value.reduce((sum, w) => sum + w.balance, 0),
);
const walletCount = computed(() => wallets.value.length);

const monthlyIncome = computed(() =>
  monthlyTransactions.value
    .filter((t: any) => t.type === "income")
    .reduce((sum: number, t: any) => sum + t.amount, 0),
);

const monthlyExpense = computed(() =>
  monthlyTransactions.value
    .filter((t: any) => t.type === "expense")
    .reduce((sum: number, t: any) => sum + t.amount, 0),
);
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p class="text-sm text-muted-foreground">Financial overview</p>
      </div>
      <UiButton as-child>
        <NuxtLink to="/transactions" class="gap-2">
          <Icon name="lucide:plus" class="h-4 w-4" /> New Transaction
        </NuxtLink>
      </UiButton>
    </div>

    <!-- Stats Cards Skeleton -->
    <div v-if="isLoading" class="grid gap-4 md:grid-cols-3">
      <UiCard v-for="i in 3" :key="i">
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <UiSkeleton class="h-4 w-24" />
          <UiSkeleton class="h-4 w-4 rounded-full" />
        </UiCardHeader>
        <UiCardContent>
          <UiSkeleton class="mb-2 h-8 w-32" />
          <UiSkeleton class="h-3 w-20" />
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Stats Cards -->
    <div v-else class="grid gap-4 md:grid-cols-3">
      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium">Total Balance</UiCardTitle>
          <Icon name="lucide:wallet" class="h-4 w-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">
            {{ formatCurrency(totalBalance) }}
          </div>
          <p class="text-xs text-muted-foreground">
            From {{ walletCount }} wallet{{ walletCount !== 1 ? "s" : "" }}
          </p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium">Income</UiCardTitle>
          <Icon name="lucide:arrow-down-left" class="h-4 w-4 text-green-500" />
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold text-green-600">
            +{{ formatCurrency(monthlyIncome) }}
          </div>
          <p class="text-xs text-muted-foreground">This month</p>
        </UiCardContent>
      </UiCard>

      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium">Expenses</UiCardTitle>
          <Icon name="lucide:arrow-up-right" class="h-4 w-4 text-red-500" />
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold text-red-600">
            -{{ formatCurrency(monthlyExpense) }}
          </div>
          <p class="text-xs text-muted-foreground">This month</p>
        </UiCardContent>
      </UiCard>
    </div>

    <!-- Quick Insights -->
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between pb-2">
        <div>
          <UiCardTitle>Quick Insights</UiCardTitle>
          <UiCardDescription
            >Analysis based on your current data</UiCardDescription
          >
        </div>
        <Icon name="lucide:zap" class="h-4 w-4 text-primary" />
      </UiCardHeader>
      <UiCardContent>
        <div class="grid gap-4 md:grid-cols-2">
          <div
            class="flex items-center gap-4 rounded-lg border bg-muted/30 p-4"
          >
            <div class="rounded-full bg-primary/10 p-3">
              <Icon name="lucide:trending-up" class="h-5 w-5 text-primary" />
            </div>
            <div>
              <p class="text-sm font-medium">Monthly Savings</p>
              <p class="text-2xl font-bold">
                {{ formatCurrency(monthlyIncome - monthlyExpense) }}
              </p>
            </div>
          </div>
          <div
            class="flex items-center gap-4 rounded-lg border bg-muted/30 p-4"
          >
            <div class="rounded-full bg-muted p-3">
              <Icon
                name="lucide:shield"
                class="h-5 w-5 text-muted-foreground"
              />
            </div>
            <div>
              <p class="text-sm font-medium">Financial Status</p>
              <p class="text-sm text-muted-foreground">
                <template v-if="monthlyIncome > monthlyExpense">
                  Healthy! You are saving
                  {{
                    ((1 - monthlyExpense / (monthlyIncome || 1)) * 100).toFixed(
                      0,
                    )
                  }}% of your income.
                </template>
                <template
                  v-else-if="monthlyIncome === 0 && monthlyExpense === 0"
                >
                  No activity yet this month.
                </template>
                <template v-else>
                  Attention! You are spending more than you earn this month.
                </template>
              </p>
            </div>
          </div>
        </div>
      </UiCardContent>
    </UiCard>

    <!-- Recent Transactions -->
    <UiCard>
      <UiCardHeader class="flex flex-row items-center justify-between">
        <div>
          <UiCardTitle>Recent Transactions</UiCardTitle>
          <UiCardDescription
            >Latest activity from this account.</UiCardDescription
          >
        </div>
        <Icon name="lucide:history" class="h-4 w-4 text-muted-foreground" />
      </UiCardHeader>
      <UiCardContent>
        <div v-if="isLoading" class="space-y-6">
          <div v-for="i in 5" :key="i" class="flex items-center gap-4">
            <UiSkeleton class="h-10 w-10 rounded-full" />
            <div class="flex-1 space-y-2">
              <UiSkeleton class="h-4 w-32" />
              <UiSkeleton class="h-3 w-24" />
            </div>
            <UiSkeleton class="h-5 w-20" />
          </div>
        </div>

        <div v-else class="space-y-6">
          <template v-if="recentTransactions.length > 0">
            <div
              v-for="tx in recentTransactions"
              :key="tx.id"
              class="flex items-center gap-4"
            >
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full"
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
                  class="h-4 w-4"
                />
                <Icon
                  v-else-if="tx.type === 'expense'"
                  name="lucide:arrow-up-right"
                  class="h-4 w-4"
                />
                <span v-else class="text-sm">💰</span>
              </div>
              <div class="flex-1 space-y-1">
                <p class="text-sm font-medium leading-none">
                  {{ tx.category?.icon }} {{ getTransactionDisplay(tx).label }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ getTransactionDisplay(tx).subtitle }}
                </p>
              </div>
              <div
                class="text-sm font-bold"
                :class="
                  getTransactionDisplay(tx).isExpense
                    ? 'text-red-600'
                    : 'text-green-600'
                "
              >
                {{ getTransactionDisplay(tx).isExpense ? "-" : "+" }}
                {{ formatCurrency(tx.amount) }}
              </div>
            </div>
          </template>
          <div v-else class="py-10 text-center text-muted-foreground">
            No transactions yet.
          </div>
        </div>
      </UiCardContent>
      <UiCardFooter v-if="!isLoading && recentTransactions.length > 0">
        <UiButton variant="ghost" class="w-full text-muted-foreground" as-child>
          <NuxtLink to="/transactions">View all transactions</NuxtLink>
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>
