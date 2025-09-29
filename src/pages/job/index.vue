<template>
  <div>
    <Title title="لیست مشاغل" />

    <VDataTable
      :columns="tableColumns"
      :items="jobs"
      :loading="loading"
      :loading-more="loadingMore"
      :has-more-items="hasMoreItems"
      :show-load-more="true"
      :actions="tableActions"
      :show-add-button="false"
      :show-search="false"
      @edit="handleEdit"
      @details="handleDetails"
      @delete="handleDelete"
      @load-more="handleLoadMore"
    >
      <template #actions>
        <Button 
          text="افزودن شغل"
          variant="success"
          iconSrc="/src/assets/img/icons/add.svg"
          @click="showAddDialog"
        />
      </template>
    </VDataTable>

    <JobDialog
      :show="showDialog"
      :job="editingJob"
      :loading="dialogLoading"
      :job-section-options="jobSectionOptions"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="حذف شغل"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />

    <JobDetailsDialog
      :show="showDetailsDialog"
      :job="selectedJob"
      :job-sections="jobSections"
      @close="jobStore.closeDetailsDialog"
    />

  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import JobDialog from '@/components/common/JobDialog.vue';
import JobDetailsDialog from '@/components/common/JobDetailsDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import Button from '@/components/common/Button.vue';
import { useJobStore, useJobSectionStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const { success, error } = useSnackbar();
const jobStore = useJobStore();
const jobSectionStore = useJobSectionStore();
const route = useRoute();

const {
  data: jobs,
  loading,
  loadingMore,
  hasMoreItems,
  showDialog,
  editingJob,
  dialogLoading,
  showDeleteConfirm,
  jobToDelete,
  deleteLoading,
  showDetailsDialog,
  selectedJob
} = storeToRefs(jobStore);

const { data: jobSections } = storeToRefs(jobSectionStore);

const deleteConfirmMessage = computed(() => {
  if (!jobToDelete.value) return 'آیا از حذف این شغل اطمینان دارید؟';
  return `آیا از حذف شغل "${jobToDelete.value.title}" اطمینان دارید؟`;
});

const jobSectionOptions = computed(() => {
  return jobSections.value.map(section => ({
    value: section.id,
    label: section.jobSectionName
  }));
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
    await jobStore.loadMoreJobs();
  } catch (err) {
    error('خطا در دریافت مشاغل بیشتر');
  }
};

const showAddDialog = () => {
  jobStore.openAddDialog();
};

const closeDialog = () => {
  jobStore.closeDialog();
};

const handleEdit = (job) => {
  jobStore.openEditDialog(job);
};

const handleDetails = (job) => {
  jobStore.openDetailsDialog(job);
};

const handleDelete = (job) => {
  jobStore.openDeleteConfirm(job);
};

const confirmDelete = async () => {
  try {
    await jobStore.deleteJob(jobToDelete.value.id);
    success('شغل با موفقیت حذف شد');
    jobStore.closeDeleteConfirm();
  } catch (err) {
    error('خطا در حذف شغل');
  }
};

const handleSubmit = async (formData) => {
  try {
    let response;
    if (formData.id) {
      response = await jobStore.updateJob(formData);
    } else {
      response = await jobStore.createJob(formData);
    }
    
    if (response.data.success) {
      jobStore.closeDialog();
      success(formData.id ? 'شغل با موفقیت ویرایش شد' : 'شغل با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره شغل: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    error('خطا در ذخیره شغل');
  }
};

watch(() => route.query.add, (shouldAdd) => {
  if (shouldAdd === 'true') {
    showAddDialog();
  }
}, { immediate: true });

onMounted(async () => {
  try {
    await Promise.all([
      jobStore.searchJobs(),
      jobSectionStore.searchJobSections()
    ]);
  } catch (err) {
    error('خطا در دریافت داده‌ها');
  }
});
</script>

<style scoped>
</style> 