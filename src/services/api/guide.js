import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const guideService = {
  ...createRestService(apiClient, 'guide'),

  search(params = {}) {
    return apiClient.get('/api/v1/guide', { params })
  },

  getById(id) {
    return apiClient.get(`/api/v1/guide/${id}`)
  }
}

export default guideService
