<template>
  <div class="profile-container">
    <div class="profile-header">
      <h1>پروفایل کاربری</h1>
      <p>اطلاعات شخصی شما</p>
    </div>
    
    <div class="profile-content">
      <div class="profile-card">
        <div class="profile-avatar">
          <div class="avatar-placeholder">
            {{ userInitials }}
          </div>
        </div>
        
        <div class="profile-info">
          <div class="info-row">
            <label>نام:</label>
            <span>{{ user.name || 'نامشخص' }}</span>
          </div>
          
          <div class="info-row">
            <label>نام خانوادگی:</label>
            <span>{{ user.lastName || 'نامشخص' }}</span>
          </div>
          
          <div class="info-row">
            <label>نام کاربری:</label>
            <span>{{ user.username || 'نامشخص' }}</span>
          </div>
          
          <div class="info-row">
            <label>شماره موبایل:</label>
            <span>{{ user.mobileNo || 'نامشخص' }}</span>
          </div>
          
          <div class="info-row">
            <label>وضعیت:</label>
            <span :class="['status', user.active ? 'active' : 'inactive']">
              {{ user.active ? 'فعال' : 'غیرفعال' }}
            </span>
          </div>
          
          <div class="info-row">
            <label>تاریخ ایجاد:</label>
            <span>{{ formatDate(user.createDate) }}</span>
          </div>
          
          <div class="info-row">
            <label>آخرین بروزرسانی:</label>
            <span>{{ formatDate(user.modifyDate) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAccountStore } from '@/stores/account'

const accountStore = useAccountStore()

const user = computed(() => accountStore.getUser)

const userInitials = computed(() => {
  const name = user.value.name || ''
  const lastName = user.value.lastName || ''
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

onMounted(async () => {
  if (!accountStore.getIsAuthenticate) {
    return
  }
  
  try {
    await accountStore.readUserInfo()
  } catch (error) {
    console.error('Error loading user info:', error)
  }
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
