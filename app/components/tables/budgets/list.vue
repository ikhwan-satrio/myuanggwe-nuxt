<script setup lang="ts">
import type { BudgetType } from "~~/server/lib/db/schemas"
import { useBudgetsCrudStore } from "~/stores/crud/budgets"

type BudgetWithCategory = BudgetType & {
  category: { id: string; name: string; icon: string | null; type: string }
}

defineProps<{
  budgets: BudgetWithCategory[]
  pending: boolean
}>()

const emit = defineEmits<{ delete: [id: string] }>()
const store = useBudgetsCrudStore()
const { formatCurrency } = useCurrency()

function getProgress(spending: number, amount: number) {
  return Math.min((spending / amount) * 100, 100)
}

function getProgressClass(spending: number, amount: number) {
  const pct = (spending / amount) * 100
  if (pct > 100) return "bg-destructive"
  if (pct > 80) return "bg-yellow-500"
  return "bg-primary"
}
</script>

<template>
  <div class="space-y-4">
    <template v-if="pending">
      <div v-for="i in 3" :key="i" class="rounded-md border p-4">
        <div class="mb-2 flex items-center justify-between">
          <UiSkeleton class="h-5 w-32" />
          <UiSkeleton class="h-5 w-24" />
        </div>
        <UiSkeleton class="h-2 w-full rounded-full" />
        <div class="mt-2 flex justify-between">
          <UiSkeleton class="h-4 w-20" />
          <UiSkeleton class="h-4 w-16" />
        </div>
      </div>
    </template>

    <template v-else-if="budgets.length > 0">
      <div v-for="budget in budgets" :key="budget.id" class="rounded-md border bg-card p-4">
        <div class="mb-3 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span v-if="budget.category?.icon">{{ budget.category.icon }}</span>
            <span class="font-semibold">{{ budget.category?.name }}</span>
            <UiBadge variant="outline" class="text-[10px] capitalize">{{ budget.period }}</UiBadge>
          </div>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="ghost" size="icon" class="h-8 w-8">
                <Icon name="lucide:more-vertical" class="h-4 w-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end">
              <UiDropdownMenuItem @click="store.openEdit(budget)">
                <Icon name="lucide:pencil" class="mr-2 h-4 w-4" /> Edit
              </UiDropdownMenuItem>
              <UiDropdownMenuItem class="text-destructive focus:text-destructive" @click="emit('delete', budget.id)">
                <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" /> Hapus
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
        <div class="space-y-2">
          <div class="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              class="h-full transition-all duration-500"
              :class="getProgressClass(0, budget.amount)"
              :style="{ width: `${getProgress(0, budget.amount)}%` }"
            />
          </div>
          <div class="flex justify-between text-xs">
            <span>{{ formatCurrency(0) }} / {{ formatCurrency(budget.amount) }}</span>
            <span class="text-muted-foreground">{{ Math.round((0 / budget.amount) * 100) }}%</span>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="rounded-md border border-dashed p-8 text-center text-muted-foreground">
      Belum ada anggaran.
    </div>
  </div>
</template>
