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
    required: false
  },
  state: {
    type: [Number, String],
    required: false
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
  if (props.state !== undefined && props.state !== null) {
    const stateMap = {
      1: 'ثبت شده',
      2: 'درحال بررسی',
      3: 'تایید شده',
      4: 'رد شده'
    };
    return stateMap[props.state] || 'نامشخص';
  }
  return props.isActive ? props.activeText : props.inactiveText;
});

const statusClass = computed(() => {
  const baseClass = 'status-badge';
  const sizeClass = `status-badge--${props.size}`;
  const variantClass = `status-badge--${props.variant}`;
  
  let stateClass = '';
  if (props.state !== undefined && props.state !== null) {
    const stateClassMap = {
      1: 'status-badge--registered',
      2: 'status-badge--reviewing',
      3: 'status-badge--approved',
      4: 'status-badge--rejected'
    };
    stateClass = stateClassMap[props.state] || 'status-badge--unknown';
  } else {
    stateClass = props.isActive ? 'status-badge--active' : 'status-badge--inactive';
  }
  
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

.status-badge--registered {
  color: #6b7280;
  background-color: #f3f4f6;
}

.status-badge--registered.status-badge--outline {
  border-color: #6b7280;
}

.status-badge--registered.status-badge--minimal {
  color: #6b7280;
}

.status-badge--reviewing {
  color: #d97706;
  background-color: #fef3c7;
}

.status-badge--reviewing.status-badge--outline {
  border-color: #d97706;
}

.status-badge--reviewing.status-badge--minimal {
  color: #d97706;
}

.status-badge--approved {
  color: #059669;
  background-color: #d1fae5;
}

.status-badge--approved.status-badge--outline {
  border-color: #059669;
}

.status-badge--approved.status-badge--minimal {
  color: #059669;
}

.status-badge--rejected {
  color: #dc2626;
  background-color: #fee2e2;
}

.status-badge--rejected.status-badge--outline {
  border-color: #dc2626;
}

.status-badge--rejected.status-badge--minimal {
  color: #dc2626;
}

.status-badge--unknown {
  color: #6b7280;
  background-color: #f9fafb;
}

.status-badge--unknown.status-badge--outline {
  border-color: #6b7280;
}

.status-badge--unknown.status-badge--minimal {
  color: #6b7280;
}

.status-badge:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
