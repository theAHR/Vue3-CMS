import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import accountService from '@/services/api/account'

export const useAccountStore = defineStore('account', () => {
  const isAuthenticate = ref(false)
  const token = ref('')
  const user = ref({})
  const acl = ref({})
  const refreshToken = ref('')

  const getToken = computed(() => token.value)
  const getUser = computed(() => user.value)
  const getUserFullName = computed(() => user.value.fullName || user.value.mobileNo)
  const getIsAuthenticate = computed(() => isAuthenticate.value)
  const getAcl = computed(() => acl.value)
  const getRefreshToken = computed(() => refreshToken.value)

  function setToken(payload) {
    token.value = payload
    isAuthenticate.value = !!payload
  }

  function setUser(payload) {
    user.value = payload
  }

  function updateUser(payload) {
    Object.keys(payload).forEach((key) => {
      user.value[key] = payload[key]
    })
  }

  function setAcl(payload) {
    acl.value = payload
  }

  function setRefreshToken(payload) {
    refreshToken.value = payload
  }

  async function login(payload) {
    try {
      const res = await accountService.login(payload)
      const { token: authToken, refreshToken: newRefreshToken, expirationDate } = res.data.object

      setToken(authToken)
      setRefreshToken(newRefreshToken)

      document.cookie = `tspadmin.token=${authToken}; path=/; expires=${new Date(expirationDate).toUTCString()}; SameSite=Strict`
      document.cookie = `tspadmin.refreshToken=${newRefreshToken}; path=/; max-age=2592000; SameSite=Strict`

      return res
    } catch (error) {
      throw error
    }
  }

  async function logout() {
    try {
      await accountService.logout()
      setToken(null)
      setUser({})
      setRefreshToken(null)
      document.cookie = 'tspadmin.token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      document.cookie = 'tspadmin.refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    } catch (error) {
      throw error
    }
  }

  async function readUserInfo() {
    try {
      const res = await accountService.readUserInfo()
      const data = res.data.object
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
      const { token: newAuthToken, expirationDate } = res.data.object
      
      setToken(newAuthToken)
      document.cookie = `tspadmin.token=${newAuthToken}; path=/; expires=${new Date(expirationDate).toUTCString()}; SameSite=Strict`
      
      return newAuthToken
    } catch (error) {
      await logout()
      throw error
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
    setToken,
    setUser,
    updateUser,
    setAcl,
    setRefreshToken,
    login,
    logout,
    readUserInfo,
    updateProfile,
    refreshAccessToken
  }
})
