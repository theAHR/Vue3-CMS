import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const roleService = {
  ...createRestService(apiClient, 'roles'),

  search(params = {}) {
    return apiClient.get('/api/v1/roles/search', { params })
  }
}

export default roleService
