export const createRestApi = (resource, { excludes = [] } = {}) => {
  const restApiModel = {
    read(params = {}) {
      return this.$axios.get(`/api/v1/${resource}`, { params })
    },

    readItem(id) {
      return this.$axios.get(`/api/v1/${resource}/${id}`)
    },

    create(payload) {
      return this.$axios.post(`/api/v1/${resource}`, payload)
    },

    update(payload) {
      return this.$axios.put(`/api/v1/${resource}/${payload.id}`, payload)
    },

    delete(id) {
      return this.$axios.delete(`/api/v1/${resource}/${id}`)
    }
  }

  if (Array.isArray(excludes) && excludes.length) {
    excludes.forEach(method => delete restApiModel[method])
  }

  return restApiModel
}

export const createRestService = (axiosInstance, resource, options = {}) => {
  const restApi = createRestApi(resource, options)
  
  return Object.keys(restApi).reduce((acc, key) => {
    acc[key] = restApi[key].bind({ $axios: axiosInstance })
    return acc
  }, {})
}
