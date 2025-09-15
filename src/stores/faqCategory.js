import { defineStore } from 'pinia'
import { ref } from 'vue'
import { faqCategoryService } from '@/services/api'

export const useFaqCategoryStore = defineStore('faqCategory', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDialog = ref(false)
  const editingCategory = ref(null)
  const dialogLoading = ref(false)
  const showDeleteConfirm = ref(false)
  const categoryToDelete = ref(null)
  const deleteLoading = ref(false)
  const showDetailsDialog = ref(false)
  const selectedCategory = ref(null)

  async function searchCategories() {
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
      
      const response = await faqCategoryService.search(params)
      
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

  async function loadMoreCategories() {
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
      
      const response = await faqCategoryService.search(params)
      
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

  async function createCategory(formData) {
    dialogLoading.value = true
    try {
      const payload = {
        displayName: formData.displayName
      }
      const response = await faqCategoryService.create(payload)
      if (response.data.success) {
        currentPage.value = 1
        await searchCategories()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function updateCategory(formData) {
    dialogLoading.value = true
    try {
      const payload = {
        id: formData.id,
        displayName: formData.displayName
      }
      const response = await faqCategoryService.update(payload)
      if (response.data.success) {
        currentPage.value = 1
        await searchCategories()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function deleteCategory(id) {
    deleteLoading.value = true
    try {
      const response = await faqCategoryService.delete(id)
      if (response.data.success) {
        currentPage.value = 1
        await searchCategories()
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
    editingCategory.value = null
    showDialog.value = true
  }

  function openEditDialog(category) {
    editingCategory.value = category
    showDialog.value = true
  }

  function closeDialog() {
    showDialog.value = false
    editingCategory.value = null
  }

  function openDeleteConfirm(category) {
    categoryToDelete.value = category
    showDeleteConfirm.value = true
  }

  function closeDeleteConfirm() {
    showDeleteConfirm.value = false
    categoryToDelete.value = null
  }

  function openDetailsDialog(category) {
    selectedCategory.value = category
    showDetailsDialog.value = true
  }

  function closeDetailsDialog() {
    showDetailsDialog.value = false
    selectedCategory.value = null
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
    editingCategory,
    dialogLoading,
    showDeleteConfirm,
    categoryToDelete,
    deleteLoading,
    showDetailsDialog,
    selectedCategory,
    searchCategories,
    loadMoreCategories,
    createCategory,
    updateCategory,
    deleteCategory,
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
