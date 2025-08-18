import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const rateAndReviewService = {
  ...createRestService(apiClient, 'review'),

  answer(id, payload) {
    return apiClient.put(`/api/v1/review/${id}/answer`, payload)
  },

  confirm(id) {
    return apiClient.patch(`/api/v1/review/${id}/confirmation`)
  }
}

export default rateAndReviewService
