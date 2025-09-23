import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const multimediaService = {
  ...createRestService(apiClient, 'multi-media'),

  search(params = {}) {
    return apiClient.get('/api/v1/multi-media', { params })
  },

  getById(id) {
    return apiClient.get(`/api/v1/multi-media/${id}`)
  }
}

export default multimediaService
