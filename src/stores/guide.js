import { defineStore } from 'pinia'
import { ref } from 'vue'
import { guideService } from '@/services/api'

export const useGuideStore = defineStore('guide', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDialog = ref(false)
  const editingGuide = ref(null)
  const dialogLoading = ref(false)
  const showDeleteConfirm = ref(false)
  const guideToDelete = ref(null)
  const deleteLoading = ref(false)
  const showDetailsDialog = ref(false)
  const selectedGuide = ref(null)

  async function searchGuides() {
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
      
      const response = await guideService.search(params)
      
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

  async function loadMoreGuides() {
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
      
      const response = await guideService.search(params)
      
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

  async function createGuide(formData) {
    dialogLoading.value = true
    try {
      const response = await guideService.create(formData)
      if (response.data.success) {
        currentPage.value = 1
        await searchGuides()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function updateGuide(formData) {
    dialogLoading.value = true
    try {
      const response = await guideService.update(formData)
      if (response.data.success) {
        currentPage.value = 1
        await searchGuides()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function deleteGuide(id) {
    deleteLoading.value = true
    try {
      const response = await guideService.delete(id)
      if (response.data.success) {
        currentPage.value = 1
        await searchGuides()
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
    editingGuide.value = null
    showDialog.value = true
  }

  function openEditDialog(guide) {
    editingGuide.value = guide
    showDialog.value = true
  }

  function closeDialog() {
    showDialog.value = false
    editingGuide.value = null
  }

  function openDeleteConfirm(guide) {
    guideToDelete.value = guide
    showDeleteConfirm.value = true
  }

  function closeDeleteConfirm() {
    showDeleteConfirm.value = false
    guideToDelete.value = null
  }

  function openDetailsDialog(guide) {
    selectedGuide.value = guide
    showDetailsDialog.value = true
  }

  function closeDetailsDialog() {
    showDetailsDialog.value = false
    selectedGuide.value = null
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
    editingGuide,
    dialogLoading,
    showDeleteConfirm,
    guideToDelete,
    deleteLoading,
    showDetailsDialog,
    selectedGuide,
    searchGuides,
    loadMoreGuides,
    createGuide,
    updateGuide,
    deleteGuide,
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
