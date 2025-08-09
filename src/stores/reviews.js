import { defineStore } from "pinia";
import axios from "axios";
import { baseURL } from '@/config/api';

export const useReviewsStore = defineStore("reviews", {
  state: () => ({
    reviews: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchReviews() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(
          `${baseURL}/api/v1/review/search?skip=0&take=12&isAccept=true&sort=des%7CcreateDate`
        );
        this.reviews = response.data.list;
      } catch (error) {
        this.error = "خطا در دریافت اطلاعات";
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
}); 