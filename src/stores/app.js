import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const headScripts = ref([])
  const isDark = ref(false)
  const isMobileSidebarOpen = ref(false)

  const getHeadScripts = computed(() => headScripts.value)
  const getIsDark = computed(() => isDark.value)
  const getIsMobileSidebarOpen = computed(() => isMobileSidebarOpen.value)

  function addHeadScript(payload) {
    const exist = headScripts.value.find((script) => script.hid === payload.hid)
    if (exist === undefined) {
      headScripts.value.push(payload)
    }
  }

  function setIsDark(payload) {
    isDark.value = payload
  }

  function toggleMobileSidebar() {
    isMobileSidebarOpen.value = !isMobileSidebarOpen.value
  }

  function closeMobileSidebar() {
    isMobileSidebarOpen.value = false
  }

  return {
    headScripts,
    isDark,
    isMobileSidebarOpen,
    getHeadScripts,
    getIsDark,
    getIsMobileSidebarOpen,
    addHeadScript,
    setIsDark,
    toggleMobileSidebar,
    closeMobileSidebar
  }
})
