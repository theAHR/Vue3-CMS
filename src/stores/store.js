import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const createRestStore = (resource, apiService, options = {}) => {
  const { schema = {}, excludes = [], extend = {} } = options

  const localSchema = {
    read: 'read',
    readItem: 'readItem',
    create: 'create',
    update: 'update',
    delete: 'delete',
    ...schema
  }

  const DEFAULT_PARAMS = () => ({
    skip: 0,
    take: 25,
    ...(extend.DEFAULT_PARAMS ? extend.DEFAULT_PARAMS() : {})
  })

  return defineStore(resource, () => {
    const scopeId = ref(null)
    const dirty = ref(false)
    const loading = ref(false)
    const parallax = ref(false)
    const params = ref(DEFAULT_PARAMS())
    const data = ref([])
    const total = ref(0)
    const item = ref({})

    const getDirty = computed(() => dirty.value)
    const getLoading = computed(() => loading.value)
    const getTotal = computed(() => total.value)
    const getData = computed(() => data.value)
    const getItem = computed(() => item.value)
    const getSkip = computed(() => params.value.skip || 0)

    function setScopeId(id) {
      scopeId.value = id
    }

    function setDirty(value) {
      dirty.value = value
    }

    function setLoading(value) {
      loading.value = value
    }

    function setParallax(value) {
      parallax.value = value
    }

    function setTotal(value) {
      total.value = value
    }

    function setParams(newParams) {
      params.value = { ...params.value, ...newParams }
    }

    function setData(newData) {
      if (!parallax.value || params.value.skip === 0) {
        data.value = newData
      } else {
        data.value = data.value.concat(newData)
      }
    }

    function updateData(updates, key = 'id') {
      updates.forEach(update => {
        const target = data.value.find(item => item[key] === update[key])
        if (target !== undefined) {
          const index = data.value.indexOf(target)
          data.value[index] = { ...data.value[index], ...update }
        } else {
          data.value.push(update)
          total.value += 1
        }
      })
    }

    function removeData(id) {
      const target = data.value.find(item => item.id === id)
      if (target !== undefined) {
        const index = data.value.indexOf(target)
        data.value.splice(index, 1)
        total.value -= 1
      }
    }

    function setItem(newItem) {
      item.value = newItem
    }

    async function read(force = true) {
      if (dirty.value && !force) {
        return data.value
      }

      setLoading(true)
      try {
        const res = await apiService[localSchema.read](params.value, scopeId.value)
        setTotal(res.data.totalCount || 0)
        setLoading(false)
        setDirty(true)
        setData(res.data.list || res.data.object || [])
        return res
      } catch (error) {
        setLoading(false)
        throw error
      }
    }

    async function readItem(id) {
      if (item.value.id === id) {
        return item.value
      }

      try {
        const res = await apiService[localSchema.readItem](id)
        const itemData = res.data.object || res.data
        setItem(itemData)
        return itemData
      } catch (error) {
        throw error
      }
    }

    async function create(payload) {
      setLoading(true)
      try {
        const res = await apiService[localSchema.create](payload)
        await read()
        setLoading(false)
        return res
      } catch (error) {
        setLoading(false)
        throw error
      }
    }

    async function update(payload) {
      setLoading(true)
      try {
        const res = await apiService[localSchema.update](payload)
        await read()
        setLoading(false)
        return res
      } catch (error) {
        setLoading(false)
        throw error
      }
    }

    async function createOrUpdate(payload) {
      const isEdit = !!payload.id
      if (isEdit) {
        return update(payload)
      } else {
        return create(payload)
      }
    }

    async function remove(id) {
      setLoading(true)
      try {
        const res = await apiService[localSchema.delete](id)
        removeData(id)
        setLoading(false)
        return res
      } catch (error) {
        setLoading(false)
        throw error
      }
    }

    function destroy() {
      setScopeId(null)
      setDirty(false)
      setLoading(false)
      setParallax(false)
      setTotal(0)
      setParams(DEFAULT_PARAMS())
      setData([])
      setItem({})

      if (extend.destroy) {
        extend.destroy()
      }
    }

    const store = {
      scopeId,
      dirty,
      loading,
      parallax,
      params,
      data,
      total,
      item,
      getDirty,
      getLoading,
      getTotal,
      getData,
      getItem,
      getSkip,
      setScopeId,
      setDirty,
      setLoading,
      setParallax,
      setTotal,
      setParams,
      setData,
      updateData,
      removeData,
      setItem,
      read,
      readItem,
      create,
      update,
      createOrUpdate,
      remove,
      destroy
    }

    if (excludes.length) {
      excludes.forEach(key => delete store[key])
    }

    if (extend.state) {
      Object.assign(store, extend.state())
    }

    if (extend.actions) {
      Object.assign(store, extend.actions)
    }

    return store
  })
}

export const createBaseStore = (resource, apiService, options = {}) => {
  return createRestStore(resource, apiService, options)
}
