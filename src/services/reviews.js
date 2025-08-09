import apiClient from '@/plugins/axios';

export default {
  /**
   * @param {object} params The query parameters for the search.
   * @returns {Promise}
   */
  search(params = {}) {
    const defaultParams = {
      skip: 0,
      take: 250,
      isAccept: true,
      sort: 'des|createDate'
    };
    
    return apiClient.get('/api/v1/review/search', { 
      params: { ...defaultParams, ...params } 
    });
  },
}; 