import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import accountService from '@/services/api/account'

// Helper functions for localStorage
const STORAGE_KEYS = {
  USER: 'tspadmin.user',
  TOKEN: 'tspadmin.token',
  REFRESH_TOKEN: 'tspadmin.refreshToken',
  ACL: 'tspadmin.acl'
}

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn('Failed to save to localStorage:', error)
  }
}

const loadFromStorage = (key) => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  } catch (error) {
    console.warn('Failed to load from localStorage:', error)
    return null
  }
}

const removeFromStorage = (key) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    console.warn('Failed to remove from localStorage:', error)
  }
}

export const useAccountStore = defineStore('account', () => {
  const isAuthenticate = ref(false)
  const token = ref('')
  const user = ref({})
  const acl = ref({})
  const refreshToken = ref('')

  // Initialize from localStorage on store creation
  const initializeFromStorage = () => {
    const storedUser = loadFromStorage(STORAGE_KEYS.USER)
    const storedToken = loadFromStorage(STORAGE_KEYS.TOKEN)
    const storedRefreshToken = loadFromStorage(STORAGE_KEYS.REFRESH_TOKEN)
    const storedAcl = loadFromStorage(STORAGE_KEYS.ACL)


    if (storedUser) {
      user.value = storedUser
    }
    if (storedToken) {
      token.value = storedToken
      isAuthenticate.value = true
    }
    if (storedRefreshToken) {
      refreshToken.value = storedRefreshToken
    }
    if (storedAcl) {
      acl.value = storedAcl
    }
  }

  // Initialize immediately
  initializeFromStorage()

  const getToken = computed(() => token.value)
  const getUser = computed(() => user.value)
  const getUserFullName = computed(() => user.value.fullName || user.value.mobileNo)
  const getIsAuthenticate = computed(() => isAuthenticate.value)
  const getAcl = computed(() => acl.value)
  const getRefreshToken = computed(() => refreshToken.value)
  const getUserRole = computed(() => user.value.role)
  const getRoleDisplayName = computed(() => {
    const roleMap = {
      1: 'منابع انسانی',
      2: 'کارشناس پشتیبانی',
      3: 'سرپرست پشتیبانی',
      4: 'مدیر سیستم',
      5: 'روابط عمومی'
    }
    return roleMap[user.value.role] || user.value.roleDisplayName || 'نامشخص'
  })

  function setToken(payload) {
    token.value = payload
    isAuthenticate.value = !!payload
    if (payload) {
      saveToStorage(STORAGE_KEYS.TOKEN, payload)
    } else {
      removeFromStorage(STORAGE_KEYS.TOKEN)
    }
  }

  function setUser(payload) {
    user.value = payload
    if (payload && Object.keys(payload).length > 0) {
      saveToStorage(STORAGE_KEYS.USER, payload)
    } else {
      removeFromStorage(STORAGE_KEYS.USER)
    }
  }

  function updateUser(payload) {
    Object.keys(payload).forEach((key) => {
      user.value[key] = payload[key]
    })
    if (Object.keys(user.value).length > 0) {
      saveToStorage(STORAGE_KEYS.USER, user.value)
    }
  }

  function setAcl(payload) {
    acl.value = payload
    if (payload) {
      saveToStorage(STORAGE_KEYS.ACL, payload)
    } else {
      removeFromStorage(STORAGE_KEYS.ACL)
    }
  }

  function setRefreshToken(payload) {
    refreshToken.value = payload
    if (payload) {
      saveToStorage(STORAGE_KEYS.REFRESH_TOKEN, payload)
    } else {
      removeFromStorage(STORAGE_KEYS.REFRESH_TOKEN)
    }
  }

  async function login(payload) {
    try {
      const res = await accountService.login(payload)
      const { accessToken, refreshToken: newRefreshToken, accessTokenExpiration, user: userData } = res.data

      setToken(accessToken)
      setRefreshToken(newRefreshToken)
      
      // Set user data from login response
      if (userData) {
        userData.fullName = (userData.name || '') + ' ' + (userData.lastName || '')
        setUser(userData)
      }

      document.cookie = `tspadmin.token=${accessToken}; path=/; expires=${new Date(accessTokenExpiration).toUTCString()}; SameSite=Strict`
      document.cookie = `tspadmin.refreshToken=${newRefreshToken}; path=/; max-age=2592000; SameSite=Strict`

      return res
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    try {
      await accountService.logout()
    } catch (error) {
      console.warn('Logout API call failed, but continuing with local cleanup:', error)
    } finally {
      // Always clean up local state regardless of API call success
      setToken(null)
      setUser({})
      setRefreshToken(null)
      setAcl({})
      
      // Clear localStorage
      Object.values(STORAGE_KEYS).forEach(key => removeFromStorage(key))
      
      // Clear cookies
      document.cookie = 'tspadmin.token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'tspadmin.refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
  }

  async function readUserInfo() {
    try {
      const res = await accountService.readUserInfo()
      const data = res.data
      data.fullName = (data.name || '') + ' ' + (data.lastName || '')
      setUser(data)
      return res
    } catch (error) {
      throw error
    }
  }

  async function updateProfile(payload) {
    try {
      const res = await accountService.updateProfile(payload)
      await readUserInfo()
      return res
    } catch (error) {
      throw error
    }
  }

  async function refreshAccessToken() {
    try {
      const res = await accountService.refreshToken(refreshToken.value)
      const { accessToken, accessTokenExpiration } = res.data
      
      setToken(accessToken)
      document.cookie = `tspadmin.token=${accessToken}; path=/; expires=${new Date(accessTokenExpiration).toUTCString()}; SameSite=Strict`
      
      return accessToken
    } catch (error) {
      await logout()
      throw error
    }
  }

  async function initializeApp() {
    try {
      // If we have a token but no user data, fetch user info
      if (token.value && (!user.value || Object.keys(user.value).length === 0)) {
        await readUserInfo()
      }
      
      // If we have a token, verify it's still valid by trying to refresh if needed
      if (token.value && refreshToken.value) {
        return true
      }
      
      return false
    } catch (error) {
      // If initialization fails, clear everything and redirect to login
      await logout()
      return false
    }
  }

  return {
    isAuthenticate,
    token,
    user,
    acl,
    refreshToken,
    getToken,
    getUser,
    getUserFullName,
    getIsAuthenticate,
    getAcl,
    getRefreshToken,
    getUserRole,
    getRoleDisplayName,
    setToken,
    setUser,
    updateUser,
    setAcl,
    setRefreshToken,
    login,
    logout,
    readUserInfo,
    updateProfile,
    refreshAccessToken,
    initializeApp
  }
})
