import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const userService = {
  ...createRestService(apiClient, 'users'),

  search(params = {}) {
    return apiClient.get('/api/v1/users', { params })
  },

  getById(id) {
    return apiClient.get(`/api/v1/users/${id}`)
  },

  updatePassword(payload) {
    return apiClient.post('/api/v1/users/change-password', payload)
  }
}

export default userService
