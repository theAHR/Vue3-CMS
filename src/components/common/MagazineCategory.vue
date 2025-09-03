<template>
  <div>
    <Title :title="title" />
    
    <VDataTable
      :columns="tableColumns"
      :items="magazineCategoryStore.getData"
      :loading="magazineCategoryStore.getLoading"
      :loading-more="magazineCategoryStore.loadingMore"
      :has-more-items="magazineCategoryStore.hasMoreItems"
      :show-load-more="true"
      :actions="tableActions"
      :show-add-button="false"
      @edit="handleEdit"
      @details="handleDetails"
      @delete="handleDelete"
      @load-more="handleLoadMore"
      @search="handleSearch"
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
      :show="magazineCategoryStore.showDialog"
      :category="magazineCategoryStore.editingCategory"
      :loading="magazineCategoryStore.dialogLoading"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      v-model="magazineCategoryStore.showDeleteConfirm"
      title="حذف دسته‌بندی"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="magazineCategoryStore.deleteLoading"
      @confirm="confirmDelete"
      @cancel="closeDeleteDialog"
    />

    <DetailsDialog
      :show="magazineCategoryStore.showDetailsDialog"
      :category="magazineCategoryStore.selectedCategory"
      @close="closeDetailsDialog"
    />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import CategoryDialog from '@/components/common/CategoryDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import DetailsDialog from '@/components/common/DetailsDialog.vue';
import Button from '@/components/common/Button.vue';
import { useMagazineCategoryStore } from '@/stores/magazineCategory';
import { useSnackbar } from '@/utils/snackbar';

const props = defineProps({
  title: { type: String, required: true },
  magazineType: { type: Number, required: true }
});

const { success, error } = useSnackbar();
const magazineCategoryStore = useMagazineCategoryStore();

const deleteConfirmMessage = computed(() => {
  if (!magazineCategoryStore.categoryToDelete) return 'آیا از حذف این دسته‌بندی اطمینان دارید؟';
  return `آیا از حذف دسته‌بندی "${magazineCategoryStore.categoryToDelete.title}" اطمینان دارید؟`;
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

watch(() => props.magazineType, (newType) => {
  magazineCategoryStore.setMagazineType(newType);
  magazineCategoryStore.resetPagination();
  magazineCategoryStore.fetchCategories();
}, { immediate: true });

const handleLoadMore = async () => {
  try {
    await magazineCategoryStore.loadMoreCategories();
  } catch (err) {
    console.error('Error loading more categories:', err);
    error('خطا در دریافت دسته‌بندی‌های بیشتر');
  }
};

const showAddDialog = () => magazineCategoryStore.showAddDialog();
const closeDialog = () => magazineCategoryStore.closeDialog();
const handleEdit = (category) => magazineCategoryStore.showEditDialog(category);
const handleDetails = (category) => magazineCategoryStore.showDetailsDialog(category);
const handleDelete = (category) => magazineCategoryStore.showDeleteDialog(category);

const confirmDelete = async () => {
  if (!magazineCategoryStore.categoryToDelete) return;
  
  try {
    const response = await magazineCategoryStore.deleteCategory(magazineCategoryStore.categoryToDelete.id);
    if (response.data.success) {
      success('دسته‌بندی با موفقیت حذف شد');
      magazineCategoryStore.closeDeleteDialog();
    } else {
      error('خطا در حذف دسته‌بندی: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    console.error('Error deleting category:', err);
    error('خطا در حذف دسته‌بندی');
  }
};

const handleSubmit = async (formData) => {
  try {
    let response;
    if (formData.id) {
      response = await magazineCategoryStore.updateCategory(formData);
    } else {
      response = await magazineCategoryStore.createCategory(formData);
    }
    
    if (response.data.success) {
      magazineCategoryStore.closeDialog();
      success(formData.id ? 'دسته‌بندی با موفقیت ویرایش شد' : 'دسته‌بندی با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره دسته‌بندی: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    console.error('Error saving category:', err);
    error('خطا در ذخیره دسته‌بندی');
  }
};

const handleSearch = (query) => {
  try {
    magazineCategoryStore.handleSearch(query);
  } catch (err) {
    console.error('Error searching categories:', err);
    error('خطا در جستجوی دسته‌بندی‌ها');
  }
};

const closeDeleteDialog = () => magazineCategoryStore.closeDeleteDialog();
const closeDetailsDialog = () => magazineCategoryStore.closeDetailsDialog();
</script>
