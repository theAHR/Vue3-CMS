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
          <h3 class="dialog-title">{{ isEdit ? 'ویرایش شغل' : 'ایجاد شغل' }}</h3>
        </div>

        <div class="dialog-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="title" class="form-label">
                عنوان
                <span class="required">*</span>
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                class="form-input"
                :class="{ 'error': errors.title }"
                placeholder="وارد کنید ..."
                @input="clearError('title')"
              />
              <div v-if="errors.title" class="error-notification">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="error-text">{{ errors.title }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="description" class="form-label">
                توضیحات
                <span class="required">*</span>
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                class="form-textarea"
                :class="{ 'error': errors.description }"
                placeholder="وارد کنید ..."
                rows="4"
                @input="clearError('description')"
              ></textarea>
              <div v-if="errors.description" class="error-notification">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="error-text">{{ errors.description }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="requirement" class="form-label">
                نیازمندی‌ها
                <span class="required">*</span>
              </label>
              <textarea
                id="requirement"
                v-model="formData.requirement"
                class="form-textarea"
                :class="{ 'error': errors.requirement }"
                placeholder="وارد کنید ..."
                rows="4"
                @input="clearError('requirement')"
              ></textarea>
              <div v-if="errors.requirement" class="error-notification">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="error-text">{{ errors.requirement }}</span>
              </div>
            </div>

            <div class="form-group">
              <label for="jobSectionId" class="form-label">
                بخش سازمانی
                <span class="required">*</span>
              </label>
              <VSelect
                id="jobSectionId"
                v-model="formData.jobSectionId"
                :options="jobSectionOptions"
                :class="{ 'error': errors.jobSectionId }"
                placeholder="انتخاب کنید ..."
                @input="clearError('jobSectionId')"
              />
              <div v-if="errors.jobSectionId" class="error-notification">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="error-text">{{ errors.jobSectionId }}</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">وضعیت</label>
              <div class="toggle-container">
                <label class="toggle-switch">
                  <input
                    type="checkbox"
                    v-model="formData.active"
                    class="toggle-input"
                  />
                  <span class="toggle-slider"></span>
                </label>
                <span class="toggle-label">{{ formData.active ? 'فعال' : 'غیرفعال' }}</span>
              </div>
            </div>
            
            <div class="form-actions">
              <button 
                class="btn btn-confirm success" 
                type="submit"
                :disabled="loading"
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
import VSelect from '@/components/common/VSelect.vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  job: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  jobSectionOptions: { type: Array, default: () => [] }
});

const emit = defineEmits(['close', 'submit']);

const formData = ref({
  title: '',
  description: '',
  requirement: '',
  jobSectionId: '',
  active: true
});

const errors = ref({});

const isEdit = computed(() => !!props.job);

const validateForm = () => {
  errors.value = {};
  
  if (!formData.value.title || !formData.value.title.trim()) {
    errors.value.title = 'عنوان الزامی است';
  } else if (formData.value.title.trim().length < 2) {
    errors.value.title = 'عنوان باید حداقل ۲ کاراکتر باشد';
  } else if (formData.value.title.trim().length > 200) {
    errors.value.title = 'عنوان نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد';
  }

  if (!formData.value.description || !formData.value.description.trim()) {
    errors.value.description = 'توضیحات الزامی است';
  } else if (formData.value.description.trim().length < 10) {
    errors.value.description = 'توضیحات باید حداقل ۱۰ کاراکتر باشد';
  }

  if (!formData.value.requirement || !formData.value.requirement.trim()) {
    errors.value.requirement = 'نیازمندی‌ها الزامی است';
  } else if (formData.value.requirement.trim().length < 10) {
    errors.value.requirement = 'نیازمندی‌ها باید حداقل ۱۰ کاراکتر باشد';
  }

  if (!formData.value.jobSectionId) {
    errors.value.jobSectionId = 'بخش سازمانی الزامی است';
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = (event) => {
  event.preventDefault();
  
  if (validateForm()) {
    const submitData = {
      id: props.job?.id || null,
      title: formData.value.title,
      description: formData.value.description,
      requirement: formData.value.requirement,
      jobSectionId: formData.value.jobSectionId,
      active: formData.value.active
    };

    emit('submit', submitData);
  }
};

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

const resetForm = () => {
  formData.value = {
    title: '',
    description: '',
    requirement: '',
    jobSectionId: '',
    active: true
  };
  errors.value = {};
};

const closeDialog = () => {
  emit('close');
};

watch(() => props.show, (show) => {
  if (show) {
    if (props.job) {
      formData.value = {
        title: props.job.title || '',
        description: props.job.description || '',
        requirement: props.job.requirement || '',
        jobSectionId: props.job.jobSectionId || '',
        active: props.job.active !== undefined ? props.job.active : true
      };
    } else {
      resetForm();
    }
  } else {
    resetForm();
  }
}, { immediate: true });
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

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #374151;
  background-color: white;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  resize: vertical;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #747474;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.error,
.form-textarea.error {
  border-color: #ef4444;
}

.form-input.error:focus,
.form-textarea.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-notification {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  animation: fadeIn 0.2s ease-out;
}

.error-icon {
  width: 1rem;
  height: 1rem;
  color: #ef4444;
  flex-shrink: 0;
}

.error-text {
  font-size: 0.75rem;
  color: #dc2626;
  font-weight: 500;
  line-height: 1.4;
}

.toggle-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle-input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}

.toggle-input:checked + .toggle-slider {
  background-color: #48bb78;
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(26px);
}

.toggle-label {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
