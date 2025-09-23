<template>
  <Transition name="dialog">
    <div v-if="show" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-content" @click.stop>
        <div class="dialog-header">
          <button class="close-button" @click="closeDialog">
            <svg viewBox="0 0 24 24" fill="currentColor" class="close-icon">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <h3 class="dialog-title">{{ isEdit ? 'ویرایش ویدئو' : 'ایجاد ویدئو' }}</h3>
        </div>

        <div class="dialog-body">
          <div v-if="isLoadingMultimedia" class="loading-overlay">
            <div class="loading-spinner"></div>
          </div>
          
          <form @submit.prevent="handleSubmit" :class="{ 'loading-form': isLoadingMultimedia }">
            <div class="form-group">
              <label for="description" class="form-label">
                عنوان
                <span class="required">*</span>
              </label>
              <input
                id="description"
                v-model="formData.description"
                type="text"
                class="form-input"
                :class="{ 'error': errors.description }"
                placeholder="وارد کنید ..."
                @input="clearError('description')"
              />
              <div v-if="errors.description" class="error-notification">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="error-text">{{ errors.description }}</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                فایل ویدئو (حداکثر سایز فایل 100 مگابایت)
                <span class="required">*</span>
              </label>
              <div 
                class="file-container"
                :class="{ 'error': errors.video }"
                @dragover="handleDragOver"
                @dragenter="handleDragEnter"
                @dragleave="handleDragLeave"
                @drop="handleVideoDrop"
              >
                <div v-if="!formData.videoName" class="upload-box" @click="triggerVideoInput">
                  <input
                    ref="videoInput"
                    type="file"
                    accept="video/*"
                    @change="handleVideoInputChange"
                    class="hidden"
                  />
                  <div v-if="isUploadingVideo" class="upload-loading">
                    <div class="upload-spinner"></div>
                  </div>
                  <div v-else class="upload-content">
                    <div class="upload-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <span class="upload-text">افزودن فایل ویدئو</span>
                    <span class="upload-hint">حداکثر 100 مگابایت</span>
                  </div>
                </div>

                <div v-else class="file-preview">
                  <div class="file-info">
                    <div class="file-icon video-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div class="file-details">
                      <span class="file-name">{{ formData.videoName }}</span>
                      <span class="file-type">ویدئو</span>
                    </div>
                    <button
                      type="button"
                      @click="removeVideo"
                      class="remove-file-btn"
                      title="حذف فایل"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="errors.video" class="error-notification">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="error-text">{{ errors.video }}</span>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">
                تصویر پیشنمایش (حداکثر سایز تصویر 5 مگابایت)
                <span class="required">*</span>
              </label>
              <div 
                class="file-container"
                :class="{ 'error': errors.thumbnail }"
                @dragover="handleDragOver"
                @dragenter="handleDragEnter"
                @dragleave="handleDragLeave"
                @drop="handleThumbnailDrop"
              >
                <div v-if="!formData.thumbnail" class="upload-box" @click="triggerThumbnailInput">
                  <input
                    ref="thumbnailInput"
                    type="file"
                    accept="image/*"
                    @change="handleThumbnailInputChange"
                    class="hidden"
                  />
                  <div v-if="isUploadingThumbnail" class="upload-loading">
                    <div class="upload-spinner"></div>
                  </div>
                  <div v-else class="upload-content">
                    <div class="upload-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <span class="upload-text">افزودن تصویر پیشنمایش</span>
                    <span class="upload-hint">حداکثر 5 مگابایت</span>
                  </div>
                </div>

                <div v-else class="file-preview">
                  <div class="file-info">
                    <div class="file-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div class="file-details">
                      <span class="file-name">{{ formData.thumbnail }}</span>
                      <span class="file-type">تصویر</span>
                    </div>
                    <button
                      type="button"
                      @click="removeThumbnail"
                      class="remove-file-btn"
                      title="حذف تصویر"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div v-if="errors.thumbnail" class="error-notification">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="error-text">{{ errors.thumbnail }}</span>
              </div>
            </div>
            
            <div class="form-actions">
              <button 
                class="btn btn-confirm success" 
                type="submit"
                :disabled="loading"
              >
                <svg v-if="loading" class="loading-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 18V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.93 4.93L7.76 7.76" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.24 16.24L19.07 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4.93 19.07L7.76 16.24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.24 7.76L19.07 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span v-else>تایید و ثبت</span>
              </button>
              <button 
                class="btn btn-cancel" 
                @click="closeDialog"
                :disabled="loading"
              >
                بستن
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { attachmentService } from '@/services/api/attachment';
import { multimediaService } from '@/services/api/multimedia';
import { useSnackbar } from '@/utils/snackbar';

const props = defineProps({
  show: { type: Boolean, default: false },
  multimedia: { type: Object, default: null },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['close', 'submit']);

const { success, error } = useSnackbar();

const formData = ref({
  description: '',
  videoName: '',
  video: null,
  thumbnail: '',
  thumbnailFile: null
});

const errors = ref({});
const videoInput = ref(null);
const thumbnailInput = ref(null);
const isLoadingMultimedia = ref(false);
const isUploadingVideo = ref(false);
const isUploadingThumbnail = ref(false);

const isEdit = computed(() => !!props.multimedia);

const fetchMultimediaById = async (id) => {
  isLoadingMultimedia.value = true;
  try {
    const response = await multimediaService.getById(id);
    if (response.data.success && response.data.object) {
      const multimediaData = response.data.object;
      
      formData.value = {
        description: multimediaData.description || '',
        videoName: multimediaData.videoName || '',
        video: null,
        thumbnail: multimediaData.thumbnail || '',
        thumbnailFile: null
      };
    }
  } catch (err) {
    error('خطا در دریافت اطلاعات ویدئو');
  } finally {
    isLoadingMultimedia.value = false;
  }
};

const handleVideoUpload = async (file) => {
  if (!file) return;

  const maxSize = 100 * 1024 * 1024; // 100MB in bytes
  if (file.size > maxSize) {
    error('حجم فایل ویدئو نباید بیشتر از ۱۰۰ مگابایت باشد');
    return;
  }

  if (!file.type.startsWith('video/')) {
    error('لطفاً فقط فایل‌های ویدئو انتخاب کنید');
    return;
  }

  isUploadingVideo.value = true;
  try {
    const uploadFormData = new FormData();
    uploadFormData.append('FileData', file);
    uploadFormData.append('attachmentType', '1');

    const response = await attachmentService.create(uploadFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data.success) {
      formData.value.videoName = response.data.object;
      formData.value.video = file;
      success('فایل ویدئو با موفقیت بارگذاری شد');
    } else {
      error('خطا در بارگذاری فایل ویدئو');
    }
  } catch (err) {
    error('خطا در بارگذاری فایل ویدئو');
  } finally {
    isUploadingVideo.value = false;
    if (videoInput.value) {
      videoInput.value.value = '';
    }
  }
};

const handleThumbnailUpload = async (file) => {
  if (!file) return;

  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    error('حجم فایل تصویر نباید بیشتر از ۵ مگابایت باشد');
    return;
  }

  if (!file.type.startsWith('image/')) {
    error('لطفاً فقط فایل‌های تصویری انتخاب کنید');
    return;
  }

  isUploadingThumbnail.value = true;
  try {
    const uploadFormData = new FormData();
    uploadFormData.append('FileData', file);
    uploadFormData.append('attachmentType', '2');

    const response = await attachmentService.create(uploadFormData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data.success) {
      formData.value.thumbnail = response.data.object;
      formData.value.thumbnailFile = file;
      success('تصویر پیشنمایش با موفقیت بارگذاری شد');
    } else {
      error('خطا در بارگذاری تصویر پیشنمایش');
    }
  } catch (err) {
    error('خطا در بارگذاری تصویر پیشنمایش');
  } finally {
    isUploadingThumbnail.value = false;
    if (thumbnailInput.value) {
      thumbnailInput.value.value = '';
    }
  }
};

const handleVideoInputChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    handleVideoUpload(file);
  }
};

const handleThumbnailInputChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    handleThumbnailUpload(file);
  }
};

const removeVideo = () => {
  formData.value.videoName = '';
  formData.value.video = null;
};

const removeThumbnail = () => {
  formData.value.thumbnail = '';
  formData.value.thumbnailFile = null;
};

const triggerVideoInput = () => {
  if (videoInput.value && !isUploadingVideo.value) {
    videoInput.value.click();
  }
};

const triggerThumbnailInput = () => {
  if (thumbnailInput.value && !isUploadingThumbnail.value) {
    thumbnailInput.value.click();
  }
};

const handleDialogOpen = () => {
  if (props.multimedia && props.multimedia.id) {
    fetchMultimediaById(props.multimedia.id);
  } else {
    resetForm();
  }
};

const validateForm = () => {
  errors.value = {};
  
  if (!formData.value.description || !formData.value.description.trim()) {
    errors.value.description = 'عنوان الزامی است';
  } else if (formData.value.description.trim().length < 2) {
    errors.value.description = 'عنوان باید حداقل ۲ کاراکتر باشد';
  } else if (formData.value.description.trim().length > 200) {
    errors.value.description = 'عنوان نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد';
  }
  
  if (!formData.value.videoName) {
    errors.value.video = 'انتخاب فایل ویدئو الزامی است';
  }
  
  if (!formData.value.thumbnail) {
    errors.value.thumbnail = 'انتخاب تصویر پیشنمایش الزامی است';
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = (event) => {
  event.preventDefault();
  
  if (validateForm()) {
    const submitData = {
      id: props.multimedia?.id || null,
      description: formData.value.description,
      videoName: formData.value.videoName,
      video: formData.value.videoName,
      thumbnail: formData.value.thumbnail
    };

    emit('submit', submitData);
  }
};

const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
};

const resetForm = () => {
  formData.value = {
    description: '',
    videoName: '',
    video: null,
    thumbnail: '',
    thumbnailFile: null
  };
  errors.value = {};
};

const closeDialog = () => {
  emit('close');
};

const handleDragOver = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

const handleDragEnter = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.currentTarget.classList.add('drag-over');
};

const handleDragLeave = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.currentTarget.classList.remove('drag-over');
};

const handleVideoDrop = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.currentTarget.classList.remove('drag-over');
  
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('video/')) {
      handleVideoUpload(file);
    } else {
      error('لطفاً فقط فایل‌های ویدئو انتخاب کنید');
    }
  }
};

const handleThumbnailDrop = (event) => {
  event.preventDefault();
  event.stopPropagation();
  event.currentTarget.classList.remove('drag-over');
  
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('image/')) {
      handleThumbnailUpload(file);
    } else {
      error('لطفاً فقط فایل‌های تصویری انتخاب کنید');
    }
  }
};

watch(() => props.show, (show) => {
  if (show) {
    handleDialogOpen();
  } else {
    resetForm();
  }
}, { immediate: true });
</script>

<style scoped>
.dialog-overlay {
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

.dialog-content {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
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
  overflow-y: auto;
  flex: 1;
  max-height: calc(90vh - 120px);
}

.dialog-body::-webkit-scrollbar {
  width: 6px;
}

.dialog-body::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.dialog-body::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.dialog-body::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.required {
  color: #ef4444;
  margin-right: 0.25rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #374151;
  background-color: white;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: #747474;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.error {
  border-color: #ef4444;
}

.form-input.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.error-notification {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.375rem;
  animation: fadeIn 0.2s ease-out;
}

.error-icon {
  width: 1rem;
  height: 1rem;
  color: #ef4444;
  flex-shrink: 0;
}

.error-text {
  font-size: 0.75rem;
  color: #dc2626;
  font-weight: 500;
  line-height: 1.4;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.file-container {
  border: 1px dashed #d1d5db;
  border-radius: 0.5rem;
  padding: 1.25rem;
  background-color: #f9fafb;
  min-height: 120px;
  transition: border-color 0.2s ease-in-out;
}

.file-container:hover {
  border-color: #5a5a5a;
}

.file-container.drag-over {
  border-color: #3b82f6;
  background-color: #eff6ff;
  border-style: solid;
}

.file-container.error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.upload-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120px;
  border: 1px dashed #d1d5db;
  border-radius: 0.5rem;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
}

.upload-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.upload-icon {
  width: 2rem;
  height: 2rem;
  color: #6b7280;
  transition: color 0.2s ease-in-out;
}

.upload-box:hover .upload-icon {
  color: #9b9ea1;
}

.upload-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.upload-hint {
  font-size: 0.75rem;
  color: #6b7280;
}

.upload-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.upload-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #5c5c5c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.file-preview {
  background: white;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.file-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.file-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: #ef4444;
  flex-shrink: 0;
}

.video-icon {
  color: #3b82f6;
}

.file-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.file-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  word-break: break-all;
}

.file-type {
  font-size: 0.75rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  width: fit-content;
}

.remove-file-btn {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;
}

.remove-file-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
}

.remove-file-btn svg {
  width: 1rem;
  height: 1rem;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
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
  justify-content: center;
  gap: 0.5rem;
  min-width: 120px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-confirm {
  color: white;
  font-weight: 500;
}

.btn-confirm.success {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
}

.btn-cancel {
  background: #636363;
  color: #ffffff;
}

.loading-icon {
  width: 1.25rem;
  height: 1.25rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.dialog-header {
  flex-direction: row-reverse;
}

.form-actions {
  flex-direction: row-reverse;
}

.required {
  margin-right: 0;
  margin-left: 0.25rem;
}

@media (max-width: 640px) {
  .dialog-content {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
  
  .dialog-header,
  .dialog-body {
    padding: 1rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}

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

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 0.5rem;
}

.loading-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #5c5c5c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-form {
  opacity: 0.5;
  pointer-events: none;
}

.dialog-body {
  position: relative;
}

.hidden {
  display: none !important;
}
</style>
