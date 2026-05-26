<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import type { WalletType, CategoryType, RecurringTransactionType } from "~~/server/lib/db/schemas"
import { useRecurringCrudStore } from "~/stores/crud/recurring"

const recurringCrudStore = useRecurringCrudStore()
const { $apolloClient } = useNuxtApp()

useHead({
  title: "Transaksi Rutin - MyUangGwe | Otomatisasi Pencatatan Keuangan",
  meta: [
    {
      name: "description",
      content: "Kelola transaksi berulang Anda seperti tagihan, langganan, atau gaji agar pencatatan keuangan menjadi otomatis dan tidak terlewat.",
    },
  ],
})

definePageMeta({ middleware: ["auth"] })

type RecurringItem = RecurringTransactionType & {
  wallet: { name: string }
  toWallet: { name: string } | null
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
    toast.success("Transaksi rutin dihapus")
    await refreshRecurring()
  } catch {
    toast.error("Gagal menghapus transaksi rutin")
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">Transaksi Rutin</h1>
        <p class="text-sm text-muted-foreground">Otomatisasi transaksi yang terjadi berulang kali.</p>
      </div>
      <FormsRecurringCreate :wallets="wallets" :categories="categories" @created="refreshRecurring()" />
    </div>
    <TablesRecurringList :items="recurringItems" :pending="pending" @delete="handleDelete" />
  </div>
</template>
