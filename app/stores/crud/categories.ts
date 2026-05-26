import { defineStore } from 'pinia'
import type { CategoryType } from '~~/server/lib/db/schemas'

export const useCategoriesCrudStore = defineStore('crud-categories', () => {
  const createOpen = ref(false)
  const editOpen = ref(false)
  const editingItem = ref<CategoryType | null>(null)

  function openCreate() { createOpen.value = true }
  function closeCreate() { createOpen.value = false }

  function openEdit(item: CategoryType) {
    editingItem.value = item
    editOpen.value = true
  }

  function closeEdit() {
    editOpen.value = false
    editingItem.value = null
  }

  return { createOpen, editOpen, editingItem, openCreate, closeCreate, openEdit, closeEdit }
})
