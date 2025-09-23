import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const rateAndReviewService = {
  ...createRestService(apiClient, 'review'),

  search(params = {}) {
    return apiClient.get('/api/v1/review', { params })
  },

  getById(id) {
    return apiClient.get(`/api/v1/review/${id}`)
  },

  answer(id, payload) {
    return apiClient.put(`/api/v1/review/${id}/answer`, payload)
  },

  confirm(id) {
    return apiClient.patch(`/api/v1/review/${id}/confirmation`)
  }
}

export default rateAndReviewService
