import { createRestStore } from './store'
import { faqCategoryService } from '@/services/api'

export const useFaqCategoryStore = createRestStore('faqCategory', faqCategoryService, {
  extend: {
    actions: {
      async search(params = {}) {
        try {
          const res = await faqCategoryService.search(params)
          return res
        } catch (error) {
          throw error
        }
      }
    }
  }
})
