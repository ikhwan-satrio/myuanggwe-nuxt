import { defineStore } from 'pinia'

export const useAuthTabsStore = defineStore('auth-tabs', {
  state: () => ({
    activeTab: 'register',
  }),

  actions: {
    setActiveTab(tab: string) {
      this.activeTab = tab
    }
  },
})
