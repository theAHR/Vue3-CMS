import { createRestStore } from './store'
import { guideService } from '@/services/api'

export const useGuideStore = createRestStore('guide', guideService)
