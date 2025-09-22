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
          <h3 class="dialog-title">جزئیات کاربر</h3>
        </div>

        <div class="dialog-body">
          <div v-if="user" class="user-details">
            <div class="detail-section">
              <h4 class="section-title">اطلاعات شخصی</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <label class="detail-label">نام:</label>
                  <span class="detail-value">{{ user.name || '-' }}</span>
                </div>
                <div class="detail-item">
                  <label class="detail-label">نام خانوادگی:</label>
                  <span class="detail-value">{{ user.lastName || '-' }}</span>
                </div>
                <div class="detail-item">
                  <label class="detail-label">نام کاربری:</label>
                  <span class="detail-value">{{ user.username || '-' }}</span>
                </div>
                <div class="detail-item">
                  <label class="detail-label">شماره موبایل:</label>
                  <span class="detail-value">{{ user.mobileNo || '-' }}</span>
                </div>
              </div>
            </div>

            <div class="detail-section">
              <h4 class="section-title">اطلاعات سیستمی</h4>
              <div class="detail-grid">
                <div class="detail-item">
                  <label class="detail-label">نقش:</label>
                  <span class="detail-value">{{ getRoleName(user.userRole) }}</span>
                </div>
                <div class="detail-item">
                  <label class="detail-label">وضعیت:</label>
                  <span class="detail-value">
                    <span :class="['status-badge', user.active ? 'active' : 'inactive']">
                      {{ user.active ? 'فعال' : 'غیرفعال' }}
                    </span>
                  </span>
                </div>
                <div class="detail-item">
                  <label class="detail-label">تاریخ ایجاد:</label>
                  <span class="detail-value">{{ formatDate(user.createDate) }}</span>
                </div>
                <div class="detail-item">
                  <label class="detail-label">آخرین ویرایش:</label>
                  <span class="detail-value">{{ formatDate(user.modifyDate) }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="dialog-actions">
            <button 
              class="btn btn-cancel" 
              @click="closeDialog"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  user: { type: Object, default: null }
});

const emit = defineEmits(['close']);

const closeDialog = () => {
  emit('close');
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

const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return '-';
  }
};
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

.user-details {
  margin-bottom: 2rem;
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e5e7eb;
}

.detail-grid {
  display: grid;
  gap: 1rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  border: 1px solid #e5e7eb;
}

.detail-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  min-width: 120px;
}

.detail-value {
  font-size: 0.875rem;
  color: #374151;
  font-weight: 500;
  text-align: left;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
}

.status-badge.active {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.inactive {
  background-color: #fee2e2;
  color: #dc2626;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
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

.btn-cancel {
  background: #636363;
  color: #ffffff;
}

.btn-cancel:hover {
  background: #4a4a4a;
}

.dialog-header {
  flex-direction: row-reverse;
}

.dialog-actions {
  flex-direction: row-reverse;
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
  
  .detail-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .detail-label {
    min-width: auto;
  }
  
  .detail-value {
    text-align: right;
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
