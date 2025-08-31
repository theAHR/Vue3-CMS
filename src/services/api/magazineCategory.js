import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const magazineCategoryService = {
  ...createRestService(apiClient, 'categories'),

  search(params = {}) {
    return apiClient.get('/api/v1/categories', { params })
  }
}

export default magazineCategoryService
