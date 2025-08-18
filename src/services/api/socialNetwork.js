import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const socialNetworkService = {
  ...createRestService(apiClient, 'social-networks')
}

export default socialNetworkService
