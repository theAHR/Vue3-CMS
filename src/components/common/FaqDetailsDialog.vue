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
          <h3 class="dialog-title">جزئیات سوال متداول</h3>
        </div>

        <!-- Dialog Body -->
        <div class="dialog-body">
          <div v-if="fullFaqData">
            <div class="detail-item">
              <label class="detail-label">عنوان سوال:</label>
              <span class="detail-value">{{ fullFaqData.faqTitle || 'نامشخص' }}</span>
            </div>

            <div class="detail-item">
              <label class="detail-label">پاسخ:</label>
              <div class="detail-value detail-text">{{ fullFaqData.faqAnswer || 'بدون پاسخ' }}</div>
            </div>

            <div class="detail-item">
              <label class="detail-label">وضعیت:</label>
              <span 
                :class="fullFaqData.active ? 'status-active' : 'status-inactive'"
                class="detail-value status-badge"
              >
                {{ fullFaqData.active ? 'فعال' : 'غیرفعال' }}
              </span>
            </div>

            <div class="detail-item">
              <label class="detail-label">دسته‌بندی سوال:</label>
              <span class="detail-value">{{ categoryTitle || 'نامشخص' }}</span>
            </div>

            <div class="detail-item">
              <label class="detail-label">تاریخ ایجاد:</label>
              <span class="detail-value">{{ formattedDate || 'نامشخص' }}</span>
            </div>
          </div>
        </div>

        <!-- Dialog Actions -->
        <div class="dialog-actions">
          <button class="btn btn-close" @click="closeDialog">
            <span>بستن</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { faqCategoryService } from '@/services/api/faqCategory';
import { faqService } from '@/services/api/faq';

const props = defineProps({
  show: { type: Boolean, default: false },
  faq: { type: Object, default: null }
});

const emit = defineEmits(['close']);

const categoryTitle = ref('');
const fullFaqData = ref(null);

const formattedDate = computed(() => {
  const faqData = fullFaqData.value || props.faq;
  if (!faqData?.createDate) return '-';
  return new Date(faqData.createDate).toLocaleDateString('fa-IR');
});

const closeDialog = () => {
  emit('close');
};

const fetchFullFaqData = async (id) => {
  try {
    const response = await faqService.getById(id);
    if (response.data.success && response.data.object) {
      fullFaqData.value = response.data.object;
      console.log('Fetched full FAQ data for details:', fullFaqData.value);
    }
  } catch (err) {
    console.error('Error fetching full FAQ data:', err);
  }
};

const fetchCategoryTitle = async () => {
  const faqData = fullFaqData.value || props.faq;
  if (!faqData?.faqTypeId) {
    categoryTitle.value = '-';
    return;
  }

  try {
    const response = await faqCategoryService.search({
      skip: 0,
      take: 25,
      sort: 'des|createDate'
    });
    
    if (response.data.success) {
      const category = response.data.list?.find(cat => cat.id === faqData.faqTypeId);
      categoryTitle.value = category?.displayName || '-';
    }
  } catch (err) {
    console.error('Error fetching category:', err);
    categoryTitle.value = '-';
  }
};

watch(() => props.show, (newVal) => {
  if (newVal && props.faq && props.faq.id) {
    fetchFullFaqData(props.faq.id);
  }
});

watch(() => props.faq, (newVal) => {
  if (newVal && newVal.id && props.show) {
    fetchFullFaqData(newVal.id);
  }
});

watch(() => fullFaqData.value, (newVal) => {
  if (newVal) {
    fetchCategoryTitle();
  }
});
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
  overflow: hidden;
  flex: 1;
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

.detail-item-full {
  flex-direction: column;
}

.detail-label {
  font-weight: 600;
  color: #374151;
  min-width: 120px;
  margin-right: 0;
  margin-left: 1rem;
}

.detail-item-full .detail-label {
  margin-left: 0;
  margin-bottom: 0.5rem;
}

.detail-value {
  color: #6b7280;
  flex: 1;
}

.detail-text {
  white-space: pre-wrap;
  line-height: 1.6;
  max-height: 200px;
  overflow-y: auto;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-active {
  background-color: #dcfce7;
  color: #166534;
}

.status-inactive {
  background-color: #fee2e2;
  color: #991b1b;
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

/* RTL specific adjustments */
.dialog-header {
  flex-direction: row-reverse;
}

.detail-item {
  flex-direction: row;
}

.detail-item-full {
  flex-direction: column;
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
