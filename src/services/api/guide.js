import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const guideService = {
  ...createRestService(apiClient, 'guide')
}

export default guideService
