<template>
  <div class="layout-container">
    <Header />
    <main class="main-content">
      <div class="content-wrapper">
        <router-view />
      </div>
    </main>
    <NavigationMenu />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavigationMenu from '@/components/NavigationMenu/NavigationMenu.vue'
import Header from '@/components/Header/Header.vue'

const route = useRoute()

const showIntro = computed(() => {
  return route.name !== 'Home'
})
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
  background-color: rgba(236, 236, 236, 0.39);
}

.main-content {
  flex: 1;
  margin-right: 300px;
  margin-top: 70px;
  height: calc(100vh - 70px);
  transition: margin-right 0.3s ease;
  overflow-y: auto;
  position: relative;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.main-content::-webkit-scrollbar {
  display: none;
}

.content-wrapper {
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
  min-height: 100%;
}

/* Responsive Design */
@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }
  
  .main-content {
    margin-right: 0;
    margin-top: 60px;
    height: calc(100vh - 60px);
  }
  
  .content-wrapper {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 15px;
  }
}
</style>