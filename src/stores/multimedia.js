import { defineStore } from 'pinia';
import multimediaService from '../services/multimedia';
import placeholder from '@/assets/img/blank.jpg';
import { imageBaseURL, videoBaseURL } from '@/config/api';

export const useMultimediaStore = defineStore('multimedia', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchMultimedia() {
      this.loading = true;
      this.error = null;
      try {
        const params = { skip: 0, take: 3, active: true, sort: 'des|createDate' };
        const response = await multimediaService.read(params);
        if (response.data.success && Array.isArray(response.data.list)) {
          this.items = response.data.list.map(item => {
            return {
              id: item.id,
              title: item.description,
              imageUrl: item.thumbnail ? `${imageBaseURL}${item.thumbnail}` : placeholder,
              videoUrl: item.videoName ? `${videoBaseURL}${item.videoName}` : '#',
              createDate: item.createDate
            };
          });
        } else {
          throw new Error(response.data.message || 'API did not return expected data format.');
        }
      } catch (err) {
        this.error = 'خطا در دریافت اطلاعات';
        console.error('API Fetch Error:', err);
      } finally {
        this.loading = false;
      }
    },
  },
}); 