<template>
  <section class="home-banner">
    <div class="banner-wrapper">
      <div class="banner-container">
        <div class="banner-slideshow">
          <TransitionGroup 
            name="slide" 
            tag="div" 
            class="banner-slides"
          >
            <div 
              v-for="(banner, index) in banners" 
              :key="banner.id"
              v-show="currentSlide === index"
              class="banner-slide"
            >
              <img 
                :src="banner.image" 
                :alt="banner.alt" 
                class="banner-image" 
              />
            </div>
          </TransitionGroup>

          <button 
            class="banner-arrow banner-arrow--prev"
            @click="nextSlide"
            aria-label="Next slide"
          >
            <span class="banner-arrow-icon">›</span>
          </button>
          <button 
            class="banner-arrow banner-arrow--next"
            @click="previousSlide"
            aria-label="Previous slide"
          >
            <span class="banner-arrow-icon">‹</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import banner1 from '@/assets/img/banner1.png'
import banner2 from '@/assets/img/banner2.png'

export default {
  name: 'BannerSection',
  setup() {
    const currentSlide = ref(0)
    const autoPlayInterval = ref(null)
    
    const banners = [
      {
        id: 1,
        image: banner1,
        alt: 'Banner 1'
      },
      {
        id: 2,
        image: banner2,
        alt: 'Banner 2'
      }
    ]

    const nextSlide = () => {
      currentSlide.value = (currentSlide.value + 1) % banners.length
    }

    const previousSlide = () => {
      currentSlide.value = currentSlide.value === 0 
        ? banners.length - 1 
        : currentSlide.value - 1
    }

    const setCurrentSlide = (index) => {
      currentSlide.value = index
    }

    const startAutoPlay = () => {
      autoPlayInterval.value = setInterval(() => {
        nextSlide()
      }, 5000)
    }

    const stopAutoPlay = () => {
      if (autoPlayInterval.value) {
        clearInterval(autoPlayInterval.value)
        autoPlayInterval.value = null
      }
    }

    onMounted(() => {
      startAutoPlay()
    })

    onUnmounted(() => {
      stopAutoPlay()
    })

    return {
      banners,
      currentSlide,
      nextSlide,
      previousSlide,
      setCurrentSlide
    }
  }
}
</script>

<style scoped>
.home-banner {
  color: #ffffff;
  position: relative;
  width: 100%;
  background: linear-gradient(0deg, #4b4a79 0%, #514a9b 50%, #514a9b 100%);
}

.banner-wrapper {
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;
}

.banner-container {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.banner-slideshow {
  position: relative;
  width: 100%;
  height: 100%;
}

.banner-slides {
  position: relative;
  width: 100%;
  height: 100%;
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s ease-in-out;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  opacity: 1;
}

.banner-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  border: none;
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
}

.banner-arrow:hover {
  background: rgba(0, 0, 0, 0.6);
  transform: translateY(-50%) scale(1.1);
}

.banner-arrow--prev {
  left: 10px;
}

.banner-arrow--next {
  right: 10px;
}

.banner-arrow-icon {
  font-size: 24px;
  font-weight: bold;
  line-height: 1;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .banner-container {
    height: 80px;
  }
  
  .banner-image {
    width: 100%;
    height: 100%;
  }
  
  .banner-arrow {
    width: 32px;
    height: 32px;
  }
  
  .banner-arrow-icon {
    font-size: 20px;
  }
  

}

@media (max-width: 480px) {
  .banner-container {
    height: 60px;
  }
  
  .banner-image {
    width: 100%;
    height: 100%;
  }
  
  .banner-arrow {
    width: 28px;
    height: 28px;
  }
  
  .banner-arrow-icon {
    font-size: 18px;
  }
}

</style>