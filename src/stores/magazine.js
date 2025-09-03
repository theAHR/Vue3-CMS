import { defineStore } from 'pinia'
import { ref } from 'vue'
import { magazineService } from '@/services/api'

export const useMagazineStore = defineStore('magazine', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDialog = ref(false)
  const editingMagazine = ref(null)
  const dialogLoading = ref(false)
  const showDeleteConfirm = ref(false)
  const magazineToDelete = ref(null)
  const deleteLoading = ref(false)
  const showDetailsDialog = ref(false)
  const selectedMagazine = ref(null)

  async function searchMagazines(magazineType) {
    loading.value = true
    try {
      const params = {
        skip: (currentPage.value - 1) * itemsPerPage.value,
        take: itemsPerPage.value,
        magazineType,
        sort: 'des|createDate'
      }
      
      if (searchQuery.value.trim()) {
        params.include = searchQuery.value.trim()
      }
      
      const response = await magazineService.search(params)
      
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

  async function loadMoreMagazines(magazineType) {
    if (loadingMore.value) return
    
    loadingMore.value = true
    try {
      currentPage.value += 1
      const params = {
        skip: (currentPage.value - 1) * itemsPerPage.value,
        take: itemsPerPage.value,
        magazineType,
        sort: 'des|createDate'
      }
      
      if (searchQuery.value.trim()) {
        params.include = searchQuery.value.trim()
      }
      
      const response = await magazineService.search(params)
      
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

  async function createMagazine(formData) {
    dialogLoading.value = true
    try {
      const response = await magazineService.create(formData)
      if (response.data.success) {
        currentPage.value = 1
        await searchMagazines(formData.magazineType)
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function updateMagazine(formData) {
    dialogLoading.value = true
    try {
      const response = await magazineService.update(formData)
      if (response.data.success) {
        currentPage.value = 1
        await searchMagazines(formData.magazineType)
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function deleteMagazine(id, magazineType) {
    deleteLoading.value = true
    try {
      const response = await magazineService.delete(id)
      if (response.data.success) {
        currentPage.value = 1
        await searchMagazines(magazineType)
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
    editingMagazine.value = null
    showDialog.value = true
  }

  function openEditDialog(magazine) {
    editingMagazine.value = magazine
    showDialog.value = true
  }

  function closeDialog() {
    showDialog.value = false
    editingMagazine.value = null
  }

  function openDeleteConfirm(magazine) {
    magazineToDelete.value = magazine
    showDeleteConfirm.value = true
  }

  function closeDeleteConfirm() {
    showDeleteConfirm.value = false
    magazineToDelete.value = null
  }

  function openDetailsDialog(magazine) {
    selectedMagazine.value = magazine
    showDetailsDialog.value = true
  }

  function closeDetailsDialog() {
    showDetailsDialog.value = false
    selectedMagazine.value = null
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
    editingMagazine,
    dialogLoading,
    showDeleteConfirm,
    magazineToDelete,
    deleteLoading,
    showDetailsDialog,
    selectedMagazine,
    searchMagazines,
    loadMoreMagazines,
    createMagazine,
    updateMagazine,
    deleteMagazine,
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