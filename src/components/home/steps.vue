<template>
  <section id="registration-steps" class="home-steps">
    <div class="steps-wrapper">
      <header class="section-header title-center">
      <div class="title-group">
        <div class="title-header">
          <img src="/src/assets/img/title-green.svg" alt="" class="title-icon-left" />
          <h2>قدم به قدم تا ثبت صورتحساب</h2>
          <img src="/src/assets/img/title-green.svg" alt="" class="title-icon-right" />
        </div>
        <p style="color: white;">در اولین اقدام لازم است تا در سامانه مؤدیان مالیاتی، پرونده خود را ایجاد کنید و «اعتماد پردازش سداد» را بعنوان معتمد مالیاتی انتخاب کنید</p>
      </div>
    </header>
      <div class="steps-container mt-8">
        <ul class="steps-list">
          <li v-for="(item, index) in items" :key="index" class="home-steps__item">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-icon-container">
              <div class="step-icon">
                <svg v-if="index === 0" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                <svg v-else-if="index === 1" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
                <svg v-else width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="12" y1="18" x2="12" y2="12"></line>
                  <line x1="9" y1="15" x2="15" y2="15"></line>
                </svg>
              </div>
            </div>
            <div class="step-content">
              <h3 class="step-title">{{ item.text }}</h3>
              <p v-if="item.description" class="step-description">{{ item.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    text: 'ثبت نام در سامانه‌ی اعتماد سداد',
    description: ''
  },
  {
    text: 'تشکیل پرونده و انعقاد قرارداد',
    description: ''
  },
  {
    text: 'ثبت نام در سامانه‌ی اعتماد سداد',
    description: ''
  }
])
</script>
<style scoped>
.home-steps {
    background: linear-gradient(0deg, #4b4a79 0%, #514a9b 50%, #514a9b 100%);
    color: #ffffff;
    padding: 50px 20px;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    direction: rtl;
    margin-bottom: 50px;
  }
  
  .home-steps::before {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    top: -150px;
    right: -100px;
    z-index: 1;
  }
  
  .home-steps::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    bottom: -100px;
    left: -50px;
    z-index: 1;
  }
  
  .steps-wrapper {
    margin: 0 auto;
    text-align: center;
    position: relative;
    z-index: 2;
  }
  
  .steps-container {
    position: relative;

  }
  
  .steps-list {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 60px;
    list-style: none;
    padding: 0;
    margin: 0;
    flex-wrap: wrap;
    margin-top: 80px;
  }
  
  .home-steps__item {
    position: relative;
    text-align: center;
    max-width: 250px;
    transition: transform 0.3s ease;
  }
  
  .home-steps__item:hover {
    transform: translateY(-10px);
  }
  
  .step-number {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #ffffff;
    color: #6B46C1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
    z-index: 3;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .step-icon-container {
    position: relative;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 30px;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .step-icon-container:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
  }
  
  .step-icon {
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .step-content {
    text-align: center;
  }
  
  .step-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: #ffffff;
    line-height: 1.4;
  }
  
  .step-description {
    font-size: 0.9rem;
    opacity: 0.8;
    line-height: 1.4;
    color: #ffffff;
    margin: 0;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    
    .steps-list {
      flex-direction: column;
      gap: 40px;
      align-items: center;
    }
    
    .home-steps__item {
      max-width: 300px;
    }
    
    .step-icon-container {
      width: 80px;
      height: 80px;
    }
    
    .step-icon svg {
      width: 28px;
      height: 28px;
    }
    
    .step-number {
      width: 28px;
      height: 28px;
      font-size: 14px;
      top: -12px;
    }
    
    .step-title {
      font-size: 1rem;
    }
    
    .step-description {
      font-size: 0.85rem;
    }
  }
  
  @media (max-width: 480px) {
    .home-steps {
      padding: 60px 15px;
    }
  }</style>
