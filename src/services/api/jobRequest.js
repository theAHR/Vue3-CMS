import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const jobRequestService = {
  ...createRestService(apiClient, 'job-requests'),

  updateState(params = {}) {
    return apiClient.put('/api/v1/job-requests/update-state', null, { params })
  }
}

export default jobRequestService
