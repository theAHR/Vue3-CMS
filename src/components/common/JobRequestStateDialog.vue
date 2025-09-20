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
          <h3 class="dialog-title">تغییر وضعیت درخواست</h3>
        </div>

        <div class="dialog-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label class="form-label">
                وضعیت جدید
                <span class="required">*</span>
              </label>
              <VSelect
                v-model="selectedState"
                :options="stateOptions"
                placeholder="لطفاً وضعیت جدید را انتخاب کنید"
              />
            </div>
            
            <div class="form-actions">
              <button 
                class="btn btn-confirm success" 
                type="submit"
                :disabled="loading || !selectedState"
              >
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
                <span v-else>تایید و ثبت</span>
              </button>
              <button 
                class="btn btn-cancel" 
                @click="closeDialog"
                :disabled="loading"
              >
                بستن
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import VSelect from './VSelect.vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  jobRequest: {
    type: Object,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'submit']);

const selectedState = ref('');

const stateOptions = computed(() => [
  { value: '1', label: 'ثبت شده' },
  { value: '2', label: 'درحال بررسی' },
  { value: '3', label: 'تایید شده' },
  { value: '4', label: 'رد شده' }
]);

watch(() => props.jobRequest, (newJobRequest) => {
  if (newJobRequest) {
    selectedState.value = newJobRequest.state?.toString() || '';
  }
}, { immediate: true });

const closeDialog = () => {
  emit('close');
};

const handleSubmit = () => {
  if (!selectedState.value) return;
  
  const formData = {
    id: props.jobRequest?.id,
    jobRequestId: props.jobRequest?.id,
    applicantFullName: props.jobRequest?.applicantFullName,
    state: parseInt(selectedState.value),
    sort: 'des|createDate'
  };
  
  emit('submit', formData);
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
  max-width: 500px;
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
  max-height: calc(90vh - 120px);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.required {
  color: #ef4444;
  margin-right: 0.25rem;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
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

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-confirm {
  color: white;
  font-weight: 500;
}

.btn-confirm.success {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
}

.btn-cancel {
  background: #636363;
  color: #ffffff;
}

.loading-icon {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* RTL specific adjustments */
.dialog-header {
  flex-direction: row-reverse;
}

.form-actions {
  flex-direction: row-reverse;
}

.required {
  margin-right: 0;
  margin-left: 0.25rem;
}

/* Responsive */
@media (max-width: 640px) {
  .dialog-content {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
  
  .dialog-header,
  .dialog-body {
    padding: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
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
