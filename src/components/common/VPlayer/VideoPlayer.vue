<template>
  <div class="video-player-overlay" @click.self="close" ref="overlay">
    <!-- Animated Background Particles -->
    <div class="particles-background">
      <div class="particle" v-for="n in 20" :key="n"></div>
    </div>
    
    <!-- Main Video Modal -->
    <div class="video-player-modal">
      <!-- Loading State Overlay -->
      <div v-if="isLoading" class="loading-overlay">
        <div class="loading-container">
          <div class="loading-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
          </div>
          <p class="loading-text">... درحال بارگذاری ویدیو</p>
        </div>
      </div>
      <!-- Glow Effect Background -->
      <div class="modal-glow"></div>
      
      <!-- Header with Title and Controls -->
      <div class="video-header">
        <div class="video-title">
          <h3>اعتماد پردازش سداد</h3>
          <div class="title-underline"></div>
        </div>
        <div class="header-controls">
          <button class="control-btn volume-btn" @click="toggleMute" title="Volume">
            <svg v-if="!isMuted && volume > 0.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <svg v-else-if="!isMuted && volume > 0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          </button>
          <button class="control-btn play-pause-btn" @click="togglePlay" title="Play/Pause">
            <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </button>
          <button class="control-btn fullscreen-btn" @click="toggleFullscreen" title="Fullscreen">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
            </svg>
          </button>
          <button class="control-btn close-btn" @click="close" title="Close">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Video Container -->
      <div class="video-container">
        <video 
          ref="video"
          :src="videoUrl"
          @loadstart="handleLoadStart"
          @loadedmetadata="handleLoadedMetadata"
          @canplay="handleCanPlay"
          @play="handlePlay"
          @pause="handlePause"
          @timeupdate="handleTimeUpdate"
          @ended="handleEnded"
          @error="handleError"
          preload="metadata"
        >
          Your browser does not support the video tag.
        </video>
        
        <!-- Play/Pause Overlay -->
        <div class="play-overlay" v-if="showPlayOverlay" @click="togglePlay">
          <div class="play-button">
            <svg v-if="!isPlaying" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Progress Bar -->
      <div class="progress-container">
        <div class="progress-bar" @click="seekTo">
          <div class="progress-fill" :style="{ width: `${progress}%` }"></div>
          <div class="progress-handle" :style="{ left: `${progress}%` }"></div>
        </div>
        <div class="time-display">
          <span class="current-time">{{ formatTime(currentTime) }}</span>
          <span class="duration">{{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>

    <!-- Success Animation -->
    <div v-if="showSuccessAnimation" class="success-animation">
      <div class="success-checkmark">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  videoUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);

// Refs
const overlay = ref(null);
const video = ref(null);

// Reactive state
const isLoading = ref(true); // Start with loading state
const isPlaying = ref(false);
const showPlayOverlay = ref(false); // Will be set to true when video is ready
const currentTime = ref(0);
const duration = ref(0);
const progress = ref(0);
const showSuccessAnimation = ref(false);
const volume = ref(1);
const isMuted = ref(false);

// Methods
const close = () => {
  if (video.value) {
    video.value.pause();
  }
  emit('close');
};

const togglePlay = () => {
  if (video.value) {
    if (isPlaying.value) {
      video.value.pause();
    } else {
      video.value.play();
    }
  }
};

const toggleFullscreen = () => {
  if (video.value) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.value.requestFullscreen();
    }
  }
};

const toggleMute = () => {
  if (video.value) {
    isMuted.value = !isMuted.value;
    video.value.muted = isMuted.value;
  }
};

const seekTo = (event) => {
  if (video.value && duration.value > 0) {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const seekPercent = clickX / rect.width;
    const seekTime = seekPercent * duration.value;
    video.value.currentTime = seekTime;
  }
};

const adjustVolume = (delta) => {
  if (video.value) {
    const newVolume = Math.max(0, Math.min(1, volume.value + delta));
    volume.value = newVolume;
    video.value.volume = newVolume;
    if (newVolume > 0 && isMuted.value) {
      isMuted.value = false;
      video.value.muted = false;
    }
  }
};

const seek = (seconds) => {
  if (video.value) {
    video.value.currentTime = Math.max(0, Math.min(duration.value, video.value.currentTime + seconds));
  }
};

const handleLoadStart = () => {
  isLoading.value = true;
};

const handleLoadedMetadata = () => {
  // Video metadata loaded, we can get duration
  if (video.value) {
    duration.value = video.value.duration || 0;
    video.value.volume = volume.value;
  }
};

const handleCanPlay = () => {
  isLoading.value = false;
  showPlayOverlay.value = true; // Show play button instead of autoplay
};

const handleError = () => {
  isLoading.value = false;
  console.error('Video failed to load:', props.videoUrl);
  // Could show an error message to user here
};

const handlePlay = () => {
  isPlaying.value = true;
  showPlayOverlay.value = false;
};

const handlePause = () => {
  isPlaying.value = false;
  showPlayOverlay.value = true;
};

const handleTimeUpdate = () => {
  if (video.value) {
    currentTime.value = video.value.currentTime;
    duration.value = video.value.duration || 0;
    progress.value = duration.value ? (currentTime.value / duration.value) * 100 : 0;
  }
};

const handleEnded = () => {
  isPlaying.value = false;
  showPlayOverlay.value = true;
  showSuccessAnimation.value = true;
  setTimeout(() => {
    showSuccessAnimation.value = false;
  }, 2000);
};

const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Keyboard shortcuts
const handleKeydown = (e) => {
  switch (e.key) {
    case 'Escape':
      close();
      break;
    case ' ':
      e.preventDefault();
      togglePlay();
      break;
    case 'f':
    case 'F':
      toggleFullscreen();
      break;
    case 'm':
    case 'M':
      toggleMute();
      break;
    case 'ArrowUp':
      e.preventDefault();
      adjustVolume(0.1);
      break;
    case 'ArrowDown':
      e.preventDefault();
      adjustVolume(-0.1);
      break;
    case 'ArrowLeft':
      e.preventDefault();
      seek(-10);
      break;
    case 'ArrowRight':
      e.preventDefault();
      seek(10);
      break;
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
  // Add entrance animation delay
  setTimeout(() => {
    if (overlay.value) {
      overlay.value.classList.add('show');
    }
  }, 100);
  // Initialize video volume
  if (video.value) {
    video.value.volume = volume.value;
  }
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style src="./VideoPlayer.css" scoped></style> 