<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import type { TransactionMerge } from "~/lib/@types/transaction"

const { $apolloClient } = useNuxtApp()

useHead({
  title: "Transactions | Track Income & Expenses",
  meta: [
    {
      name: "description",
      content: "Track and manage all your financial transactions - income, expenses, and transfers between wallets in one place.",
    },
    {
      name: "keywords",
      content: "myuanggwe app, catat transaksi harian gratis Indonesia, pencatatan pemasukan pengeluaran otomatis, transfer antar dompet cash bank e-wallet, recurring transaction scheduler, expense tracker multi kategori, income expense transfer log detail, financial transaction history lengkap, aplikasi catet uang harian, spending record keeping tool, transaction filtering by wallet category date, cash flow tracking pribadi, alternative to buku kas tradisional digital",
    },
  ],
})

definePageMeta({ middleware: ["auth"] })

const {
  data: transactionsData,
  pending,
  refresh: refreshTransactions,
} = useAsyncData<TransactionMerge[]>(
  "transactions",
  async () => {
    const result = await $apolloClient.query({
      query: GET_TRANSACTIONS,
      variables: {},
      fetchPolicy: "network-only",
    })
    return result.data.transactions
  },
  { server: false, lazy: true },
)

const transactions = computed(() => transactionsData.value ?? [])

const { mutate: deleteMutation } = useMutation(DELETE_TRANSACTION)

async function handleDelete(id: string) {
  try {
    await deleteMutation({ id })
    toast.success("Transaction deleted")
    await refreshTransactions()
    await refreshNuxtData("wallets")
  } catch {
    toast.error("Failed to delete transaction")
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Transactions</h1>
        <p class="text-xs text-muted-foreground sm:text-sm">Manage your transactions.</p>
      </div>

      <FormsTransactionsCreate @created="refreshTransactions()" />
    </div>

    <TablesTransactionsList :transactions="transactions" :pending="pending" @delete="handleDelete" />
  </div>
</template>
