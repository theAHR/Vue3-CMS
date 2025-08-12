<template>
  <div class="layout-container">
    <main class="main-content">
      <router-view />
    </main>
    <NavigationMenu />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavigationMenu from '@/components/NavigationMenu.vue'

const route = useRoute()

const showIntro = computed(() => {
  return route.name !== 'Home'
})
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  margin-right: 280px;
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;
}

/* Responsive design */
@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }
  
  .main-content {
    margin-right: 0;
    padding: 15px;
  }
}
</style>