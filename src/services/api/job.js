import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const jobService = {
  ...createRestService(apiClient, 'jobs'),

  search(params = {}) {
    return apiClient.get('/api/v1/jobs/search', { params })
  }
}

export default jobService
