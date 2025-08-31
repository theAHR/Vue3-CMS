<template>
  <!-- Blur Overlay -->
  <div class="blur-overlay"></div>
  
  <div class="logout-container">
    <div class="logout-card">
      <div class="logout-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M16 17L21 12L16 7" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M21 12H9" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <h1>خروج از سیستم</h1>
      <p>آیا مطمئن هستید که می‌خواهید از سیستم خارج شوید؟</p>
      
      <div class="logout-actions">
        <button @click="handleLogout" class="logout-button" :disabled="loading">
          <svg v-if="loading" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="spinner">
            <path d="M12 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 18V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span v-else>بله، خروج</span>
        </button>
        
        <button @click="cancelLogout" class="cancel-button">
          انصراف
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
import { useSnackbar } from '@/utils/snackbar'

const router = useRouter()
const accountStore = useAccountStore()
const { success, error } = useSnackbar()

const loading = ref(false)

const handleLogout = async () => {
  loading.value = true
  
  await accountStore.logout()
  success('خروج با موفقیت انجام شد')
  router.push('/account/auth')
  
  loading.value = false
}

const cancelLogout = () => {
  router.go(-1)
}

onMounted(() => {
  if (!accountStore.getIsAuthenticate) {
    router.push('/account/auth')
  }
})
</script>

<style scoped>
.blur-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
  pointer-events: none; /* Allow clicks to pass through to underlying content */
}

.logout-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  position: relative;
  z-index: 1001;
}

.logout-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.logout-icon {
  margin-bottom: 24px;
}

.logout-card h1 {
  color: #2d3748;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}

.logout-card p {
  color: #718096;
  font-size: 16px;
  margin-bottom: 32px;
  line-height: 1.6;
}

.logout-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.logout-button {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-button:hover:not(:disabled) {
  background: #c53030;
  transform: translateY(-2px);
}

.logout-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.cancel-button {
  background: #e2e8f0;
  color: #4a5568;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  background: #cbd5e0;
  transform: translateY(-2px);
}

@media (max-width: 480px) {
  .logout-card {
    padding: 24px;
    margin: 16px;
  }
  
  .logout-actions {
    flex-direction: column;
  }
  
  .logout-button,
  .cancel-button {
    width: 100%;
  }
}
</style> 