import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const multimediaService = {
  ...createRestService(apiClient, 'multi-media')
}

export default multimediaService
