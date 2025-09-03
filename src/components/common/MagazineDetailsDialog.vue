<template>
  <Transition name="dialog">
    <div v-if="show" class="details-dialog-overlay" @click="closeDialog">
      <div class="details-dialog" @click.stop>
        <!-- Dialog Header -->
        <div class="dialog-header">
          <button class="close-button" @click="closeDialog">
            <svg viewBox="0 0 24 24" fill="currentColor" class="close-icon">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <h3 class="dialog-title">جزئیات مجله</h3>
        </div>

        <!-- Dialog Body -->
        <div class="dialog-body">
          <div v-if="fullMagazineData">
            <div class="detail-item">
              <label class="detail-label">عنوان:</label>
              <span class="detail-value">{{ fullMagazineData.title || 'نامشخص' }}</span>
            </div>

            <div class="detail-item">
              <label class="detail-label">وضعیت:</label>
              <span 
                :class="fullMagazineData.active ? 'status-active' : 'status-inactive'"
                class="detail-value status-badge"
              >
                {{ fullMagazineData.active ? 'فعال' : 'غیرفعال' }}
              </span>
            </div>

            <div class="detail-item">
              <label class="detail-label">دسته‌بندی:</label>
              <span class="detail-value">{{ categoryTitle || 'نامشخص' }}</span>
            </div>

            <div class="detail-item">
              <label class="detail-label">تاریخ ایجاد:</label>
              <span class="detail-value">{{ formattedDate || 'نامشخص' }}</span>
            </div>

            <div class="detail-item">
              <label class="detail-label">شناسه:</label>
              <span class="detail-value">{{ fullMagazineData.id || 'نامشخص' }}</span>
            </div>

            <div class="detail-item detail-item-full">
              <label class="detail-label">متن خبر:</label>
              <div class="detail-value detail-text">{{ fullMagazineData.text || 'بدون متن' }}</div>
            </div>

            <div v-if="fullMagazineData.image && fullMagazineData.image.length > 0" class="detail-item detail-item-full">
              <label class="detail-label">تصاویر:</label>
              <div class="images-grid">
                <div 
                  v-for="(imageObj, index) in fullMagazineData.image" 
                  :key="index"
                  class="image-item"
                >
                  <img 
                    :src="getImageUrl(imageObj.imageName)"
                    :alt="`تصویر ${index + 1}`"
                    class="image-preview"
                    @click="viewImageFullscreen(imageObj.imageName)"
                  />
                  <div class="image-overlay">
                    <button
                      @click="viewImageFullscreen(imageObj.imageName)"
                      class="view-image-btn"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Dialog Actions -->
        <div class="dialog-actions">
          <button class="btn btn-close" @click="closeDialog">
            <span>بستن</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>

  <!-- Fullscreen Image Modal -->
  <div v-if="showFullscreenImage" class="fullscreen-image-overlay" @click="showFullscreenImage = false">
    <div class="fullscreen-image-container" @click.stop>
      <button
        @click="showFullscreenImage = false"
        class="fullscreen-close-btn"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <img 
        :src="getImageUrl(fullscreenImageUrl)"
        alt="تصویر بزرگ"
        class="fullscreen-image"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { magazineCategoryService } from '@/services/api/magazineCategory';
import { magazineService } from '@/services/api/magazine';

const props = defineProps({
  show: { type: Boolean, default: false },
  magazine: { type: Object, default: null },
  magazineType: { type: Number, required: true }
});

const emit = defineEmits(['close']);

const showFullscreenImage = ref(false);
const fullscreenImageUrl = ref('');
const categoryTitle = ref('');
const fullMagazineData = ref(null);

const formattedDate = computed(() => {
  const magazineData = fullMagazineData.value || props.magazine;
  if (!magazineData?.createDate) return '-';
  return new Date(magazineData.createDate).toLocaleDateString('fa-IR');
});

const getImageUrl = (imageName) => {
  if (!imageName) return '';
  return `https://apilanding.trustedtsp.ir/api/v1/attachment/${imageName}`;
};

const viewImageFullscreen = (imageUrl) => {
  fullscreenImageUrl.value = imageUrl;
  showFullscreenImage.value = true;
};

const closeDialog = () => {
  emit('close');
};

const fetchFullMagazineData = async (id) => {
  try {
    const response = await magazineService.getById(id);
    if (response.data.success && response.data.object) {
      fullMagazineData.value = response.data.object;
      console.log('Fetched full magazine data for details:', fullMagazineData.value);
    }
  } catch (err) {
    console.error('Error fetching full magazine data:', err);
  }
};

const fetchCategoryTitle = async () => {
  const magazineData = fullMagazineData.value || props.magazine;
  if (!magazineData?.categoryId) {
    categoryTitle.value = '-';
    return;
  }

  try {
    const response = await magazineCategoryService.search({
      skip: 0,
      take: 25,
      sort: 'des|createDate',
      magazineType: props.magazineType
    });
    
    if (response.data.success) {
      const category = response.data.list?.find(cat => cat.id === magazineData.categoryId);
      categoryTitle.value = category?.title || '-';
    }
  } catch (err) {
    console.error('Error fetching category:', err);
    categoryTitle.value = '-';
  }
};

watch(() => props.show, (newVal) => {
  if (newVal && props.magazine && props.magazine.id) {
    fetchFullMagazineData(props.magazine.id);
  }
});

watch(() => props.magazine, (newVal) => {
  if (newVal && newVal.id && props.show) {
    fetchFullMagazineData(newVal.id);
  }
});

watch(() => fullMagazineData.value, (newVal) => {
  if (newVal) {
    fetchCategoryTitle();
  }
});
</script>

<style scoped>
.details-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
}

.details-dialog {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.dialog-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.375rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  transition: all 0.15s ease-in-out;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #374151;
}

.close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

.dialog-body {
  padding: 1.5rem;
}

.detail-item {
  display: flex;
  margin-bottom: 1rem;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 0.375rem;
  transition: background-color 0.15s ease-in-out;
}

.detail-item:hover {
  background-color: #f3f4f6;
}

.detail-item-full {
  flex-direction: column;
}

.detail-label {
  font-weight: 600;
  color: #374151;
  min-width: 120px;
  margin-right: 0;
  margin-left: 1rem;
}

.detail-item-full .detail-label {
  margin-left: 0;
  margin-bottom: 0.5rem;
}

.detail-value {
  color: #6b7280;
  flex: 1;
}

.detail-text {
  white-space: pre-wrap;
  line-height: 1.6;
  max-height: 200px;
  overflow-y: auto;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-active {
  background-color: #dcfce7;
  color: #166534;
}

.status-inactive {
  background-color: #fee2e2;
  color: #991b1b;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 0.5rem;
}

.image-item {
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.15s ease-in-out;
}

.image-item:hover {
  transform: scale(1.05);
}

.image-preview {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease-in-out;
}

.image-item:hover .image-overlay {
  background: rgba(0, 0, 0, 0.3);
}

.view-image-btn {
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.15s ease-in-out;
}

.image-item:hover .view-image-btn {
  opacity: 1;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  background-color: #f9fafb;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-close {
  background: #f1f5f9;
  color: #64748b;
}

.btn-close:hover:not(:disabled) {
  background: #e2e8f0;
  color: #475569;
  transform: translateY(-1px);
}

.btn-close:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.fullscreen-image-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10001;
  padding: 2rem;
}

.fullscreen-image-container {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fullscreen-close-btn {
  position: absolute;
  top: -3rem;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s ease-in-out;
}

.fullscreen-close-btn:hover {
  background: rgba(0, 0, 0, 0.7);
}

.fullscreen-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 0.5rem;
}

/* RTL specific adjustments */
.dialog-header {
  flex-direction: row-reverse;
}

.detail-item {
  flex-direction: row;
}

.detail-item-full {
  flex-direction: column;
}

.dialog-actions {
  flex-direction: row-reverse;
}

/* Responsive */
@media (max-width: 640px) {
  .details-dialog {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
  
  .dialog-header,
  .dialog-body,
  .dialog-actions {
    padding: 1rem;
  }
  
  .detail-item {
    flex-direction: column;
  }
  
  .detail-label {
    margin-right: 0;
    margin-bottom: 0.5rem;
  }

  .images-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
  }

  .image-preview {
    height: 100px;
  }

  .fullscreen-image-overlay {
    padding: 1rem;
  }

  .fullscreen-close-btn {
    top: -2.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
}

/* Transition animations */
.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.2s ease-out;
}

.dialog-enter-from {
  opacity: 0;
}

.dialog-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.dialog-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.dialog-leave-to {
  opacity: 0;
}
</style>
