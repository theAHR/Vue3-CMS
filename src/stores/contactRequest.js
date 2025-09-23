import { defineStore } from 'pinia'
import { ref } from 'vue'
import { contactRequestService } from '@/services/api'

export const useContactRequestStore = defineStore('contactRequest', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDetailsDialog = ref(false)
  const selectedContactRequest = ref(null)
  const showCheckConfirm = ref(false)
  const contactRequestToCheck = ref(null)
  const checkLoading = ref(false)

  async function searchContactRequests() {
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
      
      const response = await contactRequestService.search(params)
      
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

  async function loadMoreContactRequests() {
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
      
      const response = await contactRequestService.search(params)
      
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

  async function checkContactRequest(id) {
    checkLoading.value = true
    try {
      const response = await contactRequestService.checked(id)
      if (response.data.success) {
        const updatedItem = data.value.find(item => item.id === id)
        if (updatedItem) {
          updatedItem.isCheck = true
        }
      }
      return response
    } catch (error) {
      throw error
    } finally {
      checkLoading.value = false
    }
  }

  function setSearchQuery(value) {
    searchQuery.value = value
  }

  function setCurrentPage(value) {
    currentPage.value = value
  }

  function openDetailsDialog(contactRequest) {
    selectedContactRequest.value = contactRequest
    showDetailsDialog.value = true
  }

  function closeDetailsDialog() {
    showDetailsDialog.value = false
    selectedContactRequest.value = null
  }

  function openCheckConfirm(contactRequest) {
    contactRequestToCheck.value = contactRequest
    showCheckConfirm.value = true
  }

  function closeCheckConfirm() {
    showCheckConfirm.value = false
    contactRequestToCheck.value = null
  }

  return {
    data,
    loading,
    loadingMore,
    hasMoreItems,
    searchQuery,
    currentPage,
    itemsPerPage,
    showDetailsDialog,
    selectedContactRequest,
    showCheckConfirm,
    contactRequestToCheck,
    checkLoading,
    searchContactRequests,
    loadMoreContactRequests,
    checkContactRequest,
    setSearchQuery,
    setCurrentPage,
    openDetailsDialog,
    closeDetailsDialog,
    openCheckConfirm,
    closeCheckConfirm
  }
})
