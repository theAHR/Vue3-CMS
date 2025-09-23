<template>
  <div>
    <Title title="نظرات و امتیازات" />

    <VDataTable
      :columns="tableColumns"
      :items="reviewsWithActions"
      :loading="loading"
      :loading-more="loadingMore"
      :has-more-items="hasMoreItems"
      :show-load-more="true"
      :actions="tableActions"
      :show-add-button="false"
      @details="handleDetails"
      @answer="handleAnswer"
      @confirm="handleConfirm"
      @load-more="handleLoadMore"
      @search="handleSearch"
      @search-input="handleSearchInput"
    />
    
    <ReviewDetailsDialog
      :show="showDetailsDialog"
      :review="selectedReview"
      @close="closeDetailsDialog"
    />

    <ReviewAnswerDialog
      :show="showAnswerDialog"
      :review="reviewToAnswer"
      :loading="answerDialogLoading"
      @close="closeAnswerDialog"
      @submit="handleAnswerSubmit"
    />

    <ConfirmDialog
      v-model="showConfirmDialog"
      title="تایید نظر"
      :message="confirmMessage"
      confirm-text="تایید"
      cancel-text="انصراف"
      type="success"
      :loading="confirmLoading"
      @confirm="confirmReview"
      @cancel="closeConfirmDialog"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import ReviewDetailsDialog from '@/components/common/ReviewDetailsDialog.vue';
import ReviewAnswerDialog from '@/components/common/ReviewAnswerDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import { useRateAndReviewStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const { success, error } = useSnackbar();
const rateAndReviewStore = useRateAndReviewStore();

const {
  data: reviews,
  loading,
  loadingMore,
  hasMoreItems,
  showDetailsDialog,
  selectedReview,
  showAnswerDialog,
  reviewToAnswer,
  answerDialogLoading,
  showConfirmDialog,
  reviewToConfirm,
  confirmLoading
} = storeToRefs(rateAndReviewStore);

const confirmMessage = computed(() => {
  if (!reviewToConfirm.value) return 'آیا از تایید این نظر اطمینان دارید؟';
  return `آیا از تایید نظر "${reviewToConfirm.value.fullname}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'fullname', label: 'نام کامل', class: 'text-center' },
  { key: 'mobile', label: 'شماره موبایل', class: 'text-center' },
  { key: 'rate', label: 'امتیاز', class: 'text-center' },
  { key: 'text', label: 'متن', class: 'text-center' },
  { key: 'status', label: 'وضعیت', class: 'text-center' },
  { key: 'actions', label: 'عملیات', class: 'text-center' }
];

const tableActions = [
  { key: 'details', label: 'جزئیات', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { key: 'answer', label: 'پاسخ دادن', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' },
  { key: 'confirm', label: 'تایید', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' }
];

const reviewsWithActions = computed(() => {
  return reviews.value.map(item => ({
    ...item,
    status: item.isAccept ? 'تایید شده' : 'تایید نشده',
    canConfirm: !item.isAccept,
    canAnswer: true,
    text: item.text && item.text.length > 50 ? item.text.substring(0, 50) + '...' : item.text
  }));
});

const handleLoadMore = async () => {
  try {
    await rateAndReviewStore.loadMoreReviews();
  } catch (err) {
    error('خطا در دریافت نظرات بیشتر');
  }
};

const handleDetails = (review) => {
  rateAndReviewStore.openDetailsDialog(review);
};

const handleAnswer = (review) => {
  if (review.canAnswer) {
    rateAndReviewStore.openAnswerDialog(review);
  }
};

const handleConfirm = (review) => {
  if (review.canConfirm) {
    rateAndReviewStore.openConfirmDialog(review);
  }
};

const closeDetailsDialog = () => {
  rateAndReviewStore.closeDetailsDialog();
};

const closeAnswerDialog = () => {
  rateAndReviewStore.closeAnswerDialog();
};

const handleAnswerSubmit = async (formData) => {
  try {
    await rateAndReviewStore.answerReview(formData);
    success('پاسخ با موفقیت ارسال شد');
    rateAndReviewStore.closeAnswerDialog();
  } catch (err) {
    error('خطا در ارسال پاسخ');
  }
};

const confirmReview = async () => {
  try {
    await rateAndReviewStore.confirmReview(reviewToConfirm.value.id);
    success('نظر با موفقیت تایید شد');
    rateAndReviewStore.closeConfirmDialog();
  } catch (err) {
    error('خطا در تایید نظر');
  }
};

const closeConfirmDialog = () => {
  rateAndReviewStore.closeConfirmDialog();
};

const handleSearch = async (query) => {
  rateAndReviewStore.setSearchQuery(query);
  rateAndReviewStore.setCurrentPage(1);
  try {
    await rateAndReviewStore.searchReviews();
  } catch (err) {
    error('خطا در جستجوی نظرات');
  }
};

const handleSearchInput = (query) => {
  rateAndReviewStore.setSearchQuery(query);
};

onMounted(async () => {
  try {
    await rateAndReviewStore.searchReviews();
  } catch (err) {
    error('خطا در دریافت نظرات');
  }
});
</script>

<style scoped>
</style> 