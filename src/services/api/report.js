import apiClient from '@/plugins/axios'

export const reportService = {
  getContentReport() {
    return apiClient.get('/api/v1/report/content')
  }
}

export default reportService
