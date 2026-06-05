<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import type { WalletType, CategoryType, RecurringTransactionType } from "~~/server/lib/db/schemas"

const { $apolloClient } = useNuxtApp()

useHead({
  title: "Recurring Transactions | Automated Tracking",
  meta: [
    {
      name: "description",
      content: "Manage your recurring transactions like bills, subscriptions, or salary to automate your financial tracking and never miss a record.",
    },
    {
      name: "keywords",
      content: "myuanggwe app, transaksi berulang otomatis tagihan bulanan, auto debit subscription tracker, recurring payment scheduler Indonesia, langganan Netflix Spotify Gojek catat otomatis, gaji bulanan rutin pencatatan, atur cicilan kredit mobil rumah otomatis, bill reminder integrated dashboard, daily weekly monthly yearly frequency kustom, automated expense recording tool, langganan aplikasi berbayar tercatat, recurring income expense management, jangan sampai lupa bayar tagihan aplikasi catat",
    },
  ],
})

definePageMeta({ middleware: ["auth"] })

type RecurringItem = RecurringTransactionType & {
  wallet: { name: string; currency: string }
  toWallet: { name: string; currency: string } | null
  category: { name: string; icon: string | null } | null
}

const {
  data: recurringData,
  pending,
  refresh: refreshRecurring,
} = useAsyncData<RecurringItem[]>(
  "recurring-transactions",
  async () => {
    const result = await $apolloClient.query({
      query: GET_RECURRING_TRANSACTIONS,
      fetchPolicy: "network-only",
    })
    return result.data.recurringTransactions
  },
  { server: false, lazy: true },
)

const { data: walletsData } = useAsyncData<WalletType[]>(
  "wallets",
  async () => {
    const result = await $apolloClient.query({
      query: GET_WALLETS,
      fetchPolicy: "network-only",
    })
    return result.data.wallets
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

const recurringItems = computed(() => recurringData.value ?? [])
const wallets = computed(() => walletsData.value ?? [])
const categories = computed(() => categoriesData.value ?? [])

const { mutate: deleteMutate } = useMutation(DELETE_RECURRING_TRANSACTION)

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id })
    toast.success("Recurring transaction deleted")
    await refreshRecurring()
  } catch {
    toast.error("Failed to delete recurring transaction")
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Recurring Transactions</h1>
        <p class="text-xs text-muted-foreground sm:text-sm">Automate transactions that occur repeatedly.</p>
      </div>
      <RecurringFormsCreate :wallets="wallets" :categories="categories" @created="refreshRecurring()" />
    </div>
    <RecurringTableList :items="recurringItems" :pending="pending" @delete="handleDelete" />
  </div>
</template>
