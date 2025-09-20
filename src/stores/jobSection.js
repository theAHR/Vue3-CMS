import { defineStore } from 'pinia'
import { ref } from 'vue'
import { jobSectionService } from '@/services/api'

export const useJobSectionStore = defineStore('jobSection', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDialog = ref(false)
  const editingJobSection = ref(null)
  const dialogLoading = ref(false)
  const showDeleteConfirm = ref(false)
  const jobSectionToDelete = ref(null)
  const deleteLoading = ref(false)

  async function searchJobSections() {
    loading.value = true
    try {
      const params = {
        skip: (currentPage.value - 1) * itemsPerPage.value,
        take: itemsPerPage.value,
        sort: 'des|createDate'
      }
      
      const response = await jobSectionService.search(params)
      
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

  async function loadMoreJobSections() {
    if (loadingMore.value) return
    
    loadingMore.value = true
    try {
      currentPage.value += 1
      const params = {
        skip: (currentPage.value - 1) * itemsPerPage.value,
        take: itemsPerPage.value,
        sort: 'des|createDate'
      }
      
      const response = await jobSectionService.search(params)
      
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

  async function createJobSection(formData) {
    dialogLoading.value = true
    try {
      const payload = {
        jobSectionName: formData.jobSectionName
      }
      const response = await jobSectionService.create(payload)
      if (response.data.success) {
        currentPage.value = 1
        await searchJobSections()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function updateJobSection(formData) {
    dialogLoading.value = true
    try {
      const payload = {
        id: formData.id,
        jobSectionName: formData.jobSectionName
      }
      const response = await jobSectionService.update(payload)
      if (response.data.success) {
        currentPage.value = 1
        await searchJobSections()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function deleteJobSection(id) {
    deleteLoading.value = true
    try {
      const response = await jobSectionService.delete(id)
      if (response.data.success) {
        currentPage.value = 1
        await searchJobSections()
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
    editingJobSection.value = null
    showDialog.value = true
  }

  function openEditDialog(jobSection) {
    editingJobSection.value = jobSection
    showDialog.value = true
  }

  function closeDialog() {
    showDialog.value = false
    editingJobSection.value = null
  }

  function openDeleteConfirm(jobSection) {
    jobSectionToDelete.value = jobSection
    showDeleteConfirm.value = true
  }

  function closeDeleteConfirm() {
    showDeleteConfirm.value = false
    jobSectionToDelete.value = null
  }


  return {
    data,
    loading,
    loadingMore,
    hasMoreItems,
    currentPage,
    itemsPerPage,
    showDialog,
    editingJobSection,
    dialogLoading,
    showDeleteConfirm,
    jobSectionToDelete,
    deleteLoading,
    searchJobSections,
    loadMoreJobSections,
    createJobSection,
    updateJobSection,
    deleteJobSection,
    setCurrentPage,
    openAddDialog,
    openEditDialog,
    closeDialog,
    openDeleteConfirm,
    closeDeleteConfirm
  }
})
