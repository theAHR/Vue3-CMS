<template>
  <div>
    <Title title="ویدئوهای آموزشی" />

    <VDataTable
      :columns="tableColumns"
      :items="multimediaList"
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
          text="افزودن ویدئو"
          variant="success"
          iconSrc="/src/assets/img/icons/add.svg"
          @click="showAddDialog"
        />
      </template>
    </VDataTable>

    <MultimediaDialog
      :show="showDialog"
      :multimedia="editingMultimedia"
      :loading="dialogLoading"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="حذف ویدئو"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />

    <MultimediaDetailsDialog
      :show="showDetailsDialog"
      :multimedia="selectedMultimedia"
      @close="showDetailsDialog = false"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import MultimediaDialog from '@/components/common/MultimediaDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import MultimediaDetailsDialog from '@/components/common/MultimediaDetailsDialog.vue';
import Button from '@/components/common/Button.vue';
import { useMultimediaStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const { success, error } = useSnackbar();
const multimediaStore = useMultimediaStore();

const {
  data: multimediaList,
  loading,
  loadingMore,
  hasMoreItems,
  showDialog,
  editingMultimedia,
  dialogLoading,
  showDeleteConfirm,
  multimediaToDelete,
  deleteLoading,
  showDetailsDialog,
  selectedMultimedia
} = storeToRefs(multimediaStore);

const deleteConfirmMessage = computed(() => {
  if (!multimediaToDelete.value) return 'آیا از حذف این ویدئو اطمینان دارید؟';
  return `آیا از حذف ویدئو "${multimediaToDelete.value.description}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'description', label: 'عنوان', class: 'text-center' },
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
    await multimediaStore.loadMoreMultimedia();
  } catch (err) {
    error('خطا در دریافت ویدئوهای بیشتر');
  }
};

const showAddDialog = () => {
  multimediaStore.openAddDialog();
};

const closeDialog = () => {
  multimediaStore.closeDialog();
};

const handleEdit = (multimedia) => {
  multimediaStore.openEditDialog(multimedia);
};

const handleDetails = (multimedia) => {
  multimediaStore.openDetailsDialog(multimedia);
};

const handleDelete = (multimedia) => {
  multimediaStore.openDeleteConfirm(multimedia);
};

const confirmDelete = async () => {
  try {
    await multimediaStore.deleteMultimedia(multimediaToDelete.value.id);
    success('ویدئو با موفقیت حذف شد');
    multimediaStore.closeDeleteConfirm();
  } catch (err) {
    error('خطا در حذف ویدئو');
  }
};

const handleSearch = async (query) => {
  multimediaStore.setSearchQuery(query);
  multimediaStore.setCurrentPage(1);
  try {
    await multimediaStore.searchMultimedia();
  } catch (err) {
    error('خطا در جستجوی ویدئوها');
  }
};

const handleSearchInput = (query) => {
  multimediaStore.setSearchQuery(query);
};

const handleSubmit = async (formData) => {
  try {
    let response;
    if (formData.id) {
      response = await multimediaStore.updateMultimedia(formData);
    } else {
      response = await multimediaStore.createMultimedia(formData);
    }
    
    if (response.data.success) {
      multimediaStore.closeDialog();
      success(formData.id ? 'ویدئو با موفقیت ویرایش شد' : 'ویدئو با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره ویدئو: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    error('خطا در ذخیره ویدئو');
  }
};

onMounted(async () => {
  try {
    await multimediaStore.searchMultimedia();
  } catch (err) {
    error('خطا در دریافت ویدئوها');
  }
});
</script>

<style scoped>
</style> 