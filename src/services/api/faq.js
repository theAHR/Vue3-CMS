import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const faqService = {
  ...createRestService(apiClient, 'faq'),

  search(params = {}) {
    return apiClient.get('/api/v1/faq', { params })
  },

  getById(id) {
    return apiClient.get(`/api/v1/faq/${id}`)
  }
}

export default faqService
