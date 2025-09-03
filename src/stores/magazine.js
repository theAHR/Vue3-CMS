import { createRestStore } from './store'
import { magazineService } from '@/services/api'

export const useMagazineStore = createRestStore('magazine', magazineService, {
  extend: {
    state: () => ({
      loadingMore: false,
      currentPage: 1,
      itemsPerPage: 25,
      hasMoreItems: false,
      searchQuery: '',
      magazineType: null,
      showDialog: false,
      editingMagazine: null,
      dialogLoading: false,
      showDeleteConfirm: false,
      magazineToDelete: null,
      deleteLoading: false,
      showDetailsDialog: false,
      selectedMagazine: null
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
      
      setEditingMagazine(magazine) {
        this.editingMagazine = magazine
      },
      
      setDialogLoading(value) {
        this.dialogLoading = value
      },
      
      setShowDeleteConfirm(value) {
        this.showDeleteConfirm = value
      },
      
      setMagazineToDelete(magazine) {
        this.magazineToDelete = magazine
      },
      
      setDeleteLoading(value) {
        this.deleteLoading = value
      },
      
      setShowDetailsDialog(value) {
        this.showDetailsDialog = value
      },
      
      setSelectedMagazine(magazine) {
        this.selectedMagazine = magazine
      },
      
      async searchMagazines(params = {}) {
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
          
          const response = await magazineService.search(searchParams)
          return response
        } catch (error) {
          throw error
        }
      },
      
      async fetchMagazines() {
        this.setLoading(true)
        try {
          const response = await this.searchMagazines()
          
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
      
      async loadMoreMagazines() {
        if (this.loadingMore) return
        
        this.setLoadingMore(true)
        try {
          this.setCurrentPage(this.currentPage + 1)
          const response = await this.searchMagazines()
          
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
      
      async createMagazine(formData) {
        this.setDialogLoading(true)
        try {
          const response = await magazineService.create(formData)
          if (response.data.success) {
            this.setCurrentPage(1)
            await this.fetchMagazines()
          }
          return response
        } catch (error) {
          throw error
        } finally {
          this.setDialogLoading(false)
        }
      },
      
      async updateMagazine(formData) {
        this.setDialogLoading(true)
        try {
          const response = await magazineService.update(formData)
          if (response.data.success) {
            this.setCurrentPage(1)
            await this.fetchMagazines()
          }
          return response
        } catch (error) {
          throw error
        } finally {
          this.setDialogLoading(false)
        }
      },
      
      async deleteMagazine(id) {
        this.setDeleteLoading(true)
        try {
          const response = await magazineService.delete(id)
          if (response.data.success) {
            this.setCurrentPage(1)
            await this.fetchMagazines()
          }
          return response
        } catch (error) {
          throw error
        } finally {
          this.setDeleteLoading(false)
        }
      },
      
      showAddDialog() {
        this.setEditingMagazine(null)
        this.setShowDialog(true)
      },
      
      closeDialog() {
        this.setShowDialog(false)
        this.setEditingMagazine(null)
      },
      
      showEditDialog(magazine) {
        this.setEditingMagazine(magazine)
        this.setShowDialog(true)
      },
      
      showDetailsDialog(magazine) {
        this.setSelectedMagazine(magazine)
        this.setShowDetailsDialog(true)
      },
      
      showDeleteDialog(magazine) {
        this.setMagazineToDelete(magazine)
        this.setShowDeleteConfirm(true)
      },
      
      closeDeleteDialog() {
        this.setShowDeleteConfirm(false)
        this.setMagazineToDelete(null)
      },
      
      closeDetailsDialog() {
        this.setShowDetailsDialog(false)
        this.setSelectedMagazine(null)
      },
      
      handleSearch(query) {
        this.setSearchQuery(query)
        this.setCurrentPage(1)
        this.fetchMagazines()
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
        this.setEditingMagazine(null)
        this.setDialogLoading(false)
        this.setShowDeleteConfirm(false)
        this.setMagazineToDelete(null)
        this.setDeleteLoading(false)
        this.setShowDetailsDialog(false)
        this.setSelectedMagazine(null)
        
        if (this.extend && this.extend.destroy) {
          this.extend.destroy()
        }
      }
    }
  }
})
