<script setup lang="ts">
import type { CategoryType } from "~~/server/lib/db/schemas"
import { useCategoriesCrudStore } from "~/stores/crud/categories"

defineProps<{
  categories: CategoryType[]
  pending: boolean
}>()

const emit = defineEmits<{ delete: [id: string] }>()
const store = useCategoriesCrudStore()
</script>

<template>
  <div class="grid gap-4 md:grid-cols-4">
    <template v-if="pending">
      <UiCard v-for="i in 5" :key="i">
        <UiCardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <UiSkeleton class="h-5 w-20" />
          <div class="flex items-center gap-2">
            <UiSkeleton class="h-5 w-5 rounded-full" />
            <UiSkeleton class="h-9 w-10" />
          </div>
        </UiCardHeader>
      </UiCard>
    </template>

    <template v-else>
      <UiCard v-for="cat in categories" :key="cat.id">
        <UiCardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <UiCardTitle class="text-sm font-medium">{{ cat.icon }} {{ cat.name }}</UiCardTitle>
          <div class="flex items-center gap-2">
            <Icon v-if="cat.type === 'income'" name="lucide:arrow-up-circle" class="h-4 w-4 text-green-500" />
            <Icon v-else name="lucide:arrow-down-circle" class="h-4 w-4 text-red-500" />
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton variant="outline" size="icon">
                  <Icon name="lucide:more-vertical" class="h-4 w-4" />
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent align="end">
                <UiDropdownMenuItem @click="store.openEdit(cat)">
                  <Icon name="lucide:pencil" class="mr-2 h-4 w-4" /> Edit
                </UiDropdownMenuItem>
                <UiDropdownMenuItem class="text-destructive focus:text-destructive" @click="emit('delete', cat.id)">
                  <Icon name="lucide:trash-2" class="mr-2 h-4 w-4" /> Hapus
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </div>
        </UiCardHeader>
      </UiCard>

      <div v-if="categories.length === 0" class="col-span-4 py-10 text-center text-muted-foreground">
        Belum ada kategori. Tambah kategori pertama kamu!
      </div>
    </template>
  </div>
</template>
