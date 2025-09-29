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
          <h3 class="dialog-title">جزئیات درخواست تماس</h3>
        </div>

        <div class="dialog-body">
          <div v-if="contactRequest" class="contact-request-details">
            <div class="details-grid">
              <div class="detail-group">
                <label class="detail-label">نام کامل:</label>
                <div class="detail-value">{{ getFullName() }}</div>
              </div>

              <div class="detail-group">
                <label class="detail-label">شماره موبایل:</label>
                <div class="detail-value">{{ contactRequest.mobileNo || 'نامشخص' }}</div>
              </div>

              <div class="detail-group">
                <label class="detail-label">ایمیل:</label>
                <div class="detail-value">{{ contactRequest.email || 'نامشخص' }}</div>
              </div>

              <div class="detail-group">
                <label class="detail-label">تاریخ ایجاد:</label>
                <div class="detail-value">
                  <FormattedDate :date="contactRequest.createDate" format="full" />
                </div>
              </div>
            </div>

            <div class="detail-group">
              <label class="detail-label">توضیحات:</label>
              <div class="detail-value">{{ contactRequest.description || 'توضیحی ارائه نشده' }}</div>
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
  contactRequest: { type: Object, default: null }
});

const emit = defineEmits(['close']);

const closeDialog = () => {
  emit('close');
};

const getFullName = () => {
  if (!props.contactRequest) return 'نامشخص';
  const name = props.contactRequest.name || '';
  const lastName = props.contactRequest.lastName || '';
  return `${name} ${lastName}`.trim() || 'نامشخص';
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
  max-width: 600px;
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

.contact-request-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
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

.btn-close:hover {
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

  .details-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
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
