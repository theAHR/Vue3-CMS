<template>
  <div class="v-select-container" :class="{ 'error': hasError, 'disabled': disabled }">
    <div 
      class="v-select-wrapper"
      :class="{ 'open': isOpen, 'error': hasError, 'disabled': disabled }"
      @click="toggleDropdown"
    >
      <div class="v-select-display">
        <span class="v-select-text" :class="{ 'placeholder': !selectedOption }">
          {{ selectedOption ? selectedOption.label : placeholder }}
        </span>
        <svg 
          class="v-select-arrow" 
          :class="{ 'rotated': isOpen }"
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
    </div>

    <Transition name="dropdown">
      <div v-if="isOpen" class="v-select-dropdown">
        <div class="v-select-options">
          <div
            v-for="option in options"
            :key="option.value"
            class="v-select-option"
            :class="{ 'selected': option.value === modelValue, 'disabled': option.disabled }"
            @click="selectOption(option)"
          >
            <span class="option-text">{{ option.label }}</span>
            <svg 
              v-if="option.value === modelValue"
              class="check-icon"
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>
      </div>
    </Transition>

    <div v-if="errorMessage" class="error-notification">
      <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <span class="error-text">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  placeholder: {
    type: String,
    default: 'انتخاب کنید...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const isOpen = ref(false);
const dropdownRef = ref(null);

const hasError = computed(() => !!props.errorMessage);

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue) || null;
});

const toggleDropdown = () => {
  if (props.disabled) return;
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  if (option.disabled) return;
  
  emit('update:modelValue', option.value);
  emit('change', option);
  isOpen.value = false;
};

const closeDropdown = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

watch(() => props.modelValue, () => {
  isOpen.value = false;
});

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<style scoped>
.v-select-container {
  position: relative;
  width: 100%;
}

.v-select-wrapper {
  position: relative;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  min-height: 44px;
}

.v-select-wrapper:hover:not(.disabled) {
  border-color: #9ca3af;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.v-select-wrapper:focus-within {
  border-color: #747474;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.v-select-wrapper.open {
  border-color: #747474;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.v-select-wrapper.error {
  border-color: #ef4444;
}

.v-select-wrapper.error:focus-within {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.v-select-wrapper.disabled {
  background-color: #f9fafb;
  border-color: #e5e7eb;
  cursor: not-allowed;
  opacity: 0.6;
}

.v-select-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  min-height: 44px;
}

.v-select-text {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
  flex: 1;
  text-align: right;
}

.v-select-text.placeholder {
  color: #585858;
  font-weight: 500;
}

.v-select-arrow {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
  transition: transform 0.2s ease-in-out;
  flex-shrink: 0;
  margin-right: 0.5rem;
}

.v-select-arrow.rotated {
  transform: rotate(180deg);
}

.v-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 50;
  margin-top: 0.25rem;
  max-height: 200px;
  overflow-y: auto;
}

.v-select-options {
  padding: 0.25rem;
}

.v-select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: 2px 0;
  position: relative;
  min-height: 44px;
}

.v-select-option:hover:not(.disabled) {
  background-color: #f8fafc;
  color: #1e293b;
  font-weight: 600;
  transform: translateX(4px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.v-select-option.disabled {
  color: #9ca3af;
  cursor: not-allowed;
  opacity: 0.6;
}

.option-text {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  flex: 1;
  text-align: right;
}

.check-icon {
  width: 1rem;
  height: 1rem;
  color: #176431;
  flex-shrink: 0;
  margin-right: 0.5rem;
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

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease-out;
}

.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.dropdown-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.v-select-dropdown::-webkit-scrollbar {
  width: 6px;
}

.v-select-dropdown::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.v-select-dropdown::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.v-select-dropdown::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

@media (max-width: 640px) {
  .v-select-display {
    padding: 0.625rem 0.75rem;
  }
  
  .v-select-option {
    padding: 0.625rem 0.75rem;
  }
  
  .option-text {
    font-size: 0.8125rem;
  }
}
</style>
