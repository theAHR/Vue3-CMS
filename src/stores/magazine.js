import { createRestStore } from './store'
import { magazineService } from '@/services/api'

export const useMagazineStore = createRestStore('magazine', magazineService)
