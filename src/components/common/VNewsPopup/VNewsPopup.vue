<template>
  <div v-if="visible" class="news-popup-overlay" @click="closePopup">
    <div class="news-popup" @click.stop>
      <!-- Header with back button -->
      <div class="popup-header">
        <button @click="closePopup" class="back-btn">
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          بازگشت
        </button>
        <button @click="closePopup" class="close-btn" aria-label="بستن">
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="popup-loading">
        <div class="popup-spinner"></div>
        <p>در حال بارگذاری...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="popup-error">
        <p>{{ error }}</p>
      </div>

      <!-- Content -->
      <div v-else-if="article" class="popup-content">
        <div class="article-image">
          <img 
            :src="article.imageUrl" 
            :alt="article.title"
            @error="handleImageError"
          />
        </div>
        
        <div class="article-content">
          <h1 class="article-title">{{ article.title }}</h1>
          
          <div class="article-meta">
            <div class="date-group">
              <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              <span class="date">{{ article.formattedDate }}</span>
            </div>
          </div>
          
          <div class="article-text" v-html="formatText(article.text)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import magazineService from '@/services/magazine';
import { format } from 'date-fns-jalali';
import placeholder from '@/assets/img/blank.jpg';
import { imageBaseURL } from '@/config/api';

export default {
  name: 'VNewsPopup',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    articleId: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      article: null,
      loading: false,
      error: null,
      placeholder
    };
  },
  watch: {
    visible(newVal) {
      if (newVal && this.articleId) {
        this.loadArticle();
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    articleId(newVal) {
      if (newVal && this.visible) {
        this.loadArticle();
      }
    }
  },
  methods: {
    async loadArticle() {
      if (!this.articleId) return;
      
      try {
        this.loading = true;
        this.error = null;
        
        const response = await magazineService.readItem(this.articleId);
        
        if (response.data.success) {
          const item = response.data.object;
          const imageName = (item.image && item.image.length > 0) ? item.image[0].imageName : null;
          
          this.article = {
            id: item.id,
            title: item.title,
            text: item.text,
            imageUrl: imageName ? `${imageBaseURL}${imageName}` : this.placeholder,
            formattedDate: this.formatJalaliDate(item.createDate),
          };
        } else {
          throw new Error(response.data.message || 'خطا در دریافت اطلاعات');
        }
      } catch (err) {
        this.error = 'خطا در دریافت اطلاعات';
        console.error('API Fetch Error:', err);
      } finally {
        this.loading = false;
      }
    },

    formatJalaliDate(dateString) {
      if (!dateString) return '';
      return format(new Date(dateString), 'yyyy/MM/dd');
    },

    formatText(text) {
      if (!text) return '';
      return text.replace(/\n/g, '<br>');
    },

    handleImageError(event) {
      event.target.onerror = null;
      event.target.src = this.placeholder;
    },

    closePopup() {
      this.$emit('close');
    }
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
.news-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
}

.news-popup {
  background: white;
  border-radius: 12px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e9ecef;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 8px 16px;
  border-radius: 6px;
  color: #6c757d;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.back-btn:hover {
  background: #e9ecef;
  color: #514a9b;
}

.close-btn {
  background: none;
  border: none;
  color: #6c757d;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: #f8f9fa;
  color: #dc3545;
}

.popup-loading {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.popup-spinner {
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

.popup-error {
  text-align: center;
  padding: 60px 20px;
  color: #ef4444;
  background: #fef2f2;
  margin: 20px;
  border-radius: 8px;
  border: 1px solid #fecaca;
}

.popup-content {
  padding: 0 1.5rem 1.5rem 1.5rem;
}

.article-image {
  width: 100%;
  height: 300px;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  text-align: center;
}

.article-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #343a40;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.article-meta {
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: center;
}

.date-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6c757d;
}

.calendar-icon {
  width: 1rem;
  height: 1rem;
}

.date {
  font-size: 0.9rem;
}

.article-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #495057;
  text-align: right;
  direction: rtl;
}

/* Responsive Design */
@media (max-width: 768px) {
  .news-popup {
    margin: 1rem;
    max-height: 95vh;
  }
  
  .article-title {
    font-size: 1.3rem;
  }
  
  .article-image {
    height: 200px;
  }
  
  .popup-content {
    padding: 0 1rem 1rem 1rem;
  }
}
</style> 