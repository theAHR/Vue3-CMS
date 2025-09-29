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

    <!-- Change Password Dialog -->
    <ChangePasswordDialog
      :show="showChangePasswordDialog"
      :user="currentUser"
      :loading="isChangingPassword"
      @close="showChangePasswordDialog = false"
      @submit="handleChangePassword"
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
        <!-- Change Password Button -->
        <button 
          class="change-password-button" 
          @click="showChangePasswordDialog = true"
          :disabled="isChangingPassword"
          title="تغییر رمز عبور"
        >
          <span class="change-password-text">تغییر رمز عبور</span>
          <svg class="change-password-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
          </svg>
        </button>

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

  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAppStore } from '@/stores/app';
import { useAccountStore } from '@/stores/account';
import ConfirmDialog from '../common/ConfirmDialog.vue';
import ChangePasswordDialog from '../common/ChangePasswordDialog.vue';

// Composables
const router = useRouter();
const appStore = useAppStore();
const accountStore = useAccountStore();

// Reactive state
const isLoggingOut = ref(false);
const showLogoutConfirm = ref(false);
const showChangePasswordDialog = ref(false);
const isChangingPassword = ref(false);

// Computed
const currentUser = computed(() => accountStore.user);

// Methods
const toggleSidebar = () => {
  appStore.toggleMobileSidebar();
};



const handleLogoutConfirm = async () => {
  isLoggingOut.value = true;
  
  const { useSnackbar } = await import('@/utils/snackbar');
  const { success } = useSnackbar();
  
  await accountStore.logout();
  success('خروج با موفقیت انجام شد');
  router.push('/account/auth');
  
  isLoggingOut.value = false;
  showLogoutConfirm.value = false;
};

const handleChangePassword = async (data) => {
  isChangingPassword.value = true;
  
  try {
    const { useSnackbar } = await import('@/utils/snackbar');
    const { success, error } = useSnackbar();
    
    // Call the change password API
    await accountStore.changePassword(data);
    success('رمز عبور با موفقیت تغییر کرد');
    showChangePasswordDialog.value = false;
  } catch (err) {
    console.error('Change password error:', err);
    const { useSnackbar } = await import('@/utils/snackbar');
    const { error } = useSnackbar();
    error(err.response?.data?.message || 'خطا در تغییر رمز عبور');
  } finally {
    isChangingPassword.value = false;
  }
};


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

/* Change Password Button */
.change-password-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border: none;
  background: linear-gradient(135deg, #8a8b8b 0%, #6e7070 100%);
  color: white;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-weight: 500;
  font-size: 0.9rem;
}

.change-password-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(104, 104, 104, 0.3);
}

.change-password-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.change-password-icon {
  width: 18px;
  height: 18px;
}

.change-password-text {
  font-weight: 500;
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
  
  .change-password-text {
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
  
}
</style>
