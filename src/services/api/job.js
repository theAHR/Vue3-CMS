import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const jobService = {
  ...createRestService(apiClient, 'jobs'),

  search(params = {}) {
    return apiClient.get('/api/v1/jobs', { params })
  }
}

export default jobService
