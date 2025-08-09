<template>
  <section class="customers">
    <header class="customers__header">
      <div class="customers__title-container">
        <h2 class="customers__title">مشتــریـان مـا</h2>
      </div>
    </header>

    <div class="customers__wrapper">
      <div
        class="customers__scroll"
        :class="{ 'customers__scroll--animate': !isPaused }"
      >
        <div 
          v-for="(item, index) in customerLogos" 
          :key="`original-${index}`" 
          class="customers__item"
        >
          <img 
            class="customers__logo" 
            :src="item.src" 
            :alt="`Customer logo ${index + 1}`" 
          />
        </div>
        
        <div 
          v-for="(item, index) in customerLogos" 
          :key="`duplicate-${index}`" 
          class="customers__item"
        >
          <img 
            class="customers__logo" 
            :src="item.src" 
            :alt="`Customer logo ${index + 1}`" 
          />
        </div>
        
        <div 
          v-for="(item, index) in customerLogos" 
          :key="`triplicate-${index}`" 
          class="customers__item"
        >
          <img 
            class="customers__logo" 
            :src="item.src" 
            :alt="`Customer logo ${index + 1}`" 
          />
        </div>
      </div>
    </div>
  </section>
</template>
  
  
<script setup>
import { ref } from 'vue'
import logoMazandaran from '@/assets/img/logo-mazandaran.png'
import logoMargarin from '@/assets/img/logo-margarin.png'
import logoZoghal from '@/assets/img/logo-zoghal.png'
import logoBale from '@/assets/img/logo-bale.png'
import logoSadad from '@/assets/img/log-sadad.png'
import logoBankMeli from '@/assets/img/logo-bank-meli.png'
import logoPars from '@/assets/img/logo-pars.png'
import logoPardakhtSadad from '@/assets/img/logo-pardakht-sadad.png'
import logoFarsi from '@/assets/img/logo-farsi.png'
import logoArtan from '@/assets/img/logo-artan.png'

const customerLogos = [
  { src: logoMazandaran },
  { src: logoMargarin },
  { src: logoZoghal },
  { src: logoBale },
  { src: logoSadad },
  { src: logoBankMeli },
  { src: logoPars },
  { src: logoPardakhtSadad },
  { src: logoFarsi },
  { src: logoArtan }
]

const isPaused = ref(false)
</script>
<style scoped>
@font-face {
  font-family: 'YekanExtraBold';
  src: url('../../assets/fonts/woff/IRANYekanX-ExtraBold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}
.customers {
  position: relative;
  padding: 40px 10px;
  margin: 40px auto 30px;
  background: radial-gradient(circle at top left, #ffffff 0%, #f0f2f5 100%);
  border: 1px solid #e0e0e0;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(4px);
  overflow: hidden;
  width: 90%;
  transition: all 0.3s ease;
}

.customers__header {
  margin-bottom: 2rem;
}

.customers__title-container {
  text-align: center;
  width: 100%;
}

.customers__title {
  font-size: 1.5rem;
  color: #696969;
  font-family: 'YekanExtraBold';

}

.customers__wrapper {
  position: relative;
  height: 100px;
  overflow: hidden;
}

.customers__scroll {
  display: flex;
  align-items: center;
  width: 300%;
  gap: 80px;
  position: absolute;
  top: 0;
  left: 0;
}

.customers__scroll--animate {
  animation: scroll-logos 40s linear infinite;
}

@keyframes scroll-logos {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-33.333%);
  }
}
.customers__item {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease, filter 0.3s ease;
}

.customers__item:hover {
  transform: scale(1.05);
}

.customers__logo {
  height: 100px;
  width: auto;
  filter: none;
  transition: transform 0.3s ease, filter 0.3s ease;
}

@media (max-width: 768px) {
  .customers {
    margin-top: -80px;
    padding: 40px 20px 60px;
  }
  
  .customers__wrapper {
    height: 120px;
  }
  
  .customers__scroll {
    gap: 30px;
  }
  
  .customers__logo {
    height: 10px;
  }
}

@media (min-width: 769px) {
  .customers {
    margin-top: -120px;
  }
}

@media (max-width: 480px) {
  .customers__wrapper {
    height: 100px;
  }
  
  .customers__scroll {
    gap: 20px;
  }
  
  .customers__logo {
    height: 100px;
  }
}
</style>