<template>
  <Transition name="dialog">
    <div v-if="show" class="details-dialog-overlay" @click="closeDialog">
      <div class="details-dialog" @click.stop>
        <!-- Dialog Header -->
        <div class="dialog-header">
          <button class="close-button" @click="closeDialog">
            <svg viewBox="0 0 24 24" fill="currentColor" class="close-icon">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <h3 class="dialog-title">جزئیات دسته‌بندی</h3>
        </div>

        <!-- Dialog Body -->
        <div class="dialog-body">
          <div class="detail-item">
            <label class="detail-label">عنوان:</label>
            <span class="detail-value">{{ category?.title || 'نامشخص' }}</span>
          </div>
          
          <div class="detail-item">
            <label class="detail-label">توضیحات:</label>
            <span class="detail-value">{{ category?.description || 'بدون توضیحات' }}</span>
          </div>
          
          <div class="detail-item">
            <label class="detail-label">تاریخ ایجاد:</label>
            <span class="detail-value">
              <FormattedDate :date="category?.createDate" format="full" />
            </span>
          </div>
          
          <div class="detail-item">
            <label class="detail-label">شناسه:</label>
            <span class="detail-value">{{ category?.id || 'نامشخص' }}</span>
          </div>
        </div>

        <!-- Dialog Actions -->
        <div class="dialog-actions">
          <button class="btn btn-close" @click="closeDialog">
            <svg v-if="loading" class="loading-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 18V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span v-else>بستن</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';
import FormattedDate from './FormattedDate.vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  category: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const closeDialog = () => {
  emit('close');
};
</script>

<style scoped>
.details-dialog-overlay {
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

.details-dialog {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
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
}

.detail-item {
  display: flex;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  transition: background-color 0.15s ease-in-out;
}

.detail-item:hover {
  background-color: #f3f4f6;
}

.detail-label {
  font-weight: 600;
  color: #374151;
  min-width: 120px;
  margin-right: 0;
  margin-left: 1rem;
}

.detail-value {
  color: #6b7280;
  flex: 1;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
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
  background: #f1f5f9;
  color: #64748b;
}

.btn-close:hover:not(:disabled) {
  background: #e2e8f0;
  color: #475569;
  transform: translateY(-1px);
}

.btn-close:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-icon {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* RTL specific adjustments */
.dialog-header {
  flex-direction: row-reverse;
}

.detail-item {
  flex-direction: row;
}

.dialog-actions {
  flex-direction: row-reverse;
}

/* Responsive */
@media (max-width: 640px) {
  .details-dialog {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
  
  .dialog-header,
  .dialog-body,
  .dialog-actions {
    padding: 1rem;
  }
  
  .detail-item {
    flex-direction: column;
  }
  
  .detail-label {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
}

/* Transition animations */
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
