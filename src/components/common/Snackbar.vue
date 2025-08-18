<template>
  <div class="snackbar-container">
    <TransitionGroup name="snackbar" tag="div">
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['snackbar', `snackbar-${message.type}`, { 'snackbar-visible': message.visible }]"
      >
        <div class="snackbar-content">
          <div class="snackbar-icon">
            <svg v-if="message.type === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else-if="message.type === 'error'" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else-if="message.type === 'warning'" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18A2 2 0 003.17 20H20.83A2 2 0 0022.18 18L13.71 3.86A2 2 0 0010.29 3.86Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 17H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M13 16H22V18H13V16ZM13 12H22V14H13V12ZM13 8H22V10H13V8ZM6.52 17C6.24 17 6 16.76 6 16.48V7.52C6 7.24 6.24 7 6.52 7H9.48C9.76 7 10 7.24 10 7.52V16.48C10 16.76 9.76 17 9.48 17H6.52ZM7 8V16H9V8H7Z" fill="currentColor"/>
            </svg>
          </div>
          <span class="snackbar-message">{{ message.message }}</span>
          <button @click="hide(message.id)" class="snackbar-close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup>
import { snackbarMessages } from '@/utils/snackbar'

const messages = snackbarMessages

const hide = (id) => {
  const message = messages.value.find(msg => msg.id === id)
  if (message) {
    message.visible = false
  }
}
</script>

<style scoped>
.snackbar-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.snackbar {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 12px;
  max-width: 400px;
  pointer-events: auto;
  transform: translateX(100%);
  opacity: 0;
  transition: all 0.3s ease;
}

.snackbar-visible {
  transform: translateX(0);
  opacity: 1;
}

.snackbar-content {
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
}

.snackbar-icon {
  flex-shrink: 0;
}

.snackbar-message {
  flex: 1;
  font-size: 0.9rem;
  color: #272727;
  line-height: 1.4;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

.snackbar-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #718096;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.snackbar-close:hover {
  background: #f7fafc;
  color: #4a5568;
}

.snackbar-success {
  border-left: 4px solid #48bb78;
}

.snackbar-success .snackbar-icon {
  color: #48bb78;
}

.snackbar-error {
  border-left: 4px solid #f56565;
}

.snackbar-error .snackbar-icon {
  color: #f56565;
}

.snackbar-warning {
  border-left: 4px solid #ed8936;
}

.snackbar-warning .snackbar-icon {
  color: #ed8936;
}

.snackbar-info {
  border-left: 4px solid #4299e1;
}

.snackbar-info .snackbar-icon {
  color: #4299e1;
}

.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.3s ease;
}

.snackbar-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.snackbar-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 480px) {
  .snackbar-container {
    top: 10px;
    right: 10px;
    left: 10px;
  }
  
  .snackbar {
    max-width: none;
  }
}
</style>
