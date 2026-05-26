<script setup lang="ts">
import type { RecurringTransactionType } from "~~/server/lib/db/schemas"

type RecurringItem = RecurringTransactionType & {
  wallet: { name: string }
  toWallet: { name: string } | null
  category: { name: string; icon: string | null } | null
}

defineProps<{
  items: RecurringItem[]
  pending: boolean
}>()

const emit = defineEmits<{ delete: [id: string] }>()
const { formatCurrency } = useCurrency()
</script>

<template>
  <div class="rounded-md border bg-card">
    <template v-if="pending">
      <div v-for="i in 3" :key="i" class="flex items-center justify-between border-b p-4 last:border-0">
        <div class="flex items-center gap-3">
          <UiSkeleton class="h-10 w-10 rounded-full" />
          <div class="space-y-2">
            <UiSkeleton class="h-4 w-32" />
            <UiSkeleton class="h-3 w-24" />
          </div>
        </div>
        <UiSkeleton class="h-9 w-24" />
      </div>
    </template>

    <template v-else-if="items.length > 0">
      <div
        v-for="item in items" :key="item.id"
        class="flex items-center justify-between border-b p-4 transition-colors last:border-0 hover:bg-muted/50"
      >
        <div class="flex items-center gap-3">
          <div
            class="rounded-full p-2"
            :class="{
              'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400': item.type === 'income',
              'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400': item.type === 'expense',
              'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400': item.type === 'transfer',
            }"
          >
            <Icon name="lucide:repeat" class="h-4 w-4" />
          </div>
          <div>
            <p class="font-medium">
              {{ item.description || item.category?.name || "Transfer" }}
              <UiBadge variant="secondary" class="ml-2 text-[10px] capitalize">{{ item.frequency }}</UiBadge>
            </p>
            <p class="text-xs text-muted-foreground">
              {{ item.wallet.name }}
              <template v-if="item.toWallet">→ {{ item.toWallet.name }}</template>
              • Berikutnya: {{ formatDate(String(item.nextRunDate)) }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 text-right">
          <div>
            <p class="font-bold">{{ formatCurrency(item.amount) }}</p>
            <p class="text-[10px]" :class="item.isActive ? 'text-green-500' : 'text-muted-foreground'">
              {{ item.isActive ? "Aktif" : "Nonaktif" }}
            </p>
          </div>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline" size="icon">
                <Icon name="lucide:more-vertical" class="h-4 w-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end">
              <UiDropdownMenuItem class="text-destructive focus:text-destructive" @click="emit('delete', item.id)">
                <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" /> Hapus
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
    </template>

    <div v-else class="p-8 text-center text-muted-foreground">
      Belum ada transaksi rutin.
    </div>
  </div>
</template>
