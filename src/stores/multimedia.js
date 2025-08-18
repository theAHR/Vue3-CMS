import { createRestStore } from './store'
import { multimediaService } from '@/services/api'

export const useMultimediaStore = createRestStore('multimedia', multimediaService) 