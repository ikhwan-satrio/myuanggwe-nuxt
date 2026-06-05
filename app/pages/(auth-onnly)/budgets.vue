<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import type { BudgetType, CategoryType, WalletType } from "~~/server/lib/db/schemas"

const { $apolloClient } = useNuxtApp()

useHead({
  title: "Budgets | Manage Spending Limits",
  meta: [
    {
      name: "description",
      content: "Manage your monthly and yearly budgets for each expense category to keep your finances under control.",
    },
    {
      name: "keywords",
      content: "myuanggwe app, anggaran bulanan per kategori real-time, budget planner Indonesia gratis, batas pengeluaran pintar notifikasi, yearly spending limit tracker, percentage-based budget monitoring, atur budget makan transport hiburan, early warning over budget alert, aplikasi amplop digital terbaru, envelope budgeting system bahasa Indonesia, anggaran cerdas untuk anak kos dan keluarga, budget vs actual comparison chart",
    },
  ],
})

definePageMeta({ middleware: ["auth"] })

type BudgetWithCategory = BudgetType & {
  category: { id: string; name: string; icon: string | null; type: string }
  wallet: { id: string; name: string; currency: string }
}

const {
  data: budgetsData,
  pending,
  refresh: refreshBudgets,
} = useAsyncData<BudgetWithCategory[]>(
  "budgets",
  async () => {
    const result = await $apolloClient.query({
      query: GET_BUDGETS,
      fetchPolicy: "network-only",
    })
    return result.data.budgets
  },
  { server: false, lazy: true },
)

const { data: categoriesData } = useAsyncData<CategoryType[]>(
  "categories",
  async () => {
    const result = await $apolloClient.query({
      query: GET_CATEGORIES,
      fetchPolicy: "network-only",
    })
    return result.data.categories
  },
  { server: false, lazy: true },
)

const { data: walletsData } = useAsyncData<WalletType[]>(
  "wallets-budget",
  async () => {
    const result = await $apolloClient.query({
      query: GET_WALLETS,
      fetchPolicy: "network-only",
    })
    return result.data.wallets
  },
  { server: false, lazy: true },
)

const budgets = computed(() => budgetsData.value ?? [])
const expenseCategories = computed(() =>
  (categoriesData.value ?? []).filter((c) => c.type === "expense"),
)
const wallets = computed(() => walletsData.value ?? [])

const { mutate: deleteMutate } = useMutation(DELETE_BUDGET)

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id })
    toast.success("Budget deleted")
    await refreshBudgets()
  } catch {
    toast.error("Failed to delete budget")
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Budgets</h1>
        <p class="text-xs text-muted-foreground sm:text-sm">Set spending limits for each category.</p>
      </div>
      <BudgetsFormsCreate :expense-categories="expenseCategories" :wallets="wallets" @created="refreshBudgets()" />
    </div>
    <BudgetsFormsEdit :expense-categories="expenseCategories" :wallets="wallets" @updated="refreshBudgets()" />
    <BudgetsTableList :budgets="budgets" :pending="pending" @delete="handleDelete" />
  </div>
</template>
