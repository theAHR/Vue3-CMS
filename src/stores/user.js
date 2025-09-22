import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userService } from '@/services/api'

export const useUserStore = defineStore('user', () => {
  const data = ref([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMoreItems = ref(false)
  const searchQuery = ref('')
  const currentPage = ref(1)
  const itemsPerPage = ref(25)
  const showDialog = ref(false)
  const editingUser = ref(null)
  const dialogLoading = ref(false)
  const showDeleteConfirm = ref(false)
  const userToDelete = ref(null)
  const deleteLoading = ref(false)
  const showDetailsDialog = ref(false)
  const selectedUser = ref(null)
  const showChangePasswordDialog = ref(false)
  const userToChangePassword = ref(null)
  const changePasswordLoading = ref(false)

  async function searchUsers() {
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
      
      const response = await userService.search(params)
      
      if (response.data.success) {
        // Handle both list and object response structures
        if (response.data.list && response.data.list.length > 0) {
          data.value = response.data.list
        } else if (response.data.object) {
          // If response has object (array or single object), handle it
          if (Array.isArray(response.data.object)) {
            data.value = response.data.object
          } else {
            data.value = [response.data.object]
          }
        } else {
          data.value = []
        }
        hasMoreItems.value = (response.data.totalCount || 0) > data.value.length
        
      }
      return response
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  async function loadMoreUsers() {
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
      
      const response = await userService.search(params)
      
      if (response.data.success) {
        // Handle both list and object response structures
        let newData = []
        if (response.data.list && response.data.list.length > 0) {
          newData = response.data.list
        } else if (response.data.object) {
          if (Array.isArray(response.data.object)) {
            newData = response.data.object
          } else {
            newData = [response.data.object]
          }
        }
        data.value = [...data.value, ...newData]
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

  async function createUser(formData) {
    dialogLoading.value = true
    try {
      const response = await userService.create(formData)
      if (response.data.success) {
        currentPage.value = 1
        await searchUsers()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function updateUser(formData) {
    dialogLoading.value = true
    try {
      const response = await userService.update(formData)
      if (response.data.success) {
        currentPage.value = 1
        await searchUsers()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      dialogLoading.value = false
    }
  }

  async function deleteUser(id) {
    deleteLoading.value = true
    try {
      const response = await userService.delete(id)
      if (response.data.success) {
        currentPage.value = 1
        await searchUsers()
      }
      return response
    } catch (error) {
      throw error
    } finally {
      deleteLoading.value = false
    }
  }

  async function updatePassword(payload) {
    try {
      const res = await userService.updatePassword(payload)
      return res
    } catch (error) {
      throw error
    }
  }

  function setSearchQuery(value) {
    searchQuery.value = value
  }

  function setCurrentPage(value) {
    currentPage.value = value
  }

  function openAddDialog() {
    editingUser.value = null
    showDialog.value = true
  }

  function openEditDialog(user) {
    editingUser.value = user
    showDialog.value = true
  }

  function closeDialog() {
    showDialog.value = false
    editingUser.value = null
  }

  function openDeleteConfirm(user) {
    userToDelete.value = user
    showDeleteConfirm.value = true
  }

  function closeDeleteConfirm() {
    showDeleteConfirm.value = false
    userToDelete.value = null
  }

  function openDetailsDialog(user) {
    selectedUser.value = user
    showDetailsDialog.value = true
  }

  function closeDetailsDialog() {
    showDetailsDialog.value = false
    selectedUser.value = null
  }

  function openChangePasswordDialog(user) {
    userToChangePassword.value = user
    showChangePasswordDialog.value = true
  }

  function closeChangePasswordDialog() {
    showChangePasswordDialog.value = false
    userToChangePassword.value = null
  }

  async function changePassword(formData) {
    changePasswordLoading.value = true
    try {
      const response = await userService.updatePassword(formData)
      return response
    } catch (error) {
      throw error
    } finally {
      changePasswordLoading.value = false
    }
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
    editingUser,
    dialogLoading,
    showDeleteConfirm,
    userToDelete,
    deleteLoading,
    showDetailsDialog,
    selectedUser,
    showChangePasswordDialog,
    userToChangePassword,
    changePasswordLoading,
    searchUsers,
    loadMoreUsers,
    createUser,
    updateUser,
    deleteUser,
    updatePassword,
    changePassword,
    setSearchQuery,
    setCurrentPage,
    openAddDialog,
    openEditDialog,
    closeDialog,
    openDeleteConfirm,
    closeDeleteConfirm,
    openDetailsDialog,
    closeDetailsDialog,
    openChangePasswordDialog,
    closeChangePasswordDialog
  }
})
