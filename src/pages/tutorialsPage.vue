<template>
    <section class="multimedia-section">
      <div class="multimedia-container">
            <div v-if="loading" class="home-news__loading">
          <div class="home-news__spinner"></div>
          <p>در حال بارگذاری...</p>
        </div>

            <div v-else-if="error" class="home-news__error">
          <p>{{ error }}</p>
        </div>

            <div v-else class="multimedia-grid">
          <div v-for="item in items" :key="item.id" class="media-card" @click="openPlayer(item.videoUrl)">
            <div class="media-image">
              <img :src="item.imageUrl" :alt="item.title" @error="handleImageError" />
              <div class="card-overlay">
                <div class="play-button-area">
                  <svg class="play-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
            </div>
            <div class="card-content">
              <h3 class="media-title">{{ item.title }}</h3>
              <div class="media-footer">
                <svg xmlns="http://www.w3.org/2000/svg" class="time-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ formatDate(item.createDate) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VideoPlayer v-if="isPlayerVisible" :video-url="currentVideoUrl" @close="closePlayer" />
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import placeholder from '@/assets/img/blank.jpg';
  import { format } from 'date-fns-jalali';
  import VideoPlayer from '@/components/common/VPlayer';
  import { baseURL, videoBaseURL, imageBaseURL } from '@/config/api';
  
  const loading = ref(true);
  const error = ref(null);
  const items = ref([]);
  const isPlayerVisible = ref(false);
  const currentVideoUrl = ref('');
  
  const API_URL = `${baseURL}/api/v1/multi-media?skip=0&take=21&active=true&sort=des%7CcreateDate`;
  const VIDEO_BASE = videoBaseURL;
  const THUMB_BASE = imageBaseURL;
  
  const fetchData = async () => {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      items.value = (data.list || []).map(item => ({
        id: item.id,
        title: item.description,
        imageUrl: item.thumbnail ? THUMB_BASE + item.thumbnail : placeholder,
        videoUrl: item.videoName ? VIDEO_BASE + item.videoName : '#',
        createDate: item.createDate
      }));
    } catch (e) {
      console.error('Error fetching data:', e);
      error.value = 'خطا در دریافت اطلاعات';
      items.value = [];
    } finally {
      loading.value = false;
    }
  };
  
  const openPlayer = (videoUrl) => {
    if (videoUrl && videoUrl !== '#') {
      currentVideoUrl.value = videoUrl;
      isPlayerVisible.value = true;
    }
  };
  
  const closePlayer = () => {
    isPlayerVisible.value = false;
    currentVideoUrl.value = '';
  };
  
  onMounted(fetchData);
  
  const handleImageError = (event) => {
    event.target.onerror = null;
    event.target.src = placeholder;
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'yyyy/MM/dd');
  };
  </script>
  
  <style src="@/components/home/section-header.css"></style>
  <style scoped>
  /* Loading Animation */
  .home-news__loading {
    text-align: center;
    padding: 40px;
    color: #6b7280;
  }

  .home-news__spinner {
    width: 32px;
    height: 32px;
    border: 3px solid #f3f4f6;
    border-top: 3px solid #514a9b;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .home-news__error {
    text-align: center;
    padding: 40px;
    color: #ef4444;
    background: #fef2f2;
    border-radius: 12px;
    border: 1px solid #fecaca;
  }

  .multimedia-section {
    padding: 80px 0;
    color: #fff;
    direction: rtl;
    position: relative;
    overflow: hidden;
  }
  
  .multimedia-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
    position: relative;
    z-index: 2;
  }
  
  .multimedia-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
  
  .media-card {
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    cursor: pointer;
    background-color: #5a5a8a;
  }
  
  .media-card:hover {
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
  }
  
  .media-image {
    width: 100%;
    height: 220px;
    position: relative;
  }
  
  .media-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }
  
  .card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
  }
  
  .media-card:hover .card-overlay {
    background-color: rgba(0, 0, 0, 0.4);
  }
  
  .card-content {
    padding: 15px 20px;
    text-align: right;
    color: #fff;
  }
  
  .media-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  .media-footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    opacity: 0.8;
  }
  
  .play-button-area {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    width: 70px;
    height: 70px;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  .media-card:hover .play-button-area {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  
  .play-icon {
    width: 30px;
    height: 30px;
    fill: #fff;
    margin-left: 3px;
  }
  
  .time-icon {
    width: 16px;
    height: 16px;
  } 
  </style>
  