<template>
  <div class="messages-panel">
    <div class="panel-header">
      <h3>پیام‌ها</h3>
      <button class="close-btn" @click="$emit('close')">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
    
    <div class="panel-content">
      <div v-if="messages.length === 0" class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
        <p>پیام جدیدی وجود ندارد</p>
      </div>
      
      <div v-else class="message-list">
        <div 
          v-for="message in messages" 
          :key="message.id" 
          class="message-item"
        >
          <div class="message-avatar">
            <img :src="message.avatar" :alt="message.sender" />
          </div>
          
          <div class="message-content">
            <p class="message-sender">{{ message.sender }}</p>
            <p class="message-preview">{{ message.preview }}</p>
            <span class="message-time">{{ message.time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  messages: {
    type: Array,
    default: () => []
  }
});

defineEmits(['close']);
</script>

<style scoped>
.messages-panel {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border: 1px solid #e9ecef;
  width: 350px;
  max-height: 400px;
  z-index: 1000;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
}

.panel-header h3 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
}

.close-btn {
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: #adb5bd;
  cursor: pointer;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: #e9ecef;
  color: #495057;
}

.close-btn svg {
  width: 18px;
  height: 18px;
}

.panel-content {
  padding: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #adb5bd;
}

.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 0.9rem;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;
  transition: background 0.2s ease;
}

.message-item:hover {
  background: #e9ecef;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.message-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.message-content {
  flex: 1;
}

.message-sender {
  margin: 0 0 4px 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #495057;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.message-preview {
  margin: 0 0 8px 0;
  font-size: 0.85rem;
  color: #6c757d;
  line-height: 1.4;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.message-time {
  font-size: 0.75rem;
  color: #adb5bd;
}

/* Responsive Design */
@media (max-width: 768px) {
  .messages-panel {
    width: 300px;
    left: 20px;
    transform: none;
  }
}

@media (max-width: 480px) {
  .messages-panel {
    width: calc(100vw - 40px);
    left: 20px;
  }
}
</style>
