<template>
  <Transition name="dialog">
    <div v-if="modelValue" class="confirm-dialog-overlay" @click="handleOverlayClick">
      <div class="confirm-dialog" @click.stop>
      <div class="dialog-header">
        <div class="icon-container" :class="type">
          <svg v-if="type === 'danger'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <svg v-else-if="type === 'warning'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
          </svg>
          <svg v-else-if="type === 'success'" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
          </svg>
        </div>
        <h3 class="dialog-title">{{ title }}</h3>
        <p class="dialog-message">{{ message }}</p>
      </div>
      
      <div class="dialog-actions">
        <button 
          class="btn btn-cancel" 
          @click="handleCancel"
          :disabled="loading"
        >
          {{ cancelText }}
        </button>
        <button 
          class="btn btn-confirm" 
          :class="type"
          @click="handleConfirm"
          :disabled="loading"
        >
          <svg v-if="loading" class="loading-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span v-else>{{ confirmText }}</span>
        </button>
      </div>
    </div>
  </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'تأیید عملیات'
  },
  message: {
    type: String,
    default: 'آیا مطمئن هستید که می‌خواهید این عملیات را انجام دهید؟'
  },
  confirmText: {
    type: String,
    default: 'تأیید'
  },
  cancelText: {
    type: String,
    default: 'انصراف'
  },
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['info', 'success', 'warning', 'danger'].includes(value)
  },
  loading: {
    type: Boolean,
    default: false
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const handleConfirm = () => {
  if (!props.loading) {
    emit('confirm')
  }
}

const handleCancel = () => {
  if (!props.loading) {
    emit('cancel')
    emit('update:modelValue', false)
  }
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay && !props.loading) {
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
.confirm-dialog-overlay {
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

.confirm-dialog {
  background: white;
  border-radius: 20px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  max-width: 450px;
  width: 100%;
  overflow: hidden;
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

.dialog-header {
  padding: 32px 32px 24px;
  text-align: center;
}

.icon-container {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 32px;
}

.icon-container.info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.icon-container.success {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
}

.icon-container.warning {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
  color: white;
}

.icon-container.danger {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
  color: white;
}

.dialog-title {
  margin: 0 0 16px 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.dialog-message {
  margin: 0 0 24px 0;
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.5;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.dialog-actions {
  display: flex;
  gap: 16px;
  padding: 24px 32px 32px;
  border-top: 1px solid #f1f5f9;
}

.btn {
  flex: 1;
  padding: 14px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-cancel {
  background: #f1f5f9;
  color: #64748b;
}

.btn-cancel:hover:not(:disabled) {
  background: #e2e8f0;
  color: #475569;
  transform: translateY(-2px);
}

.btn-confirm {
  color: white;
  font-weight: 600;
}

.btn-confirm.info {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.btn-confirm.success {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
}

.btn-confirm.warning {
  background: linear-gradient(135deg, #ed8936 0%, #dd6b20 100%);
}

.btn-confirm.danger {
  background: linear-gradient(135deg, #f56565 0%, #e53e3e 100%);
}

.btn-confirm:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.loading-icon {
  width: 20px;
  height: 20px;
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

@media (max-width: 480px) {
  .confirm-dialog {
    margin: 20px;
    border-radius: 16px;
  }
  
  .dialog-header {
    padding: 24px 24px 20px;
  }
  
  .dialog-actions {
    padding: 20px 24px 24px;
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
  
  .icon-container {
    width: 56px;
    height: 56px;
    font-size: 28px;
  }
  
  .dialog-title {
    font-size: 20px;
  }
  
  .dialog-message {
    font-size: 15px;
  }
}
</style>
