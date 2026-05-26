<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import type { BudgetType, CategoryType } from "~~/server/lib/db/schemas"

const { $apolloClient } = useNuxtApp()

useHead({
  title: "Anggaran - MyUangGwe | Atur Batas Pengeluaran",
  meta: [
    {
      name: "description",
      content: "Kelola anggaran bulanan dan tahunan Anda untuk setiap kategori pengeluaran agar keuangan tetap terkendali.",
    },
    {
      name: "keywords",
      content: "anggaran bulanan per kategori real-time, budget planner Indonesia gratis, batas pengeluaran pintar notifikasi, yearly spending limit tracker, percentage-based budget monitoring, atur budget makan transport hiburan, early warning over budget alert, aplikasi amplop digital terbaru, envelope budgeting system bahasa Indonesia, anggaran cerdas untuk anak kos dan keluarga, budget vs actual comparison chart",
    },
  ],
})

definePageMeta({ middleware: ["auth"] })

type BudgetWithCategory = BudgetType & {
  category: { id: string; name: string; icon: string | null; type: string }
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

const budgets = computed(() => budgetsData.value ?? [])
const expenseCategories = computed(() =>
  (categoriesData.value ?? []).filter((c) => c.type === "expense"),
)

const { mutate: deleteMutate } = useMutation(DELETE_BUDGET)

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id })
    toast.success("Anggaran dihapus")
    await refreshBudgets()
  } catch {
    toast.error("Gagal menghapus anggaran")
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Anggaran</h1>
        <p class="text-sm text-muted-foreground">Atur batas pengeluaran untuk setiap kategori.</p>
      </div>
      <FormsBudgetsCreate :expense-categories="expenseCategories" @created="refreshBudgets()" />
    </div>
    <FormsBudgetsEdit :expense-categories="expenseCategories" @updated="refreshBudgets()" />
    <TablesBudgetsList :budgets="budgets" :pending="pending" @delete="handleDelete" />
  </div>
</template>
