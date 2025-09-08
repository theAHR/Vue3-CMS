<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || loading"
    @click="handleClick"
    :type="type"
  >
    <div v-if="loading" class="loading-spinner">
      <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 18V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    
    <div v-else class="button-content">
      <img 
        v-if="iconSrc && iconPosition === 'left'" 
        :src="iconSrc" 
        :alt="text || 'Icon'"
        class="button-icon left"
      />
      
      <svg v-else-if="icon && iconPosition === 'left'" class="button-icon left" viewBox="0 0 24 24" fill="currentColor">
        <path :d="icon" />
      </svg>
      
      <span v-if="!iconOnly" class="button-text">{{ text }}</span>
      
      <img 
        v-if="iconSrc && iconPosition === 'right'" 
        :src="iconSrc" 
        :alt="text || 'Icon'"
        class="button-icon right"
      />
      
      <svg v-else-if="icon && iconPosition === 'right'" class="button-icon right" viewBox="0 0 24 24" fill="currentColor">
        <path :d="icon" />
      </svg>
    </div>
  </button>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark', 'outline'].includes(value)
  },
  
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  
  text: {
    type: String,
    default: ''
  },
  
  icon: {
    type: String,
    default: ''
  },
  
  iconPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  
  iconOnly: {
    type: Boolean,
    default: false
  },
  
  loading: {
    type: Boolean,
    default: false
  },
  
  disabled: {
    type: Boolean,
    default: false
  },
  
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  
  fullWidth: {
    type: Boolean,
    default: false
  },
  
  rounded: {
    type: Boolean,
    default: false
  },
  
  shadow: {
    type: Boolean,
    default: false
  },

  iconSrc: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['click']);

const buttonClasses = computed(() => {
  const classes = [
    'btn',
    `btn-${props.variant}`,
    `btn-${props.size}`,
    {
      'btn-icon-only': props.iconOnly,
      'btn-full-width': props.fullWidth,
      'btn-rounded': props.rounded,
      'btn-shadow': props.shadow,
      'btn-loading': props.loading,
      'btn-disabled': props.disabled
    }
  ];
  
  return classes;
});

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  user-select: none;
  white-space: nowrap;
}

.btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover:not(:disabled) {
  background: #5a6268;
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
}

.btn-success:hover:not(:disabled) {
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.3);
}

.btn-warning {
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
  color: white;
}

.btn-warning:hover:not(:disabled) {
  box-shadow: 0 8px 25px rgba(255, 193, 7, 0.3);
}

.btn-danger {
  background: linear-gradient(135deg, #dc3545 0%, #e83e8c 100%);
  color: white;
}

.btn-danger:hover:not(:disabled) {
  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.3);
}

.btn-info {
  background: linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%);
  color: white;
}

.btn-info:hover:not(:disabled) {
  box-shadow: 0 8px 25px rgba(23, 162, 184, 0.3);
}

.btn-light {
  background: #f8f9fa;
  color: #495057;
  border: 1px solid #dee2e6;
}

.btn-light:hover:not(:disabled) {
  background: #e9ecef;
}

.btn-dark {
  background: #343a40;
  color: white;
}

.btn-dark:hover:not(:disabled) {
  background: #23272b;
}

.btn-outline {
  background: transparent;
  background-color: #f8f8f8;
  color: #0c0c0c;
  border: 1px solid #cccccc;
}

.btn-outline:hover:not(:disabled) {
  box-shadow: 0 8px 25px rgba(202, 202, 202, 0.3);
}


.btn-small {
  padding: 8px 16px;
  font-size: 0.8rem;
  min-height: 32px;
}

.btn-medium {
  padding: 10px 18px;
  font-size: 0.9rem;
  min-height: 40px;
}

.btn-large {
  padding: 16px 32px;
  font-size: 1rem;
  min-height: 48px;
}

.btn-icon-only {
  padding: 0;
  min-width: 40px;
}

.btn-icon-only.btn-small {
  min-width: 32px;
}

.btn-icon-only.btn-large {
  min-width: 48px;
}

.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.button-text {
  font-weight: 500;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.button-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.button-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.btn-small .button-icon {
  width: 16px;
  height: 16px;
}

.btn-large .button-icon {
  width: 20px;
  height: 20px;
}

.btn-loading {
  cursor: wait;
}

.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  width: 18px;
  height: 18px;
  animation: spin 1s linear infinite;
}

.btn-small .spinner {
  width: 16px;
  height: 16px;
}

.btn-large .spinner {
  width: 20px;
  height: 20px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.btn-full-width {
  width: 100%;
}

.btn-rounded {
  border-radius: 25px;
}

.btn-shadow {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.btn-shadow:hover:not(:disabled) {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .btn-medium {
    padding: 10px 20px;
    font-size: 0.85rem;
  }
  
  .btn-large {
    padding: 14px 28px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .btn-medium {
    padding: 8px 16px;
    font-size: 0.8rem;
  }
  
  .btn-large {
    padding: 12px 24px;
    font-size: 0.9rem;
  }
}
</style>
