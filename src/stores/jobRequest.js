import { createRestStore } from './store'
import { jobRequestService } from '@/services/api'

export const useJobRequestStore = createRestStore('jobRequest', jobRequestService, {
  extend: {
    actions: {
      async updateState(params = {}) {
        try {
          const res = await jobRequestService.updateState(params)
          this.updateData([params])
          return res
        } catch (error) {
          throw error
        }
      }
    }
  }
})
