import { defineStore } from 'pinia';
import { ref } from 'vue';
import magazineService from '@/services/magazine';

export const useNewsStore = defineStore('news', () => {
  const items = ref([]);
  const loading = ref(false);

  async function fetchNews() {
    if (loading.value || items.value.length > 0) return;

    loading.value = true;
    try {
      const params = {
        active: true,
        type: 1, 
        take: 3,   
      };
      const response = await magazineService.read(params);
      items.value = response.data.data || response.data || [];
    } catch (error) {
      console.error('Failed to fetch news:', error);
      items.value = [];
    } finally {
      loading.value = false;
    }
  }

  return { items, loading, fetchNews };
});