<template>
  <span :class="statusClass">
    {{ statusText }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  isActive: {
    type: Boolean,
    required: true
  },
  activeText: {
    type: String,
    default: 'فعال'
  },
  inactiveText: {
    type: String,
    default: 'غیر فعال'
  },
  size: {
    type: String,
    default: 'medium',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'outline', 'minimal'].includes(value)
  }
});

const statusText = computed(() => {
  return props.isActive ? props.activeText : props.inactiveText;
});

const statusClass = computed(() => {
  const baseClass = 'status-badge';
  const sizeClass = `status-badge--${props.size}`;
  const variantClass = `status-badge--${props.variant}`;
  const stateClass = props.isActive ? 'status-badge--active' : 'status-badge--inactive';
  
  return [baseClass, sizeClass, variantClass, stateClass].join(' ');
});
</script>

<style scoped>
.status-badge {
  display: inline-block;
  font-weight: 500;
  border-radius: 9999px;
  text-align: center;
  transition: all 0.2s ease;
}

.status-badge--small {
  padding: 0.125rem 0.75rem;
  font-size: 0.625rem;
  min-width: 3rem;
}

.status-badge--small.status-badge--active {
  min-width: 3.7rem;
}

.status-badge--medium {
  padding: 0.25rem 1rem;
  font-size: 0.75rem;
  min-width: 4rem;
}

.status-badge--medium.status-badge--active {
  min-width: 4.8rem;
}

.status-badge--large {
  padding: 0.375rem 1.25rem;
  font-size: 0.875rem;
  min-width: 5rem;
}

.status-badge--large.status-badge--active {
  min-width: 5.5rem;
}

.status-badge--outline {
  background-color: transparent !important;
  border: 1px solid;
}

.status-badge--minimal {
  background-color: transparent !important;
  border: none;
  font-weight: 500;
}

.status-badge--active {
  color: #059669;
  background-color: #d1fae5;
}

.status-badge--active.status-badge--outline {
  border-color: #059669;
}

.status-badge--active.status-badge--minimal {
  color: #059669;
}

.status-badge--inactive {
  color: #ff2e2e;
  background-color: #ffdfdf;
}

.status-badge--inactive.status-badge--outline {
  border-color: #ff2e2e;
}

.status-badge--inactive.status-badge--minimal {
  color: #ff2e2e;
}

.status-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
