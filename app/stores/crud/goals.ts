import { defineStore } from 'pinia'

export const useGoalsCrudStore = defineStore('crud-goals', () => {
  const createOpen = ref(false)

  function openCreate() { createOpen.value = true }
  function closeCreate() { createOpen.value = false }

  return { createOpen, openCreate, closeCreate }
})
