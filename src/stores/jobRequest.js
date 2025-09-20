import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jobRequestService } from '@/services/api'

export const useJobRequestStore = defineStore('jobRequest', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDetailsDialog = ref(false)
  const selectedJobRequest = ref(null)
  const showStateDialog = ref(false)
  const stateDialogLoading = ref(false)

  async function searchJobRequests(params = {}) {
    loading.value = true
    try {
      const searchParams = {
        skip: (currentPage.value - 1) * itemsPerPage.value,
        take: itemsPerPage.value,
        sort: 'des|createDate',
        ...params
      }
      
      const response = await jobRequestService.search(searchParams)
      
      if (response.data.success) {
        data.value = response.data.list || []
        hasMoreItems.value = response.data.list?.length === itemsPerPage.value
      }
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadMoreJobRequests() {
    loadingMore.value = true
    try {
      const response = await jobRequestService.search({
        skip: data.value.length,
        take: itemsPerPage.value,
        sort: 'des|createDate'
      })
      
      if (response.data.success) {
        data.value = [...data.value, ...(response.data.list || [])]
        hasMoreItems.value = response.data.list?.length === itemsPerPage.value
      }
      return response
    } catch (error) {
      throw error
    } finally {
      loadingMore.value = false
    }
  }

  async function updateJobRequestState(formData) {
    stateDialogLoading.value = true
    try {
      const response = await jobRequestService.updateState(formData)
      
      const updatedItem = data.value.find(item => item.id === formData.id)
      if (updatedItem) {
        updatedItem.state = formData.state
      }
      
      return response
    } catch (error) {
      throw error
    } finally {
      stateDialogLoading.value = false
    }
  }

  function openDetailsDialog(jobRequest) {
    selectedJobRequest.value = jobRequest
    showDetailsDialog.value = true
  }

  function closeDetailsDialog() {
    showDetailsDialog.value = false
    selectedJobRequest.value = null
  }

  function openStateDialog(jobRequest) {
    selectedJobRequest.value = jobRequest
    showStateDialog.value = true
  }

  function closeStateDialog() {
    showStateDialog.value = false
    selectedJobRequest.value = null
  }

  return {
    data,
    loading,
    loadingMore,
    hasMoreItems,
    currentPage,
    itemsPerPage,
    showDetailsDialog,
    selectedJobRequest,
    showStateDialog,
    stateDialogLoading,
    searchJobRequests,
    loadMoreJobRequests,
    updateJobRequestState,
    openDetailsDialog,
    closeDetailsDialog,
    openStateDialog,
    closeStateDialog
  }
})
