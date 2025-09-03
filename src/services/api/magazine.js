import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const magazineService = {
  ...createRestService(apiClient, 'magazines'),

  search(params = {}) {
    return apiClient.get('/api/v1/magazines', { params })
  },

  getById(id) {
    return apiClient.get(`/api/v1/magazines/${id}`)
  }
}

export default magazineService
