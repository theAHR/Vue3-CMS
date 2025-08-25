<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1>پروفایل کاربری</h1>
      <p>اطلاعات شخصی شما</p>
    </div>
    
    <div class="profile-content">
      <div v-if="loading" class="loading-state">
        <Loading text="در حال بارگذاری اطلاعات..." />
      </div>
      
      <div v-else class="profile-card">
        <div class="profile-avatar">
          <div class="avatar-placeholder">
            {{ userInitials }}
          </div>
        </div>
        
        <div class="profile-info">
          <div class="info-row">
            <label>نام:</label>
            <span>{{ profileData.name || 'نامشخص' }}</span>
          </div>
          
          <div class="info-row">
            <label>نام خانوادگی:</label>
            <span>{{ profileData.lastName || 'نامشخص' }}</span>
          </div>
          
          <div class="info-row">
            <label>نام کاربری:</label>
            <span>{{ profileData.username || 'نامشخص' }}</span>
          </div>
          
          <div class="info-row">
            <label>شماره موبایل:</label>
            <span>{{ profileData.mobileNo || 'نامشخص' }}</span>
          </div>
          
          <div class="info-row">
            <label>وضعیت:</label>
            <span :class="['status', profileData.active ? 'active' : 'inactive']">
              {{ profileData.active ? 'فعال' : 'غیرفعال' }}
            </span>
          </div>
          
          <div class="info-row">
            <label>نقش:</label>
            <span>{{ profileData.roleId || 'نامشخص' }}</span>
          </div>
          
          <div class="info-row">
            <label>تاریخ ایجاد:</label>
            <span>{{ formatDate(profileData.createDate) }}</span>
          </div>
          
          <div class="info-row">
            <label>آخرین بروزرسانی:</label>
            <span>{{ formatDate(profileData.modifyDate) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAccountStore } from '@/stores/account'
import Loading from '@/components/common/Loading.vue'
import Title from '@/components/common/Title.vue';

const accountStore = useAccountStore()
const profileData = ref({})
const loading = ref(false)

const user = computed(() => accountStore.getUser)

const userInitials = computed(() => {
  const name = profileData.value.name || ''
  const lastName = profileData.value.lastName || ''
  return (name.charAt(0) + lastName.charAt(0)).toUpperCase()
})

const formatDate = (dateString) => {
  if (!dateString) return 'نامشخص'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('fa-IR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'نامشخص'
  }
}

const fetchProfileData = async () => {
  if (!accountStore.getIsAuthenticate) {
    return
  }
  
  loading.value = true
  try {
    const response = await accountStore.readUserInfo()
    if (response.data.success) {
      profileData.value = response.data.object
    }
  } catch (error) {
    console.error('Error loading profile data:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProfileData()
})
</script>

<style scoped>
.profile-container {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

.profile-header {
  text-align: center;
  margin-bottom: 32px;
}

.profile-header h1 {
  color: #2d3748;
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 8px;
}

.profile-header p {
  color: #718096;
  font-size: 16px;
}

.profile-content {
  display: flex;
  justify-content: center;
}

.profile-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 32px;
  width: 100%;
  max-width: 600px;
  display: flex;
  gap: 32px;
  align-items: flex-start;
}

.profile-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 32px;
  font-weight: 600;
}

.profile-info {
  flex: 1;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-state p {
  color: #6c757d;
  font-size: 16px;
  margin: 0;
}

.info-row {
  display: flex;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f1f5f9;
}

.info-row:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.info-row label {
  font-weight: 600;
  color: #4a5568;
  min-width: 140px;
  text-align: right;
}

.info-row span {
  color: #2d3748;
  margin-right: 16px;
}

.status {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status.active {
  background: #c6f6d5;
  color: #22543d;
}

.status.inactive {
  background: #fed7d7;
  color: #742a2a;
}

@media (max-width: 768px) {
  .profile-card {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }
  
  .info-row {
    flex-direction: column;
    text-align: center;
  }
  
  .info-row label {
    min-width: auto;
    margin-bottom: 4px;
  }
  
  .info-row span {
    margin-right: 0;
  }
}
</style>
