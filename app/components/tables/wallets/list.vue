<script setup lang="ts">
import type { WalletType } from "~~/server/lib/db/schemas"
import { useWalletsCrudStore } from "~/stores/crud/wallets"

defineProps<{
  wallets: WalletType[]
  pending: boolean
}>()

const emit = defineEmits<{ delete: [id: string] }>()
const store = useWalletsCrudStore()
const { formatCurrency } = useCurrency()

const icons: Record<string, string> = {
  bank: "lucide:landmark",
  credit_card: "lucide:credit-card",
  cash: "lucide:banknote",
}
</script>

<template>
  <div class="grid gap-4 md:grid-cols-3">
    <template v-if="pending">
      <UiCard v-for="i in 6" :key="i">
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <UiSkeleton class="h-4 w-24" />
          <div class="flex items-center gap-2">
            <UiSkeleton class="h-9 w-9 rounded-md" />
            <UiSkeleton class="h-9 w-9 rounded-md" />
          </div>
        </UiCardHeader>
        <UiCardContent>
          <UiSkeleton class="mb-2 h-8 w-32" />
          <UiSkeleton class="h-4 w-16" />
        </UiCardContent>
      </UiCard>
    </template>

    <template v-else>
      <UiCard v-for="wallet in wallets" :key="wallet.id">
        <UiCardHeader class="flex flex-row items-center justify-between pb-2">
          <UiCardTitle class="text-sm font-medium">{{ wallet.name }}</UiCardTitle>
          <div class="flex items-center gap-2">
            <div class="rounded-md border-2 p-2">
              <Icon :name="icons[wallet.type] ?? 'lucide:banknote'" class="h-4 w-4" />
            </div>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton variant="outline" size="icon">
                  <Icon name="lucide:more-vertical" class="h-4 w-4" />
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent align="end">
                <UiDropdownMenuItem @click="store.openEdit(wallet)">
                  <Icon name="lucide:pencil" class="mr-2 h-4 w-4" /> Edit
                </UiDropdownMenuItem>
                <UiDropdownMenuItem class="text-destructive focus:text-destructive" @click="emit('delete', wallet.id)">
                  <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" /> Hapus
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </div>
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">{{ formatCurrency(wallet.balance, wallet.currency) }}</div>
          <p class="text-xs capitalize text-muted-foreground">{{ wallet.type.replace("_", " ") }}</p>
        </UiCardContent>
      </UiCard>

      <div v-if="wallets.length === 0" class="col-span-3 py-10 text-center text-muted-foreground">
        Belum ada dompet. Tambah dompet pertama kamu!
      </div>
    </template>
  </div>
</template>
