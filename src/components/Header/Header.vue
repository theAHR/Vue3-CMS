<template>
  <header class="header">
    <!-- Confirm Dialog for Logout -->
    <ConfirmDialog
      v-model="showLogoutConfirm"
      title="خروج از سیستم"
      message="آیا مطمئن هستید که می‌خواهید از سیستم خارج شوید؟"
      confirm-text="بله، خروج"
      cancel-text="انصراف"
      type="danger"
      :loading="isLoggingOut"
      @confirm="handleLogoutConfirm"
      @cancel="showLogoutConfirm = false"
    />
    <div class="header-content">
      <div class="header-left">
        <!-- Hamburger Menu for Mobile -->
        <button class="hamburger-menu" @click="toggleSidebar" title="منو">
          <svg class="hamburger-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
      </div>
      <div class="header-right">
        <!-- Notifications -->
        <div class="header-actions">
          <button class="action-button notification-btn" @click="toggleNotifications" :class="{ active: showNotifications }">
            <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
            <span v-if="notificationCount > 0" class="notification-badge">{{ notificationCount }}</span>
          </button>

          <!-- Messages -->
          <button class="action-button message-btn" @click="toggleMessages" :class="{ active: showMessages }">
            <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
            <span v-if="messageCount > 0" class="message-badge">{{ messageCount }}</span>
          </button>

          <!-- Profile Button -->
          <div class="profile-section">
            <button class="action-button profile-btn" @click="navigateTo('/account/profile')" title="پروفایل">
              <svg class="action-icon" viewBox="0 0 67 67" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M27.6433 66.1886C29.5769 66.4971 31.4675 66.6495 33.3621 66.6495C42.1707 66.6495 50.5181 63.2511 56.8541 56.9151C64.5846 49.1846 67.9831 38.5601 66.2057 27.7041C63.9245 13.9461 52.7217 2.7431 38.9637 0.462097C28.1087 -1.3152 17.4437 2.0832 9.75267 9.8137C2.06517 17.5403 -1.33733 28.1657 0.479267 39.0247C2.76047 52.7397 13.9283 63.9076 27.6433 66.1886ZM14.6233 54.8296C14.3889 54.5952 14.1975 54.4038 13.967 54.2085H14.0022V52.6265C14.0022 46.2124 19.1819 41.0325 25.5572 41.0325H41.0532C47.4673 41.0325 52.6432 46.2513 52.6432 52.6265V54.2476C52.526 54.3648 52.4127 54.4702 52.2955 54.5757C52.1783 54.6851 52.065 54.7905 51.9479 54.9038L51.8307 54.9819C46.6549 59.3881 40.1627 61.8217 33.3227 61.8217C26.4829 61.8217 19.9167 59.3881 14.7757 54.9428L14.6233 54.8296ZM24.553 15.3766C26.7952 12.8258 29.9241 11.4352 33.2835 11.4352L33.3225 11.4742C34.0569 11.4742 34.8303 11.5133 35.5647 11.6695C40.0842 12.5172 43.8342 16.2672 44.6819 20.7867C45.4554 24.9195 44.0647 29.0172 40.9358 31.7597C37.8069 34.4667 33.5178 35.3144 29.4588 34.0019C26.1346 32.9199 23.3924 30.1777 22.3104 26.8535C20.9979 22.7597 21.8108 18.4708 24.553 15.3766Z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Logout Button -->
        <div class="logout-section">
          <button class="logout-button" @click="showLogoutConfirm = true" title="خروج از سیستم" :disabled="isLoggingOut">
            <svg v-if="!isLoggingOut" class="logout-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
            </svg>
            <svg v-else class="logout-icon loading" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span class="logout-text">{{ isLoggingOut ? 'در حال خروج...' : 'خروج' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Notifications Panel -->
    <div v-if="showNotifications" class="notifications-panel">
      <div class="panel-header">
        <h3>اعلان‌ها</h3>
        <button class="close-btn" @click="showNotifications = false">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      <div class="panel-content">
        <div v-if="notifications.length === 0" class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <p>اعلان جدیدی وجود ندارد</p>
        </div>
        <div v-else class="notification-list">
          <div v-for="notification in notifications" :key="notification.id" class="notification-item">
            <div class="notification-icon">
              <svg v-if="notification.type === 'info'" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              <svg v-else-if="notification.type === 'warning'" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <div class="notification-content">
              <p class="notification-title">{{ notification.title }}</p>
              <p class="notification-message">{{ notification.message }}</p>
              <span class="notification-time">{{ notification.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Messages Panel -->
    <div v-if="showMessages" class="messages-panel">
      <div class="panel-header">
        <h3>پیام‌ها</h3>
        <button class="close-btn" @click="showMessages = false">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      <div class="panel-content">
        <div v-if="messages.length === 0" class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
          <p>پیام جدیدی وجود ندارد</p>
        </div>
        <div v-else class="message-list">
          <div v-for="message in messages" :key="message.id" class="message-item">
            <div class="message-avatar">
              <img :src="message.avatar" :alt="message.sender" />
            </div>
            <div class="message-content">
              <p class="message-sender">{{ message.sender }}</p>
              <p class="message-preview">{{ message.preview }}</p>
              <span class="message-time">{{ message.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import ConfirmDialog from '../common/ConfirmDialog.vue';

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();

// Reactive data
const searchQuery = ref('');
const showNotifications = ref(false);
const showMessages = ref(false);
const isLoggingOut = ref(false);
const showLogoutConfirm = ref(false);

// Mock data
const notificationCount = ref(3);
const messageCount = ref(2);

// Mock notifications
const notifications = ref([
  {
    id: 1,
    type: 'info',
    title: 'خبر جدید',
    message: 'یک خبر جدید در سیستم ثبت شده است',
    time: '5 دقیقه پیش'
  },
  {
    id: 2,
    type: 'warning',
    title: 'توجه',
    message: 'لطفاً اطلاعات پروفایل خود را تکمیل کنید',
    time: '1 ساعت پیش'
  },
  {
    id: 3,
    type: 'success',
    title: 'عملیات موفق',
    message: 'عملیات ذخیره‌سازی با موفقیت انجام شد',
    time: '2 ساعت پیش'
  }
]);

// Mock messages
const messages = ref([
  {
    id: 1,
    sender: 'مدیر سیستم',
    preview: 'لطفاً گزارش ماهانه را بررسی کنید',
    time: '10 دقیقه پیش',
    avatar: '/src/assets/img/img/HajAmir.jpg'
  },
  {
    id: 2,
    sender: 'پشتیبانی فنی',
    preview: 'مشکل شما حل شده است',
    time: '1 ساعت پیش',
    avatar: '/src/assets/img/img/HajAmir.jpg'
  }
]);

// Computed properties
const currentPage = computed(() => {
  const pathMap = {
    '/dashboard': 'داشبورد',
    '/news': 'خبر',
    '/announcements': 'اطلاعیه‌ها',
    '/circulars': 'بخشنامه‌ها',
    '/instructions': 'دستورالعمل‌ها',
    '/faq': 'سوالات متداول',
    '/job': 'مدیریت شغل',
    '/multimedia': 'ویدئوهای آموزشی',
    '/guide': 'راهنما',
    '/contact-requests': 'درخواست‌های تماس',
    '/rate-and-review': 'نظرات کاربران',
    '/social-networks': 'شبکه‌های اجتماعی',
    '/users': 'مدیریت کاربران',
    '/roles': 'نقش‌ها',
    '/account': 'حساب کاربری'
  };
  
  for (const [path, title] of Object.entries(pathMap)) {
    if (route.path.startsWith(path)) {
      return title;
    }
  }
  return 'صفحه اصلی';
});

const currentSubPage = computed(() => {
  const path = route.path;
  if (path.includes('/list')) return 'لیست';
  if (path.includes('/categories')) return 'دسته‌بندی';
  if (path.includes('/profile')) return 'پروفایل';
  if (path.includes('/auth')) return 'احراز هویت';
  if (path.includes('/sections')) return 'بخش‌ها';
  if (path.includes('/requests')) return 'درخواست‌ها';
  return null;
});

// Methods
const toggleSidebar = () => {
  appStore.toggleMobileSidebar();
};

const handleSearch = () => {
  // Implement search functionality
  console.log('Searching for:', searchQuery.value);
};

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
  if (showNotifications.value) {
    showMessages.value = false;
  }
};

const toggleMessages = () => {
  showMessages.value = !showMessages.value;
  if (showMessages.value) {
    showNotifications.value = false;
  }
};

const navigateTo = (path) => {
  router.push(path);
};

const handleLogoutConfirm = async () => {
  isLoggingOut.value = true;
  try {
    // Import and use the account store for logout
    const { useAccountStore } = await import('@/stores/account');
    const { useSnackbar } = await import('@/utils/snackbar');
    
    const accountStore = useAccountStore();
    const { success, error: showError } = useSnackbar();
    
    await accountStore.logout();
    success('خروج با موفقیت انجام شد');
    router.push('/account/auth');
  } catch (error) {
    console.error('Logout error:', error);
    
    // Show error message to user
    const { useSnackbar } = await import('@/utils/snackbar');
    const { error: showError } = useSnackbar();
    
    if (error.response?.status === 401) {
      showError('توکن منقضی شده است. لطفاً دوباره وارد شوید.');
    } else {
      showError('خطا در خروج از سیستم. لطفاً دوباره تلاش کنید.');
    }
    
    // Even if logout fails, redirect to login
    router.push('/account/auth');
  } finally {
    isLoggingOut.value = false;
    showLogoutConfirm.value = false;
  }
};

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.header')) {
    showNotifications.value = false;
    showMessages.value = false;
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  right: 300px;
  left: 0;
  height: 70px;
  background: #ffffff;
  border-bottom: 1px solid #e1e5e9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  z-index: 999;
  transition: right 0.3s ease;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

/* Left Section */
.header-left {
  display: flex;
  align-items: center;
}

.hamburger-menu {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 12px;
  background: #f8f9fa;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  display: none;
  align-items: center;
  justify-content: center;
}

.hamburger-menu:hover {
  background: #e9ecef;
  color: #495057;
  transform: translateY(-2px);
}

.hamburger-icon {
  width: 20px;
  height: 20px;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #6c757d;
}

.breadcrumb-item {
  font-weight: 500;
  color: #495057;
}

.breadcrumb-separator {
  color: #adb5bd;
}

/* Center Section */
.header-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-container {
  width: 100%;
  max-width: 450px;
}

.search-input-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #adb5bd;
  pointer-events: none;
  z-index: 2;
}

.search-input {
  width: 100%;
  height: 48px;
  padding: 0 60px 0 50px;
  border: 2px solid #e9ecef;
  border-radius: 25px;
  font-size: 0.95rem;
  background: #f8f9fa;
  transition: all 0.3s ease;
  text-align: right;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.search-input::placeholder {
  color: #adb5bd;
  font-weight: 400;
}

.search-btn {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.search-btn:hover {
  transform: translateY(-50%) scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.search-btn svg {
  width: 18px;
  height: 18px;
}

/* Right Section */
.header-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.action-button {
  position: relative;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 12px;
  background: #f8f9fa;
  color: #6c757d;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-button:hover {
  background: #e9ecef;
  color: #495057;
  transform: translateY(-2px);
}

.action-button.active {
  background: #667eea;
  color: #ffffff;
}

.action-icon {
  width: 20px;
  height: 20px;
}

.notification-badge,
.message-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff6b6b;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  line-height: 1;
}

/* Profile Section */
.profile-section {
  display: flex;
  align-items: center;
}

.profile-btn {
  background: #f8f9fa;
  color: #6c757d;
  transition: all 0.3s ease;
}

.profile-btn:hover {
  background: #e9ecef;
  color: #495057;
  transform: translateY(-2px);
}

/* Logout Section */
.logout-section {
  display: flex;
  align-items: center;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border: none;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.logout-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.3);
}

.logout-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}



.logout-icon {
  width: 18px;
  height: 18px;
}

.logout-text {
  font-weight: 500;
}

/* Panels */
.notifications-panel,
.messages-panel {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid #e9ecef;
  width: 350px;
  max-height: 400px;
  z-index: 1000;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
}

.panel-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
}

.close-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #adb5bd;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e9ecef;
  color: #495057;
}

.close-btn svg {
  width: 18px;
  height: 18px;
}

.panel-content {
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #adb5bd;
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 0.9rem;
}

/* Notification List */
.notification-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notification-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;
  transition: background 0.2s ease;
}

.notification-item:hover {
  background: #e9ecef;
}

.notification-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: #e3f2fd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1976d2;
  flex-shrink: 0;
}

.notification-content {
  flex: 1;
}

.notification-title {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.notification-message {
  margin: 0 0 8px 0;
  font-size: 0.85rem;
  color: #4a5568;
  line-height: 1.4;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.notification-time {
  font-size: 0.75rem;
  color: #adb5bd;
}

/* Message List */
.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;
  transition: background 0.2s ease;
}

.message-item:hover {
  background: #e9ecef;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  flex: 1;
}

.message-sender {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.message-preview {
  margin: 0 0 8px 0;
  font-size: 0.85rem;
  color: #6c757d;
  line-height: 1.4;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.message-time {
  font-size: 0.75rem;
  color: #adb5bd;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    right: 0;
  }
  
  .header-content {
    padding: 0 15px;
  }
  
  .header-left {
    flex: 0 0 auto;
  }
  
  .hamburger-menu {
    display: flex;
    width: 38px;
    height: 38px;
  }
  
  .hamburger-icon {
    width: 18px;
    height: 18px;
  }
  
  .search-container {
    max-width: 300px;
  }
  
  .logout-text {
    display: none;
  }
  
  .notifications-panel,
  .messages-panel {
    width: 300px;
    left: 20px;
    transform: none;
  }
}

@media (max-width: 480px) {
  .header {
    height: 60px;
  }
  
  .header-content {
    padding: 0 10px;
  }
  
  .header-left {
    flex: 0 0 auto;
  }
  
  .hamburger-menu {
    display: flex;
    width: 36px;
    height: 36px;
  }
  
  .hamburger-icon {
    width: 16px;
    height: 16px;
  }
  
  .search-container {
    max-width: 250px;
  }
  
  .search-input {
    height: 42px;
    font-size: 0.85rem;
  }
  
  .action-button {
    width: 38px;
    height: 38px;
  }
  
  .notifications-panel,
  .messages-panel {
    width: calc(100vw - 40px);
    left: 20px;
  }
}
</style>
