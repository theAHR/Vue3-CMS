import apiClient from '@/plugins/axios'

export const attachmentService = {
  create(payload, config = {}) {
    return apiClient.post('/api/v1/attachment', payload, config)
  },

  delete(filename) {
    return apiClient.delete(`/api/v1/attachment/${filename}`)
  }
}

export default attachmentService
