import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const headScripts = ref([])
  const isDark = ref(false)

  const getHeadScripts = computed(() => headScripts.value)
  const getIsDark = computed(() => isDark.value)

  function addHeadScript(payload) {
    const exist = headScripts.value.find((script) => script.hid === payload.hid)
    if (exist === undefined) {
      headScripts.value.push(payload)
    }
  }

  function setIsDark(payload) {
    isDark.value = payload
  }

  return {
    headScripts,
    isDark,
    getHeadScripts,
    getIsDark,
    addHeadScript,
    setIsDark
  }
})
