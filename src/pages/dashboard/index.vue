<template>
  <Title title="داشبورد" />
  <div class="dashboard">
    <div class="quick-actions-section">
      <Card 
        title="عملیات سریع"
        icon="M13 10V3L4 14h7v7l9-11h-7z"
        variant="warning"
        class="quick-actions-card"
      >
        <div class="quick-actions-grid">
          <div 
            v-for="action in quickActions" 
            :key="action.id"
            class="quick-action-item"
            @click="action.handler"
          >
            <div class="action-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path :d="action.icon" />
              </svg>
            </div>
            <div class="action-content">
              <div class="action-title">{{ action.title }}</div>
              <div class="action-description">{{ action.description }}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>

    <div class="stats-grid">
      <Card 
        v-for="stat in stats" 
        :key="stat.id"
        :title="stat.title"
        :icon="stat.icon"
        variant="default"
        hover
        class="stat-card"
      >
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
        </div>
      </Card>
    </div>

    <div class="charts-grid">
      <Card 
        title="آمار کلی"
        icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        variant="primary"
        class="chart-card"
      >
        <div class="chart-container">
          <div class="chart-placeholder">
            <svg class="chart-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
        </div>
      </Card>

      <Card 
        title="توزیع محتوا"
        icon="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        variant="success"
        class="chart-card"
      >
        <div class="chart-container">
          <div class="chart-placeholder">
            <svg class="chart-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Card from '@/components/common/Card.vue';
import Title from '@/components/common/Title.vue'

const router = useRouter();

const stats = ref([
  {
    id: 1,
    title: 'کل اخبار',
    value: '0',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z'
  },
  {
    id: 2,
    title: 'کاربران فعال',
    value: '0',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  },
  {
    id: 3,
    title: 'محتویات منتشر شده',
    value: '0',
    icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
  },
  {
    id: 4,
    title: 'درخواست‌های جدید',
    value: '0',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'
  }
]);

const quickActions = ref([
  {
    id: 1,
    title: 'افزودن خبر',
    description: 'ایجاد خبر جدید',
    icon: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    handler: () => router.push('/news')
  },
  {
    id: 2,
    title: 'مدیریت کاربران',
    description: 'مشاهده و ویرایش کاربران',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    handler: () => router.push('/user')
  },
  {
    id: 3,
    title: 'مدیریت نقش‌ها',
    description: 'تنظیم نقش‌ها و دسترسی‌ها',
    icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8V4h6v4h4v10z',
    handler: () => router.push('/role')
  },
  {
    id: 4,
    title: 'تنظیمات',
    description: 'تنظیمات سیستم',
    icon: 'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.5-0.24,0.97-0.56,1.39-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z',
    handler: () => router.push('/settings')
  }
]);

const createReport = () => {
  console.log('Creating new report...');
};
</script>

<style scoped>
.dashboard {
  max-width: 100%;
  height: 100%;
  overflow-y: visible;
}

.page-header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.page-title {
  font-size: 1.8rem;
  color: #3f3f3f
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  transition: all 0.3s ease;
}

.stat-card :deep(.card-icon) {
  background: var(--primary-gradient);
  color: white;
}

.stat-content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #575757;
  line-height: 1;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  min-height: 250px;
  border: none;
}

.chart-card :deep(.card-icon) {
  background: var(--primary-gradient);
  color: white;
}

.chart-container {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  text-align: center;
  color: #6c757d;
}

.chart-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.chart-placeholder p {
  margin: 0 0 6px 0;
  font-size: 1rem;
  font-weight: 500;
}

.chart-placeholder small {
  font-size: 0.85rem;
  opacity: 0.7;
}

.quick-actions-section {
  margin-bottom: 30px;
}

.quick-actions-card {
  min-height: 250px;
  border: none;
}

.quick-actions-card :deep(.card-icon) {
  background: var(--primary-gradient);
  color: white;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.quick-action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  border-radius: 8px;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-action-item:hover {
  background: #e9ecef;
  transform: translateY(-2px);
}

.action-icon {
  width: 48px;
  height: 48px;
  background: var(--secondary-gradient);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 16px;
}

.action-icon svg {
  width: 24px;
  height: 24px;
}

.action-content {
  flex: 1;
}

.action-title {
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 8px;
}

.action-description {
  font-size: 0.85rem;
  color: #6c757d;
  line-height: 1.4;
}

@media (max-width: 1200px) {
  .charts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .header-actions {
    width: 100%;
    justify-content: flex-start;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .quick-actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    margin-bottom: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .charts-grid {
    gap: 16px;
  }
  
  .quick-actions-grid {
    grid-template-columns: 1fr;
  }
  
  .quick-action-item {
    padding: 16px;
  }
}
</style>