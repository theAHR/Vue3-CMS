<template>
  <div class="help-page">
    <div class="container">
          <div v-if="loading" class="home-news__loading">
        <div class="home-news__spinner"></div>
        <p>در حال بارگذاری فایل‌ها...</p>
      </div>

                <div v-else-if="error" class="home-news__error">
        <p>{{ error }}</p>
      </div>

      <div v-else class="files-container">
        <div class="files-grid">
          <div 
            v-for="(file, index) in files" 
            :key="file.id" 
            class="file-card"
            :style="{ animationDelay: `${index * 0.1}s` }"
            @click="downloadFile(file)"
          >
            <div class="card-header">
              <div class="file-type-icon">
                <img src="@/assets/img/pdf.svg" alt="PDF" class="pdf-icon" />
              </div>
              <div class="download-badge">
                <img src="@/assets/img/download.svg" alt="Download" />
              </div>
            </div>
            <div class="card-content">
              <h3 class="file-title">{{ file.title }}</h3>
            </div>
            <div class="file-meta">
              <div class="date-info">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1"/>
                </svg>
                <span>{{ formatDate(file.createDate) }}</span>
              </div>
              <div class="file-size">PDF</div>
            </div>
          </div>
        </div>
        <div v-if="files.length === 0" class="empty-state">
          <div class="empty-illustration">
            <img src="@/assets/img/pdf.svg" alt="PDF" class="pdf-icon" />
          </div>
          <h3>فایل راهنمایی موجود نیست</h3>
          <p>در حال حاضر فایل راهنمایی برای نمایش وجود ندارد.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import guideService from '@/services/guide';

export default {
  name: 'HelpPage',
  data() {
    return {
      files: [],
      loading: true,
      error: null
    };
  },
  mounted() {
    this.fetchFiles();
  },
  methods: {
    async fetchFiles() {
      this.loading = true;
      this.error = null;
      try {
        const response = await guideService.read({
          skip: 0,
          take: 21,
          active: true,
          sort: 'des|createDate'
        });
        if (response.data.success) {
          this.files = response.data.list || [];
        } else {
          this.error = 'خطا در دریافت اطلاعات';
        }
      } catch (err) {
        this.error = 'خطا در دریافت اطلاعات';
      } finally {
        this.loading = false;
      }
    },
    downloadFile(file) {
      const downloadUrl = guideService.getDownloadUrl(file.fileName);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = file.title + '.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('fa-IR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
};
</script>

<style scoped>
.help-page {
  min-height: 100vh;
  background: white;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 1;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #333;
  text-align: center;
}

.page-subtitle {
  font-size: 1.1rem;
  color: #666;
  max-width: 500px;
  margin: 0 auto 2rem auto;
  text-align: center;
}

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

.error-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.error-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  max-width: 400px;
}

.error-icon {
  width: 60px;
  height: 60px;
  color: #e74c3c;
  margin: 0 auto 1rem;
}

.error-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.error-card p {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.retry-btn {
  background: #666;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  background: #555;
}

.retry-btn svg {
  width: 20px;
  height: 20px;
}

.files-container {
  padding: 2rem 0 4rem;
}

.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.file-card {
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  animation: slideInUp 0.6s ease forwards;
  opacity: 0;
  transform: translateY(30px);
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: flex-start;
}

.file-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.file-type-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-type-icon img.pdf-icon {
  width: 35px;
  height: 35px;
  filter: grayscale(1) brightness(1.5) contrast(1.2);
}

.download-badge {
  width: 35px;
  height: 35px;
  background: rgba(128, 128, 128, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.download-badge img {
  width: 20px;
  height: 20px;
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.file-card:hover .download-badge {
  background: #666;
  transform: scale(1.1);
}

.file-card:hover .download-badge img {
  filter: grayscale(0%) brightness(0) invert(1);
}

.card-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.file-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-top: auto;
  padding-top: 1.2rem;
  border-top: 1px solid #f0f0f0;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.date-info svg {
  width: 16px;
  height: 16px;
  color: #666;
}

.file-size {
  background: rgba(128, 128, 128, 0.1);
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  padding: 4rem 0;
  color: #333;
}

.empty-illustration {
  width: 120px;
  height: 120px;
  color: #ccc;
  margin: 0 auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-illustration img.pdf-icon {
  width: 80px;
  height: 80px;
  filter: grayscale(1) brightness(1.5) contrast(1.2);
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.empty-state p {
  color: #666;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.5rem;
  }
  .files-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .file-card {
    padding: 1.25rem;
  }
}
@media (max-width: 480px) {
  .page-title {
    font-size: 1.2rem;
  }
}
</style>