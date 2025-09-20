<template>
  <div>
    <Title title="درخواست‌های شغلی" />

    <VDataTable
      :columns="tableColumns"
      :items="jobRequests"
      :loading="loading"
      :loading-more="loadingMore"
      :has-more-items="hasMoreItems"
      :show-load-more="true"
      :actions="tableActions"
      :show-add-button="false"
      :show-search="false"
      @details="handleDetails"
      @change-state="handleChangeState"
      @load-more="handleLoadMore"
    />
  </div>

  <JobRequestDetailsDialog
    :show="showDetailsDialog"
    :job-request="selectedJobRequest"
    @close="closeDetailsDialog"
  />

  <JobRequestStateDialog
    :show="showStateDialog"
    :job-request="selectedJobRequest"
    :loading="stateDialogLoading"
    @close="closeStateDialog"
    @submit="handleStateChange"
  />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import JobRequestDetailsDialog from '@/components/common/JobRequestDetailsDialog.vue';
import JobRequestStateDialog from '@/components/common/JobRequestStateDialog.vue';
import { useJobRequestStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const { success, error } = useSnackbar();
const jobRequestStore = useJobRequestStore();

const {
  data: jobRequests,
  loading,
  loadingMore,
  hasMoreItems,
  showDetailsDialog,
  selectedJobRequest,
  showStateDialog,
  stateDialogLoading
} = storeToRefs(jobRequestStore);

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'applicantFullName', label: 'نام کامل', class: 'text-center' },
  { key: 'applicantMobileNumber', label: 'شماره موبایل', class: 'text-center' },
  { key: 'applicantMail', label: 'ایمیل', class: 'text-center' },
  { key: 'jobTitle', label: 'موقعیت شغلی', class: 'text-center' },
  { key: 'createDate', label: 'تاریخ ایجاد', class: 'text-center' },
  { key: 'state', label: 'وضعیت', class: 'text-center' },
  { key: 'actions', label: 'عملیات', class: 'text-center' }
];

const tableActions = [
  { key: 'details', label: 'جزئیات', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { key: 'change-state', label: 'تغییر وضعیت', icon: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' }
];

const handleLoadMore = async () => {
  try {
    await jobRequestStore.loadMoreJobRequests();
  } catch (err) {
    error('خطا در دریافت درخواست‌های بیشتر');
  }
};

const handleDetails = (jobRequest) => {
  jobRequestStore.openDetailsDialog(jobRequest);
};

const handleChangeState = (jobRequest) => {
  jobRequestStore.openStateDialog(jobRequest);
};

const closeDetailsDialog = () => {
  jobRequestStore.closeDetailsDialog();
};

const closeStateDialog = () => {
  jobRequestStore.closeStateDialog();
};

const handleStateChange = async (formData) => {
  try {
    await jobRequestStore.updateJobRequestState(formData);
    success('وضعیت درخواست با موفقیت تغییر کرد');
    jobRequestStore.closeStateDialog();
  } catch (err) {
    error('خطا در تغییر وضعیت درخواست');
  }
};

onMounted(async () => {
  try {
    await jobRequestStore.searchJobRequests();
  } catch (err) {
    error('خطا در دریافت درخواست‌های شغلی');
  }
});
</script>

<style scoped>
</style> 