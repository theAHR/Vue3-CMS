import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jobService } from '@/services/api'

export const useJobStore = defineStore('job', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDialog = ref(false)
  const editingJob = ref(null)
  const dialogLoading = ref(false)
  const showDeleteConfirm = ref(false)
  const jobToDelete = ref(null)
  const deleteLoading = ref(false)
  const showDetailsDialog = ref(false)
  const selectedJob = ref(null)

  async function searchJobs() {
    loading.value = true
    try {
      const params = {
        skip: (currentPage.value - 1) * itemsPerPage.value,
        take: itemsPerPage.value,
        sort: 'des|createDate'
      }
      
      const response = await jobService.search(params)
      
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

  async function loadMoreJobs() {
    if (loadingMore.value) return
    
    loadingMore.value = true
    try {
      currentPage.value += 1
      const params = {
        skip: (currentPage.value - 1) * itemsPerPage.value,
        take: itemsPerPage.value,
        sort: 'des|createDate'
      }
      
      const response = await jobService.search(params)
      
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

  async function createJob(formData) {
    dialogLoading.value = true
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        requirement: formData.requirement,
        jobSectionId: formData.jobSectionId,
        active: formData.active
      }
      const response = await jobService.create(payload)
      if (response.data.success) {
        currentPage.value = 1
        await searchJobs()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function updateJob(formData) {
    dialogLoading.value = true
    try {
      const payload = {
        id: formData.id,
        title: formData.title,
        description: formData.description,
        requirement: formData.requirement,
        jobSectionId: formData.jobSectionId,
        active: formData.active
      }
      const response = await jobService.update(payload)
      if (response.data.success) {
        currentPage.value = 1
        await searchJobs()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function deleteJob(id) {
    deleteLoading.value = true
    try {
      const response = await jobService.delete(id)
      if (response.data.success) {
        currentPage.value = 1
        await searchJobs()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      deleteLoading.value = false
    }
  }

  function setCurrentPage(value) {
    currentPage.value = value
  }

  function openAddDialog() {
    editingJob.value = null
    showDialog.value = true
  }

  function openEditDialog(job) {
    editingJob.value = job
    showDialog.value = true
  }

  function closeDialog() {
    showDialog.value = false
    editingJob.value = null
  }

  function openDeleteConfirm(job) {
    jobToDelete.value = job
    showDeleteConfirm.value = true
  }

  function closeDeleteConfirm() {
    showDeleteConfirm.value = false
    jobToDelete.value = null
  }

  function openDetailsDialog(job) {
    selectedJob.value = job
    showDetailsDialog.value = true
  }

  function closeDetailsDialog() {
    showDetailsDialog.value = false
    selectedJob.value = null
  }

  return {
    data,
    loading,
    loadingMore,
    hasMoreItems,
    currentPage,
    itemsPerPage,
    showDialog,
    editingJob,
    dialogLoading,
    showDeleteConfirm,
    jobToDelete,
    deleteLoading,
    showDetailsDialog,
    selectedJob,
    searchJobs,
    loadMoreJobs,
    createJob,
    updateJob,
    deleteJob,
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
