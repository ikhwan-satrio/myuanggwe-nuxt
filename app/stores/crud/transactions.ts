import { defineStore } from 'pinia'
import type { TransactionMerge } from '~/lib/@types/transaction'

export const useTransactionsCrudStore = defineStore('crud-transactions', () => {
  const createOpen = ref(false)
  const editOpen = ref(false)
  const editingTransaction = ref<TransactionMerge | null>(null)

  function openCreate() { createOpen.value = true }
  function closeCreate() { createOpen.value = false }

  function openEdit(tx: TransactionMerge) {
    editingTransaction.value = tx
    editOpen.value = true
  }

  function closeEdit() {
    editOpen.value = false
    editingTransaction.value = null
  }

  return { createOpen, editOpen, editingTransaction, openCreate, closeCreate, openEdit, closeEdit }
})
