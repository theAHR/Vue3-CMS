import apiClient from '@/plugins/axios'; // Assuming '@' is an alias for the 'src' directory

export default {
  /**
   * @param {object} params The query parameters for the search.
   * @returns {Promise}
   */
  read(params) {
    return apiClient.get('/api/v1/magazines/search', { params });
  },

  /**
   * @param {string|number} id The ID of the magazine item.
   * @returns {Promise}
   */
  readItem(id) {
    return apiClient.get(`/api/v1/magazines/${id}`);
  }
};