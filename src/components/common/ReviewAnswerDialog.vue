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
          <h3 class="dialog-title">پاسخ به نظر</h3>
        </div>

        <div class="dialog-body">
          <div v-if="review" class="review-info">
            <div class="review-summary">
              <h4 class="review-title">نظر کاربر:</h4>
              <div class="review-content">
                <div class="review-header">
                  <span class="reviewer-name">{{ review.fullname || 'نامشخص' }}</span>
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
                <p class="review-text">{{ review.text }}</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="answer-form">
            <div class="form-group">
              <label for="answer" class="form-label">
                پاسخ شما
                <span class="required">*</span>
              </label>
              <textarea
                id="answer"
                v-model="formData.answer"
                class="form-textarea"
                :class="{ 'error': errors.answer }"
                placeholder="پاسخ خود را وارد کنید ..."
                rows="4"
                @input="clearError('answer')"
              ></textarea>
              <div v-if="errors.answer" class="error-notification">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="error-text">{{ errors.answer }}</span>
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
                <span v-else>ارسال پاسخ</span>
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
import { ref, watch } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  review: { type: Object, default: null },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['close', 'submit']);

const formData = ref({
  answer: '',
  fullname: '',
  id: null
});

const errors = ref({});

const validateForm = () => {
  errors.value = {};
  
  if (!formData.value.answer || !formData.value.answer.trim()) {
    errors.value.answer = 'پاسخ الزامی است';
  } else if (formData.value.answer.trim().length < 5) {
    errors.value.answer = 'پاسخ باید حداقل ۵ کاراکتر باشد';
  } else if (formData.value.answer.trim().length > 1000) {
    errors.value.answer = 'پاسخ نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد';
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = (event) => {
  event.preventDefault();
  
  if (validateForm()) {
    const submitData = {
      id: formData.value.id,
      answer: formData.value.answer,
      fullname: formData.value.fullname
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
    answer: '',
    fullname: '',
    id: null
  };
  errors.value = {};
};

const closeDialog = () => {
  emit('close');
};

watch(() => props.show, (show) => {
  if (show && props.review) {
    formData.value = {
      answer: props.review.answer || '',
      fullname: props.review.fullname || '',
      id: props.review.id
    };
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

.review-info {
  margin-bottom: 1.5rem;
}

.review-summary {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
}

.review-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.75rem 0;
}

.review-content {
  background: white;
  border-radius: 0.375rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.reviewer-name {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  display: flex;
  gap: 0.125rem;
}

.star {
  width: 1rem;
  height: 1rem;
  color: #d1d5db;
  transition: color 0.2s ease-in-out;
}

.star.filled {
  color: #fbbf24;
}

.rating-text {
  font-weight: 600;
  color: #374151;
  font-size: 0.75rem;
}

.review-text {
  color: #6b7280;
  line-height: 1.6;
  margin: 0;
  font-size: 0.875rem;
}

.answer-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.required {
  color: #ef4444;
  margin-right: 0.25rem;
}

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
  min-height: 100px;
}

.form-textarea:focus {
  outline: none;
  border-color: #747474;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea.error {
  border-color: #ef4444;
}

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
  margin-top: 1rem;
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
  
  .review-header {
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
