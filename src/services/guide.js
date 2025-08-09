import apiClient from '@/plugins/axios';
import { fileBaseURL } from '@/config/api';

export default {
  /**
   * @param {object} params The query parameters for the search.
   * @returns {Promise}
   */
  read(params) {
    return apiClient.get('/api/v1/guide', { params });
  },

  /**
   * @param {string} fileName The filename to download.
   * @returns {string} The download URL.
   */
  getDownloadUrl(fileName) {
    return `${fileBaseURL}${fileName}`;
  }
}; 