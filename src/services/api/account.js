import apiClient from '@/plugins/axios'

export const accountService = {
  login(payload) {
    return apiClient.post('/api/v1/users/login', payload)
  },

  refreshToken(refreshToken) {
    return apiClient.post('/api/v1/users/refresh-token', { refreshToken })
  },

  logout() {
    return apiClient.delete('/api/v1/users/revoke')
  },

  readUserInfo() {
    return apiClient.get('/api/v1/users/profile')
  },

  updateProfile(payload) {
    return apiClient.put('/api/v1/users/profile', payload)
  }
}

export default accountService
