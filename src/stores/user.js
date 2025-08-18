import { createRestStore } from './store'
import { userService } from '@/services/api'

export const useUserStore = createRestStore('user', userService, {
  extend: {
    actions: {
      async updatePassword(payload) {
        try {
          const res = await userService.updatePassword(payload)
          return res
        } catch (error) {
          throw error
        }
      }
    }
  }
})
