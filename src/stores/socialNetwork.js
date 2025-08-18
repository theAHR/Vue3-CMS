import { createRestStore } from './store'
import { socialNetworkService } from '@/services/api'

export const useSocialNetworkStore = createRestStore('socialNetwork', socialNetworkService)
