import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const userService = {
  ...createRestService(apiClient, 'users'),

  updatePassword(payload) {
    return apiClient.put('/api/v1/users/change-password', payload)
  }
}

export default userService
