<template>
  <div :class="cardClasses" :style="cardStyles">
    <!-- Card Header -->
    <div v-if="$slots.header || title" class="card-header">
      <div v-if="title" class="card-title">
        <div v-if="icon" class="card-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path :d="icon" />
          </svg>
        </div>
        <h3 class="title-text">{{ title }}</h3>
        <div v-if="badge" class="card-badge">{{ badge }}</div>
      </div>
      <div v-if="$slots.header" class="card-header-content">
        <slot name="header" />
      </div>
    </div>

    <!-- Card Body -->
    <div class="card-body">
      <slot />
    </div>

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>

    <!-- Loading Overlay -->
    <div v-if="loading" class="card-loading-overlay">
      <div class="loading-spinner">
        <svg class="spinner" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2A10 10 0 1 0 12 22A10 10 0 0 0 12 2M12 4A8 8 0 0 1 12 20A8 8 0 0 1 12 4M12 6A6 6 0 0 0 12 18A6 6 0 0 0 12 6M12 8A4 4 0 0 1 12 16A4 4 0 0 1 12 8Z"/>
        </svg>
        <span class="loading-text">{{ loadingText }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  // Card title
  title: {
    type: String,
    default: ''
  },
  
  // Card icon (SVG path)
  icon: {
    type: String,
    default: ''
  },
  
  // Card badge
  badge: {
    type: String,
    default: ''
  },
  
  // Card variants
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  
  // Card sizes
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  
  // Loading state
  loading: {
    type: Boolean,
    default: false
  },
  
  // Loading text
  loadingText: {
    type: String,
    default: 'در حال بارگذاری...'
  },
  
  // Hover effect
  hover: {
    type: Boolean,
    default: false
  },
  
  // Shadow
  shadow: {
    type: Boolean,
    default: true
  },
  
  // Border radius
  rounded: {
    type: Boolean,
    default: true
  },
  
  // Full height
  fullHeight: {
    type: Boolean,
    default: false
  },
  
  // Custom styles
  customStyle: {
    type: Object,
    default: () => ({})
  }
});

const cardClasses = computed(() => {
  const classes = [
    'card',
    `card-${props.variant}`,
    `card-${props.size}`,
    {
      'card-hover': props.hover,
      'card-shadow': props.shadow,
      'card-rounded': props.rounded,
      'card-full-height': props.fullHeight,
      'card-loading': props.loading
    }
  ];
  
  return classes;
});

const cardStyles = computed(() => {
  return {
    ...props.customStyle
  };
});
</script>

<style scoped>
.card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  border-color: #dee2e6;
}

/* Card Variants */
.card-default {
  background: #ffffff;
}

.card-primary {
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
  border-color: #667eea;
}

.card-success {
  background: linear-gradient(135deg, #f8fff9 0%, #f0fff2 100%);
  border-color: #28a745;
}

.card-warning {
  background: linear-gradient(135deg, #fffef8 0%, #fff8f0 100%);
  border-color: #ffc107;
}

.card-danger {
  background: linear-gradient(135deg, #fff8f8 0%, #fff0f0 100%);
  border-color: #dc3545;
}

.card-info {
  background: linear-gradient(135deg, #f8fdff 0%, #f0f8ff 100%);
  border-color: #17a2b8;
}

.card-small {
  padding: 16px;
}

.card-medium {
  padding: 24px;
}

.card-large {
  padding: 32px;
}

.card-header {
  margin: -24px -24px 20px -24px;
  padding: 20px 24px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
}

.card-small .card-header {
  margin: -16px -16px 16px -16px;
  padding: 16px;
}

.card-large .card-header {
  margin: -32px -32px 24px -32px;
  padding: 24px 32px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
}

.card-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.card-icon svg {
  width: 18px;
  height: 18px;
}

.title-text {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.card-badge {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  text-align: center;
  min-width: 20px;
}

.card-header-content {
  margin-top: 12px;
}

.card-body {
  position: relative;
  z-index: 1;
}

.card-footer {
  margin: 20px -24px -24px -24px;
  padding: 20px 24px;
  border-top: 1px solid #e9ecef;
  background: #f8f9fa;
}

.card-small .card-footer {
  margin: 16px -16px -16px -16px;
  padding: 16px;
}

.card-large .card-footer {
  margin: 24px -32px -32px -32px;
  padding: 24px 32px;
}

/* Hover Effect */
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

/* Shadow */
.card-shadow {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
}

.card-shadow:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
}

/* Rounded */
.card-rounded {
  border-radius: 12px;
}

.card-rounded .card-header {
  border-radius: 12px 12px 0 0;
}

.card-rounded .card-footer {
  border-radius: 0 0 12px 12px;
}

/* Full Height */
.card-full-height {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-full-height .card-body {
  flex: 1;
}

/* Loading State */
.card-loading {
  pointer-events: none;
}

.card-loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: #667eea;
}

.spinner {
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.loading-text {
  font-size: 0.9rem;
  font-weight: 500;
  color: #6c757d;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .card-medium {
    padding: 20px;
  }
  
  .card-large {
    padding: 24px;
  }
  
  .card-header {
    margin: -20px -20px 16px -20px;
    padding: 16px 20px;
  }
  
  .card-footer {
    margin: 16px -20px -20px -20px;
    padding: 16px 20px;
  }
}

@media (max-width: 480px) {
  .card-medium {
    padding: 16px;
  }
  
  .card-large {
    padding: 20px;
  }
  
  .card-header {
    margin: -16px -16px 12px -16px;
    padding: 12px 16px;
  }
  
  .card-footer {
    margin: 12px -16px -16px -16px;
    padding: 12px 16px;
  }
  
  .title-text {
    font-size: 1rem;
  }
  
  .card-icon {
    width: 28px;
    height: 28px;
  }
  
  .card-icon svg {
    width: 16px;
    height: 16px;
  }
}
</style>
