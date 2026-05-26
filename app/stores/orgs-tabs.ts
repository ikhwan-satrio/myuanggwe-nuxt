import { defineStore } from 'pinia'

export const useOrgsTabsStore = defineStore('orgs-tabs', () => {
  const activeTab = ref('create')

  function setActiveTab(tab: string) {
    activeTab.value = tab
  }

  return { activeTab, setActiveTab }
})
