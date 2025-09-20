<template>
  <div>
    <Title title="بخش سازمانی" />

    <VDataTable
      :columns="tableColumns"
      :items="jobSections"
      :loading="loading"
      :loading-more="loadingMore"
      :has-more-items="hasMoreItems"
      :show-load-more="true"
      :actions="tableActions"
      :show-add-button="false"
      :show-search="false"
      @edit="handleEdit"
      @delete="handleDelete"
      @load-more="handleLoadMore"
    >
      <template #actions>
        <Button 
          text="افزودن بخش شغلی"
          variant="success"
          iconSrc="/src/assets/img/icons/add.svg"
          @click="showAddDialog"
        />
      </template>
    </VDataTable>

    <JobSectionDialog
      :show="showDialog"
      :jobSection="editingJobSection"
      :loading="dialogLoading"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="حذف بخش شغلی"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />

  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import JobSectionDialog from '@/components/common/JobSectionDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import Button from '@/components/common/Button.vue';
import { useJobSectionStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const { success, error } = useSnackbar();
const jobSectionStore = useJobSectionStore();

const {
  data: jobSections,
  loading,
  loadingMore,
  hasMoreItems,
  showDialog,
  editingJobSection,
  dialogLoading,
  showDeleteConfirm,
  jobSectionToDelete,
  deleteLoading
} = storeToRefs(jobSectionStore);

const deleteConfirmMessage = computed(() => {
  if (!jobSectionToDelete.value) return 'آیا از حذف این بخش شغلی اطمینان دارید؟';
  return `آیا از حذف بخش شغلی "${jobSectionToDelete.value.jobSectionName}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'jobSectionName', label: 'عنوان', class: 'text-center' },
  { key: 'createDate', label: 'تاریخ ایجاد', class: 'text-center' },
  { key: 'actions', label: 'عملیات', class: 'text-center' }
];

const tableActions = [
  { key: 'edit', label: 'ویرایش', icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
  { key: 'delete', label: 'حذف', icon: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' }
];

const handleLoadMore = async () => {
  try {
    await jobSectionStore.loadMoreJobSections();
  } catch (err) {
    error('خطا در دریافت بخش‌های شغلی بیشتر');
  }
};

const showAddDialog = () => {
  jobSectionStore.openAddDialog();
};

const closeDialog = () => {
  jobSectionStore.closeDialog();
};

const handleEdit = (jobSection) => {
  jobSectionStore.openEditDialog(jobSection);
};

const handleDelete = (jobSection) => {
  jobSectionStore.openDeleteConfirm(jobSection);
};

const confirmDelete = async () => {
  try {
    await jobSectionStore.deleteJobSection(jobSectionToDelete.value.id);
    success('بخش شغلی با موفقیت حذف شد');
    jobSectionStore.closeDeleteConfirm();
  } catch (err) {
    error('خطا در حذف بخش شغلی');
  }
};

const handleSubmit = async (formData) => {
  try {
    let response;
    if (formData.id) {
      response = await jobSectionStore.updateJobSection(formData);
    } else {
      response = await jobSectionStore.createJobSection(formData);
    }
    
    if (response.data.success) {
      jobSectionStore.closeDialog();
      success(formData.id ? 'بخش شغلی با موفقیت ویرایش شد' : 'بخش شغلی با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره بخش شغلی: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    error('خطا در ذخیره بخش شغلی');
  }
};

onMounted(async () => {
  try {
    await jobSectionStore.searchJobSections();
  } catch (err) {
    error('خطا در دریافت بخش‌های شغلی');
  }
});
</script>