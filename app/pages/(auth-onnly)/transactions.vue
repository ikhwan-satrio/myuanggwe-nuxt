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
      content: "transaksi keuangan, pencatatan keuangan, pemasukan pengeluaran, manajemen keuangan, aplikasi keuangan",
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
  <div class="space-y-6 p-6">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Transaksi</h1>
        <p class="text-sm text-muted-foreground">Kelola transaksi.</p>
      </div>

      <UiDialog :open="store.createOpen" @update:open="store.closeCreate()">
        <UiDialogTrigger as-child>
          <UiButton @click="store.openCreate()">
            <Icon name="lucide:plus" class="mr-2 h-4 w-4" /> Catat Transaksi
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent class="sm:max-w-md">
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
