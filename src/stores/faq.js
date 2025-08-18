import { createRestStore } from './store'
import { faqService } from '@/services/api'

export const useFaqStore = createRestStore('faq', faqService)
