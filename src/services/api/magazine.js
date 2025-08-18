import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const magazineService = {
  ...createRestService(apiClient, 'magazines')
}

export default magazineService
