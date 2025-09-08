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
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import CategoryDialog from '@/components/common/CategoryDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import DetailsDialog from '@/components/common/DetailsDialog.vue';
import Button from '@/components/common/Button.vue';
import { useMagazineCategoryStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const props = defineProps({
  title: { type: String, required: true },
  magazineType: { type: Number, required: true }
});

const { success, error } = useSnackbar();
const magazineCategoryStore = useMagazineCategoryStore();

const {
  data: categories,
  loading,
  loadingMore,
  hasMoreItems,
  showDialog,
  editingCategory,
  dialogLoading,
  showDeleteConfirm,
  categoryToDelete,
  deleteLoading,
  showDetailsDialog,
  selectedCategory
} = storeToRefs(magazineCategoryStore);

const deleteConfirmMessage = computed(() => {
  if (!categoryToDelete.value) return 'آیا از حذف این دسته‌بندی اطمینان دارید؟';
  return `آیا از حذف دسته‌بندی "${categoryToDelete.value.title}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'title', label: 'عنوان', class: 'text-center' },
  { key: 'createDate', label: 'تاریخ ایجاد', class: 'text-center' },
  { key: 'actions', label: 'عملیات', class: 'text-center' }
];

const tableActions = [
  { key: 'edit', label: 'ویرایش', icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
  { key: 'details', label: 'جزئیات', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { key: 'delete', label: 'حذف', icon: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' }
];

const handleLoadMore = async () => {
  try {
    await magazineCategoryStore.loadMoreCategories(props.magazineType);
  } catch (err) {
    error('خطا در دریافت دسته‌بندی‌های بیشتر');
  }
};

const showAddDialog = () => {
  magazineCategoryStore.openAddDialog();
};

const closeDialog = () => {
  magazineCategoryStore.closeDialog();
};

const handleEdit = (category) => {
  magazineCategoryStore.openEditDialog(category);
};

const handleDetails = (category) => {
  magazineCategoryStore.openDetailsDialog(category);
};

const handleDelete = (category) => {
  magazineCategoryStore.openDeleteConfirm(category);
};

const confirmDelete = async () => {
  try {
    await magazineCategoryStore.deleteCategory(categoryToDelete.value.id, props.magazineType);
    success('دسته‌بندی با موفقیت حذف شد');
    magazineCategoryStore.closeDeleteConfirm();
  } catch (err) {
    error('خطا در حذف دسته‌بندی');
  }
};

const handleSearch = async (query) => {
  magazineCategoryStore.setSearchQuery(query);
  magazineCategoryStore.setCurrentPage(1);
  try {
    await magazineCategoryStore.searchCategories(props.magazineType);
  } catch (err) {
    error('خطا در جستجوی دسته‌بندی‌ها');
  }
};

const handleSearchInput = (query) => {
  magazineCategoryStore.setSearchQuery(query);
};

const handleSubmit = async (formData) => {
  try {
    let response;
    if (formData.id) {
      response = await magazineCategoryStore.updateCategory(formData, props.magazineType);
    } else {
      response = await magazineCategoryStore.createCategory(formData, props.magazineType);
    }
    
    if (response.data.success) {
      magazineCategoryStore.closeDialog();
      success(formData.id ? 'دسته‌بندی با موفقیت ویرایش شد' : 'دسته‌بندی با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره دسته‌بندی: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    error('خطا در ذخیره دسته‌بندی');
  }
};

onMounted(async () => {
  try {
    await magazineCategoryStore.searchCategories(props.magazineType);
  } catch (err) {
    error('خطا در دریافت دسته‌بندی‌ها');
  }
});
</script>




<style scoped>
/* Additional styles if needed */
</style>