import apiClient from '@/plugins/axios';

export default {
  /**
   * @param {object} params The query parameters for the search.
   * @returns {Promise}
   */
  read(params) {
    return apiClient.get('/api/v1/multi-media', { params });
  },
}; 