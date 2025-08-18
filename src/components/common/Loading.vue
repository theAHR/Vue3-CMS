<template>
  <div class="loading-wrapper">
    <div class="loading-spinner">
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5" />
      </svg>
    </div>
    <div v-if="text" class="loading-text">{{ text }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: 'در حال بارگذاری اطلاعات...'
  }
})
</script>

<style scoped>
.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  width: 100%;
  padding: 40px 0;
}
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}
.spinner {
  width: 56px;
  height: 56px;
  animation: spin 1s linear infinite;
}
.path {
  stroke: #667eea;
  stroke-linecap: round;
  opacity: 0.85;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  animation: dash 1.2s ease-in-out infinite;
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.loading-text {
  color: #667eea;
  font-size: 1.1rem;
  font-weight: 500;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
  margin-top: 8px;
  text-align: center;
}
</style>
