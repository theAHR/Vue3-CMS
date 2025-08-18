import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePanelStore = defineStore('panel', () => {
  const navToggle = ref(false)
  const navs = ref([])
  const crumbs = ref([])

  const getNavToggle = computed(() => navToggle.value)
  const getCrumbs = computed(() => crumbs.value)
  const getNavs = computed(() => navs.value)

  function setNavs(payload) {
    navs.value = payload
  }

  function setNavToggle(payload) {
    navToggle.value = payload
  }

  function toggleNavMenu(payload, value) {
    if (value !== undefined) {
      payload.model = value
    } else {
      payload.model = !payload.model
    }
  }

  function setCrumbs(payload) {
    const baseCrumbs = [
      {
        title: 'CMS',
        to: '/'
      }
    ]
    crumbs.value = baseCrumbs.concat(payload)
  }

  function toggleNavPanel() {
    navToggle.value = !navToggle.value
  }

  function checkNavMenuPermissions(acl) {
    // Implementation for checking navigation permissions
    // This would need to be adapted based on your specific ACL logic
    console.log('Checking nav menu permissions with ACL:', acl)
  }

  function collapseNavList(payload) {
    toggleNavMenu(payload, false)
    if (payload.children) {
      payload.children.forEach((child) => {
        if (child.model) {
          toggleNavMenu(child, false)
        }
      })
    }
  }

  return {
    navToggle,
    navs,
    crumbs,
    getNavToggle,
    getCrumbs,
    getNavs,
    setNavs,
    setNavToggle,
    toggleNavMenu,
    setCrumbs,
    toggleNavPanel,
    checkNavMenuPermissions,
    collapseNavList
  }
})
