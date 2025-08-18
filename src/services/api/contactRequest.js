import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const contactRequestService = {
  ...createRestService(apiClient, 'contact-requests'),

  checked(id) {
    return apiClient.put(`/api/v1/contact-requests/${id}`)
  }
}

export default contactRequestService
