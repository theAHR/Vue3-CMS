import { createRestStore } from './store'
import { roleService } from '@/services/api'

export const useRoleStore = createRestStore('role', roleService, {
  extend: {
    actions: {
      async search(params = {}) {
        try {
          const res = await roleService.search(params)
          return res
        } catch (error) {
          throw error
        }
      }
    }
  }
})
