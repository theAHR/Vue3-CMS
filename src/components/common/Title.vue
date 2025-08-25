<template>
  <div class="page-header">
    <div class="header-content">
      <div class="header-left">
        <h1 class="page-title">پنل مدیریت محتوا / {{ title }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.page-header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.page-title {
  font-size: 1.5rem;
  color: #2c2c2c;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .page-title {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .page-header {
    margin-bottom: 20px;
  }
  
  .page-title {
    font-size: 1rem;
  }
}
</style>
