<template>
  <div class="v-data-table">
    <!-- Table Actions -->
    <div class="table-actions">
      <div class="actions-left">
        <slot name="search">
          <SearchBar 
            v-if="showSearchBar"
            placeholder="جستجو..."
            @search="handleSearch"
            @input="handleSearchInput"
          />
        </slot>
      </div>
      
      <div class="actions-right">
        <slot name="actions">
          <Button 
            v-if="showAddButton"
            text="افزودن"
            variant="success"
            icon="M12 4v16m8-8H4"
            @click="$emit('add')"
          />
        </slot>
      </div>
    </div>

    <!-- Data Table -->
    <Card variant="table" class="table-card">
      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.key" :class="[column.class, getColumnHeaderClass(column.key)]">
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id || index" class="table-row">
              <td v-for="column in columns" :key="column.key" :class="[column.class, getColumnCellClass(column.key)]">
                <!-- Row Number -->
                <span v-if="column.key === 'rowNumber'">
                  {{ index + 1 }}
                </span>
                
                <!-- Title -->
                <span v-else-if="column.key === 'title'" class="title-cell">
                  {{ item[column.key] }}
                </span>
                
                <!-- Date -->
                <span v-else-if="column.key === 'createDate'" class="date-cell">
                  <FormattedDate :date="item[column.key]" format="date-only" />
                </span>
                
                <!-- Status -->
                <span v-else-if="column.key === 'active'" class="status-cell">
                  <StatusBadge :is-active="item[column.key]" />
                </span>
                
                <!-- Actions -->
                <div v-else-if="column.key === 'actions'" class="actions-cell">
                  <div class="actions-dropdown">
                    <button class="actions-trigger" @click="toggleActions(index)">
                      <svg viewBox="0 0 24 24" fill="currentColor" class="actions-icon">
                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                      </svg>
                    </button>
                    
                    <div v-if="openActionsIndex === index" class="actions-menu">
                      <button 
                        v-for="action in actions" 
                        :key="action.key"
                        class="action-item"
                        @click="handleAction(action.key, item)"
                      >
                        <svg v-if="action.icon" viewBox="0 0 24 24" fill="currentColor" class="action-icon">
                          <path :d="action.icon" />
                        </svg>
                        {{ action.label }}
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Default cell content -->
                <span v-else>{{ item[column.key] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Empty State -->
        <div v-if="items.length === 0 && !loading" class="empty-state">
          <p>هیچ داده‌ای یافت نشد</p>
        </div>
        
        <!-- Loading State -->
        <div v-if="loading" class="loading-overlay">
          <div class="loading-spinner"></div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="showLoadMore" class="load-more-section">
        <Button 
          text="نمایش بیشتر"
          variant="outline"
          :loading="loadingMore"
          @click="handleLoadMore"
        />
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Button from './Button.vue';
import Card from './Card.vue';
import SearchBar from './SearchBar.vue';
import FormattedDate from './FormattedDate.vue';
import StatusBadge from './StatusBadge.vue';

const props = defineProps({
  columns: { type: Array, required: true },
  items: { type: Array, default: () => [] },
  actions: { 
    type: Array, 
    default: () => [
      { key: 'edit', label: 'ویرایش', icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
      { key: 'details', label: 'جزئیات', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
      { key: 'delete', label: 'حذف', icon: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' }
    ]
  },
  showAddButton: { type: Boolean, default: true },
  showSearchBar: { type: Boolean, default: true },
  loading: { type: Boolean, default: false },
  showLoadMore: { type: Boolean, default: false },
  loadingMore: { type: Boolean, default: false }
});

const emit = defineEmits(['add', 'edit', 'details', 'delete', 'search', 'search-input', 'load-more']);

const openActionsIndex = ref(null);

const toggleActions = (index) => {
  openActionsIndex.value = openActionsIndex.value === index ? null : index;
};

const handleAction = (actionKey, item) => {
  openActionsIndex.value = null;
  emit(actionKey, item);
};

const handleSearch = (query) => {
  emit('search', query);
};

const handleSearchInput = (query) => {
  emit('search-input', query);
};

const handleLoadMore = () => {
  emit('load-more');
};

const getColumnHeaderClass = (key) => {
  switch (key) {
    case 'title':
      return 'title-header';
    case 'rowNumber':
      return 'row-number-header';
    case 'createDate':
      return 'date-header';
    case 'active':
      return 'status-header';
    case 'actions':
      return 'actions-header';
    default:
      return 'default-header';
  }
};

const getColumnCellClass = (key) => {
  switch (key) {
    case 'title':
      return 'title-cell';
    case 'rowNumber':
      return 'row-number-cell';
    case 'createDate':
      return 'date-cell';
    case 'active':
      return 'status-cell';
    case 'actions':
      return 'actions-cell';
    default:
      return 'default-cell';
  }
};

// Close actions menu when clicking outside
document.addEventListener('click', (event) => {
  if (!event.target.closest('.actions-dropdown')) {
    openActionsIndex.value = null;
  }
});
</script>

<style scoped>
.v-data-table {
  width: 100%;
  direction: rtl;
}

.table-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.actions-left {
  display: flex;
  align-items: center;
}

.actions-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}


.table-container {
  position: relative;
  min-height: 200px;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.data-table th {
  padding: 0.5rem;
  text-align: right;
  font-weight: 500;
  color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  background-color: #444444;
}

/* Column header widths */
.title-header {
  width: 40%;
}

.row-number-header {
  width: 8%;
  text-align: center;
}

.date-header {
  width: 16%;
  text-align: center;
}

.status-header {
  width: 16%;
  text-align: center;
}

.actions-header {
  width: 20%;
  text-align: center;
}

.default-header {
  width: 20%;
}

.data-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  font-size: 0.8rem;
}

/* Column cell widths */
.title-cell {
  font-weight: 500;
  color: #1f2937;
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row-number-cell {
  width: 8%;
  text-align: center;
}

.date-cell {
  width: 16%;
  color: #6b7280;
  font-size: 0.8rem;
}

.status-cell {
  width: 16%;
  text-align: center;
}

.actions-cell {
  position: relative;
  text-align: center;
}

.actions-dropdown {
  position: relative;
  display: flex;
  justify-content: center;
}

.actions-trigger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.actions-trigger:hover {
  background-color: #f3f4f6;
}

.actions-icon {
  width: 1.25rem;
  height: 1.25rem;
  color: #6b7280;
}

.actions-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 50;
  min-width: 120px;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: none;
  background: none;
  width: 100%;
  text-align: right;
  cursor: pointer;
  font-size: 0.875rem;
  color: #374151;
}

.action-item:hover {
  background-color: #f9fafb;
}

.action-icon {
  width: 1rem;
  height: 1rem;
  color: #6b7280;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #5c5c5c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.load-more-section {
  display: flex;
  justify-content: center;
  padding: 1rem;
  border-top: 1px solid #e5e7eb;
}
</style>
