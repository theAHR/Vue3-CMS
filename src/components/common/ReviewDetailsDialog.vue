<template>
  <Transition name="dialog">
    <div v-if="show" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-content" @click.stop>
        <div class="dialog-header">
          <button class="close-button" @click="closeDialog">
            <svg viewBox="0 0 24 24" fill="currentColor" class="close-icon">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <h3 class="dialog-title">جزئیات نظر و امتیاز</h3>
        </div>

        <div class="dialog-body">
          <div v-if="review" class="review-details">
            <div class="detail-group">
              <label class="detail-label">نام کامل:</label>
              <div class="detail-value">{{ review.fullname || 'نامشخص' }}</div>
            </div>
            
            <div class="detail-group">
              <label class="detail-label">شماره موبایل:</label>
              <div class="detail-value">{{ review.mobile || 'نامشخص' }}</div>
            </div>

            <div class="detail-group">
              <label class="detail-label">امتیاز:</label>
              <div class="detail-value">
                <div class="rating-display">
                  <div class="stars">
                    <svg 
                      v-for="star in 5" 
                      :key="star" 
                      class="star"
                      :class="{ 'filled': star <= Math.round(review.rate) }"
                      viewBox="0 0 24 24" 
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span class="rating-text">{{ review.rate }}/5</span>
                </div>
              </div>
            </div>
            
            <div class="detail-group">
              <label class="detail-label">متن نظر:</label>
              <div class="detail-value">{{ review.text || 'نظری ارائه نشده' }}</div>
            </div>

            <div v-if="review.answer" class="detail-group">
              <label class="detail-label">پاسخ:</label>
              <div class="detail-value answer-text">{{ review.answer }}</div>
            </div>

            <div class="detail-group">
              <label class="detail-label">وضعیت:</label>
              <div class="detail-value">
                <StatusBadge :state="review.isAccept ? 'accepted' : 'pending'" />
              </div>
            </div>
            
            <div class="detail-group">
              <label class="detail-label">تاریخ ایجاد:</label>
              <div class="detail-value">
                <FormattedDate :date="review.createDate" format="full" />
              </div>
            </div>
            
            <div v-if="review.modifyDate" class="detail-group">
              <label class="detail-label">تاریخ آخرین تغییر:</label>
              <div class="detail-value">
                <FormattedDate :date="review.modifyDate" format="full" />
              </div>
            </div>
          </div>
        </div>

        <div class="dialog-footer">
          <button 
            class="btn btn-close" 
            @click="closeDialog"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import FormattedDate from './FormattedDate.vue';
import StatusBadge from './StatusBadge.vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  review: { type: Object, default: null }
});

const emit = defineEmits(['close']);

const closeDialog = () => {
  emit('close');
};
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.dialog-content {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.dialog-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.15s ease-in-out;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.dialog-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
  max-height: calc(90vh - 160px);
}

.dialog-body::-webkit-scrollbar {
  width: 6px;
}

.dialog-body::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.dialog-body::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dialog-body::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.review-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.detail-value {
  font-size: 0.875rem;
  color: #6b7280;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  word-break: break-word;
}

.answer-text {
  background-color: #f0f9ff;
  border: 1px solid #bae6fd;
  border-radius: 0.375rem;
  padding: 0.75rem;
  color: #0c4a6e;
  font-weight: 500;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.stars {
  display: flex;
  gap: 0.125rem;
}

.star {
  width: 1.25rem;
  height: 1.25rem;
  color: #d1d5db;
  transition: color 0.2s ease-in-out;
}

.star.filled {
  color: #fbbf24;
}

.rating-text {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.dialog-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  background-color: #f9fafb;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-close {
  background: #636363;
  color: #ffffff;
}

.btn-close:hover:not(:disabled) {
  background: #4a4a4a;
  transform: translateY(-1px);
}

.dialog-header {
  flex-direction: row-reverse;
}

.dialog-footer {
  flex-direction: row-reverse;
}

@media (max-width: 640px) {
  .dialog-content {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
  
  .dialog-header,
  .dialog-body,
  .dialog-footer {
    padding: 1rem;
  }
  
  .detail-group {
    gap: 0.25rem;
  }
  
  .rating-display {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.2s ease-out;
}

.dialog-enter-from {
  opacity: 0;
}

.dialog-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.dialog-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dialog-leave-to {
  opacity: 0;
}
</style>
