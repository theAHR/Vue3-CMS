import { createRestStore } from './store'
import { contactRequestService } from '@/services/api'

export const useContactRequestStore = createRestStore('contactRequest', contactRequestService, {
  extend: {
    actions: {
      async checked(id) {
        try {
          const res = await contactRequestService.checked(id)
          this.updateData([{ id, isCheck: true }])
          return res
        } catch (error) {
          throw error
        }
      }
    }
  }
})
