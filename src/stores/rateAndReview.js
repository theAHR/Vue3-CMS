import { createRestStore } from './store'
import { rateAndReviewService } from '@/services/api'

export const useRateAndReviewStore = createRestStore('rateAndReview', rateAndReviewService, {
  extend: {
    actions: {
      async confirm(id) {
        try {
          const res = await rateAndReviewService.confirm(id)
          this.updateData([{ id, isAccept: true }])
          return res
        } catch (error) {
          throw error
        }
      },

      async answer(payload) {
        try {
          const res = await rateAndReviewService.answer(payload.id, payload)
          this.updateData([payload])
          return res
        } catch (error) {
          throw error
        }
      }
    }
  }
})
