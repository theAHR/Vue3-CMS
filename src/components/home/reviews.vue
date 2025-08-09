<template>
  <section class="home-reviews">
    <!-- Section Header -->
    <header class="section-header">
      <div class="title-group">
        <div class="title-header">
          <img src="/src/assets/img/title-green.svg" alt="" class="title-icon" />
          <h2>نظرات مشتریان</h2>
        </div>
        <p>تجربه و نظرات ارزشمند شما راهنمای ما در بهبود خدمات است</p>
      </div>
      <button class="section-header-button" @click="scrollToTop">
        <span class="icon-circle">
          <span class="icon"></span>
        </span>
        مشاهده همه
      </button>
    </header>

    <!-- Statistics Section -->
    <div class="home-reviews__stats">
      <div class="home-reviews__stat">
        <div class="home-reviews__stat-number">1856</div>
        <div class="home-reviews__stat-label">نظر ثبت شده</div>
      </div>
      <div class="home-reviews__stat">
        <div class="home-reviews__stat-number">{{ averageRating }}</div>
        <div class="home-reviews__stat-label">میانگین امتیاز</div>
      </div>
      <div class="home-reviews__stat">
        <div class="home-reviews__stat-number">98%</div>
        <div class="home-reviews__stat-label">رضایت مندی</div>
      </div>
    </div>

    <!-- Carousel Section -->
    <div class="home-reviews__carousel" v-if="reviews.length > 0">
      <div class="home-reviews__container" :style="{ width: containerWidth }">
        <div
          class="home-reviews__track"
          :class="{ 'no-transition': isTransitionDisabled }"
          :style="{ transform: `translateX(${currentTranslate}px)`, gap: cardGap + 'px' }"
          @mousedown="handleDragStart"
          @mousemove="handleDragMove"
          @mouseup="handleDragEnd"
          @mouseleave="handleDragEnd"
          @touchstart="handleDragStart"
          @touchmove="handleDragMove"
          @touchend="handleDragEnd"
        >
          <div
            v-for="review in infiniteReviews"
            :key="review.id"
            class="home-reviews__card"
            :style="{ width: cardWidth + 'px' }"
          >
            <!-- Quote Icon -->
            <div class="home-reviews__quote">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" fill="#7361c4"/>
              </svg>
            </div>
            
            <!-- User Information -->
            <div class="home-reviews__user">
              <div class="home-reviews__avatar">
                <svg width="20" height="20" viewBox="0 0 1024 1024" fill="none">
                  <path d="M512 842.667c-87.241 0-157.44-70.533-157.44-157.44 0-84.61 66.092-153.259 149.542-156.966 5.059 0.352 10.404 0.372 15.449 0.003 83.367 3.748 149.501 72.349 149.89 157.027-0.038 86.83-70.605 157.375-157.44 157.375zM290.558 685.227c0 122.159 98.76 221.44 221.442 221.44 122.204 0 221.44-99.233 221.44-221.44l-0.003-0.133c-0.495-119.483-94.679-216.866-213.538-220.863-1.42-0.048-2.843 0-4.256 0.143-2.058 0.205-5.134 0.232-8.001-0.027-1.321-0.123-2.645-0.16-3.97-0.116-118.839 3.997-213.113 101.386-213.113 220.996zM519.363 429.332c82.268 0 166.164-20.647 230.997-63.949 58.279-38.789 91.668-93.164 91.668-151.678 0-58.508-33.386-112.981-91.641-151.979l-0.003-0.003c-65.034-43.513-149.036-64.283-231.342-64.283-82.292 0-166.277 20.763-231.305 64.259-58.287 38.789-91.683 93.167-91.683 151.689 0 58.508 33.384 112.981 91.639 151.979l0.117 0.079c65.213 43.237 149.27 63.887 231.552 63.887zM323.237 312.143c-44.956-30.116-63.183-66.505-63.183-98.755 0-32.246 18.219-68.523 63.165-98.427l0.070-0.044c52.3-34.993 123.178-53.477 195.753-53.477 72.567 0 143.445 18.48 195.744 53.473 44.998 30.123 63.242 66.529 63.242 98.792 0 32.246-18.22 68.523-63.167 98.427l-0.048 0.031c-52.070 34.778-122.842 53.169-195.451 53.169-72.574 0-143.585-18.374-196.126-53.19z" fill="white"/>
                </svg>
              </div>
              <div class="home-reviews__user-info">
                <h4 class="home-reviews__name">{{ review.fullname }}</h4>
                <div class="home-reviews__date">{{ formatDate(review.createDate) }}</div>
              </div>
            </div>
            
            <!-- Review Text -->
            <div class="home-reviews__text">{{ review.text }}</div>
            
            <!-- Rating Stars -->
            <div class="home-reviews__rating">
              <div class="home-reviews__stars">
                <span
                  v-for="star in 5"
                  :key="star"
                  class="home-reviews__star"
                  :class="{ 'home-reviews__star--active': star <= review.rate }"
                >
                  ★
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Controls -->
      <div class="home-reviews__controls">
        <button class="home-reviews__btn" @click="navigateToPrevious">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="home-reviews__btn" @click="navigateToNext">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <!-- Progress Indicator -->
      <div class="home-reviews__progress">
        <div class="home-reviews__progress-bar">
          <div 
            class="home-reviews__progress-fill" 
            :style="{ width: `${progressPercentage}%` }"
          ></div>
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
import reviewsService from '@/services/reviews.js'

export default {
  name: 'Reviews',
  
  data() {
    return {
      // Data
      reviews: [],
      loading: false,
      error: null,
      
      // Carousel state
      currentSlide: 0,
      itemsPerSlide: 3,
      cardWidth: 400,
      cardGap: 30,
      
      // Drag functionality
      isDragging: false,
      startX: 0,
      currentX: 0,
      dragOffset: 0,
      isTransitionDisabled: false
    }
  },
  computed: {
    /**
     * Calculate container width based on items per slide and card dimensions
     */
    containerWidth() {
      if (!this.reviews || this.reviews.length === 0) {
        return '100%'
      }
      const width = this.itemsPerSlide * this.cardWidth + (this.itemsPerSlide - 1) * this.cardGap
      return `${width}px`
    },

    /**
     * Calculate current translate position for smooth scrolling
     */
    currentTranslate() {
      return ((this.currentSlide + this.itemsPerSlide) * (this.cardWidth + this.cardGap)) + this.dragOffset
    },

    /**
     * Calculate average rating from all reviews
     */
    averageRating() {
      if (this.reviews.length === 0) return '0.0'
      const sum = this.reviews.reduce((acc, review) => acc + review.rate, 0)
      return (sum / this.reviews.length).toFixed(1)
    },

    /**
     * Create infinite scroll effect by duplicating items
     */
    infiniteReviews() {
      if (this.reviews.length === 0) return []
      
      const duplicateCount = this.itemsPerSlide
      const startItems = this.reviews.slice(-duplicateCount)
      const endItems = this.reviews.slice(0, duplicateCount)
      
      return [
        ...startItems.map(item => ({ ...item, id: `start-${item.id}` })),
        ...this.reviews,
        ...endItems.map(item => ({ ...item, id: `end-${item.id}` }))
      ]
    },

    /**
     * Calculate progress percentage for the progress bar
     */
    progressPercentage() {
      return ((Math.abs(this.currentSlide % this.reviews.length) + this.itemsPerSlide) / this.reviews.length) * 100
    }
  },
  mounted() {
    this.initializeComponent()
  },

  beforeUnmount() {
    this.cleanup()
  },

  watch: {
    reviews() {
      // Reset to first slide when reviews are loaded
      this.currentSlide = 0
    }
  },
  methods: {
    /**
     * Initialize component and fetch data
     */
    async initializeComponent() {
      await this.fetchReviews()
      this.setupResponsive()
      window.addEventListener('resize', this.setupResponsive)
    },

    /**
     * Cleanup event listeners
     */
    cleanup() {
      window.removeEventListener('resize', this.setupResponsive)
    },

    /**
     * Fetch reviews from API
     */
    async fetchReviews() {
      try {
        this.loading = true
        this.error = null
        
        const response = await reviewsService.search({ take: 50 })
        this.reviews = response.data.list || []
        
        console.log('Fetched reviews:', this.reviews.length, 'reviews')
      } catch (error) {
        this.error = 'خطا در دریافت اطلاعات'
        console.error('Error fetching reviews:', error)
      } finally {
        this.loading = false
      }
    },
    /**
     * Navigate to next slide
     */
    navigateToNext() {
      this.currentSlide++
      this.handleInfiniteLoop()
    },

    /**
     * Navigate to previous slide
     */
    navigateToPrevious() {
      this.currentSlide--
      this.handleInfiniteLoop()
    },

    /**
     * Handle infinite loop logic for seamless scrolling
     */
    handleInfiniteLoop() {
      this.$nextTick(() => {
        setTimeout(() => {
          // Check if we've scrolled past real items (into duplicated end items)
          if (this.currentSlide >= this.reviews.length) {
            this.currentSlide = this.currentSlide - this.reviews.length
            this.disableTransition()
          }
          // Check if we've scrolled before real items (into duplicated start items)
          else if (this.currentSlide < 0) {
            this.currentSlide = this.reviews.length + this.currentSlide
            this.disableTransition()
          }
        }, 600) // Match CSS transition duration
      })
    },

    /**
     * Temporarily disable transition for instant position reset
     */
    disableTransition() {
      this.isTransitionDisabled = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.isTransitionDisabled = false
        }, 50)
      })
    },
    /**
     * Format date to Persian format
     */
    formatDate(dateString) {
      if (!dateString) return ''
      const date = new Date(dateString)
      const persianDate = date.toLocaleDateString('fa-IR-u-nu-latn')
      return persianDate.replace(/\//g, '/')
    },
    /**
     * Setup responsive breakpoints
     */
    setupResponsive() {
      const width = window.innerWidth
      
      if (width < 768) {
        this.itemsPerSlide = 1
        this.cardWidth = 280
        this.cardGap = 20
      } else if (width < 1024) {
        this.itemsPerSlide = 2
        this.cardWidth = 320
        this.cardGap = 20
      } else {
        this.itemsPerSlide = 3
        this.cardWidth = 350
        this.cardGap = 20
      }
      
      // Reset current slide if needed for responsive changes
      if (this.currentSlide >= this.reviews.length) {
        this.currentSlide = 0
      }
    },
    /**
     * Handle drag start event
     */
    handleDragStart(event) {
      this.isDragging = true
      this.startX = event.clientX || event.touches[0].clientX
      this.currentX = this.startX
      this.dragOffset = 0
    },

    /**
     * Handle drag move event
     */
    handleDragMove(event) {
      if (!this.isDragging) return
      
      event.preventDefault()
      this.currentX = event.clientX || event.touches[0].clientX
      this.dragOffset = this.currentX - this.startX
    },

    /**
     * Handle drag end event
     */
    handleDragEnd() {
      if (!this.isDragging) return
      
      this.isDragging = false
      
      const threshold = 50
      if (Math.abs(this.dragOffset) > threshold) {
        if (this.dragOffset > 0) {
          this.navigateToPrevious()
        } else {
          this.navigateToNext()
        }
      }
      
      this.dragOffset = 0
    },

    /**
     * Scroll to top of page
     */
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
</script>

<style src="./section-header.css"></style>
<style scoped>
/* ===== MAIN SECTION STYLES ===== */
.home-reviews {
  padding: 60px 20px;
  margin: 40px auto;
  max-width: 1200px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

/* ===== STATISTICS SECTION ===== */
.home-reviews__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.home-reviews__stat {
  text-align: center;
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.home-reviews__stat:hover {
  transform: translateY(-2px);
}

.home-reviews__stat-number {
  font-size: 2rem;
  font-weight: 800;
  color: #514a9b;
  margin-bottom: 8px;
}

.home-reviews__stat-label {
  font-size: 0.9rem;
  color: #514a9b;
}

/* ===== CAROUSEL CONTAINER ===== */
.home-reviews__container {
  overflow: hidden;
  margin: 0 auto 30px auto;
  max-width: 1200px;
}

.home-reviews__track {
  display: flex;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: 10px 0;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
  touch-action: pan-y;
  will-change: transform;
}

.home-reviews__track:active {
  cursor: grabbing;
}

.home-reviews__track.dragging {
  transition: transform 0.1s ease-out;
}

.home-reviews__track.no-transition {
  transition: none !important;
}

/* ===== REVIEW CARD STYLES ===== */
.home-reviews__card {
  min-height: 280px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  -webkit-user-select: none;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.home-reviews__card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.home-reviews__quote {
  margin-bottom: 16px;
  opacity: 0.6;
}

.home-reviews__user {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.home-reviews__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #514a9b;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
}

.home-reviews__avatar svg {
  transform: rotate(180deg);
}

.home-reviews__name {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 4px 0;
}

.home-reviews__date {
  font-size: 0.85rem;
  color: #64748b;
}

.home-reviews__text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 16px;
  direction: rtl;
  flex-grow: 1;
}

.home-reviews__rating {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: auto;
  padding-top: 12px;
}

.home-reviews__stars {
  display: flex;
  gap: 4px;
  align-items: center;
}

.home-reviews__star {
  font-size: 1.6rem;
  color: #e2e8f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  line-height: 1;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.home-reviews__star--active {
  color: #f59e0b;
  text-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
  filter: drop-shadow(0 1px 3px rgba(245, 158, 11, 0.2));
  transform: scale(1.1);
}

.home-reviews__controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.home-reviews__btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
}

.home-reviews__btn:hover {
  background: #514a9b;
  color: white;
  border-color: #514a9b;
  transform: scale(1.05);
}

.home-reviews__btn:active {
  transform: scale(0.98);
}

.home-reviews__progress {
  text-align: center;
  color: #64748b;
}

.home-reviews__progress-bar {
  width: 200px;
  height: 3px;
  background: #e2e8f0;
  border-radius: 2px;
  margin: 0 auto 12px;
  overflow: hidden;
}

.home-reviews__progress-fill {
  height: 100%;
  background: #514a9b;
  border-radius: 2px;
  transition: width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
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
  .home-reviews {
    padding: 40px 15px;
  }
  
  .home-reviews__stats {
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }
  
  .home-reviews__track {
    gap: 16px;
  }
  
  .home-reviews__card {
    min-width: 280px;
    padding: 20px;
  }
  
  .home-reviews__controls {
    gap: 8px;
  }
  
  .home-reviews__btn {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .home-reviews__card {
    padding: 20px;
  }
  
  .home-reviews__stat-number {
    font-size: 1.6rem;
  }
} 
</style>