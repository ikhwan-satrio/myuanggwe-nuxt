import { defineStore } from 'pinia'

export const useRecurringCrudStore = defineStore('crud-recurring', () => {
  const createOpen = ref(false)

  function openCreate() { createOpen.value = true }
  function closeCreate() { createOpen.value = false }

  return { createOpen, openCreate, closeCreate }
})
