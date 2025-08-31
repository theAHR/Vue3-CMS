<template>
  <div class="search-bar">
    <div class="search-input-container">
      <input
        v-model="searchQuery"
        type="text"
        :placeholder="placeholder"
        class="search-input"
        @input="handleInput"
        @keyup.enter="handleSearch"
      />
    </div>
    <button 
      class="search-button"
      @click="handleSearch"
      :disabled="disabled"
    >
      <img 
        src="/src/assets/img/icons/search.svg" 
        alt="جستجو"
        class="search-icon"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
    default: 'جستجو...'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  initialValue: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['search', 'input']);

const searchQuery = ref(props.initialValue);

const handleInput = () => {
  emit('input', searchQuery.value);
};

const handleSearch = () => {
  emit('search', searchQuery.value);
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #e4e4e4;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

.search-input-container:focus-within {
    border: 1px solid #777777;
}

.search-input {
  border: none;
  outline: none;
  padding: 12px 16px;
  font-size: 0.9rem;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
  color: #374151;
  background: transparent;
  min-width: 300px;
  height: 40px;
  box-sizing: border-box;
}

.search-input::placeholder {
  color: #9ca3af;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.search-button {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  border: none;
  padding: 12px 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 40px;
  border-radius: 8px;
}

.search-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.search-icon {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1); /* Makes the icon white */
}

/* Responsive Design */
@media (max-width: 768px) {
  .search-bar {
    display: none; /* Hide search bar on mobile */
  }
  .search-input {
    min-width: 250px;
    padding: 10px 14px;
    font-size: 0.85rem;
    height: 36px;
  }
  
  .search-button {
    padding: 10px 14px;
    min-height: 36px;
    height: 36px;
  }
  
  .search-icon {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 480px) {
  .search-bar {
    display: none; /* Hide search bar on mobile */
  }
  .search-input {
    min-width: 200px;
    padding: 8px 12px;
    font-size: 0.8rem;
    height: 32px;
  }
  
  .search-button {
    padding: 8px 12px;
    min-height: 32px;
    height: 32px;
  }
  
  .search-icon {
    width: 14px;
    height: 14px;
  }
}
</style>
