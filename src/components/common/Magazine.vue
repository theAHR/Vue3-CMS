<template>
  <div>
    <Title :title="title" />
    
    <VDataTable
      :columns="tableColumns"
      :items="magazineStore.getData"
      :loading="magazineStore.getLoading"
      :loading-more="magazineStore.loadingMore"
      :has-more-items="magazineStore.hasMoreItems"
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
          text="افزودن مجله"
          variant="success"
          iconSrc="/src/assets/img/icons/add.svg"
          @click="showAddDialog"
        />
      </template>
    </VDataTable>

    <MagazineDialog
      :show="magazineStore.showDialog"
      :magazine="magazineStore.editingMagazine"
      :magazine-type="magazineType"
      :loading="magazineStore.dialogLoading"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      v-model="magazineStore.showDeleteConfirm"
      title="حذف مجله"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="magazineStore.deleteLoading"
      @confirm="confirmDelete"
      @cancel="closeDeleteDialog"
    />

    <MagazineDetailsDialog
      :show="magazineStore.showDetailsDialog"
      :magazine="magazineStore.selectedMagazine"
      :magazine-type="magazineType"
      @close="closeDetailsDialog"
    />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import MagazineDialog from '@/components/common/MagazineDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import MagazineDetailsDialog from '@/components/common/MagazineDetailsDialog.vue';
import Button from '@/components/common/Button.vue';
import { useMagazineStore } from '@/stores/magazine';
import { useSnackbar } from '@/utils/snackbar';

const props = defineProps({
  title: { type: String, required: true },
  magazineType: { type: Number, required: true }
});

const { success, error } = useSnackbar();
const magazineStore = useMagazineStore();

const deleteConfirmMessage = computed(() => {
  if (!magazineStore.magazineToDelete) return 'آیا از حذف این مجله اطمینان دارید؟';
  return `آیا از حذف مجله "${magazineStore.magazineToDelete.title}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'title', label: 'عنوان', class: 'text-right' },
  { key: 'createDate', label: 'تاریخ ایجاد', class: 'text-center' },
  { key: 'active', label: 'وضعیت', class: 'text-center' },
  { key: 'actions', label: 'عملیات', class: 'text-center' }
];

const tableActions = [
  { key: 'edit', label: 'ویرایش', icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
  { key: 'details', label: 'جزئیات', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { key: 'delete', label: 'حذف', icon: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' }
];

watch(() => props.magazineType, (newType) => {
  magazineStore.setMagazineType(newType);
  magazineStore.resetPagination();
  magazineStore.fetchMagazines();
}, { immediate: true });

const handleLoadMore = async () => {
  try {
    await magazineStore.loadMoreMagazines();
  } catch (err) {
    console.error('Error loading more magazines:', err);
    error('خطا در دریافت مجله‌های بیشتر');
  }
};

const showAddDialog = () => magazineStore.showAddDialog();
const closeDialog = () => magazineStore.closeDialog();
const handleEdit = (magazine) => magazineStore.showEditDialog(magazine);
const handleDetails = (magazine) => magazineStore.showDetailsDialog(magazine);
const handleDelete = (magazine) => magazineStore.showDeleteDialog(magazine);

const confirmDelete = async () => {
  if (!magazineStore.magazineToDelete) return;
  
  try {
    const response = await magazineStore.deleteMagazine(magazineStore.magazineToDelete.id);
    if (response.data.success) {
      success('مجله با موفقیت حذف شد');
      magazineStore.closeDeleteDialog();
    } else {
      error('خطا در حذف مجله: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    console.error('Error deleting magazine:', err);
    error('خطا در حذف مجله');
  }
};

const closeDeleteDialog = () => magazineStore.closeDeleteDialog();
const closeDetailsDialog = () => magazineStore.closeDetailsDialog();

const handleSearch = (query) => {
  try {
    magazineStore.handleSearch(query);
  } catch (err) {
    console.error('Error searching magazines:', err);
    error('خطا در جستجوی مجله‌ها');
  }
};



const handleSubmit = async (formData) => {
  try {
    let response;
    if (formData.id) {
      response = await magazineStore.updateMagazine(formData);
    } else {
      response = await magazineStore.createMagazine(formData);
    }
    
    if (response.data.success) {
      magazineStore.closeDialog();
      success(formData.id ? 'مجله با موفقیت ویرایش شد' : 'مجله با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره مجله: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    console.error('Error saving magazine:', err);
    error('خطا در ذخیره مجله');
  }
};
</script>

