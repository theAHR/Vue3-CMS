import { defineStore } from 'pinia'
import { ref } from 'vue'
import { faqService } from '@/services/api'

export const useFaqStore = defineStore('faq', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDialog = ref(false)
  const editingFaq = ref(null)
  const dialogLoading = ref(false)
  const showDeleteConfirm = ref(false)
  const faqToDelete = ref(null)
  const deleteLoading = ref(false)
  const showDetailsDialog = ref(false)
  const selectedFaq = ref(null)

  async function searchFaqs() {
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
      
      const response = await faqService.search(params)
      
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

  async function loadMoreFaqs() {
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
      
      const response = await faqService.search(params)
      
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

  async function createFaq(formData) {
    dialogLoading.value = true
    try {
      const response = await faqService.create(formData)
      if (response.data.success) {
        currentPage.value = 1
        await searchFaqs()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function updateFaq(formData) {
    dialogLoading.value = true
    try {
      const response = await faqService.update(formData)
      if (response.data.success) {
        currentPage.value = 1
        await searchFaqs()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function deleteFaq(id) {
    deleteLoading.value = true
    try {
      const response = await faqService.delete(id)
      if (response.data.success) {
        currentPage.value = 1
        await searchFaqs()
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
    editingFaq.value = null
    showDialog.value = true
  }

  function openEditDialog(faq) {
    editingFaq.value = faq
    showDialog.value = true
  }

  function closeDialog() {
    showDialog.value = false
    editingFaq.value = null
  }

  function openDeleteConfirm(faq) {
    faqToDelete.value = faq
    showDeleteConfirm.value = true
  }

  function closeDeleteConfirm() {
    showDeleteConfirm.value = false
    faqToDelete.value = null
  }

  function openDetailsDialog(faq) {
    selectedFaq.value = faq
    showDetailsDialog.value = true
  }

  function closeDetailsDialog() {
    showDetailsDialog.value = false
    selectedFaq.value = null
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
    editingFaq,
    dialogLoading,
    showDeleteConfirm,
    faqToDelete,
    deleteLoading,
    showDetailsDialog,
    selectedFaq,
    searchFaqs,
    loadMoreFaqs,
    createFaq,
    updateFaq,
    deleteFaq,
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
