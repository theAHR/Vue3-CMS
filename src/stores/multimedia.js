import { defineStore } from 'pinia'
import { ref } from 'vue'
import { multimediaService } from '@/services/api'

export const useMultimediaStore = defineStore('multimedia', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDialog = ref(false)
  const editingMultimedia = ref(null)
  const dialogLoading = ref(false)
  const showDeleteConfirm = ref(false)
  const multimediaToDelete = ref(null)
  const deleteLoading = ref(false)
  const showDetailsDialog = ref(false)
  const selectedMultimedia = ref(null)

  async function searchMultimedia() {
    loading.value = true
    try {
      const params = {
        skip: (currentPage.value - 1) * itemsPerPage.value,
        take: itemsPerPage.value,
        sort: 'des|createDate'
      }
      
      if (searchQuery.value.trim()) {
        params.include = searchQuery.value.trim()
      }
      
      const response = await multimediaService.search(params)
      
      if (response.data.success) {
        data.value = response.data.list || []
        hasMoreItems.value = (response.data.totalCount || 0) > (response.data.list || []).length
      }
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadMoreMultimedia() {
    if (loadingMore.value) return
    
    loadingMore.value = true
    try {
      currentPage.value += 1
      const params = {
        skip: (currentPage.value - 1) * itemsPerPage.value,
        take: itemsPerPage.value,
        sort: 'des|createDate'
      }
      
      if (searchQuery.value.trim()) {
        params.include = searchQuery.value.trim()
      }
      
      const response = await multimediaService.search(params)
      
      if (response.data.success) {
        data.value = [...data.value, ...(response.data.list || [])]
        hasMoreItems.value = data.value.length < response.data.totalCount
      }
      return response
    } catch (error) {
      currentPage.value -= 1
      throw error
    } finally {
      loadingMore.value = false
    }
  }

  async function createMultimedia(formData) {
    dialogLoading.value = true
    try {
      const response = await multimediaService.create(formData)
      if (response.data.success) {
        currentPage.value = 1
        await searchMultimedia()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function updateMultimedia(formData) {
    dialogLoading.value = true
    try {
      const response = await multimediaService.update(formData)
      if (response.data.success) {
        currentPage.value = 1
        await searchMultimedia()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function deleteMultimedia(id) {
    deleteLoading.value = true
    try {
      const response = await multimediaService.delete(id)
      if (response.data.success) {
        currentPage.value = 1
        await searchMultimedia()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      deleteLoading.value = false
    }
  }

  function setSearchQuery(value) {
    searchQuery.value = value
  }

  function setCurrentPage(value) {
    currentPage.value = value
  }

  function openAddDialog() {
    editingMultimedia.value = null
    showDialog.value = true
  }

  function openEditDialog(multimedia) {
    editingMultimedia.value = multimedia
    showDialog.value = true
  }

  function closeDialog() {
    showDialog.value = false
    editingMultimedia.value = null
  }

  function openDeleteConfirm(multimedia) {
    multimediaToDelete.value = multimedia
    showDeleteConfirm.value = true
  }

  function closeDeleteConfirm() {
    showDeleteConfirm.value = false
    multimediaToDelete.value = null
  }

  function openDetailsDialog(multimedia) {
    selectedMultimedia.value = multimedia
    showDetailsDialog.value = true
  }

  function closeDetailsDialog() {
    showDetailsDialog.value = false
    selectedMultimedia.value = null
  }

  return {
    data,
    loading,
    loadingMore,
    hasMoreItems,
    searchQuery,
    currentPage,
    itemsPerPage,
    showDialog,
    editingMultimedia,
    dialogLoading,
    showDeleteConfirm,
    multimediaToDelete,
    deleteLoading,
    showDetailsDialog,
    selectedMultimedia,
    searchMultimedia,
    loadMoreMultimedia,
    createMultimedia,
    updateMultimedia,
    deleteMultimedia,
    setSearchQuery,
    setCurrentPage,
    openAddDialog,
    openEditDialog,
    closeDialog,
    openDeleteConfirm,
    closeDeleteConfirm,
    openDetailsDialog,
    closeDetailsDialog
  }
}) 