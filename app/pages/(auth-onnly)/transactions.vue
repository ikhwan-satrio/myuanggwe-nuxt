<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import type { TransactionMerge } from "~/lib/@types/transaction"
import { useTransactionsCrudStore } from "~/stores/crud/transactions"

const { $apolloClient } = useNuxtApp()
const store = useTransactionsCrudStore()

useHead({
  title: "Transaksi - MyUangGwe | Catat Pemasukan & Pengeluaran",
  meta: [
    {
      name: "description",
      content: "Catat dan kelola semua transaksi keuangan Anda - pemasukan, pengeluaran, dan transfer antar dompet di satu tempat.",
    },
    {
      name: "keywords",
      content: "catat transaksi harian gratis Indonesia, pencatatan pemasukan pengeluaran otomatis, transfer antar dompet cash bank e-wallet, recurring transaction scheduler, expense tracker multi kategori, income expense transfer log detail, financial transaction history lengkap, aplikasi catet uang harian, spending record keeping tool, transaction filtering by wallet category date, cash flow tracking pribadi, alternative to buku kas tradisional digital",
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
    toast.success("Transaksi dihapus")
    await refreshTransactions()
    await refreshNuxtData("wallets")
  } catch {
    toast.error("Gagal menghapus transaksi")
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Transaksi</h1>
        <p class="text-xs text-muted-foreground sm:text-sm">Kelola transaksi.</p>
      </div>

      <UiDialog :open="store.createOpen" @update:open="store.closeCreate()">
        <UiDialogTrigger as-child>
          <UiButton size="sm" class="w-full sm:w-auto">
            <Icon name="lucide:plus" class="mr-2 h-4 w-4" /> Catat Transaksi
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent class="sm:max-w-md w-[95vw] max-w-[95vw] sm:max-w-md">
          <UiDialogHeader>
            <UiDialogTitle>Tambah Transaksi</UiDialogTitle>
            <UiDialogDescription>Catat pemasukan, pengeluaran, atau transfer antar dompet.</UiDialogDescription>
          </UiDialogHeader>
          <FormsTransactionsCreate @created="refreshTransactions()" />
        </UiDialogContent>
      </UiDialog>
    </div>

    <TablesTransactionsList :transactions="transactions" :pending="pending" @delete="handleDelete" />
  </div>
</template>
