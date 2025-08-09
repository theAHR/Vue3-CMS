<template>
  <div class="faq-page">
    <div class="faq-container">
          <aside class="faq-sidebar">
        <div 
          class="nav-item"
          :class="{ 'active': selectedCategory === null }"
          @click="selectCategory(null)"
        >
          <div v-if="selectedCategory === null" class="nav-accent-bar"></div>
          <div class="nav-text faq-nav-text small-font" style="text-align: start; min-width: 120px;">
            همه سوالات
          </div>
        </div>
        
        <div 
          v-for="category in categories"
          :key="category.id"
          class="nav-item"
          :class="{ 'active': selectedCategory === category.id }"
          @click="selectCategory(category.id)"
        >
          <div v-if="selectedCategory === category.id" class="nav-accent-bar"></div>
          <div class="nav-text faq-nav-text small-font" style="text-align: start; min-width: 120px;">
            {{ category.displayName }}
          </div>
        </div>
      </aside>

      <main class="faq-main">
        <div class="search-section">
          <div class="search-container">
            <div class="search-input-wrapper">
              <input
                v-model="searchKeyword"
                type="text"
                placeholder="عبارت مورد نظر خود را جست و جو کنید ..."
                class="search-input"
                @keyup.enter="performSearch"
              />
              <button class="search-button" @click="performSearch">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="faq-content">
          <transition name="fade-faq" mode="out-in">
            <div class="faq-list" v-if="faqs.length > 0" :key="selectedCategory">
              <div
                v-for="(faq, index) in faqs"
                :key="faq.id"
                class="faq-item"
                :class="{ 'faq-item--active': activeIndex === index }"
                @click="toggleFaq(index)"
              >
                <div class="faq-question">
                  <div class="faq-question-content">
                    <div class="faq-question-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <h3 class="faq-question-text">{{ faq.faqTitle }}</h3>
                  </div>
                  <div class="faq-toggle">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
                
                <div class="faq-answer">
                  <div class="faq-answer-content">
                    <p class="faq-answer-text">{{ faq.faqAnswer }}</p>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <div class="load-more-section" v-if="hasMoreFaqs && !loading">
            <button class="load-more-button" @click="loadMore">
              <span class="load-more-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M7 13L12 8L17 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
              مشاهده سوالات بیشتر
            </button>
          </div>

          <div class="home-news__loading" v-if="loading">
            <div class="home-news__spinner"></div>
            <p>در حال بارگذاری...</p>
          </div>

          <div class="home-news__error" v-if="error">
            <p>{{ error }}</p>
            <button class="retry-button" @click="retryLoad">تلاش مجدد</button>
          </div>

          <div class="faq-empty" v-if="!loading && !error && faqs.length === 0">
            <div class="empty-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3>نتیجه‌ای یافت نشد</h3>
            <p>متأسفانه هیچ سوالی با معیارهای جستجوی شما یافت نشد.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import faqService from '@/services/faq.js'

export default {
  name: 'FaqPage',
  data() {
    return {
      faqs: [],
      categories: [],
      selectedCategory: null,
      searchKeyword: '',
      activeIndex: null,
      loading: false,
      error: null,
      skip: 0,
      take: 20,
      hasMoreFaqs: true,
      totalFaqs: 0
    }
  },
  mounted() {
    this.fetchCategories()
    this.fetchFaqs()
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await faqService.getCategories()
        this.categories = response.data.list || []
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    },

    async fetchFaqs(reset = false) {
      try {
        this.loading = true
        this.error = null
        
        if (reset) {
          this.skip = 0
          this.faqs = []
          this.hasMoreFaqs = true
        }

        let response
        if (this.searchKeyword.trim()) {
          response = await faqService.searchWithKeyword(this.searchKeyword, {
            skip: this.skip,
            take: this.take
          })
        } else if (this.selectedCategory) {
          response = await faqService.searchByCategory(this.selectedCategory, {
            skip: this.skip,
            take: this.take
          })
        } else {
          response = await faqService.search({
            skip: this.skip,
            take: this.take
          })
        }

        const newFaqs = response.data.list || []
        
        if (reset) {
          this.faqs = newFaqs
        } else {
          this.faqs = [...this.faqs, ...newFaqs]
        }

        this.hasMoreFaqs = newFaqs.length === this.take
        this.skip += this.take
        
        if (!this.selectedCategory && !this.searchKeyword.trim()) {
          this.totalFaqs = this.faqs.length
        }
        
      } catch (error) {
        this.error = 'خطا در دریافت اطلاعات'
        console.error('Error fetching FAQs:', error)
      } finally {
        this.loading = false
      }
    },

    async selectCategory(categoryId) {
      this.selectedCategory = categoryId
      this.searchKeyword = ''
      this.activeIndex = null
      await this.fetchFaqs(true)
    },

    async performSearch() {
      if (this.searchKeyword.trim()) {
        this.selectedCategory = null
        this.activeIndex = null
        await this.fetchFaqs(true)
      }
    },

    async loadMore() {
      if (!this.loading && this.hasMoreFaqs) {
        await this.fetchFaqs()
      }
    },

    async retryLoad() {
      await this.fetchFaqs(true)
    },

    toggleFaq(index) {
      this.activeIndex = this.activeIndex === index ? null : index
    }
  }
}
</script>

<style scoped>
.faq-page {
  min-height: 100vh;
  padding: 40px 0 40px 0;
  padding-top: 2rem;
}

.faq-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
  padding: 0 20px;
}

/* Sidebar Styles */
.faq-sidebar {
  background: #fff !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08) !important;
  border-radius: 16px !important;
  margin: 0 0 0 0.5rem;
  padding: 1.5rem;
  width: 320px; 
  padding-left: 1.5rem; 
  padding-right: 1.5rem;
  position: sticky;
  top: 6rem;
  align-self: flex-start;
  height: fit-content;
  z-index: 10;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 1.2rem 1.1rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.18s cubic-bezier(.4,0,.2,1);
  color: #6c757d;
  background: #f7f8fa;
  font-weight: 500;
  margin-bottom: 0.7rem;
  position: relative;
  box-shadow: 0 1px 4px rgba(81, 74, 155, 0.04);
  border: 1.5px solid transparent;
}

.nav-item:last-child {
  margin-bottom: 0;
}

.nav-item:hover {
  background: #edefff;
  color: #514a9b;
  box-shadow: 0 2px 8px rgba(81, 74, 155, 0.08);
  border: 1.5px solid #b2b7ff;
}

.nav-item.active {
  background: #fff;
  color: #514a9b;
  box-shadow: 0 2px 12px rgba(81, 74, 155, 0.10);
  border: 1.5px solid #514a9b;
  font-weight: 700;
}

.nav-accent-bar {
  position: absolute;
  right: -1.5rem;
  top: 0.7rem;
  bottom: 0.7rem;
  width: 5px;
  border-radius: 8px;
  background: linear-gradient(0deg, #514a9b 0%, #514a9b 100%);
  box-shadow: 0 1px 4px rgba(81, 74, 155, 0.10);
  content: '';
}

.faq-nav-text {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  color: inherit;
  transition: color 0.2s;
}

.small-font {
  font-size: 0.92rem !important;
  font-weight: 500 !important;
}

.category-count {
  background: #e5e7eb;
  color: #6b7280;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.nav-item.active .category-count {
  background: rgba(81, 74, 155, 0.1);
  color: #514a9b;
}

.faq-main {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.search-section {
  padding: 24px;
  border-bottom: 1px solid #f3f4f6;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 12px 48px 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 0.95rem;
  background: #f9fafb;
  transition: all 0.2s ease;
  text-align: right;
}

.search-input:focus {
  outline: none;
  border-color: #514a9b;
  background: white;
}

.search-button {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.search-button:hover {
  background: #f3f4f6;
  color: #514a9b;
}

/* FAQ Content */
.faq-content {
  padding: 24px;
}

/* Smooth fade for FAQ list */
.fade-faq-enter-active, .fade-faq-leave-active {
  transition: opacity 0.3s;
}
.fade-faq-enter-from, .fade-faq-leave-to {
  opacity: 0;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.faq-item {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.faq-item:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.faq-item--active {
  border-color: #514a9b;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  gap: 20px;
}

.faq-question-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.faq-question-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #f8fafc;
  border-radius: 8px;
  color: #514a9b;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.faq-item--active .faq-question-icon {
  background: #514a9b;
  color: white;
}

.faq-item:hover .faq-question-icon {
  background: #f0eef7;
}

.faq-item--active:hover .faq-question-icon {
  background: #514a9b;
}

.faq-question-text {
  font-size: 1rem;
  font-weight: 400;
  color: #374151;
  line-height: 1.6;
  margin: 0;
  text-align: right;
  transition: color 0.3s ease;
}

.faq-item--active .faq-question-text {
  color: #1f2937;
  font-weight: 500;
}

.faq-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #f3f4f6;
  border-radius: 50%;
  color: #7361c4;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.faq-item--active .faq-toggle {
  background: #514a9b;
  color: white;
  transform: rotate(180deg);
}

.faq-item:hover .faq-toggle {
  background: #e5e7eb;
}

.faq-item--active:hover .faq-toggle {
  background: #514a9b;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  border-top: 1px solid transparent;
}

.faq-item--active .faq-answer {
  max-height: 300px;
  opacity: 1;
  border-top-color: #f3f4f6;
}

.faq-answer-content {
  padding: 20px 24px 20px 68px;
}

.faq-answer-text {
  font-size: 0.95rem;
  font-weight: 300;
  color: #6b7280;
  line-height: 1.7;
  margin: 0;
  white-space: pre-line;
  text-align: right;
}

/* Load More Section */
.load-more-section {
  text-align: center;
  padding: 32px 0 16px;
}

.load-more-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #514a9b;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.load-more-button:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

.load-more-icon {
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin: 20px 0;
}

.retry-button {
  margin-top: 16px;
  padding: 8px 16px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.retry-button:hover {
  background: #dc2626;
}

.faq-empty {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

.empty-icon {
  margin-bottom: 16px;
  color: #d1d5db;
}

.faq-empty h3 {
  margin: 0 0 8px 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: #374151;
}

.faq-empty p {
  margin: 0;
  font-size: 0.95rem;
}

@media (max-width: 1024px) {
  .faq-container {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .faq-sidebar {
    position: static;
    order: 0;
    width: 100% !important;
    margin: 0 0 1rem 0 !important;
    border-radius: 16px 16px 0 0 !important;
    padding: 0.5rem 0.5rem !important;
    box-shadow: 0 2px 12px rgba(81, 74, 155, 0.10);
    display: flex;
    flex-direction: row;
    gap: 1rem;
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: #514a9b #e0e7ff;
    height: auto;
    z-index: 5;
  }
  
  .nav-item {
    min-width: 120px;
    max-width: 90vw;
    flex-shrink: 0;
    scroll-snap-align: start;
    justify-content: center;
    margin-bottom: 0;
  }
  
  .nav-accent-bar {
    display: none;
  }
}

@media (max-width: 768px) {
  .faq-page {
    padding: 20px 0;
  }
  
  .faq-container {
    padding: 0 16px;
  }
  
  .search-section,
  .faq-content {
    padding: 16px;
  }
  
  .faq-question {
    padding: 16px;
  }
  
  .faq-answer-content {
    padding: 16px 16px 16px 60px;
  }
  
  .faq-question-text {
    font-size: 0.9rem;
  }
  
  .faq-answer-text {
    font-size: 0.85rem;
  }
  
  .faq-question-icon {
    width: 28px;
    height: 28px;
  }
}

@media (max-width: 600px) {
  .faq-sidebar {
    flex-direction: row;
    gap: 0.5rem;
    padding: 0.5rem 0.2rem !important;
    margin: 0 0 0.5rem 0 !important;
    border-radius: 12px 12px 0 0 !important;
  }
  
  .nav-item {
    min-width: 90px;
    max-width: 100vw;
    flex-shrink: 0;
    scroll-snap-align: start;
    justify-content: center;
    margin-bottom: 0;
  }
  
  .nav-accent-bar {
    display: none;
  }
}
</style>