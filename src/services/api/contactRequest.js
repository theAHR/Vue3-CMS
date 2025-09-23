import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const contactRequestService = {
  ...createRestService(apiClient, 'contact-requests'),

  search(params = {}) {
    return apiClient.get('/api/v1/contact-requests', { params })
  },

  getById(id) {
    return apiClient.get(`/api/v1/contact-requests/${id}`)
  },

  checked(id) {
    return apiClient.put(`/api/v1/contact-requests/${id}`)
  }
}

export default contactRequestService
