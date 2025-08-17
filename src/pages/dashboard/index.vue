<template>
  <div class="dashboard">
    <!-- Page Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">داشبورد</h1>
          <p class="page-description">نمای کلی از وضعیت سیستم و آمار</p>
        </div>
        <div class="header-actions">
          <Button 
            variant="primary" 
            icon="M12 4v16m8-8H4"
            text="گزارش جدید"
            @click="createReport"
          />
          <Button 
            variant="outline" 
            icon="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.121A1 1 0 013 6.414V4z"
            text="فیلتر"
            @click="showFilters = !showFilters"
          />
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <Card 
        v-for="stat in stats" 
        :key="stat.id"
        :title="stat.title"
        :icon="stat.icon"
        :badge="stat.badge"
        variant="default"
        hover
        class="stat-card"
      >
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-change" :class="stat.changeType">
            <svg v-if="stat.changeType === 'positive'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14l5-5 5 5z"/>
            </svg>
            <svg v-else-if="stat.changeType === 'negative'" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
            <span>{{ stat.change }}%</span>
          </div>
        </div>
        <div class="stat-footer">
          <span class="stat-period">نسبت به ماه گذشته</span>
        </div>
      </Card>
    </div>

    <!-- Charts and Analytics -->
    <div class="charts-grid">
      <Card 
        title="فعالیت‌های اخیر"
        icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        variant="primary"
        class="chart-card"
      >
        <div class="chart-container">
          <div class="chart-placeholder">
            <svg class="chart-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <p>نمودار فعالیت‌ها</p>
            <small>در حال توسعه...</small>
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
            <p>نمودار دایره‌ای</p>
            <small>در حال توسعه...</small>
          </div>
        </div>
      </Card>
    </div>

    <!-- Recent Activities -->
    <div class="activities-section">
      <Card 
        title="فعالیت‌های اخیر"
        icon="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        variant="info"
        class="activities-card"
      >
        <div class="activities-list">
          <div 
            v-for="activity in recentActivities" 
            :key="activity.id"
            class="activity-item"
          >
            <div class="activity-icon" :class="activity.type">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path :d="activity.icon" />
              </svg>
            </div>
            <div class="activity-content">
              <div class="activity-title">{{ activity.title }}</div>
              <div class="activity-description">{{ activity.description }}</div>
              <div class="activity-meta">
                <span class="activity-user">{{ activity.user }}</span>
                <span class="activity-time">{{ formatRelativeTime(activity.time) }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <template #footer>
          <div class="activities-footer">
            <Button 
              variant="outline" 
              text="مشاهده همه"
              @click="viewAllActivities"
            />
          </div>
        </template>
      </Card>
    </div>

    <!-- Quick Actions -->
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/common/Button.vue';
import Card from '@/components/common/Card.vue';
import { formatRelativeTime } from '@/utils/helpers';

const router = useRouter();

// Reactive data
const showFilters = ref(false);

// Stats data
const stats = ref([
  {
    id: 1,
    title: 'کل اخبار',
    value: '1,234',
    change: '+12.5',
    changeType: 'positive',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z',
    badge: 'جدید'
  },
  {
    id: 2,
    title: 'کاربران فعال',
    value: '856',
    change: '+8.2',
    changeType: 'positive',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  },
  {
    id: 3,
    title: 'محتویات منتشر شده',
    value: '2,156',
    change: '+15.3',
    changeType: 'positive',
    icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
  },
  {
    id: 4,
    title: 'درخواست‌های جدید',
    value: '23',
    change: '-5.2',
    changeType: 'negative',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'
  }
]);

// Recent activities data
const recentActivities = ref([
  {
    id: 1,
    type: 'news',
    title: 'خبر جدید منتشر شد',
    description: 'خبر "افتتاح پروژه جدید" توسط مدیر سیستم منتشر شد',
    user: 'مدیر سیستم',
    time: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z'
  },
  {
    id: 2,
    type: 'user',
    title: 'کاربر جدید ثبت شد',
    description: 'کاربر "احمد محمدی" با نقش نویسنده ثبت شد',
    user: 'مدیر کاربران',
    time: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  },
  {
    id: 3,
    type: 'content',
    title: 'محتوا ویرایش شد',
    description: 'محتوا "راهنمای استفاده" توسط ویرایشگر بروزرسانی شد',
    user: 'ویرایشگر',
    time: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z'
  },
  {
    id: 4,
    type: 'system',
    title: 'پشتیبان‌گیری انجام شد',
    description: 'پشتیبان‌گیری خودکار از پایگاه داده با موفقیت انجام شد',
    user: 'سیستم',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    icon: 'M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z'
  }
]);

// Quick actions data
const quickActions = ref([
  {
    id: 1,
    title: 'افزودن خبر',
    description: 'ایجاد خبر جدید',
    icon: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    handler: () => router.push('/news/create')
  },
  {
    id: 2,
    title: 'مدیریت کاربران',
    description: 'مشاهده و ویرایش کاربران',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    handler: () => router.push('/users')
  },
  {
    id: 3,
    title: 'گزارش‌ها',
    description: 'مشاهده گزارش‌های سیستم',
    icon: 'M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8V4h6v4h4v10z',
    handler: () => router.push('/reports')
  },
  {
    id: 4,
    title: 'تنظیمات',
    description: 'تنظیمات سیستم',
    icon: 'M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.5-0.24,0.97-0.56,1.39-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z',
    handler: () => router.push('/settings')
  }
]);

// Methods
const createReport = () => {
  console.log('Creating new report...');
  // Implement report creation logic
};

const viewAllActivities = () => {
  router.push('/activities');
};

// Lifecycle
onMounted(() => {
  console.log('Dashboard mounted');
});
</script>

<style scoped>
.dashboard {
  max-width: 100%;
}

/* Page Header */
.page-header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.header-left {
  flex: 1;
}

.page-title {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-description {
  margin: 0;
  font-size: 1.1rem;
  color: #6c757d;
  font-weight: 400;
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.stat-card {
  transition: all 0.3s ease;
}

.stat-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  line-height: 1;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
}

.stat-change.positive {
  color: #28a745;
  background: rgba(40, 167, 69, 0.1);
}

.stat-change.negative {
  color: #dc3545;
  background: rgba(220, 53, 69, 0.1);
}

.stat-change svg {
  width: 16px;
  height: 16px;
}

.stat-footer {
  text-align: left;
}

.stat-period {
  font-size: 0.85rem;
  color: #6c757d;
}

/* Charts Grid */
.charts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
  margin-bottom: 30px;
}

.chart-card {
  min-height: 300px;
}

.chart-container {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-placeholder {
  text-align: center;
  color: #6c757d;
}

.chart-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.chart-placeholder p {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.chart-placeholder small {
  font-size: 0.9rem;
  opacity: 0.7;
}

/* Activities Section */
.activities-section {
  margin-bottom: 30px;
}

.activities-card {
  min-height: 400px;
}

.activities-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background: #f8f9fa;
  transition: background 0.2s ease;
}

.activity-item:hover {
  background: #e9ecef;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-icon.news {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.activity-icon.user {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.activity-icon.content {
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
}

.activity-icon.system {
  background: linear-gradient(135deg, #17a2b8 0%, #6f42c1 100%);
}

.activity-icon svg {
  width: 20px;
  height: 20px;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 4px;
}

.activity-description {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 8px;
  line-height: 1.4;
}

.activity-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 0.8rem;
}

.activity-user {
  color: #667eea;
  font-weight: 500;
}

.activity-time {
  color: #adb5bd;
}

.activities-footer {
  display: flex;
  justify-content: center;
}

/* Quick Actions Section */
.quick-actions-section {
  margin-bottom: 30px;
}

.quick-actions-card {
  min-height: 300px;
}

.quick-actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
  background: linear-gradient(135deg, #ffc107 0%, #fd7e14 100%);
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

/* Responsive Design */
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
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .stat-value {
    font-size: 2rem;
  }
  
  .quick-actions-grid {
    grid-template-columns: 1fr;
  }
  
  .page-title {
    font-size: 1.5rem;
  }
  
  .page-description {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: 0;
  }
  
  .page-header {
    margin-bottom: 20px;
  }
  
  .stats-grid {
    gap: 12px;
  }
  
  .charts-grid {
    gap: 16px;
  }
  
  .activity-item {
    padding: 12px;
  }
  
  .quick-action-item {
    padding: 16px;
  }
}
</style>