import apiClient from '@/plugins/axios'
import { createRestService } from './rest'

export const faqService = {
  ...createRestService(apiClient, 'faq')
}

export default faqService
