<template>
  <div class="magazine-page">
    <!-- Loading State -->
    <div v-if="loading" class="home-news__loading">
      <div class="home-news__spinner"></div>
      <p>در حال بارگذاری...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="home-news__error">
      <p>{{ error }}</p>
    </div>

    <!-- Magazine Grid View -->
    <div v-else-if="!selectedItem" class="content-body">
      <div class="magazine-grid">
        <div 
          v-for="item in itemList" 
          :key="item.id" 
          class="magazine-card"
          @click="selectItem(item)"
        >
          <div class="card-image">
            <img 
              v-if="item.image && item.image.length > 0" 
              :src="`${imageBaseURL}${item.image[0].imageName}`"
              :alt="item.title"
              @error="handleImageError"
            />
            <img v-else :src="placeholder" :alt="item.title" />
          </div>
          
          <div class="card-content">
            <h3 class="card-title">{{ item.title }}</h3>
            
            <div class="card-footer">
              <div class="date-group">
                <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <span class="date">{{ formatDate(item.createDate) }}</span>
              </div>
              <span class="view-link">مشاهده</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreItems" class="load-more-container">
        <button @click="loadMoreItems" class="load-more-btn" :disabled="loadingMore">
          {{ loadingMore ? 'در حال بارگذاری...' : 'بارگذاری بیشتر' }}
        </button>
      </div>
    </div>

    <!-- Magazine Detail View -->
    <div v-else class="magazine-detail-container">
      <!-- Back Button -->
      <button @click="backToGrid" class="back-btn">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        {{ backButtonText }}
      </button>

      <!-- Main Magazine Content -->
      <div class="magazine-detail">
        <div class="magazine-detail-image">
          <img 
            v-if="selectedItem.image && selectedItem.image.length > 0" 
            :src="`${imageBaseURL}${selectedItem.image[0].imageName}`"
            :alt="selectedItem.title"
            @error="handleImageError"
          />
          <img v-else :src="placeholder" :alt="selectedItem.title" />
        </div>
        
        <div class="magazine-detail-content">
          <h1 class="magazine-detail-title">{{ selectedItem.title }}</h1>
          <div class="magazine-detail-meta">
            <div class="date-group">
              <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              <span class="date">{{ formatDate(selectedItem.createDate) }}</span>
            </div>
          </div>
          <div class="magazine-detail-text" v-html="formatItemText(selectedItem.text)"></div>
        </div>
      </div>

      <!-- Related Items Section -->
      <div class="related-items">
        <h2 class="related-items-title">{{ relatedItemsTitle }}</h2>
        <div class="related-items-grid">
          <div 
            v-for="relatedItem in relatedItemsList" 
            :key="relatedItem.id" 
            class="magazine-card"
            @click="selectItem(relatedItem)"
          >
            <div class="card-image">
                          <img 
              v-if="relatedItem.image && relatedItem.image.length > 0" 
              :src="`${imageBaseURL}${relatedItem.image[0].imageName}`"
              :alt="relatedItem.title"
              @error="handleImageError"
            />
              <img v-else :src="placeholder" :alt="relatedItem.title" />
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ relatedItem.title }}</h3>
              <div class="card-footer">
                <div class="date-group">
                  <svg xmlns="http://www.w3.org/2000/svg" class="calendar-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  <span class="date">{{ formatDate(relatedItem.createDate) }}</span>
                </div>
                <span class="view-link">مشاهده</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import magazineService from '@/services/magazine.js';
import placeholder from '@/assets/img/blank.jpg';
import { imageBaseURL } from '@/config/api';

export default {
  name: 'MagazinePage',
  props: {
    type: {
      type: Number,
      required: true,
      validator: value => [1, 2, 3, 4].includes(value)
    }
  },
  data() {
    return {
      itemList: [],
      selectedItem: null,
      relatedItemsList: [],
      loading: true,
      loadingMore: false,
      hasMoreItems: true,
      currentPage: 0,
      pageSize: 21,
      error: null,
      placeholder,
      imageBaseURL
    };
  },
  computed: {
    backButtonText() {
      const typeLabels = {
        1: 'بازگشت به اخبار',
        2: 'بازگشت به اطلاعیه‌ها',
        3: 'بازگشت به بخشنامه‌ها',
        4: 'بازگشت به دستورالعمل‌ها'
      };
      return typeLabels[this.type] || 'بازگشت';
    },
    relatedItemsTitle() {
      const typeLabels = {
        1: 'اخبار مرتبط',
        2: 'اطلاعیه‌های مرتبط',
        3: 'بخشنامه‌های مرتبط',
        4: 'دستورالعمل‌های مرتبط'
      };
      return typeLabels[this.type] || 'موارد مرتبط';
    }
  },
  async mounted() {
    await this.loadItems();
  },
  methods: {
    async loadItems() {
      try {
        this.loading = true;
        this.error = null;
        const params = {
          skip: this.currentPage * this.pageSize,
          take: this.pageSize,
          active: true,
          type: this.type,
          sort: 'des|createDate'
        };
        
        const response = await magazineService.read(params);
        
        if (response.data.success) {
          if (this.currentPage === 0) {
            this.itemList = response.data.list;
          } else {
            this.itemList = [...this.itemList, ...response.data.list];
          }
          
          this.hasMoreItems = response.data.list.length === this.pageSize;
        } else {
          throw new Error(response.data.message || 'خطا در دریافت اطلاعات');
        }
      } catch (error) {
        console.error('Error loading items:', error);
        this.error = 'خطا در دریافت اطلاعات';
      } finally {
        this.loading = false;
      }
    },

    async loadMoreItems() {
      if (this.loadingMore) return;
      
      try {
        this.loadingMore = true;
        this.currentPage++;
        await this.loadItems();
      } catch (error) {
        console.error('Error loading more items:', error);
        this.currentPage--;
      } finally {
        this.loadingMore = false;
      }
    },

    async selectItem(item) {
      try {
        this.loading = true;
        
        // Load detailed item data
        const response = await magazineService.readItem(item.id);
        
        if (response.data.success) {
          this.selectedItem = response.data.object || item;
          
          // Load related items (3 random items excluding current)
          const otherItems = this.itemList.filter(i => i.id !== item.id);
          this.relatedItemsList = otherItems.slice(0, 3);
        } else {
          this.selectedItem = item;
          const otherItems = this.itemList.filter(i => i.id !== item.id);
          this.relatedItemsList = otherItems.slice(0, 3);
        }
      } catch (error) {
        console.error('Error loading item detail:', error);
        this.selectedItem = item;
        const otherItems = this.itemList.filter(i => i.id !== item.id);
        this.relatedItemsList = otherItems.slice(0, 3);
      } finally {
        this.loading = false;
      }
    },

    backToGrid() {
      this.selectedItem = null;
      this.relatedItemsList = [];
    },

    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },

    formatItemText(text) {
      if (!text) return '';
      return text.replace(/\n/g, '<br>');
    },

    handleImageError(event) {
      event.target.onerror = null;
      event.target.src = this.placeholder;
    }
  }
};
</script>

<style src="../../../components/home/section-header.css"></style>
<style scoped>
.magazine-page {
  padding: 2rem 1rem 2rem 1rem;
  max-width: 1200px;
  margin: auto;
}

/* Loading Animation */
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

.content-body {
  margin-top: 2rem;
}

.magazine-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.magazine-card {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.magazine-card:hover {
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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

/* Load More Button */
.load-more-container {
  text-align: center;
  margin-top: 2rem;
}

.load-more-btn {
  background: #514a9b;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.load-more-btn:hover:not(:disabled) {
  background: #3f3a7a;
  transform: translateY(-1px);
}

.load-more-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Magazine Detail Styles */
.magazine-detail-container {
  margin-top: 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: white;
  border: 1px solid #e9ecef;
  padding: 10px 20px;
  border-radius: 8px;
  color: #6c757d;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.back-btn:hover {
  background: #f8f9fa;
  border-color: #514a9b;
  color: #514a9b;
}

.back-btn svg {
  width: 18px;
  height: 18px;
}

.magazine-detail {
  background: white;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.magazine-detail-image {
  width: 400px;
  height: 400px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.magazine-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.magazine-detail-content {
  padding: 2rem;
  text-align: center;
  max-width: 800px;
  width: 100%;
}

.magazine-detail-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #343a40;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.magazine-detail-meta {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.magazine-detail-text {
  font-size: 1rem;
  line-height: 1.7;
  color: #495057;
}

/* Related Items Styles */
.related-items {
  margin-top: 3rem;
}

.related-items-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #343a40;
  margin-bottom: 1.5rem;
  text-align: center;
}

.related-items-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .magazine-grid,
  .related-items-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .magazine-grid,
  .related-items-grid {
    grid-template-columns: 1fr;
  }
  
  .magazine-detail-title {
    font-size: 1.5rem;
  }
  
  .magazine-detail-content {
    padding: 1.5rem;
  }
}
</style> 