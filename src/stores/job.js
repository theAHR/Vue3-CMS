import { createRestStore } from './store'
import { jobService } from '@/services/api'

export const useJobStore = createRestStore('job', jobService, {
  extend: {
    actions: {
      async search(params = {}) {
        try {
          const res = await jobService.search(params)
          return res
        } catch (error) {
          throw error
        }
      }
    }
  }
})
