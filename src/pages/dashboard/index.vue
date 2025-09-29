<template>
  <Title title="داشبورد" />
  <div class="dashboard">
    <div class="quick-actions-section">
      <Card 
        title="عملیات سریع"
        icon="M13 10V3L4 14h7v7l9-11h-7z"
        variant="warning"
        size="large"
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
              <svg viewBox="0 0 60 60" fill="currentColor">
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
    <div class="charts-grid">
      <Card 
        title="توزیع محتوا"
        icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        variant="primary"
        size="large"
        class="chart-card"
      >
        <div class="chart-container">
          <canvas ref="contentPieChart" class="chart-canvas"></canvas>
        </div>
      </Card>

      <Card 
        title="وضعیت درخواست‌ها"
        icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        variant="success"
        size="large"
        class="chart-card"
      >
        <div class="chart-container">
          <canvas ref="requestsDoughnutChart" class="chart-canvas"></canvas>
        </div>
      </Card>

      <Card 
        title="توزیع مجلات"
        icon="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        variant="warning"
        size="large"
        class="chart-card"
      >
        <div class="chart-container">
          <canvas ref="magazineDonutChart" class="chart-canvas"></canvas>
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
        size="large"
        hover
        class="stat-card"
      >
        <div class="stat-content">
          <div class="stat-value">{{ stat.value }}</div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { Chart, registerables } from 'chart.js';
import Card from '@/components/common/Card.vue';
import Title from '@/components/common/Title.vue';
import { useReportStore } from '@/stores/report';

Chart.register(...registerables);

const router = useRouter();
const reportStore = useReportStore();

const contentPieChart = ref(null);
const requestsDoughnutChart = ref(null);
const magazineDonutChart = ref(null);

const loading = computed(() => reportStore.loading);
const reportData = computed(() => reportStore.reportData);

const stats = computed(() => [
  {
    id: 1,
    title: 'تعداد مجلات منتشر شده',
    value: reportData.value ? (reportData.value.totalMagazinesType1 + reportData.value.totalMagazinesType2 + reportData.value.totalMagazinesType3 + reportData.value.totalMagazinesType4) : '0',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z'
  },
  {
    id: 2,
    title: 'تعداد کاربران فعال',
    value: reportData.value?.totalUsers || '0',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'
  },
  {
    id: 3,
    title: 'تعداد محتویات منتشر شده',
    value: reportData.value ? (reportData.value.totalFaqs + reportData.value.totalGuides + reportData.value.totalMultiMedia + reportData.value.totalJobs) : '0',
    icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z'
  },
  {
    id: 4,
    title: 'درخواست‌های تماس جدید',
    value: reportData.value ? (reportData.value.totalContactRequestUnChecked) : '0',
    icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z'
  }
]);

const quickActions = ref([
  {
    id: 1,
    title: 'افزودن خبر',
    icon: 'M46.0264 16.421H41.8423V6.84204C41.8423 3.06973 38.7136 0 34.8687 0H6.97362C3.12877 0 0 3.06973 0 6.84204V45.158C0 48.9308 3.12877 52 6.97362 52H46.0264C49.8718 52 53 48.9308 53 45.158V23.2631C53 19.4902 49.8718 16.421 46.0264 16.421ZM30.4055 40.779H11.4368C10.5123 40.779 9.76319 40.044 9.76319 39.1364C9.76319 38.2287 10.5117 37.4943 11.4368 37.4943H30.4055C31.3295 37.4943 32.0797 38.2287 32.0797 39.1364C32.0797 40.044 31.3295 40.779 30.4055 40.779ZM30.4055 31.7472H11.4368C10.5123 31.7472 9.76319 31.0122 9.76319 30.1051C9.76319 29.1974 10.5117 28.4619 11.4368 28.4619H30.4055C31.3295 28.4619 32.0797 29.1963 32.0797 30.1051C32.0797 31.0122 31.3295 31.7472 30.4055 31.7472ZM29.2902 21.0733H12.5522C11.0187 21.0733 9.76319 19.8415 9.76319 18.3369V12.8625C9.76319 11.358 11.0187 10.1261 12.5522 10.1261H29.289C30.8224 10.1261 32.078 11.358 32.078 12.8625V18.3369H32.0791C32.0797 19.8415 30.8236 21.0733 29.2902 21.0733ZM50.211 45.158C50.211 47.4211 48.3336 49.2625 46.0276 49.2625C43.7215 49.2625 41.8441 47.4205 41.8441 45.158V19.158H46.0276C48.3348 19.158 50.211 20.9988 50.211 23.2625V45.158Z',
    handler: () => router.push('/news/list?add=true')
  },
  {
    id: 2,
    title: 'افزودن اطلاعیه',
    icon: 'M27.5329 6.61924C27.555 6.64485 27.5716 6.67558 27.5882 6.70375L46.2523 36.6141C46.28 36.6525 46.3049 36.6935 46.327 36.737C46.9304 37.6436 48.2036 37.9459 49.2029 37.4183L49.4465 37.2877C49.4575 37.28 49.4686 37.2749 49.4824 37.2672H49.4797C50.4789 36.7294 50.8332 35.5513 50.2796 34.6139L50.2602 34.5857L31.5267 4.56265C31.5101 4.5396 31.4963 4.51399 31.4824 4.49094C30.8901 3.59456 29.6473 3.28209 28.6481 3.77899C28.6149 3.79948 28.5789 3.81741 28.5429 3.83277L28.3575 3.9301V3.93266C28.3464 3.93778 28.3353 3.94546 28.3243 3.95058C27.325 4.49096 26.9707 5.66905 27.5271 6.60895L27.5326 6.61663L27.5329 6.61924ZM12.4784 25.4252L4.34383 29.7687C0.208617 31.9968 -1.22244 36.8882 1.13587 40.74C1.14971 40.763 1.16631 40.7861 1.18015 40.8117C3.59932 44.6149 8.86968 45.921 13.0184 43.7441L13.0516 43.7262L21.1862 39.3801L12.4784 25.4252ZM22.4899 38.9324L13.5469 24.6037L26.8937 8.13111L44.5807 36.4738L22.4871 38.9324H22.4899ZM26.3151 53.172L26.9711 54.222L26.9905 54.2502L26.9877 54.2476C27.5164 55.144 27.1815 56.2683 26.2266 56.7856L22.5923 58.7269H22.5951C22.5619 58.7422 22.5314 58.7576 22.5037 58.7755C21.5488 59.2493 20.3642 58.9497 19.7967 58.0968C19.7829 58.0661 19.7635 58.0379 19.7441 58.0123L11.9717 45.5685C12.5696 45.379 13.1481 45.1357 13.6961 44.8463L13.7376 44.8258L19.2651 41.8755L20.7459 44.2521L17.668 45.8989C17.5102 45.9808 17.3967 46.1217 17.3497 46.283C17.3026 46.4469 17.3275 46.6185 17.4189 46.7645L22.3014 54.5861C22.3928 54.7321 22.5422 54.8371 22.7166 54.8806C22.8938 54.9242 23.082 54.9011 23.237 54.8166L26.3151 53.172ZM21.4326 45.353L18.9498 46.677L23.1431 53.3972L25.626 52.0706L21.4326 45.353ZM39.3356 14.5385C41.8959 13.5398 44.8603 14.4617 46.2526 16.6872L46.2719 16.718C47.6338 18.9409 47.0082 21.7581 44.8077 23.305L39.3356 14.536L39.3356 14.5385ZM50.7168 15.0354C50.3875 15.2095 49.9695 15.1045 49.7813 14.8023C49.5931 14.4976 49.7066 14.1108 50.0332 13.9367L56.9668 10.2335C57.2962 10.0593 57.7141 10.1618 57.9023 10.4665C58.0906 10.7687 57.9771 11.1555 57.6505 11.3296L50.7141 15.0328L50.7168 15.0354ZM46.947 7.36522C46.7588 7.66742 46.3408 7.77242 46.0142 7.59827C45.6848 7.42412 45.5713 7.0374 45.7595 6.73265L49.7619 0.317213C49.9501 0.0150089 50.3708 -0.0899898 50.6974 0.0841577C51.0268 0.258312 51.1375 0.645026 50.9493 0.949781L46.947 7.36522ZM55.3252 22.0604C55.1398 22.0681 54.9599 22.0015 54.827 21.8837C54.6914 21.7633 54.6167 21.5969 54.6167 21.4253C54.6167 21.2537 54.6914 21.0872 54.827 20.9669C54.9599 20.849 55.1398 20.7825 55.3252 20.7901H63.3329C63.7038 20.8004 64 21.0821 64 21.4253C64 21.7685 63.7038 22.0502 63.3329 22.0604H55.3252Z',
    handler: () => router.push('/announcements/list?add=true')
  },
  {
    id: 3,
    title: 'مدیریت کاربران',
    icon: 'M18.9567 33.9782C19.081 33.7887 19.2052 33.6023 19.3294 33.4189C20.6269 31.5302 22.1674 29.8799 23.8873 28.4954C21.3282 26.7992 18.3411 25.8518 15.2545 25.8518H15.1193C9.93471 25.8518 5.01505 28.5045 1.96478 32.9482C1.87091 33.0827 1.78257 33.2202 1.69147 33.3578L1.06203 34.3297C-0.180268 36.2428 -0.343171 38.6389 0.628606 40.7385C1.60037 42.8381 3.4528 44.0912 5.58127 44.0912H16.8615C16.0222 41.0838 16.4778 37.8015 18.1784 35.1821L18.9567 33.9782ZM23.3187 13.9115C23.3187 18.884 19.6774 22.9121 15.1884 22.9121C10.6967 22.9121 7.05528 18.8841 7.05528 13.9115C7.05528 8.93902 10.6966 4.911 15.1884 4.911C19.6773 4.911 23.3187 8.93902 23.3187 13.9115ZM55.177 36.4999L54.3985 35.2988C54.288 35.1276 54.1721 34.9565 54.0589 34.7884C50.2382 29.2261 44.0847 25.9044 37.5941 25.9044H37.4257C33.9251 25.9044 30.5295 26.8763 27.537 28.6397C27.2195 28.8261 26.9048 29.0248 26.5984 29.2296C26.2892 29.4343 25.9855 29.6483 25.6873 29.8713C23.8874 31.2161 22.2834 32.8633 20.961 34.7888C20.8451 34.9569 20.7319 35.128 20.6187 35.3022L19.8402 36.5002C18.3688 38.7648 18.0954 41.5551 19.0423 44.0857C19.1196 44.2935 19.1887 44.5013 19.2825 44.7061C19.3653 44.8864 19.4675 45.0484 19.5613 45.2195C19.7822 45.6229 20.0251 46.005 20.2985 46.3503C21.6264 48.0312 23.5147 49 25.6239 49H49.3907C52.1183 49 54.4897 47.3955 55.7348 44.7091C56.9771 42.0196 56.7699 38.9508 55.177 36.4999ZM37.5086 22.8049C43.1873 22.8049 47.8085 17.6889 47.8085 11.4025C47.8085 5.11586 43.1871 0 37.5086 0C31.8298 0 27.2086 5.11609 27.2086 11.4025C27.2058 17.6921 31.8272 22.8049 37.5086 22.8049Z',
    handler: () => router.push('/users')
  },
  {
    id: 4,
    title: 'افزودن موقعیت شغلی',
    icon: 'M55.1613 27.8615L44.3157 35.9597C40.2559 38.9644 35.3372 40.5955 30.2797 40.6141C25.2222 40.6326 20.2916 39.0378 16.2097 36.063L4.83871 27.7995L0 24.2738V45.7036C0.00183084 48.1686 0.985588 50.5321 2.73524 52.2751C4.4849 54.0182 6.85741 54.9982 9.3318 55H50.6682C53.1426 54.9982 55.5151 54.0182 57.2648 52.2751C59.0144 50.5321 59.9982 48.1686 60 45.7036V24.2463L55.1613 27.8615ZM19.0784 32.2067C22.3232 34.5701 26.2429 35.8353 30.2625 35.8167C34.282 35.7981 38.1898 34.4967 41.4125 32.1034L55.1613 21.8361L59.9655 18.2553C59.7632 15.9372 58.6963 13.7788 56.9752 12.2058C55.2542 10.6328 53.0039 9.75933 50.6682 9.75774H43.3618V9.29636C43.3599 6.83137 42.3762 4.46787 40.6265 2.72486C38.8769 0.981845 36.5044 0.00182389 34.03 0H25.9701C23.4957 0.00182389 21.1232 0.981845 19.3735 2.72486C17.6239 4.46787 16.6401 6.83137 16.6383 9.29636V9.75774H9.33181C6.98423 9.75757 4.72296 10.6395 2.99953 12.2275C1.27609 13.8155 0.217301 15.9926 0.0345764 18.3242L4.87329 21.8292L19.0784 32.2067ZM21.477 9.29636C21.4788 8.1098 21.9528 6.97237 22.795 6.13334C23.6372 5.29432 24.779 4.82216 25.9701 4.82033H34.03C35.221 4.82216 36.3628 5.29432 37.205 6.13334C38.0473 6.97237 38.5212 8.1098 38.5231 9.29636V9.75774H21.477V9.29636Z',
    handler: () => router.push('/job-sections?add=true')
  }
]);

async function refreshData() {
  try {
    await reportStore.fetchContentReport();
    await nextTick();
    createCharts();
  } catch (error) {
    console.error('Failed to fetch report data:', error);
  }
}

function createCharts() {
  if (!reportData.value) return;

  createContentPieChart();
  createRequestsDoughnutChart();
  createMagazineDonutChart();
}

function createContentPieChart() {
  if (!contentPieChart.value || !reportData.value) return;

  const ctx = contentPieChart.value.getContext('2d');
  const contentData = reportStore.getContentDistribution();
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['سوالات متداول', 'مجلات', 'راهنماها', 'چندرسانه‌ای', 'شغل‌ها'],
      datasets: [{
        label: 'تعداد',
        data: [
          contentData.faqs,
          contentData.magazines,
          contentData.guides,
          contentData.multimedia,
          contentData.jobs
        ],
        backgroundColor: [
          '#4F46E5', // Indigo - سوالات متداول
          '#059669', // Emerald - مجلات
          '#D97706', // Amber - راهنماها
          '#DC2626', // Red - چندرسانه‌ای
          '#7C3AED'  // Violet - شغل‌ها
        ],
        borderColor: [
          '#3730A3', // Darker Indigo
          '#047857', // Darker Emerald
          '#B45309', // Darker Amber
          '#B91C1C', // Darker Red
          '#6D28D9'  // Darker Violet
        ],
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          titleFont: {
            family: 'IRANYekanX, sans-serif'
          },
          bodyFont: {
            family: 'IRANYekanX, sans-serif'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            font: {
              family: 'IRANYekanX, sans-serif'
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          ticks: {
            font: {
              family: 'IRANYekanX, sans-serif'
            }
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

function createRequestsDoughnutChart() {
  if (!requestsDoughnutChart.value || !reportData.value) return;

  const ctx = requestsDoughnutChart.value.getContext('2d');
  const requestStats = reportStore.getRequestStats();
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['بررسی شده', 'در انتظار بررسی'],
      datasets: [{
        data: [
          requestStats.contactRequests.checked + requestStats.reviews.checked,
          requestStats.contactRequests.unchecked + requestStats.jobRequests.unchecked + requestStats.reviews.unchecked
        ],
        backgroundColor: [
          '#059669', // Emerald - بررسی شده
          '#D97706'  // Amber - در انتظار بررسی
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              family: 'IRANYekanX, sans-serif'
            }
          }
        },
        tooltip: {
          titleFont: {
            family: 'IRANYekanX, sans-serif'
          },
          bodyFont: {
            family: 'IRANYekanX, sans-serif'
          }
        }
      }
    }
  });
}

function createMagazineDonutChart() {
  if (!magazineDonutChart.value || !reportData.value) return;

  const ctx = magazineDonutChart.value.getContext('2d');
  const magazineData = reportStore.getMagazineBreakdown();
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['خبر', 'اطلاعیه', 'بخشنامه', 'دستورالعمل'],
      datasets: [{
        data: [
          magazineData.type1,
          magazineData.type2,
          magazineData.type3,
          magazineData.type4
        ],
        backgroundColor: [
          '#4F46E5', // Indigo - خبر
          '#059669', // Emerald - اطلاعیه
          '#D97706', // Amber - بخشنامه
          '#DC2626'  // Red - دستورالعمل
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              family: 'IRANYekanX, sans-serif'
            }
          }
        },
        tooltip: {
          titleFont: {
            family: 'IRANYekanX, sans-serif'
          },
          bodyFont: {
            family: 'IRANYekanX, sans-serif'
          }
        }
      }
    }
  });
}

onMounted(async () => {
  await refreshData();
});
</script>

<style scoped>
.dashboard {
  max-width: 100%;
  height: 100%;
  overflow-y: visible;
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

.chart-canvas {
  width: 100% !important;
  height: 100% !important;
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
  width: 40px;
  height: 40px;
  background: var(--secondary-gradient);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  margin-bottom: 12px;
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
}

@media (max-width: 480px) {
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