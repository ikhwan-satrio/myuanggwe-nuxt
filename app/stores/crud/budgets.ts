import { defineStore } from 'pinia'
import type { BudgetType } from '~~/server/lib/db/schemas'

type BudgetWithCategory = BudgetType & {
  category: { id: string; name: string; icon: string | null; type: string }
}

export const useBudgetsCrudStore = defineStore('crud-budgets', () => {
  const createOpen = ref(false)
  const editOpen = ref(false)
  const editingItem = ref<BudgetWithCategory | null>(null)

  function openCreate() { createOpen.value = true }
  function closeCreate() { createOpen.value = false }

  function openEdit(item: BudgetWithCategory) {
    editingItem.value = item
    editOpen.value = true
  }

  function closeEdit() {
    editOpen.value = false
    editingItem.value = null
  }

  return { createOpen, editOpen, editingItem, openCreate, closeCreate, openEdit, closeEdit }
})
