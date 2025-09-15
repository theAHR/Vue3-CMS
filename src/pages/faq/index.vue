<template>
  <div>
    <Title title="لیست سوالات متداول" />

    <VDataTable
      :columns="tableColumns"
      :items="faqs"
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
          text="افزودن سوال متداول"
          variant="success"
          iconSrc="/src/assets/img/icons/add.svg"
          @click="showAddDialog"
        />
      </template>
    </VDataTable>

    <FaqDialog
      :show="showDialog"
      :faq="editingFaq"
      :loading="dialogLoading"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="حذف سوال متداول"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />

    <FaqDetailsDialog
      :show="showDetailsDialog"
      :faq="selectedFaq"
      @close="showDetailsDialog = false"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import FaqDialog from '@/components/common/FaqDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import FaqDetailsDialog from '@/components/common/FaqDetailsDialog.vue';
import Button from '@/components/common/Button.vue';
import { useFaqStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const { success, error } = useSnackbar();
const faqStore = useFaqStore();

const {
  data: faqs,
  loading,
  loadingMore,
  hasMoreItems,
  showDialog,
  editingFaq,
  dialogLoading,
  showDeleteConfirm,
  faqToDelete,
  deleteLoading,
  showDetailsDialog,
  selectedFaq
} = storeToRefs(faqStore);

const deleteConfirmMessage = computed(() => {
  if (!faqToDelete.value) return 'آیا از حذف این سوال متداول اطمینان دارید؟';
  return `آیا از حذف سوال متداول "${faqToDelete.value.faqTitle}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'faqTitle', label: 'عنوان سوال', class: 'text-center' },
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
    await faqStore.loadMoreFaqs();
  } catch (err) {
    error('خطا در دریافت سوالات متداول بیشتر');
  }
};

const showAddDialog = () => {
  faqStore.openAddDialog();
};

const closeDialog = () => {
  faqStore.closeDialog();
};

const handleEdit = (faq) => {
  faqStore.openEditDialog(faq);
};

const handleDetails = (faq) => {
  faqStore.openDetailsDialog(faq);
};

const handleDelete = (faq) => {
  faqStore.openDeleteConfirm(faq);
};

const confirmDelete = async () => {
  try {
    await faqStore.deleteFaq(faqToDelete.value.id);
    success('سوال متداول با موفقیت حذف شد');
    faqStore.closeDeleteConfirm();
  } catch (err) {
    error('خطا در حذف سوال متداول');
  }
};

const handleSearch = async (query) => {
  faqStore.setSearchQuery(query);
  faqStore.setCurrentPage(1);
  try {
    await faqStore.searchFaqs();
  } catch (err) {
    error('خطا در جستجوی سوالات متداول');
  }
};

const handleSearchInput = (query) => {
  faqStore.setSearchQuery(query);
};

const handleSubmit = async (formData) => {
  try {
    let response;
    if (formData.id) {
      response = await faqStore.updateFaq(formData);
    } else {
      response = await faqStore.createFaq(formData);
    }
    
    if (response.data.success) {
      faqStore.closeDialog();
      success(formData.id ? 'سوال متداول با موفقیت ویرایش شد' : 'سوال متداول با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره سوال متداول: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    error('خطا در ذخیره سوال متداول');
  }
};

onMounted(async () => {
  try {
    await faqStore.searchFaqs();
  } catch (err) {
    error('خطا در دریافت سوالات متداول');
  }
});
</script>

<style scoped>
/* FAQ management styles */
</style> 