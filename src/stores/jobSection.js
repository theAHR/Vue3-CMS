import { createRestStore } from './store'
import { jobSectionService } from '@/services/api'

export const useJobSectionStore = createRestStore('jobSection', jobSectionService, {
  extend: {
    actions: {
      async search(params = {}) {
        try {
          const res = await jobSectionService.search(params)
          return res
        } catch (error) {
          throw error
        }
      }
    }
  }
})
