<template>
  <section class="home-social-media">
    <header class="section-header title-center">
      <div class="title-group">
        <div class="title-header">
          <img src="/src/assets/img/title-green.svg" alt="" class="title-icon-left" />
          <h2>شبکه‌های اجتماعی</h2>
          <img src="/src/assets/img/title-green.svg" alt="" class="title-icon-right" />
        </div>
        <p>
          ما را در شبکه‌های اجتماعی دنبال کنید و از آخرین اخبار و اطلاعیه‌ها مطلع شوید
        </p>
      </div>
    </header>

    <div class="home-social-media__content">
      <div class="home-social-media__list">
        <a
          v-for="social in socialMediaList"
          :key="social.title"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="home-social-media__item"
        >
          <div class="home-social-media__icon">
            <img :src="social.icon" :alt="social.title" />
          </div>
          <div class="home-social-media__info">
            <h3 class="home-social-media__title">{{ social.title }}</h3>
            <p class="home-social-media__description">{{ social.description }}</p>
          </div>
          <div class="home-social-media__arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SocialMedia',
  data() {
    return {
      socialMediaList: [
        {
          title: 'بله',
          url: 'https://web.bale.ai/chat?uid=6120990137',
          icon: '/src/assets/img/icons/ic-social-bale.png',
          description: 'کانال رسمی ما در اپلیکیشن بله'
        },
        {
          title: 'آپارات',
          url: 'https://www.aparat.com/etemadeSadad',
          icon: '/src/assets/img/icons/ic-social-aparat.png',
          description: 'کانال رسمی ما در سایت آپارات'
        },
        {
          title: 'اینستاگرام',
          url: 'https://www.instagram.com/sadadtsp_ir?igsh=eDhjcHB5YzY2dzJs',
          icon: '/src/assets/img/icons/ic-social-instagram.png',
          description: 'صفحه رسمی ما  در اینستاگرام'
        }
      ]
    }
  }
}
</script>

<style scoped>
.home-social-media {
  padding: 2rem 0;
  margin-bottom: 100px;
}

@media (max-width: 768px) {
  .home-social-media {
    padding: 2rem 0;
    margin-bottom: 50px;
  }
}

.home-social-media__content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.home-social-media__list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.home-social-media__item {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
  position: relative;
  overflow: hidden;
}

.home-social-media__item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.home-social-media__item:hover::before {
  opacity: 0.05;
}

.home-social-media__item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.home-social-media__icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.home-social-media__icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.home-social-media__info {
  flex: 1;
  position: relative;
  z-index: 2;
}

.home-social-media__title {
  font-family: 'YekanExtraBold', sans-serif;
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  color: #2c3e50;
}

.home-social-media__description {
  font-size: 0.9rem;
  color: #6c757d;
  margin: 0;
  line-height: 1.5;
}

.home-social-media__arrow {
  color: #cbc8d4;
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.home-social-media__item:hover .home-social-media__arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .home-social-media {
    padding: 2rem 0;
  }
  
  .home-social-media__list {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .home-social-media__item {
    padding: 1rem;
  }
  
  .home-social-media__icon {
    width: 50px;
    height: 50px;
    margin-left: 0.75rem;
  }
  
  .home-social-media__title {
    font-size: 1.1rem;
  }
  
  .home-social-media__description {
    font-size: 0.85rem;
  }
}
</style> 