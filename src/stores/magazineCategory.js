import { createRestStore } from './store'
import { magazineCategoryService } from '@/services/api'

export const useMagazineCategoryStore = createRestStore('magazineCategory', magazineCategoryService, {
  extend: {
    state: () => ({
      loadingMore: false,
      currentPage: 1,
      itemsPerPage: 25,
      hasMoreItems: false,
      searchQuery: '',
      magazineType: null,
      showDialog: false,
      editingCategory: null,
      dialogLoading: false,
      showDeleteConfirm: false,
      categoryToDelete: null,
      deleteLoading: false,
      showDetailsDialog: false,
      selectedCategory: null
    }),
    
    actions: {
      setLoadingMore(value) {
        this.loadingMore = value
      },
      
      setCurrentPage(page) {
        this.currentPage = page
      },
      
      setItemsPerPage(count) {
        this.itemsPerPage = count
      },
      
      setHasMoreItems(value) {
        this.hasMoreItems = value
      },
      
      setSearchQuery(query) {
        this.searchQuery = query
      },
      
      setMagazineType(type) {
        this.magazineType = type
      },
      
      setShowDialog(value) {
        this.showDialog = value
      },
      
      setEditingCategory(category) {
        this.editingCategory = category
      },
      
      setDialogLoading(value) {
        this.dialogLoading = value
      },
      
      setShowDeleteConfirm(value) {
        this.showDeleteConfirm = value
      },
      
      setCategoryToDelete(category) {
        this.categoryToDelete = category
      },
      
      setDeleteLoading(value) {
        this.deleteLoading = value
      },
      
      setShowDetailsDialog(value) {
        this.showDetailsDialog = value
      },
      
      setSelectedCategory(category) {
        this.selectedCategory = category
      },
      
      async searchCategories(params = {}) {
        try {
          const searchParams = {
            skip: (this.currentPage - 1) * this.itemsPerPage,
            take: this.itemsPerPage,
            magazineType: this.magazineType,
            sort: 'des|createDate',
            ...params
          }
          
          if (this.searchQuery.trim()) {
            searchParams.include = this.searchQuery.trim()
          }
          
          const response = await magazineCategoryService.search(searchParams)
          return response
        } catch (error) {
          throw error
        }
      },
      
      async fetchCategories() {
        this.setLoading(true)
        try {
          const response = await this.searchCategories()
          
          if (response.data.success) {
            this.setData(response.data.list || [])
            this.setTotal(response.data.totalCount || 0)
            this.setHasMoreItems((response.data.totalCount || 0) > (response.data.list || []).length)
          }
          
          return response
        } catch (error) {
          throw error
        } finally {
          this.setLoading(false)
        }
      },
      
      async loadMoreCategories() {
        if (this.loadingMore) return
        
        this.setLoadingMore(true)
        try {
          this.setCurrentPage(this.currentPage + 1)
          const response = await this.searchCategories()
          
          if (response.data.success) {
            const newItems = response.data.list || []
            this.setData([...this.data, ...newItems])
            this.setHasMoreItems(this.data.length < response.data.totalCount)
          }
          
          return response
        } catch (error) {
          this.setCurrentPage(this.currentPage - 1)
          throw error
        } finally {
          this.setLoadingMore(false)
        }
      },
      
      async createCategory(formData) {
        this.setDialogLoading(true)
        try {
          const payload = {
            title: formData.title,
            description: formData.description,
            magazineType: this.magazineType
          }
          const response = await magazineCategoryService.create(payload)
          if (response.data.success) {
            this.setCurrentPage(1)
            await this.fetchCategories()
          }
          return response
        } catch (error) {
          throw error
        } finally {
          this.setDialogLoading(false)
        }
      },
      
      async updateCategory(formData) {
        this.setDialogLoading(true)
        try {
          const payload = {
            id: formData.id,
            title: formData.title,
            description: formData.description,
            magazineType: this.magazineType
          }
          const response = await magazineCategoryService.update(payload)
          if (response.data.success) {
            this.setCurrentPage(1)
            await this.fetchCategories()
          }
          return response
        } catch (error) {
          throw error
        } finally {
          this.setDialogLoading(false)
        }
      },
      
      async deleteCategory(id) {
        this.setDeleteLoading(true)
        try {
          const response = await magazineCategoryService.delete(id)
          if (response.data.success) {
            this.setCurrentPage(1)
            await this.fetchCategories()
          }
          return response
        } catch (error) {
          throw error
        } finally {
          this.setDeleteLoading(false)
        }
      },
      
      showAddDialog() {
        this.setEditingCategory(null)
        this.setShowDialog(true)
      },
      
      closeDialog() {
        this.setShowDialog(false)
        this.setEditingCategory(null)
      },
      
      showEditDialog(category) {
        this.setEditingCategory(category)
        this.setShowDialog(true)
      },
      
      showDetailsDialog(category) {
        this.setSelectedCategory(category)
        this.setShowDetailsDialog(true)
      },
      
      showDeleteDialog(category) {
        this.setCategoryToDelete(category)
        this.setShowDeleteConfirm(true)
      },
      
      closeDeleteDialog() {
        this.setShowDeleteConfirm(false)
        this.setCategoryToDelete(null)
      },
      
      closeDetailsDialog() {
        this.setShowDetailsDialog(false)
        this.setSelectedCategory(null)
      },
      
      handleSearch(query) {
        this.setSearchQuery(query)
        this.setCurrentPage(1)
        this.fetchCategories()
      },
      
      resetPagination() {
        this.setCurrentPage(1)
        this.setHasMoreItems(false)
      },
      
      destroy() {
        this.setLoadingMore(false)
        this.setCurrentPage(1)
        this.setItemsPerPage(25)
        this.setHasMoreItems(false)
        this.setSearchQuery('')
        this.setMagazineType(null)
        this.setShowDialog(false)
        this.setEditingCategory(null)
        this.setDialogLoading(false)
        this.setShowDeleteConfirm(false)
        this.setCategoryToDelete(null)
        this.setDeleteLoading(false)
        this.setShowDetailsDialog(false)
        this.setSelectedCategory(null)
        
        if (this.extend && this.extend.destroy) {
          this.extend.destroy()
        }
      }
    }
  }
})
