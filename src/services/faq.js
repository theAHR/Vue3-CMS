import apiClient from '@/plugins/axios';

export default {
  /**
   * @param {object} params The query parameters for the search.
   * @returns {Promise}
   */
  search(params = {}) {
    const defaultParams = {
      skip: 0,
      take: 5,
      active: true,
      sort: 'des|createDate'
    };
    
    return apiClient.get('/api/v1/faq/search', { 
      params: { ...defaultParams, ...params } 
    });
  },

  /**
   * @param {object} params The query parameters for the search.
   * @returns {Promise}
   */
  searchWithKeyword(keyword, params = {}) {
    const defaultParams = {
      skip: 0,
      take: 20,
      active: true,
      faqAnswer: keyword,
      sort: 'des|createDate'
    };
    
    return apiClient.get('/api/v1/faq/search', { 
      params: { ...defaultParams, ...params } 
    });
  },

  /**
   * @param {object} params The query parameters for the search.
   * @returns {Promise}
   */
  searchByCategory(categoryId, params = {}) {
    const defaultParams = {
      skip: 0,
      take: 20,
      active: true,
      faqTypeId: categoryId,
      sort: 'des|createDate'
    };
    
    return apiClient.get('/api/v1/faq/search', { 
      params: { ...defaultParams, ...params } 
    });
  },

  /**
   * @param {object} params The query parameters for the search.
   * @returns {Promise}
   */
  getCategories(params = {}) {
    const defaultParams = {
      skip: 0,
      take: 20,
      active: true,
      sort: 'des|createDate'
    };
    
    return apiClient.get('/api/v1/faq-types/search', { 
      params: { ...defaultParams, ...params } 
    });
  },
}; 