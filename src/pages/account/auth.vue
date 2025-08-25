<template>
  <div class="login-container">
    <div class="bg-blur" :style="backgroundStyle"></div>
    <div class="login-card">
      <div class="login-header">
        <img src="@/assets/img/img/logo.svg" alt="Logo" class="logo" />
        <h1>ورود به پنل مدیریت</h1>
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">نام کاربری</label>
          <input
            id="username"
            v-model="form.username"
            type="text"
            :class="{ 'error': errors.username }"
            placeholder="نام کاربری خود را وارد کنید"
            required
          />
          <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
        </div>
        
        <div class="form-group">
          <label for="password">رمز عبور</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            :class="{ 'error': errors.password }"
            placeholder="رمز عبور خود را وارد کنید"
            required
          />
          <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
        </div>
        
        <button 
          type="submit" 
          class="login-button"
          :disabled="loading"
        >
          <span v-if="loading">در حال ورود...</span>
          <span v-else>ورود</span>
        </button>
      </form>
      
      <div v-if="errorMessage" class="error-alert">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/account'
import { useSnackbar } from '@/utils/snackbar'
import Image from '@/assets/img/img/background.jpg'

const router = useRouter()
const accountStore = useAccountStore()
const { success, error } = useSnackbar()

const backgroundStyle = computed(() => ({
  backgroundImage: `url(${Image})`
}))

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

const loading = ref(false)
const errorMessage = ref('')

const validateForm = () => {
  let isValid = true
  errors.username = ''
  errors.password = ''
  
  if (!form.username.trim()) {
    errors.username = 'نام کاربری الزامی است'
    isValid = false
  }
  
  if (!form.password.trim()) {
    errors.password = 'رمز عبور الزامی است'
    isValid = false
  }
  
  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return
  
  loading.value = true
  errorMessage.value = ''
  
  try {
    await accountStore.login({
      username: form.username.trim(),
      password: form.password
    })
    
    await accountStore.readUserInfo()
    
    success('ورود با موفقیت انجام شد')
    router.push('/dashboard')
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.response?.data?.message || 'خطا در ورود. لطفاً دوباره تلاش کنید'
    error(errorMessage.value)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f8fa;
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.bg-blur {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  background-size: cover;
  opacity: 1;

  z-index: 0;
}
.login-card {
  background: #fff;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  box-shadow: none;
  padding: 32px 24px 24px 24px;
  width: 100%;
  max-width: 350px;
  text-align: center;
  position: relative;
  z-index: 1;
}
.login-header {
  margin-bottom: 28px;
}
.logo {
  width: 60px;
  height: 60px;
  margin-bottom: 12px;
}
.login-header h1 {
  color: #222;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0;
  letter-spacing: 0.2px;
}
.login-form {
  text-align: right;
}
.form-group {
  margin-bottom: 16px;
  text-align: right;
}
.form-group label {
  display: block;
  color: #444;
  font-size: 13px;
  font-weight: 500;
  margin-bottom: 6px;
  text-align: right;
}
.form-group input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background: #fafbfc;
  transition: border 0.2s;
  box-sizing: border-box;
}
.form-group input:focus {
  outline: none;
  border-color: #667eea;
  background: #fff;
}
.form-group input.error {
  border-color: #e53e3e;
  background: #fff5f5;
}
.error-message {
  color: #e53e3e;
  font-size: 12px;
  margin-top: 3px;
  display: block;
  text-align: right;
}
.login-button {
  width: 100%;
  background: #667eea;
  color: #fff;
  border: none;
  padding: 12px 0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 6px;
}
.login-button:hover:not(:disabled) {
  background: #556cd6;
  transform: translateY(-2px);
}
.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}
.error-alert {
  background: #fff5f5;
  color: #c53030;
  padding: 10px 12px;
  border-radius: 6px;
  margin-top: 16px;
  font-size: 13px;
  border: 1px solid #ffe0e0;
}
@media (max-width: 480px) {
  .login-card {
    padding: 16px 4px 16px 4px;
    margin: 8px;
    border-radius: 8px;
  }
  .login-header h1 {
    font-size: 17px;
  }
  .logo {
    width: 44px;
    height: 44px;
  }
}
</style>
