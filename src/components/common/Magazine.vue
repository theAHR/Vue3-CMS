<template>
  <div>
    <Title :title="title" />

    <VDataTable
      :columns="tableColumns"
      :items="magazines"
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
          :text="addButtonText"
          variant="success"
          iconSrc="/src/assets/img/icons/add.svg"
          @click="showAddDialog"
        />
      </template>
    </VDataTable>

    <MagazineDialog
      :show="showDialog"
      :magazine="editingMagazine"
      :magazine-type="magazineType"
      :loading="dialogLoading"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      v-model="showDeleteConfirm"
      :title="`حذف ${getMagazineTypeTitle(magazineType)}`"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />

    <MagazineDetailsDialog
      :show="showDetailsDialog"
      :magazine="selectedMagazine"
      :magazine-type="magazineType"
      @close="showDetailsDialog = false"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import MagazineDialog from '@/components/common/MagazineDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import MagazineDetailsDialog from '@/components/common/MagazineDetailsDialog.vue';
import Button from '@/components/common/Button.vue';
import { useMagazineStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const props = defineProps({
  title: { type: String, required: true },
  magazineType: { type: Number, required: true }
});

const getMagazineTypeTitle = (type) => {
  const titles = {
    1: 'خبر',
    2: 'اطلاعیه',
    3: 'بخشنامه',
    4: 'راهنما'
  };
  return titles[type] || 'مجله';
};

const addButtonText = computed(() => {
  const typeTitle = getMagazineTypeTitle(props.magazineType);
  return `افزودن ${typeTitle}`;
});

const { success, error } = useSnackbar();
const magazineStore = useMagazineStore();
const route = useRoute();

const {
  data: magazines,
  loading,
  loadingMore,
  hasMoreItems,
  showDialog,
  editingMagazine,
  dialogLoading,
  showDeleteConfirm,
  magazineToDelete,
  deleteLoading,
  showDetailsDialog,
  selectedMagazine
} = storeToRefs(magazineStore);

const deleteConfirmMessage = computed(() => {
  const typeTitle = getMagazineTypeTitle(props.magazineType);
  if (!magazineToDelete.value) return `آیا از حذف این ${typeTitle} اطمینان دارید؟`;
  return `آیا از حذف ${typeTitle} "${magazineToDelete.value.title}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'title', label: 'عنوان', class: 'text-center' },
  { key: 'createDate', label: 'تاریخ ایجاد', class: 'text-center' },
  { key: 'active', label: 'وضعیت', class: 'text-center' },
  { key: 'actions', label: 'عملیات', class: 'text-center' }
];

const tableActions = [
  { key: 'edit', label: 'ویرایش', icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
  { key: 'details', label: 'جزئیات', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { key: 'delete', label: 'حذف', icon: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' }
];

const handleLoadMore = async () => {
  try {
    await magazineStore.loadMoreMagazines(props.magazineType);
  } catch (err) {
    error('خطا در دریافت مجله‌های بیشتر');
  }
};

const showAddDialog = () => {
  magazineStore.openAddDialog();
};

const closeDialog = () => {
  magazineStore.closeDialog();
};

const handleEdit = (magazine) => {
  magazineStore.openEditDialog(magazine);
};

const handleDetails = (magazine) => {
  magazineStore.openDetailsDialog(magazine);
};

const handleDelete = (magazine) => {
  magazineStore.openDeleteConfirm(magazine);
};

const confirmDelete = async () => {
  try {
    await magazineStore.deleteMagazine(magazineToDelete.value.id, props.magazineType);
    success('مجله با موفقیت حذف شد');
    magazineStore.closeDeleteConfirm();
  } catch (err) {
    error('خطا در حذف مجله');
  }
};

const handleSearch = async (query) => {
  magazineStore.setSearchQuery(query);
  magazineStore.setCurrentPage(1);
  try {
    await magazineStore.searchMagazines(props.magazineType);
  } catch (err) {
    error('خطا در جستجوی مجله‌ها');
  }
};

const handleSearchInput = (query) => {
  magazineStore.setSearchQuery(query);
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
    error('خطا در ذخیره مجله');
  }
};

watch(() => route.query.add, (shouldAdd) => {
  if (shouldAdd === 'true') {
    showAddDialog();
  }
}, { immediate: true });

onMounted(async () => {
  try {
    await magazineStore.searchMagazines(props.magazineType);
  } catch (err) {
    error('خطا در دریافت مجله‌ها');
  }
});
</script>

<style scoped>
</style>