<template>
  <div class="news-section">
    <header class="section-header">
      <div class="title-group">
        <div class="title-header">
          <img src="/src/assets/img/title-green.svg" alt="" class="title-icon" />
          <h2>{{ sectionTitle }}</h2>
        </div>
        <p>آخرین اخبار و اطلاعیه های ما را دنبال کنید</p>
      </div>
     <router-link to="/news" class="section-header-button">
        <span class="icon-circle">
          <span class="icon"></span>
        </span>
          مشاهده همه
      </router-link>
    </header>

    <div class="content-body">
      <!-- Loading State -->
      <div v-if="loading" class="home-news__loading">
        <div class="home-news__spinner"></div>
        <p>در حال بارگذاری...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="home-news__error">
        <p>{{ error }}</p>
      </div>

      <!-- News Grid - Simple 4 boxes -->
      <div v-else class="news-grid">
        <div 
          v-for="article in articles" 
          :key="article.id" 
          class="news-card"
        >
          <div class="card-image">
            <img 
              :src="article.imageUrl" 
              :alt="article.title" 
              @error="handleImageError"
            />
          </div>
          
          <div class="card-content">
            <h3 class="card-title">{{ article.title }}</h3>
            
            <div class="card-footer">
              <div class="date-group">
                <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <span class="date">{{ article.formattedDate }}</span>
              </div>
              <button @click="openNewsPopup(article.id)" class="view-link">
                مشاهده
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- News Popup -->
    <VNewsPopup 
      :visible="popupVisible" 
      :articleId="selectedArticleId"
      @close="closeNewsPopup"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import magazineService from '@/services/magazine';
import { format } from 'date-fns-jalali';
import placeholder from '@/assets/img/blank.jpg';
import sliderArrow from '@/assets/img/slider-arrow.svg';
import VNewsPopup from '@/components/common/VNewsPopup';
import { imageBaseURL } from '@/config/api';

const articles = ref([]);
const loading = ref(true);
const error = ref(null);

const popupVisible = ref(false);
const selectedArticleId = ref(null);

const sectionTitle = computed(() => "اخبــــــار");

const formatJalaliDate = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'yyyy/MM/dd');
};

const handleImageError = (event) => {
  event.target.onerror = null;
  event.target.src = placeholder;
};

const fetchNews = async () => {
  try {
    loading.value = true;
    error.value = null;

    const params = { skip: 0, take: 3, active: true, type: 1, sort: 'des|createDate' };
    const response = await magazineService.read(params);

    if (response.data.success && Array.isArray(response.data.list)) {
      articles.value = response.data.list.map(item => {
        const imageName = (item.image && item.image.length > 0) ? item.image[0].imageName : null;
        return {
          id: item.id,
          title: item.title,
          imageUrl: imageName ? `${imageBaseURL}${imageName}` : placeholder,
          formattedDate: formatJalaliDate(item.createDate),
        };
      });
    } else {
      throw new Error(response.data.message || 'API did not return expected data format.');
    }

  } catch (err) {
    error.value = 'خطا در دریافت اطلاعات';
    console.error('API Fetch Error:', err);
  } finally {
    loading.value = false;
  }
};



const openNewsPopup = (articleId) => {
  selectedArticleId.value = articleId;
  popupVisible.value = true;
};

const closeNewsPopup = () => {
  popupVisible.value = false;
  selectedArticleId.value = null;
};

onMounted(fetchNews);
</script>

<style src="../home/section-header.css"></style>
<style scoped>
.news-section {
  padding: 2rem 1rem 2rem 1rem;
  max-width: 1200px;
  margin: auto;
}

.home-news__loading {
  text-align: center;
  padding: 40px;
  color: #6b7280;
}

.home-news__spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #514a9b;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.home-news__error {
  text-align: center;
  padding: 40px;
  color: #ef4444;
  background: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fecaca;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.news-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 280px;
  padding: 1rem;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.card-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.card-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 1rem;
  line-height: 1.5;
  overflow: hidden;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6c757d;
}

.view-link {
  color: #514a9b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: color 0.3s ease;
}

.view-link:hover {
  color: #3f3a7a;
}

.date-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.calendar-icon {
  width: 1rem;
  height: 1rem;
  color: #6c757d;
}

.date {
  font-size: 0.85rem;
  color: #6c757d;
}



@media (max-width: 1024px) {
  .news-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .news-grid {
    grid-template-columns: 1fr;
  }
  

}
</style>

