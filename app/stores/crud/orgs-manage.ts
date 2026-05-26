import { defineStore } from 'pinia'

export const useOrgsManageStore = defineStore('orgs-manage', () => {
  const memberToRemove = ref<{ id: string; name: string } | null>(null)
  const isRemoveDialogOpen = ref(false)
  const isDeleteDialogOpen = ref(false)

  function openRemoveMember(member: { id: string; name: string }) {
    memberToRemove.value = member
    isRemoveDialogOpen.value = true
  }

  function closeRemoveMember() {
    isRemoveDialogOpen.value = false
    memberToRemove.value = null
  }

  function openDeleteOrg() { isDeleteDialogOpen.value = true }
  function closeDeleteOrg() { isDeleteDialogOpen.value = false }

  return {
    memberToRemove, isRemoveDialogOpen, isDeleteDialogOpen,
    openRemoveMember, closeRemoveMember, openDeleteOrg, closeDeleteOrg,
  }
})
