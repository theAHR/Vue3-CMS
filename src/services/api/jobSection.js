import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const jobSectionService = {
  ...createRestService(apiClient, 'job-sections'),

  search(params = {}) {
    return apiClient.get('/api/v1/job-sections/search', { params })
  }
}

export default jobSectionService
