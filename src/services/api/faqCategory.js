import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const faqCategoryService = {
  ...createRestService(apiClient, 'faq-types'),

  search(params = {}) {
    return apiClient.get('/api/v1/faq-types', { params })
  }
}

export default faqCategoryService
