<script setup lang="ts">
import type { FinancialGoalType } from "~~/server/lib/db/schemas"

type GoalItem = FinancialGoalType & {
  wallet: { id: string; name: string; currency: string }
}

defineProps<{
  goals: GoalItem[]
  pending: boolean
}>()

const emit = defineEmits<{ delete: [id: string]; allocate: [id: string] }>()
const { formatCurrency } = useCurrency()

function calculateProgress(current: number, target: number) {
  return Math.min(Math.round((current / target) * 100), 100)
}
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <template v-if="pending">
      <UiCard v-for="i in 3" :key="i" class="animate-pulse">
        <UiCardHeader class="h-24 bg-muted/50" />
        <UiCardContent class="space-y-2 p-4">
          <UiSkeleton class="h-4 w-3/4" />
          <UiSkeleton class="h-8 w-full" />
        </UiCardContent>
      </UiCard>
    </template>

    <template v-else-if="goals.length > 0">
      <UiCard v-for="goal in goals" :key="goal.id">
        <UiCardHeader class="pb-2">
          <div class="flex items-center justify-between">
            <UiCardTitle class="text-lg font-bold">{{ goal.name }}</UiCardTitle>
            <div class="rounded-full bg-primary/10 p-2 text-primary">
              <Icon name="lucide:trending-up" class="h-4 w-4" />
            </div>
          </div>
          <UiCardDescription>Target: {{ formatCurrency(goal.targetAmount, goal.wallet?.currency) }}</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <div class="mt-2 space-y-3">
            <div class="flex items-center justify-between text-sm">
              <span class="text-muted-foreground">Saved</span>
              <span class="font-medium">{{ formatCurrency(goal.currentAmount, goal.wallet?.currency) }}</span>
            </div>
            <UiProgress :model-value="calculateProgress(goal.currentAmount, goal.targetAmount)" class="h-2" />
            <div class="flex items-center justify-between text-xs text-muted-foreground">
              <span>{{ calculateProgress(goal.currentAmount, goal.targetAmount) }}% Complete</span>
              <span v-if="goal.deadline">
                Time left: {{ new Date(String(goal.deadline)).toLocaleDateString("id-ID") }}
              </span>
            </div>
            <div class="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="lucide:wallet" class="h-3 w-3" />
              <span>{{ goal.wallet?.name ?? "Wallet not found" }}</span>
            </div>
          </div>
        </UiCardContent>
        <UiCardFooter class="flex justify-between border-t bg-muted/50 p-3">
          <UiButton variant="outline" size="sm" @click="emit('allocate', goal.id)">
            Allocate Funds
          </UiButton>
          <UiButton variant="ghost" size="icon" class="text-destructive hover:text-destructive" @click="emit('delete', goal.id)">
            <Icon name="lucide:trash-2" class="h-4 w-4" />
          </UiButton>
        </UiCardFooter>
      </UiCard>
    </template>

    <div v-else class="col-span-3 flex h-50 flex-col items-center justify-center rounded-lg border border-dashed text-center">
      <p class="text-muted-foreground">No savings goals yet.</p>
    </div>
  </div>
</template>
