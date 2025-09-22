<template>
  <header class="header">
    <!-- Blur Overlay -->
    <div v-if="showLogoutConfirm" class="blur-overlay"></div>
    
    <!-- Confirm Dialog for Logout -->
    <ConfirmDialog
      v-model="showLogoutConfirm"
      title="خروج از سیستم"
      message="آیا مطمئن هستید که می‌خواهید از سیستم خارج شوید؟"
      confirm-text="تایید"
      cancel-text="انصراف"
      type="danger"
      :loading="isLoggingOut"
      @confirm="handleLogoutConfirm"
      @cancel="showLogoutConfirm = false"
    />

    <div class="header-content">
      <!-- Left Section -->
      <div class="header-left">
        <button class="hamburger-menu" @click="toggleSidebar" title="منو">
          <svg class="hamburger-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
      </div>

      <!-- Right Section -->
      <div class="header-right">
        <!-- Action Buttons -->
        <div class="header-actions">
          <!-- Notifications -->
          <button 
            class="action-button notification-btn" 
            @click="toggleNotifications" 
            :class="{ active: showNotifications }"
            title="اعلان‌ها"
          >
            <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
            </svg>
            <span v-if="notificationCount > 0" class="notification-badge">
              {{ notificationCount }}
            </span>
          </button>

          <!-- Messages -->
          <button 
            class="action-button message-btn" 
            @click="toggleMessages" 
            :class="{ active: showMessages }"
            title="پیام‌ها"
          >
            <svg class="action-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
            <span v-if="messageCount > 0" class="message-badge">
              {{ messageCount }}
            </span>
          </button>

          <!-- Profile -->
          <button 
            class="action-button profile-btn" 
            @click="navigateTo('/account/profile')" 
            title="پروفایل"
          >
            <svg class="action-icon" viewBox="0 0 67 67" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M27.6433 66.1886C29.5769 66.4971 31.4675 66.6495 33.3621 66.6495C42.1707 66.6495 50.5181 63.2511 56.8541 56.9151C64.5846 49.1846 67.9831 38.5601 66.2057 27.7041C63.9245 13.9461 52.7217 2.7431 38.9637 0.462097C28.1087 -1.3152 17.4437 2.0832 9.75267 9.8137C2.06517 17.5403 -1.33733 28.1657 0.479267 39.0247C2.76047 52.7397 13.9283 63.9076 27.6433 66.1886ZM14.6233 54.8296C14.3889 54.5952 14.1975 54.4038 13.967 54.2085H14.0022V52.6265C14.0022 46.2124 19.1819 41.0325 25.5572 41.0325H41.0532C47.4673 41.0325 52.6432 46.2513 52.6432 52.6265V54.2476C52.526 54.3648 52.4127 54.4702 52.2955 54.5757C52.1783 54.6851 52.065 54.7905 51.9479 54.9038L51.8307 54.9819C46.6549 59.3881 40.1627 61.8217 33.3227 61.8217C26.4829 61.8217 19.9167 59.3881 14.7757 54.9428L14.6233 54.8296ZM24.553 15.3766C26.7952 12.8258 29.9241 11.4352 33.2835 11.4352L33.3225 11.4742C34.0569 11.4742 34.8303 11.5133 35.5647 11.6695C40.0842 12.5172 43.8342 16.2672 44.6819 20.7867C45.4554 24.9195 44.0647 29.0172 40.9358 31.7597C37.8069 34.4667 33.5178 35.3144 29.4588 34.0019C26.1346 32.9199 23.3924 30.1777 22.3104 26.8535C20.9979 22.7597 21.8108 18.4708 24.553 15.3766Z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <!-- Logout Button -->
        <button 
          class="logout-button" 
          @click="showLogoutConfirm = true" 
          :disabled="isLoggingOut"
        >
          <span class="logout-text">خروج</span>
          <svg class="logout-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Notifications Panel -->
    <NotificationsPanel 
      v-if="showNotifications"
      :notifications="notifications"
      @close="showNotifications = false"
    />

    <!-- Messages Panel -->
    <MessagesPanel 
      v-if="showMessages"
      :messages="messages"
      @close="showMessages = false"
    />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import ConfirmDialog from '../common/ConfirmDialog.vue';
import NotificationsPanel from './NotificationsPanel.vue';
import MessagesPanel from './MessagesPanel.vue';

// Composables
const router = useRouter();
const appStore = useAppStore();

// Reactive state
const showNotifications = ref(false);
const showMessages = ref(false);
const isLoggingOut = ref(false);
const showLogoutConfirm = ref(false);

// Mock data
const notificationCount = ref(3);
const messageCount = ref(2);

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

const messages = ref([
  {
    id: 1,
    sender: 'مدیر سیستم',
    preview: 'لطفاً گزارش ماهانه را بررسی کنید',
    time: '10 دقیقه پیش',
    avatar: '/src/assets/img/img/profile.png'
  },
  {
    id: 2,
    sender: 'پشتیبانی فنی',
    preview: 'مشکل شما حل شده است',
    time: '1 ساعت پیش',
    avatar: '/src/assets/img/img/profile.png'
  }
]);

// Methods
const toggleSidebar = () => {
  appStore.toggleMobileSidebar();
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
  
  const { useAccountStore } = await import('@/stores/account');
  const { useSnackbar } = await import('@/utils/snackbar');
  
  const accountStore = useAccountStore();
  const { success } = useSnackbar();
  
  await accountStore.logout();
  success('خروج با موفقیت انجام شد');
  router.push('/account/auth');
  
  isLoggingOut.value = false;
  showLogoutConfirm.value = false;
};

// Event handlers
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
  right: 250px;
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

/* Logout Button */
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

/* Blur Overlay */
.blur-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 998;
  pointer-events: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    right: 0;
  }
  
  .header-content {
    padding: 0 15px;
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
  
  .logout-text {
    display: none;
  }
}

@media (max-width: 480px) {
  .header {
    height: 60px;
  }
  
  .header-content {
    padding: 0 10px;
  }
  
  .hamburger-menu {
    width: 36px;
    height: 36px;
  }
  
  .hamburger-icon {
    width: 16px;
    height: 16px;
  }
  
  .action-button {
    width: 38px;
    height: 38px;
  }
}
</style>
