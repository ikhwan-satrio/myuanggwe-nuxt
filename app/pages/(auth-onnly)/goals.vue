<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import type { WalletType, FinancialGoalType } from "~~/server/lib/db/schemas"
import { useGoalsCrudStore } from "~/stores/crud/goals"

const { $apolloClient } = useNuxtApp()

useHead({
  title: "Target Menabung - MyUangGwe | Financial Goals",
  meta: [
    {
      name: "description",
      content: "Tetapkan tujuan finansial, pantau progres menabung, dan alokasikan dana secara otomatis untuk setiap target keuangan Anda.",
    },
    {
      name: "keywords",
      content: "target menabung otomatis alokasi dana, financial goal tracker Indonesia, nabung rutin mingguan bulanan, visual progress bar target finansial, capai tujuan keuangan liburan nikah rumah, separate savings goal per wallet, debt payoff goal tracking, aplikasi nabung untuk anak muda, savings goal dengan deadline, alokasi dana otomatis ke target, pantau progres nabung real-time, alternative celengan digital modern, goal-based saving app bahasa Indonesia",
    },
  ],
})

definePageMeta({ middleware: ["auth"] })

type GoalItem = FinancialGoalType & {
  wallet: { id: string; name: string }
}

const {
  data: goalsData,
  pending,
  refresh: refreshGoals,
} = useAsyncData<GoalItem[]>(
  "goals",
  async () => {
    const result = await $apolloClient.query({
      query: GET_FINANCIAL_GOALS,
      fetchPolicy: "network-only",
    })
    return result.data.financialGoals
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

const goals = computed(() => goalsData.value ?? [])
const wallets = computed(() => walletsData.value ?? [])

const goalsCrudStore = useGoalsCrudStore()

const { mutate: updateMutate } = useMutation(UPDATE_FINANCIAL_GOAL)
const { mutate: deleteMutate } = useMutation(DELETE_FINANCIAL_GOAL)

async function handleAllocate(id: string) {
  const goal = goals.value.find((g) => g.id === id)
  if (!goal) return
  const input = prompt("Masukkan jumlah dana yang ingin dialokasikan:")
  if (!input || isNaN(Number(input))) return
  try {
    await updateMutate({
      id: goal.id,
      input: { currentAmount: goal.currentAmount + Number(input) },
    })
    toast.success("Alokasi dana berhasil")
    await refreshGoals()
  } catch {
    toast.error("Gagal mengalokasikan dana")
  }
}

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id })
    toast.success("Target berhasil dihapus")
    await refreshGoals()
  } catch {
    toast.error("Gagal menghapus target")
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Target Menabung</h1>
        <p class="text-xs text-muted-foreground sm:text-sm">Atur dan pantau target keuangan Anda.</p>
      </div>
      <UiButton size="sm" class="w-full sm:w-auto" @click="goalsCrudStore.openCreate()">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" /> Tambah Target
      </UiButton>
    </div>
    <FormsGoalsCreate :wallets="wallets" @created="refreshGoals()" />
    <TablesGoalsList :goals="goals" :pending="pending" @delete="handleDelete" @allocate="handleAllocate" />
  </div>
</template>
