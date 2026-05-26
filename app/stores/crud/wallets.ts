import { defineStore } from 'pinia'
import type { WalletType } from '~~/server/lib/db/schemas'

export const useWalletsCrudStore = defineStore('crud-wallets', () => {
  const createOpen = ref(false)
  const editOpen = ref(false)
  const editingItem = ref<WalletType | null>(null)

  function openCreate() { createOpen.value = true }
  function closeCreate() { createOpen.value = false }

  function openEdit(item: WalletType) {
    editingItem.value = item
    editOpen.value = true
  }

  function closeEdit() {
    editOpen.value = false
    editingItem.value = null
  }

  return { createOpen, editOpen, editingItem, openCreate, closeCreate, openEdit, closeEdit }
})
