<template>
  <section class="hero">
    <div class="hero__container">
      <div class="hero__content">
        <div class="hero__text">
          <h1 class="hero__title">
            ارسال 
            <span class="hero__title--highlight">سریع، امن و سرویس رایگان</span> 
            صورتحساب‌ها!
          </h1>
          <p class="hero__description">
            با سامانه اعتماد سداد، صورتحساب‌های الکترونیک شما در لحظه ثبت و در سریع‌ترین زمان در یک بستر کاملا ایمن به سازمان امور مالیاتی ارسال میشوند.
          </p>
          
          <div class="hero__actions">
            <button class="hero__button hero__button--tutorial" @click="navigateToTutorials">
              <span class="hero__button-icon hero__button-icon--tutorial">
                <span class="hero__button-icon-symbol"></span>
              </span>
              آموزش تصویری
            </button>
            <button class="hero__button hero__button--guide" @click="scrollToSteps">
              <span class="hero__button-icon hero__button-icon--guide">
                <span class="hero__button-icon-symbol"></span>
              </span>
              راهنمای صورتحساب
            </button>
          </div>
        </div>

        <div class="hero__image">
          <div class="hero__floating-elements">
            <div class="hero__floating-circle hero__floating-circle--1"></div>
            <div class="hero__floating-circle hero__floating-circle--2"></div>
            <div class="hero__floating-circle hero__floating-circle--3"></div>
            <div class="hero__floating-circle hero__floating-circle--4"></div>
          </div>
          <img 
            src="../../assets/img/main.png" 
            alt="Main illustration" 
            class="hero__main-image"
          >
        </div>
      </div>
    </div>
  </section>
</template>

  <script setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const navigateToTutorials = () => {
    router.push('/tutorials');
  };

  const scrollToSteps = () => {
  const stepsSection = document.querySelector('.home-steps');
  if (stepsSection) {
    stepsSection.scrollIntoView({ behavior: 'smooth' });
  }
};
  </script>
  
  <style scoped>
@font-face {
  font-family: 'YekanBold';
  src: url('../../assets/fonts/woff/IRANYekanX-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
  50% {
    transform: translateY(-25px) rotate(15deg);
    opacity: 0.5;
  }
  100% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.3;
  }
}

.hero {
  position: relative;
  margin-top: -50px;
  margin-bottom: 120px;
}

.hero__container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.hero__content {
  display: flex;
  align-items: center;
  gap: 60px;
  width: 100%;
  z-index: 1;
}

.hero__text {
  width: 50%;
  text-align: right;
}

.hero__title {
  font-size: 38px;
  font-weight: bolder;
  color: #292929;
  line-height: 1.5;
  margin: 0 0 20px 0;
}

.hero__title--highlight {
  font-weight: 900;
  color: #514a9b ;
  font-family: 'YekanBold', sans-serif;
}

.hero__description {
  font-size: 16px;
  color: #242424;
  line-height: 1.6;
  margin: 0 0 30px 0;
}

.hero__actions {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
}

.hero__button {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 30px;
  cursor: pointer;
  border: 2px solid #d6d6d6;
  background: transparent;
  transition: all 0.3s ease;
  font-size: 14px;
  color: #292929;
}

.hero__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.hero__button-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
}

.hero__button-icon--tutorial {
  background: linear-gradient(0deg, #2d663a 0%, #7caa86 100%);
}

.hero__button-icon--guide {
  background: linear-gradient(180deg, #7473b6 0%, #514a9b 50%, #514a9b 100%);
}

.hero__button-icon-symbol {
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}

.hero__button--tutorial .hero__button-icon-symbol {
  background-image: url('../../assets/img/play.svg');
}

.hero__button--guide .hero__button-icon-symbol {
  background-image: url('../../assets/img/guide.svg');
}

.hero__image {
  display: flex;
  width: 55%;
  justify-content: center;
  align-items: center;
  position: relative;
}

.hero__main-image {
  max-width: 800px;
  height: auto;
  display: block;
  position: relative;
  z-index: 2;
}

.hero__floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero__floating-circle {
  position: absolute;
  opacity: 0.3;
  border-radius: 50%;
  animation: float infinite;
}

.hero__floating-circle--1 {
  top: 20%;
  left: 30%;
  width: 20px;
  height: 20px;
  background-color: #6058b6;
  animation-duration: 9s;
  animation-delay: 0s;
}

.hero__floating-circle--2 {
  top: 50%;
  left: 10%;
  width: 50px;
  height: 50px;
  background-color: #a2c7a2;
  animation-duration: 7s;
  animation-delay: 2s;
}

.hero__floating-circle--3 {
  top: 18%;
  left: 45%;
  width: 30px;
  height: 30px;
  background-color: #a2c7a2;
  animation-duration: 8s;
  animation-delay: 1s;
}

.hero__floating-circle--4 {
  top: 70%;
  left: 60%;
  width: 25px;
  height: 25px;
  background-color: #6058b6;
  animation-duration: 6s;
  animation-delay: 3s;
}

@media (max-width: 1200px) {
  .hero__container {
    max-width: 100%;
    padding: 0 20px;
  }
  
  .hero__title {
    font-size: 32px;
  }
}

@media (max-width: 992px) {
  .hero {
    padding: 40px 20px;
  }
  
  .hero__content {
    flex-direction: column-reverse;
    text-align: center;
    gap: 40px;
  }
  
  .hero__text {
    width: 100%;
    text-align: center;
    margin-top: 40px;
  }
  
  .hero__image {
    width: 100%;
    max-width: 600px;
  }

  .hero__actions {
    justify-content: center;
  }

  .hero__title {
    font-size: 28px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 30px 15px;
    margin-top: 120px;
  }
  
  .hero__title {
    font-size: 24px;
    margin-top: -80px;
  }
  
  .hero__description {
    font-size: 15px;
  }

  .hero__button {
    padding: 8px 16px;
    font-size: 14px;
  }
  
  .hero__button-icon {
    width: 35px;
    height: 35px;
  }
  
  .hero__button-icon-symbol {
    width: 16px;
    height: 16px;
  }
}

@media (max-width: 576px) {
  .hero {
    padding: 20px 10px;
  }
  
  .hero__title {
    font-size: 24px;
    line-height: 1.4;
  }
  
  .hero__description {
    font-size: 14px;
    margin-bottom: 25px;
  }
  
  .hero__actions {
    flex-direction: row;
    gap: 15px;
    align-items: center;
  }

  .hero__button {
    width: 50%;
    max-width: 280px;
    justify-content: center;
    padding: 10px 5px;
  }
  
  .hero__image {
    max-width: 100%;
  }
  
  .hero__main-image {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .hero__title {
    font-size: 24px;
  }
  
  .hero__description {
    font-size: 14px;
  }
  
  .hero__button {
    font-size: 13px;
    padding: 10px 5px;
  }

  .hero__content {
    margin-top: -150px;
  }
  
  .hero__button-icon {
    width: 30px;
    height: 30px;
    margin-left: 8px;
  }
  
  .hero__button-icon-symbol {
    width: 14px;
    height: 14px;
  }
}
</style>