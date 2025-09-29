import apiClient from '@/plugins/axios'

export const accountService = {
  login(payload) {
    const jsonPayload = {
      username: payload.username,
      password: payload.password
    }

    const alternativePayload = {
      userName: payload.username,
      pass: payload.password
    }
    
    const formData = new FormData()
    formData.append('username', payload.username)
    formData.append('password', payload.password)
    
    console.log('Login payload:', payload)
    console.log('JSON payload:', jsonPayload)
    console.log('Alternative payload:', alternativePayload)
    console.log('Form data:', formData)
  
    return apiClient.post('/api/v1/users/login', jsonPayload)
  },

  refreshToken(refreshToken) {
    return apiClient.post('/api/v1/users/refresh-token', { refreshToken })
  },

  logout() {
    return apiClient.post('/api/v1/users/revoke')
  },

  readUserInfo() {
    return apiClient.get('/api/v1/users/profile')
  },

  updateProfile(payload) {
    return apiClient.put('/api/v1/users/profile', payload)
  },

  changePassword(payload) {
    return apiClient.post('/api/v1/users/change-password', payload)
  }
}

export default accountService
