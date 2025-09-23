<template>
  <div>
    <Title title="راهنما" />

    <VDataTable
      :columns="tableColumns"
      :items="guides"
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
          text="افزودن راهنما"
          variant="success"
          iconSrc="/src/assets/img/icons/add.svg"
          @click="showAddDialog"
        />
      </template>
    </VDataTable>

    <GuideDialog
      :show="showDialog"
      :guide="editingGuide"
      :loading="dialogLoading"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="حذف راهنما"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />

    <GuideDetailsDialog
      :show="showDetailsDialog"
      :guide="selectedGuide"
      @close="showDetailsDialog = false"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import GuideDialog from '@/components/common/GuideDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import GuideDetailsDialog from '@/components/common/GuideDetailsDialog.vue';
import Button from '@/components/common/Button.vue';
import { useGuideStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const { success, error } = useSnackbar();
const guideStore = useGuideStore();

const {
  data: guides,
  loading,
  loadingMore,
  hasMoreItems,
  showDialog,
  editingGuide,
  dialogLoading,
  showDeleteConfirm,
  guideToDelete,
  deleteLoading,
  showDetailsDialog,
  selectedGuide
} = storeToRefs(guideStore);

const deleteConfirmMessage = computed(() => {
  if (!guideToDelete.value) return 'آیا از حذف این راهنما اطمینان دارید؟';
  return `آیا از حذف راهنما "${guideToDelete.value.title}" اطمینان دارید؟`;
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
    await guideStore.loadMoreGuides();
  } catch (err) {
    error('خطا در دریافت راهنماهای بیشتر');
  }
};

const showAddDialog = () => {
  guideStore.openAddDialog();
};

const closeDialog = () => {
  guideStore.closeDialog();
};

const handleEdit = (guide) => {
  guideStore.openEditDialog(guide);
};

const handleDetails = (guide) => {
  guideStore.openDetailsDialog(guide);
};

const handleDelete = (guide) => {
  guideStore.openDeleteConfirm(guide);
};

const confirmDelete = async () => {
  try {
    await guideStore.deleteGuide(guideToDelete.value.id);
    success('راهنما با موفقیت حذف شد');
    guideStore.closeDeleteConfirm();
  } catch (err) {
    error('خطا در حذف راهنما');
  }
};

const handleSearch = async (query) => {
  guideStore.setSearchQuery(query);
  guideStore.setCurrentPage(1);
  try {
    await guideStore.searchGuides();
  } catch (err) {
    error('خطا در جستجوی راهنماها');
  }
};

const handleSearchInput = (query) => {
  guideStore.setSearchQuery(query);
};

const handleSubmit = async (formData) => {
  try {
    let response;
    if (formData.id) {
      response = await guideStore.updateGuide(formData);
    } else {
      response = await guideStore.createGuide(formData);
    }
    
    if (response.data.success) {
      guideStore.closeDialog();
      success(formData.id ? 'راهنما با موفقیت ویرایش شد' : 'راهنما با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره راهنما: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    error('خطا در ذخیره راهنما');
  }
};

onMounted(async () => {
  try {
    await guideStore.searchGuides();
  } catch (err) {
    error('خطا در دریافت راهنماها');
  }
});
</script>

<style scoped>
</style> 