<template>
  <div>
    <Title :title="title" />

    <VDataTable
      :columns="tableColumns"
      :items="categories"
      :loading="loading"
      :loading-more="loadingMore"
      :has-more-items="hasMoreItems"
      :show-load-more="true"
      :actions="tableActions"
      :show-add-button="false"
      @edit="handleEdit"
      @details="handleDetails"
      @delete="handleDelete"
      @load-more="handleLoadMore"
      @search="handleSearch"
      @search-input="handleSearchInput"
    >
      <template #actions>
        <Button 
          text="افزودن دسته‌بندی"
          variant="success"
          iconSrc="/src/assets/img/icons/add.svg"
          @click="showAddDialog"
        />
      </template>
    </VDataTable>

    <CategoryDialog
      :show="showDialog"
      :category="editingCategory"
      :loading="dialogLoading"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="حذف دسته‌بندی"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />

    <!-- Details Dialog -->
    <DetailsDialog
      :show="showDetailsDialog"
      :category="selectedCategory"
      @close="showDetailsDialog = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import CategoryDialog from '@/components/common/CategoryDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import DetailsDialog from '@/components/common/DetailsDialog.vue';
import Button from '@/components/common/Button.vue';
import { magazineCategoryService } from '@/services/api/magazineCategory';
import { useSnackbar } from '@/utils/snackbar';

const props = defineProps({
  title: { type: String, required: true },
  magazineType: { type: Number, required: true }
});

const { success, error } = useSnackbar();


// Computed properties
const deleteConfirmMessage = computed(() => {
  if (!categoryToDelete.value) return 'آیا از حذف این دسته‌بندی اطمینان دارید؟';
  return `آیا از حذف دسته‌بندی "${categoryToDelete.value.title}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'title', label: 'عنوان', class: 'text-right' },
  { key: 'createDate', label: 'تاریخ ایجاد', class: 'text-center' },
  { key: 'actions', label: 'عملیات', class: 'text-center' }
];

const tableActions = [
  { key: 'edit', label: 'ویرایش', icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
  { key: 'details', label: 'جزئیات', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { key: 'delete', label: 'حذف', icon: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' }
];

// Data state
const categories = ref([]);
const loading = ref(false);
const loadingMore = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(25);
const totalCount = ref(0);
const hasMoreItems = ref(false);
const searchQuery = ref('');

// Dialog state
const showDialog = ref(false);
const editingCategory = ref(null);
const dialogLoading = ref(false);

// Delete confirmation state
const showDeleteConfirm = ref(false);
const categoryToDelete = ref(null);
const deleteLoading = ref(false);

// Details dialog state
const showDetailsDialog = ref(false);
const selectedCategory = ref(null);

// Methods
const fetchCategories = async () => {
  loading.value = true;
  try {
    const params = {
      skip: (currentPage.value - 1) * itemsPerPage.value,
      take: itemsPerPage.value,
      magazineType: props.magazineType,
      sort: 'des|createDate'
    };
    
    if (searchQuery.value.trim()) {
      params.include = searchQuery.value.trim();
    }
    
    const response = await magazineCategoryService.search(params);
    
    if (response.data.success) {
      categories.value = response.data.list || [];
      totalCount.value = response.data.totalCount || 0;
      hasMoreItems.value = (response.data.totalCount || 0) > (response.data.list || []).length;
    } else {
      console.error('Failed to fetch categories:', response.data.message);
      error('خطا در دریافت دسته‌بندی‌ها');
    }
  } catch (err) {
    console.error('Error fetching categories:', err);
    error('خطا در دریافت دسته‌بندی‌ها');
  } finally {
    loading.value = false;
  }
};

const handleLoadMore = async () => {
  if (loadingMore.value) return;
  
  loadingMore.value = true;
  try {
    currentPage.value += 1;
    const params = {
      skip: (currentPage.value - 1) * itemsPerPage.value,
      take: itemsPerPage.value,
      magazineType: props.magazineType,
      sort: 'des|createDate'
    };
    
    if (searchQuery.value.trim()) {
      params.include = searchQuery.value.trim();
    }
    
    const response = await magazineCategoryService.search(params);
    
    if (response.data.success) {
      // Append new items to existing list
      categories.value = [...categories.value, ...(response.data.list || [])];
      // Check if there are more items to load
      hasMoreItems.value = categories.value.length < response.data.totalCount;
    } else {
      console.error('Failed to load more categories:', response.data.message);
      error('خطا در دریافت دسته‌بندی‌های بیشتر');
      // Revert page number on error
      currentPage.value -= 1;
    }
  } catch (err) {
    console.error('Error loading more categories:', err);
    error('خطا در دریافت دسته‌بندی‌های بیشتر');
    // Revert page number on error
    currentPage.value -= 1;
  } finally {
    loadingMore.value = false;
  }
};

const showAddDialog = () => {
  editingCategory.value = null;
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  editingCategory.value = null;
};

const handleEdit = (category) => {
  editingCategory.value = category;
  showDialog.value = true;
};

const handleDetails = (category) => {
  selectedCategory.value = category;
  showDetailsDialog.value = true;
};

const handleDelete = (category) => {
  categoryToDelete.value = category;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  if (!categoryToDelete.value) return;
  
  deleteLoading.value = true;
  try {
    const response = await magazineCategoryService.delete(categoryToDelete.value.id);
    if (response.data.success) {
      currentPage.value = 1; // Reset to first page
      await fetchCategories();
      success('دسته‌بندی با موفقیت حذف شد');
      showDeleteConfirm.value = false;
      categoryToDelete.value = null;
    } else {
      error('خطا در حذف دسته‌بندی: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    console.error('Error deleting category:', err);
    error('خطا در حذف دسته‌بندی');
  } finally {
    deleteLoading.value = false;
  }
};

const handleSearch = (query) => {
  searchQuery.value = query;
  currentPage.value = 1;
  fetchCategories();
};

const handleSearchInput = (query) => {
  searchQuery.value = query;
};

const handleSubmit = async (formData) => {
  dialogLoading.value = true;
  try {
    let response;
    if (formData.id) {
      // Update existing category
      response = await magazineCategoryService.update({
        id: formData.id,
        title: formData.title,
        description: formData.description,
        magazineType: props.magazineType
      });
    } else {
      // Create new category
      response = await magazineCategoryService.create({
        title: formData.title,
        description: formData.description,
        magazineType: props.magazineType
      });
    }
    
    if (response.data.success) {
      closeDialog();
      currentPage.value = 1; // Reset to first page
      await fetchCategories();
      success(formData.id ? 'دسته‌بندی با موفقیت ویرایش شد' : 'دسته‌بندی با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره دسته‌بندی: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    console.error('Error saving category:', err);
    error('خطا در ذخیره دسته‌بندی');
  } finally {
    dialogLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  fetchCategories();
});
</script>




<style scoped>
/* Additional styles if needed */
</style>