import { createRestStore } from './store'
import { magazineCategoryService } from '@/services/api'

export const useMagazineCategoryStore = createRestStore('magazineCategory', magazineCategoryService, {
  extend: {
    actions: {
      async search(params = {}) {
      }
    }
  }
})