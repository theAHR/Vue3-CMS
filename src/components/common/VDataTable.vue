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
        <div class="table-scroll-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th v-for="column in columns" :key="column.key" :class="[column.class, getColumnHeaderClass(column.key)]">
                  {{ column.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id || index" :class="['table-row', getRowClass(index)]">
                <td v-for="column in columns" :key="column.key" :class="[column.class, getColumnCellClass(column.key)]">
                  <!-- Row Number -->
                  <span v-if="column.key === 'rowNumber'">
                    {{ index + 1 }}
                  </span>
                  
                  <!-- Title -->
                  <span v-else-if="column.key === 'title'" class="title-cell">
                    {{ item[column.key] }}
                  </span>
                  
                  <!-- Full Name -->
                  <span v-else-if="column.key === 'fullName'" class="title-cell">
                    {{ item.fullName || `${item.name || ''} ${item.lastName || ''}`.trim() }}
                  </span>
                  
                  <!-- Date -->
                  <span v-else-if="column.key === 'createDate'" class="date-cell">
                    <FormattedDate :date="item[column.key]" format="date-only" />
                  </span>
                  
                  <!-- Status -->
                  <span v-else-if="column.key === 'active'" class="status-cell">
                    <StatusBadge :is-active="item[column.key]" />
                  </span>
                  
                  <!-- State -->
                  <span v-else-if="column.key === 'state'" class="status-cell">
                    <StatusBadge :state="item[column.key]" />
                  </span>
                  
                  <!-- Status (for reviews and contact requests) -->
                  <span v-else-if="column.key === 'status'" class="status-cell">
                    <span class="status-label" :class="getStatusClass(item[column.key])">
                      {{ item[column.key] }}
                    </span>
                  </span>
                  
                  <!-- Job Title -->
                  <span v-else-if="column.key === 'jobTitle'" class="title-cell">
                    {{ item.job?.title || 'نامشخص' }}
                  </span>
                  
                  <!-- Role -->
                  <span v-else-if="column.key === 'role'" class="role-cell">
                    {{ getRoleName(item.userRole) }}
                  </span>
                  
                  <!-- Actions -->
                  <div v-else-if="column.key === 'actions'" class="actions-cell">
                    <div class="actions-dropdown">
                      <button class="actions-trigger" @click="toggleActions(index, $event)">
                        <svg viewBox="0 0 24 24" fill="currentColor" class="actions-icon">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <!-- Default cell content -->
                  <span v-else>{{ item[column.key] }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
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

    <!-- Actions Menu Portal -->
    <div 
      v-if="openActionsIndex !== null" 
      class="actions-menu"
      :style="{
        top: menuPosition.top + 'px',
        left: menuPosition.left + 'px'
      }"
    >
      <button 
        v-for="action in getFilteredActions(items[openActionsIndex])" 
        :key="action.key"
        class="action-item"
        @click="handleAction(action.key, items[openActionsIndex])"
      >
        <svg v-if="action.icon" viewBox="0 0 24 24" fill="currentColor" class="action-icon">
          <path :d="action.icon" />
        </svg>
        {{ action.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue';
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

const emit = defineEmits(['add', 'edit', 'details', 'changePassword', 'delete', 'search', 'search-input', 'load-more']);

const openActionsIndex = ref(null);
const menuPosition = ref({ top: 0, left: 0 });

const toggleActions = (index, event) => {
  if (openActionsIndex.value === index) {
    openActionsIndex.value = null;
  } else {
    const button = event.target.closest('.actions-trigger');
    const rect = button.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    
    let left = rect.left - 85;
    let top = rect.bottom - 20;
    
    if (left < 0) {
      left = rect.right + 5;
    }
    
    if (left + 85 > viewportWidth) {
      left = viewportWidth - 90;
    }
    
    menuPosition.value = {
      top: top,
      left: left
    };
    
    openActionsIndex.value = index;
  }
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

const getFilteredActions = (item) => {
  if (!item) return props.actions;
  
  return props.actions.filter(action => {
    if (action.key === 'check') {
      return item.canCheck === true;
    }
    if (action.key === 'confirm') {
      return item.canConfirm === true;
    }
    if (action.key === 'answer') {
      return item.canAnswer === true;
    }
    return true;
  });
};

const getRoleName = (roleValue) => {
  const roles = {
    1: 'منابع انسانی',
    2: 'کارشناس پشتیبانی',
    3: 'سرپرست پشتیبانی',
    4: 'مدیر سیستم',
    5: 'روابط عمومی'
  };
  return roles[roleValue] || 'نامشخص';
};

const getStatusClass = (status) => {
  switch (status) {
    case 'تایید شده':
    case 'بررسی شده':
      return 'status-confirmed';
    case 'تایید نشده':
    case 'بررسی نشده':
    case 'در انتظار بررسی':
      return 'status-pending';
    case 'فعال':
      return 'status-active';
    case 'غیرفعال':
      return 'status-inactive';
    default:
      return 'status-default';
  }
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
    case 'role':
      return 'role-header';
    case 'actions':
      return 'actions-header';
    case 'applicantFullName':
      return 'applicantFullName-header';
    case 'applicantMobileNumber':
      return 'applicantMobileNumber-header';
    case 'applicantMail':
      return 'applicantMail-header';
    case 'jobTitle':
      return 'jobTitle-header';
    case 'state':
      return 'state-header';
    case 'status':
      return 'status-header';
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
    case 'role':
      return 'role-cell';
    case 'actions':
      return 'actions-cell';
    case 'applicantFullName':
      return 'applicantFullName-cell';
    case 'applicantMobileNumber':
      return 'applicantMobileNumber-cell';
    case 'applicantMail':
      return 'applicantMail-cell';
    case 'jobTitle':
      return 'jobTitle-cell';
    case 'state':
      return 'state-cell';
    case 'status':
      return 'status-cell';
    default:
      return 'default-cell';
  }
};

const getRowClass = (index) => {
  return index % 2 === 0 ? 'row-even' : 'row-odd';
};

// Close actions menu when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.actions-dropdown') && !event.target.closest('.actions-menu')) {
    openActionsIndex.value = null;
  }
};

document.addEventListener('click', handleClickOutside);

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
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
  overflow: hidden;
}

.table-scroll-wrapper {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.table-scroll-wrapper::-webkit-scrollbar {
  height: 8px;
}

.table-scroll-wrapper::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}

.table-scroll-wrapper::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.table-scroll-wrapper::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  min-width: 800px;
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

.role-header {
  width: 18%;
  text-align: center;
}

.actions-header {
  width: 15%;
  text-align: center;
}

.default-header {
  width: 20%;
}

.applicantFullName-header {
  width: 18%;
  text-align: center;
}

.applicantMobileNumber-header {
  width: 15%;
  text-align: center;
}

.applicantMail-header {
  width: 20%;
  text-align: center;
}

.jobTitle-header {
  width: 18%;
  text-align: center;
}

.state-header {
  width: 14%;
  text-align: center;
}

.status-header {
  width: 16%;
  text-align: center;
}

.data-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #f3f4f6;
  color: #374151;
  font-size: 0.8rem;
}

/* Alternating row colors */
.row-even {
  background-color: #ffffff;
}

.row-odd {
  background-color: #f8fafc;
}

.row-even:hover {
  background-color: #f1f5f9;
}

.row-odd:hover {
  background-color: #e2e8f0;
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

.role-cell {
  width: 18%;
  text-align: center;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.actions-cell {
  position: relative;
  text-align: center;
}

.applicantFullName-cell {
  width: 18%;
  text-align: center;
  font-weight: 500;
}

.applicantMobileNumber-cell {
  width: 15%;
  text-align: center;
  color: #6b7280;
}

.applicantMail-cell {
  width: 20%;
  text-align: center;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.jobTitle-cell {
  width: 18%;
  text-align: center;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.state-cell {
  width: 14%;
  text-align: center;
}

.status-cell {
  width: 16%;
  text-align: center;
}

.status-label {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
}

.status-confirmed {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.status-pending {
  background-color: #fef3c7;
  color: #92400e;
  border: 1px solid #fde68a;
}

.status-active {
  background-color: #d1fae5;
  color: #065f46;
  border: 1px solid #a7f3d0;
}

.status-inactive {
  background-color: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.status-default {
  background-color: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
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
  position: fixed;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  min-width: 80px;
  max-height: 150px;
  overflow-y: auto;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.5rem;
  border: none;
  background: none;
  width: 100%;
  text-align: right;
  cursor: pointer;
  font-size: 0.75rem;
  color: #374151;
}

.action-item:hover {
  background-color: #f9fafb;
}

.action-icon {
  width: 0.875rem;
  height: 0.875rem;
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

/* Mobile Responsive Styles */
@media (max-width: 768px) {
  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .table-scroll-wrapper {
    min-width: 100%;
    overflow-x: auto;
  }
  
  .data-table {
    min-width: 900px;
    width: max-content;
  }
  
  .data-table th,
  .data-table td {
    white-space: nowrap;
    min-width: 120px;
  }
  
  .row-number-header,
  .row-number-cell {
    min-width: 60px;
    width: 60px;
  }
  
  .applicantFullName-header,
  .applicantFullName-cell {
    min-width: 140px;
    width: 140px;
  }
  
  .applicantMobileNumber-header,
  .applicantMobileNumber-cell {
    min-width: 120px;
    width: 120px;
  }
  
  .applicantMail-header,
  .applicantMail-cell {
    min-width: 180px;
    width: 180px;
  }
  
  .jobTitle-header,
  .jobTitle-cell {
    min-width: 140px;
    width: 140px;
  }
  
  .createDate-header,
  .createDate-cell {
    min-width: 120px;
    width: 120px;
  }
  
  .state-header,
  .state-cell {
    min-width: 100px;
    width: 100px;
  }
  
  .status-header,
  .status-cell {
    min-width: 100px;
    width: 100px;
  }
  
  .actions-header,
  .actions-cell {
    min-width: 60px;
    width: 60px;
  }
}

@media (max-width: 480px) {
  .data-table {
    min-width: 800px;
  }
  
  .data-table th,
  .data-table td {
    padding: 0.5rem 0.25rem;
    font-size: 0.75rem;
  }
  
  .applicantFullName-header,
  .applicantFullName-cell {
    min-width: 120px;
    width: 120px;
  }
  
  .applicantMobileNumber-header,
  .applicantMobileNumber-cell {
    min-width: 100px;
    width: 100px;
  }
  
  .applicantMail-header,
  .applicantMail-cell {
    min-width: 150px;
    width: 150px;
  }
  
  .jobTitle-header,
  .jobTitle-cell {
    min-width: 120px;
    width: 120px;
  }
  
  .createDate-header,
  .createDate-cell {
    min-width: 100px;
    width: 100px;
  }
  
  .state-header,
  .state-cell {
    min-width: 80px;
    width: 80px;
  }
  
  .status-header,
  .status-cell {
    min-width: 80px;
    width: 80px;
  }
  
  .actions-header,
  .actions-cell {
    min-width: 50px;
    width: 50px;
  }
}
</style>
