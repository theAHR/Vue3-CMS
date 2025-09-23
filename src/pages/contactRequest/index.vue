<template>
  <div>
    <Title title="درخواست‌های تماس" />

    <VDataTable
      :columns="tableColumns"
      :items="contactRequestsWithActions"
      :loading="loading"
      :loading-more="loadingMore"
      :has-more-items="hasMoreItems"
      :show-load-more="true"
      :actions="tableActions"
      :show-add-button="false"
      @details="handleDetails"
      @check="handleCheck"
      @load-more="handleLoadMore"
      @search="handleSearch"
      @search-input="handleSearchInput"
    />
    
    <ContactRequestDetailsDialog
      :show="showDetailsDialog"
      :contact-request="selectedContactRequest"
      @close="closeDetailsDialog"
    />

    <ConfirmDialog
      v-model="showCheckConfirm"
      title="بررسی درخواست"
      :message="checkConfirmMessage"
      confirm-text="بررسی شد"
      cancel-text="انصراف"
      type="success"
      :loading="checkLoading"
      @confirm="confirmCheck"
      @cancel="closeCheckConfirm"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import ContactRequestDetailsDialog from '@/components/common/ContactRequestDetailsDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import { useContactRequestStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const { success, error } = useSnackbar();
const contactRequestStore = useContactRequestStore();

const {
  data: contactRequests,
  loading,
  loadingMore,
  hasMoreItems,
  showDetailsDialog,
  selectedContactRequest,
  showCheckConfirm,
  contactRequestToCheck,
  checkLoading
} = storeToRefs(contactRequestStore);

const checkConfirmMessage = computed(() => {
  if (!contactRequestToCheck.value) return 'آیا از بررسی این درخواست اطمینان دارید؟';
  const fullName = `${contactRequestToCheck.value.name || ''} ${contactRequestToCheck.value.lastName || ''}`.trim();
  return `آیا از بررسی درخواست "${fullName}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'fullName', label: 'نام کامل', class: 'text-center' },
  { key: 'mobileNo', label: 'شماره موبایل', class: 'text-center' },
  { key: 'email', label: 'ایمیل', class: 'text-center' },
  { key: 'createDate', label: 'تاریخ ایجاد', class: 'text-center' },
  { key: 'status', label: 'وضعیت', class: 'text-center' },
  { key: 'actions', label: 'عملیات', class: 'text-center' }
];

const tableActions = [
  { key: 'details', label: 'جزئیات', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { key: 'check', label: 'بررسی شد', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
];

const contactRequestsWithActions = computed(() => {
  return contactRequests.value.map(item => {
    const fullName = `${item.name || ''} ${item.lastName || ''}`.trim() || 'نامشخص';
    return {
      ...item,
      fullName: fullName.length > 20 ? fullName.substring(0, 20) + '...' : fullName,
      status: item.isCheck ? 'بررسی شده' : 'بررسی نشده',
      canCheck: !item.isCheck
    };
  });
});

const handleLoadMore = async () => {
  try {
    await contactRequestStore.loadMoreContactRequests();
  } catch (err) {
    error('خطا در دریافت درخواست‌های بیشتر');
  }
};

const handleDetails = (contactRequest) => {
  contactRequestStore.openDetailsDialog(contactRequest);
};

const handleCheck = (contactRequest) => {
  if (contactRequest.canCheck) {
    contactRequestStore.openCheckConfirm(contactRequest);
  }
};

const closeDetailsDialog = () => {
  contactRequestStore.closeDetailsDialog();
};

const confirmCheck = async () => {
  try {
    await contactRequestStore.checkContactRequest(contactRequestToCheck.value.id);
    success('درخواست با موفقیت بررسی شد');
    contactRequestStore.closeCheckConfirm();
  } catch (err) {
    error('خطا در بررسی درخواست');
  }
};

const closeCheckConfirm = () => {
  contactRequestStore.closeCheckConfirm();
};

const handleSearch = async (query) => {
  contactRequestStore.setSearchQuery(query);
  contactRequestStore.setCurrentPage(1);
  try {
    await contactRequestStore.searchContactRequests();
  } catch (err) {
    error('خطا در جستجوی درخواست‌ها');
  }
};

const handleSearchInput = (query) => {
  contactRequestStore.setSearchQuery(query);
};

onMounted(async () => {
  try {
    await contactRequestStore.searchContactRequests();
  } catch (err) {
    error('خطا در دریافت درخواست‌ها');
  }
});
</script>

<style scoped>
</style> 