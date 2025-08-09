<template>
  <div class="v-intro">
    <span class="v-intro__bg" />

    <img class="v-intro__img" src="@/assets/img/plant.png" alt="Plant decoration" />

    <span class="v-intro__pattern" />

    <div class="p-relative">
      <h2 class="v-intro__title">{{ title }}</h2>

      <p class="v-intro__description">
        <slot />
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: null
  }
})
</script>

<style scoped>
@font-face {
    font-family: 'YekanBold';
    src: url('../../../assets/fonts/woff/IRANYekanX-Bold.woff') format('woff');
    font-style: normal;
}
@font-face {
    font-family: 'YekanMedium';
    src: url('../../assets/fonts/woff/IRANYekanX-Medium.woff') format('woff');
    font-weight: bold;
    font-style: normal;
}

.v-intro {
  position: relative;
  overflow: hidden;
  padding: 64px 94px;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 20px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.v-intro__bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.v-intro__bg::before {
  content: ' ';
  background: linear-gradient(120deg, rgba(178, 226, 188, 0.1) 45%, rgba(178, 226, 188, 1) 100%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.v-intro__bg::after {
  content: ' ';
  background: linear-gradient(220deg, rgba(178, 226, 188, 0.1) 55%, rgba(178, 226, 188, 1) 100%);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.v-intro__pattern {
  background-image: radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 0);
  background-size: 26px 26px;
  background-position: -16px -16px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
}

.v-intro__img {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: auto;
  object-fit: cover;
  height: 100%;
  z-index: 3;
}

.v-intro .p-relative {
  position: relative;
  z-index: 4;
}

.v-intro__title {
  font-family: 'YekanBold';
  line-height: 1.2;
  margin: 0 0 16px 0;
  color: #333;
}

.v-intro__description {
  font-family: 'YekanMedium';
  margin-top: 16px;
  color: #404856;
  line-height: 1.6;
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .v-intro {
    padding: 30px 35px 35px;
    margin-top: 30px;
    margin-bottom: 60px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 16px;
  }
  
  .v-intro__img {
    width: 200px;
    height: auto;
  }
  
  .v-intro .heading-3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .v-intro {
    margin-top: 15px;
    margin-bottom: 20px;
    margin-left: 16px;
    margin-right: 16px;
    padding: 16px 20px 20px;
    border-radius: 12px;
  }
  
  .v-intro__img {
    width: 200px;
    height: auto;
  }
  
  .v-intro__title {
    font-size: 1.1rem;
  }
  
  .v-intro__description {
    font-size: 0.9rem;
  }
}
</style> 