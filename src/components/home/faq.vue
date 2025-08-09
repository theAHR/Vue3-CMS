<template>
  <section class="home-faq">
    <header class="section-header">
      <div class="title-group">
        <div class="title-header">
          <img src="/src/assets/img/title-green.svg" alt="" class="title-icon" />
          <h2>پرسش‌های متداول</h2>
        </div>
        <p>
          سوالات مهم و اساسی سامانه معتمد مالیاتی سداد و نحوه استفاده از آن
        </p>
      </div>
      <router-link to="/faq" class="section-header-button">
        <span class="icon-circle">
          <span class="icon"></span>
        </span>
        مشاهده همه سوالات
      </router-link>
    </header>

    <div class="home-faq__content" v-if="faqs.length > 0">
      <div class="home-faq__list">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.id"
          class="home-faq__item"
          :class="{ 'home-faq__item--active': activeIndex === index }"
          @click="toggleFaq(index)"
        >
          <div class="home-faq__question">
            <div class="home-faq__question-content">
              <div class="home-faq__question-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h3 class="home-faq__question-text">{{ faq.faqTitle }}</h3>
            </div>
            <div class="home-faq__toggle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          
          <div class="home-faq__answer">
            <div class="home-faq__answer-content">
              <p class="home-faq__answer-text">{{ faq.faqAnswer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div class="home-news__loading" v-if="loading">
      <div class="home-news__spinner"></div>
      <p>در حال بارگذاری...</p>
    </div>

    <!-- Error State -->
    <div class="home-news__error" v-if="error">
      <p>{{ error }}</p>
    </div>
  </section>
</template>

<script>
import faqService from '@/services/faq.js'

export default {
  name: 'Faq',
  data() {
    return {
      faqs: [],
      activeIndex: null,
      loading: false,
      error: null
    }
  },
  mounted() {
    this.fetchFaqs()
  },
  methods: {
    async fetchFaqs() {
      try {
        this.loading = true
        this.error = null
        const response = await faqService.search({ take: 5 })
        this.faqs = response.data.list || []
        console.log('Fetched FAQs:', this.faqs.length, 'items')
      } catch (error) {
        this.error = 'خطا در دریافت اطلاعات'
        console.error('Error fetching FAQs:', error)
      } finally {
        this.loading = false
      }
    },
    
    toggleFaq(index) {
      this.activeIndex = this.activeIndex === index ? null : index
    }
  }
}
</script>

<style src="./section-header.css"></style>
<style scoped>
.home-faq {
  margin: 0 auto;
  max-width: 1200px;
  background: #ffffff;
  padding-bottom: 100px;
}

.home-faq__list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.home-faq__item {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.home-faq__item:hover {
  border-color: #d1d5db;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.home-faq__item--active {
  border-color: #514a9b;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.15);
}

.home-faq__question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  gap: 20px;
}

.home-faq__question-content {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.home-faq__question-icon {
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

.home-faq__item--active .home-faq__question-icon {
  background: #514a9b;
  color: white;
}

.home-faq__item:hover .home-faq__question-icon {
  background: #f0eef7;
}

.home-faq__item--active:hover .home-faq__question-icon {
  background: #514a9b;
}

.home-faq__question-text {
  font-size: 1rem;
  font-weight: 400;
  color: #374151;
  line-height: 1.6;
  margin: 0;
  text-align: right;
  transition: color 0.3s ease;
}

.home-faq__item--active .home-faq__question-text {
  color: #1f2937;
  font-weight: 500;
}

.home-faq__toggle {
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

.home-faq__item--active .home-faq__toggle {
  background: #514a9b;
  color: white;
  transform: rotate(180deg);
}

.home-faq__item:hover .home-faq__toggle {
  background: #e5e7eb;
}

.home-faq__item--active:hover .home-faq__toggle {
  background: #514a9b;
}

.home-faq__answer {
  max-height: 0;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  border-top: 1px solid transparent;
}

.home-faq__item--active .home-faq__answer {
  max-height: 300px;
  opacity: 1;
  border-top-color: #f3f4f6;
}

.home-faq__answer-content {
  padding: 20px 24px 20px 68px;
}

.home-faq__answer-text {
  font-size: 0.95rem;
  font-weight: 300;
  color: #6b7280;
  line-height: 1.7;
  margin: 0;
  white-space: pre-line;
  text-align: right;
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

.home-news__error {
  text-align: center;
  padding: 40px;
  color: #ef4444;
  background: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fecaca;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .home-faq {
    padding: 0px 16px;
  }

  .home-faq__question {
    padding: 16px;
  }

  .home-faq__answer-content {
    padding: 16px 16px 16px 60px;
  }

  .home-faq__question-text {
    font-size: 0.9rem;
  }

  .home-faq__answer-text {
    font-size: 0.85rem;
  }

  .home-faq__question-icon {
    width: 28px;
    height: 28px;
  }
}
</style> 