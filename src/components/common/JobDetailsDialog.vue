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
          <h3 class="dialog-title">جزئیات شغل</h3>
        </div>

        <div class="dialog-body">
          <div v-if="job" class="details-content">
            <div class="detail-section">
              <h4 class="section-title">اطلاعات کلی</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <label class="detail-label">عنوان:</label>
                  <span class="detail-value">{{ job.title }}</span>
                </div>
                <div class="detail-item">
                  <label class="detail-label">وضعیت:</label>
                  <StatusBadge :status="job.active" :active-text="'فعال'" :inactive-text="'غیرفعال'" />
                </div>
                <div class="detail-item">
                  <label class="detail-label">تاریخ ایجاد:</label>
                  <FormattedDate :date="job.createDate" />
                </div>
                <div class="detail-item">
                  <label class="detail-label">تاریخ ویرایش:</label>
                  <FormattedDate v-if="job.modifyDate" :date="job.modifyDate" />
                  <span v-else class="detail-value">-</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h4 class="section-title">توضیحات</h4>
              <div class="detail-text">
                {{ job.description }}
              </div>
            </div>

            <div class="detail-section">
              <h4 class="section-title">نیازمندی‌ها</h4>
              <div class="detail-text">
                {{ job.requirement }}
              </div>
            </div>

            <div class="detail-section">
              <h4 class="section-title">بخش سازمانی</h4>
              <div class="detail-item">
                <span class="detail-value">{{ getJobSectionName(job.jobSectionId) }}</span>
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
import { computed } from 'vue';
import StatusBadge from '@/components/common/StatusBadge.vue';
import FormattedDate from '@/components/common/FormattedDate.vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  job: { type: Object, default: null },
  jobSections: { type: Array, default: () => [] }
});

const emit = defineEmits(['close']);

const getJobSectionName = (jobSectionId) => {
  if (!jobSectionId || !props.jobSections.length) return '-';
  const section = props.jobSections.find(s => s.id === jobSectionId);
  return section ? section.jobSectionName : '-';
};

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
  max-height: calc(90vh - 140px);
}

.details-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-section {
  background: #f9fafb;
  border-radius: 0.5rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
}

.detail-value {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

.detail-text {
  font-size: 0.875rem;
  color: #374151;
  line-height: 1.6;
  background: white;
  padding: 1rem;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
  white-space: pre-wrap;
}

.dialog-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
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
  justify-content: center;
  gap: 0.5rem;
  min-width: 120px;
}

.btn-close {
  background: #636363;
  color: #ffffff;
}

.btn-close:hover {
  background: #525252;
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
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .detail-section {
    padding: 1rem;
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
