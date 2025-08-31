import apiClient from '@/plugins/axios'

export const accountService = {
  login(payload) {
    // Backend might expect different field names or format
    // Also check if endpoint URL has changed
    // Check if backend expects different authentication headers
    // Try both JSON and form data formats
    
    // Method 1: Try with original field names as JSON
    const jsonPayload = {
      username: payload.username,
      password: payload.password
    }
    
    // Method 2: Try with alternative field names
    const alternativePayload = {
      userName: payload.username,
      pass: payload.password
    }
    
    // Method 3: Try as form data
    const formData = new FormData()
    formData.append('username', payload.username)
    formData.append('password', payload.password)
    
    console.log('Login payload:', payload)
    console.log('JSON payload:', jsonPayload)
    console.log('Alternative payload:', alternativePayload)
    console.log('Form data:', formData)
    
    // Try the original format first
    // If this fails, check the exact error response from backend
    // Also check if backend expects different headers or authentication method
    return apiClient.post('/api/v1/users/login', jsonPayload)
  },

  refreshToken(refreshToken) {
    return apiClient.post('/api/v1/users/refresh-token', { refreshToken })
  },

  logout() {
    // Changed from DELETE to POST due to backend 405 Method Not Allowed error
    // If this still fails, the store will handle local cleanup gracefully
    // Try without body to avoid 415 Unsupported Media Type error
    return apiClient.post('/api/v1/users/revoke')
  },

  readUserInfo() {
    return apiClient.get('/api/v1/users/profile')
  },

  updateProfile(payload) {
    return apiClient.put('/api/v1/users/profile', payload)
  }
}

export default accountService
