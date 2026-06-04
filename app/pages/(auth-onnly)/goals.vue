<script setup lang="ts">
import { useMutation } from "@vue/apollo-composable"
import { toast } from "vue-sonner"
import type { WalletType, FinancialGoalType } from "~~/server/lib/db/schemas"
import { useGoalsCrudStore } from "~/stores/crud/goals"

const { $apolloClient } = useNuxtApp()

useHead({
  title: "Savings Goals | Track Your Targets",
  meta: [
    {
      name: "description",
      content: "Set financial targets, track your savings progress, and automatically allocate funds to each of your financial goals.",
    },
    {
      name: "keywords",
      content: "myuanggwe app, target menabung otomatis alokasi dana, financial goal tracker Indonesia, nabung rutin mingguan bulanan, visual progress bar target finansial, capai tujuan keuangan liburan nikah rumah, separate savings goal per wallet, debt payoff goal tracking, aplikasi nabung untuk anak muda, savings goal dengan deadline, alokasi dana otomatis ke target, pantau progres nabung real-time, alternative celengan digital modern, goal-based saving app bahasa Indonesia",
    },
  ],
})

definePageMeta({ middleware: ["auth"] })

type GoalItem = FinancialGoalType & {
  wallet: { id: string; name: string; currency: string }
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
  const input = prompt("Enter the amount to allocate:")
  if (!input || isNaN(Number(input))) return
  try {
    await updateMutate({
      id: goal.id,
      input: { currentAmount: goal.currentAmount + Number(input) },
    })
    toast.success("Funds allocated successfully")
    await refreshGoals()
  } catch {
    toast.error("Failed to allocate funds")
  }
}

async function handleDelete(id: string) {
  try {
    await deleteMutate({ id })
    toast.success("Goal deleted successfully")
    await refreshGoals()
  } catch {
    toast.error("Failed to delete goal")
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl space-y-4 sm:space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div class="min-w-0">
        <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">Savings Goals</h1>
        <p class="text-xs text-muted-foreground sm:text-sm">Set and monitor your financial targets.</p>
      </div>
      <UiButton size="sm" class="w-full sm:w-auto" @click="goalsCrudStore.openCreate()">
        <Icon name="lucide:plus" class="mr-2 h-4 w-4" /> Add Goal
      </UiButton>
    </div>
    <FormsGoalsCreate :wallets="wallets" @created="refreshGoals()" />
    <TablesGoalsList :goals="goals" :pending="pending" @delete="handleDelete" @allocate="handleAllocate" />
  </div>
</template>
