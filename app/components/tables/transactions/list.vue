<script setup lang="ts">
import type { TransactionMerge } from "~/lib/@types/transaction"
import { useTransactionsCrudStore } from "~/stores/crud/transactions"

defineProps<{
  transactions: TransactionMerge[]
  pending: boolean
}>()

const emit = defineEmits<{ delete: [id: string] }>()
const store = useTransactionsCrudStore()
const { formatCurrency } = useCurrency()
</script>

<template>
  <FormsTransactionsEdit @updated="refreshNuxtData('transactions')" />

  <div class="rounded-md border bg-card">
    <template v-if="pending">
      <div
        v-for="i in 5" :key="i"
        class="flex items-center justify-between border-b p-4 last:border-0"
      >
        <div class="flex items-center gap-3">
          <UiSkeleton class="h-10 w-10 rounded-full" />
          <div class="space-y-2">
            <UiSkeleton class="h-4 w-32" />
            <UiSkeleton class="h-3 w-24" />
          </div>
        </div>
        <UiSkeleton class="h-5 w-24" />
      </div>
    </template>

    <template v-else-if="transactions.length > 0">
      <div
        v-for="tx in transactions" :key="tx.id"
        class="flex items-center justify-between border-b p-4 transition-colors last:border-0 hover:bg-muted/50"
      >
        <div class="flex items-center gap-3">
          <div
            class="rounded-full p-2"
            :class="{
              'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400': tx.type === 'income',
              'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400': tx.type === 'expense',
              'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400': tx.type === 'transfer',
            }"
          >
            <Icon v-if="tx.type === 'income'" name="lucide:arrow-down-left" class="h-4 w-4" />
            <Icon v-else-if="tx.type === 'expense'" name="lucide:arrow-up-right" class="h-4 w-4" />
            <span v-else>💰</span>
          </div>
          <div>
            <p class="font-medium">
              {{ tx.category?.icon }} {{ tx.description || tx.category?.name || "Transfer" }}
            </p>
            <p class="text-xs text-muted-foreground">
              {{ tx.wallet.name }}
              <template v-if="tx.type === 'transfer' && tx.toWallet">→ {{ tx.toWallet.name }}</template>
            </p>
          </div>
        </div>

        <div class="flex items-center gap-4 text-right">
          <div>
            <p
              class="font-bold"
              :class="{
                'text-green-600 dark:text-green-400': tx.type === 'income',
                'text-red-600 dark:text-red-400': tx.type === 'expense',
              }"
            >
              {{ tx.type === "income" ? "+" : "-" }}
              {{ formatCurrency(tx.amount) }}
            </p>
            <p class="text-[10px] text-muted-foreground">{{ formatDate(String(tx.date)) }}</p>
          </div>

          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline" size="icon">
                <Icon name="lucide:more-vertical" class="h-4 w-4" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="end">
              <UiDropdownMenuItem @click="store.openEdit(tx)">
                <Icon name="lucide:pencil" class="mr-2 h-4 w-4" /> Edit
              </UiDropdownMenuItem>
              <UiDropdownMenuItem class="text-destructive focus:text-destructive" @click="emit('delete', tx.id)">
                <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" /> Hapus
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
    </template>

    <div v-else class="p-8 text-center text-muted-foreground">
      Belum ada transaksi.
    </div>
  </div>
</template>
