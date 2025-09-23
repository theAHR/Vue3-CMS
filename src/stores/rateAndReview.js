import { defineStore } from 'pinia'
import { ref } from 'vue'
import { rateAndReviewService } from '@/services/api'

export const useRateAndReviewStore = defineStore('rateAndReview', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDetailsDialog = ref(false)
  const selectedReview = ref(null)
  const showAnswerDialog = ref(false)
  const reviewToAnswer = ref(null)
  const answerDialogLoading = ref(false)
  const showConfirmDialog = ref(false)
  const reviewToConfirm = ref(null)
  const confirmLoading = ref(false)

  async function searchReviews() {
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
      
      const response = await rateAndReviewService.search(params)
      
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

  async function loadMoreReviews() {
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
      
      const response = await rateAndReviewService.search(params)
      
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

  async function answerReview(payload) {
    answerDialogLoading.value = true
    try {
      const response = await rateAndReviewService.answer(payload.id, payload)
      if (response.data.success) {
        const updatedItem = data.value.find(item => item.id === payload.id)
        if (updatedItem) {
          updatedItem.answer = payload.answer
        }
      }
      return response
    } catch (error) {
      throw error
    } finally {
      answerDialogLoading.value = false
    }
  }

  async function confirmReview(id) {
    confirmLoading.value = true
    try {
      const response = await rateAndReviewService.confirm(id)
      if (response.data.success) {
        const updatedItem = data.value.find(item => item.id === id)
        if (updatedItem) {
          updatedItem.isAccept = true
        }
      }
      return response
    } catch (error) {
      throw error
    } finally {
      confirmLoading.value = false
    }
  }

  function setSearchQuery(value) {
    searchQuery.value = value
  }

  function setCurrentPage(value) {
    currentPage.value = value
  }

  function openDetailsDialog(review) {
    selectedReview.value = review
    showDetailsDialog.value = true
  }

  function closeDetailsDialog() {
    showDetailsDialog.value = false
    selectedReview.value = null
  }

  function openAnswerDialog(review) {
    reviewToAnswer.value = review
    showAnswerDialog.value = true
  }

  function closeAnswerDialog() {
    showAnswerDialog.value = false
    reviewToAnswer.value = null
  }

  function openConfirmDialog(review) {
    reviewToConfirm.value = review
    showConfirmDialog.value = true
  }

  function closeConfirmDialog() {
    showConfirmDialog.value = false
    reviewToConfirm.value = null
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
    selectedReview,
    showAnswerDialog,
    reviewToAnswer,
    answerDialogLoading,
    showConfirmDialog,
    reviewToConfirm,
    confirmLoading,
    searchReviews,
    loadMoreReviews,
    answerReview,
    confirmReview,
    setSearchQuery,
    setCurrentPage,
    openDetailsDialog,
    closeDetailsDialog,
    openAnswerDialog,
    closeAnswerDialog,
    openConfirmDialog,
    closeConfirmDialog
  }
})
