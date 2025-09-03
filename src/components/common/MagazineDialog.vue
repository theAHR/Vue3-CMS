<template>
  <Transition name="dialog">
    <div v-if="show" class="dialog-overlay" @click="closeDialog">
      <div class="dialog-content" @click.stop>
        <!-- Dialog Header -->
        <div class="dialog-header">
          <button class="close-button" @click="closeDialog">
            <svg viewBox="0 0 24 24" fill="currentColor" class="close-icon">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
          <h3 class="dialog-title">{{ isEdit ? 'ویرایش مجله' : 'ایجاد مجله' }}</h3>
        </div>

        <!-- Dialog Body -->
        <div class="dialog-body">
          <!-- Loading Overlay -->
          <div v-if="isLoadingMagazine" class="loading-overlay">
            <div class="loading-content">
              <div class="loading-spinner"></div>
              <p class="loading-text">در حال بارگذاری اطلاعات مجله...</p>
            </div>
          </div>
          
          <form @submit.prevent="handleSubmit" :class="{ 'loading-form': isLoadingMagazine }">
            <!-- Title Field -->
            <div class="form-group">
              <label for="title" class="form-label">
                عنوان
                <span class="required">*</span>
              </label>
              <input
                id="title"
                v-model="formData.title"
                type="text"
                class="form-input"
                :class="{ 'error': errors.title }"
                placeholder="وارد کنید ..."
                required
              />
              <span v-if="errors.title" class="error-message">{{ errors.title }}</span>
            </div>

            <!-- Text Field -->
            <div class="form-group">
              <label for="text" class="form-label">
                متن خبر
                <span class="required">*</span>
              </label>
              <textarea
                id="text"
                v-model="formData.text"
                class="form-textarea"
                :class="{ 'error': errors.text }"
                placeholder="وارد کنید ..."
                rows="4"
                required
              ></textarea>
              <span v-if="errors.text" class="error-message">{{ errors.text }}</span>
            </div>

            <!-- Category Field -->
            <div class="form-group">
              <label for="categoryId" class="form-label">
                دسته‌بندی
                <span class="required">*</span>
              </label>
              <select
                id="categoryId"
                v-model="formData.categoryId"
                class="form-input"
                :class="{ 'error': errors.categoryId }"
                required
              >
                <option value="">انتخاب دسته‌بندی</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.title }}
                </option>
              </select>
              <span v-if="errors.categoryId" class="error-message">{{ errors.categoryId }}</span>
            </div>

            <!-- Active Field -->
            <div class="form-group">
              <div class="checkbox-group">
                <input
                  id="active"
                  v-model="formData.active"
                  type="checkbox"
                  class="checkbox-input"
                />
                <label for="active" class="checkbox-label">فعال</label>
              </div>
            </div>

            <!-- Images Field -->
            <div class="form-group">
              <label class="form-label">تصاویر (حداکثر 5 عدد)</label>
              <div class="images-container">
                <div v-for="(image, index) in formData.images" :key="index" class="image-item">
                  <span class="image-name">{{ image }}</span>
                  <button
                    type="button"
                    @click="removeImage(index)"
                    class="remove-image-btn"
                  >
                    حذف
                  </button>
                </div>
                
                <div v-if="formData.images.length < 5" class="upload-section">
                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    @change="handleFileUpload"
                    class="hidden"
                  />
                  <button
                    type="button"
                    @click="triggerFileInput"
                    class="upload-btn"
                  >
                    افزودن تصویر
                  </button>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
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
import { magazineCategoryService } from '@/services/api/magazineCategory';
import { magazineService } from '@/services/api/magazine';
import { useSnackbar } from '@/utils/snackbar';

const props = defineProps({
  show: { type: Boolean, default: false },
  magazine: { type: Object, default: null },
  magazineType: { type: Number, required: true },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['close', 'submit']);

const { success, error } = useSnackbar();

const formData = ref({
  title: '',
  text: '',
  categoryId: '',
  active: true,
  images: []
});

const categories = ref([]);
const errors = ref({});
const fileInput = ref(null);
const isLoadingMagazine = ref(false);

const isEdit = computed(() => !!props.magazine);

const fetchCategories = async () => {
  try {
    const response = await magazineCategoryService.search({
      skip: 0,
      take: 25,
      sort: 'des|createDate',
      magazineType: props.magazineType
    });
    
    if (response.data.success) {
      categories.value = response.data.list || [];
    }
  } catch (err) {
    console.error('Error fetching categories:', err);
    error('خطا در دریافت دسته‌بندی‌ها');
  }
};

const fetchMagazineById = async (id) => {
  isLoadingMagazine.value = true;
  try {
    const response = await magazineService.getById(id);
    if (response.data.success && response.data.object) {
      const magazineData = response.data.object;
      const images = magazineData.image ? magazineData.image.map(img => img.imageName) : [];
      
      formData.value = {
        title: magazineData.title || '',
        text: magazineData.text || '',
        categoryId: magazineData.categoryId || '',
        active: magazineData.active !== undefined ? magazineData.active : true,
        images: images
      };
      
      console.log('Fetched magazine data:', magazineData);
      console.log('Processed images:', images);
      
      // Fetch categories after magazine data is loaded
      await fetchCategories();
    }
  } catch (err) {
    console.error('Error fetching magazine:', err);
    error('خطا در دریافت اطلاعات مجله');
  } finally {
    isLoadingMagazine.value = false;
  }
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

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
      formData.value.images.push(response.data.object);
      success('تصویر با موفقیت بارگذاری شد');
    } else {
      error('خطا در بارگذاری تصویر');
    }
  } catch (err) {
    console.error('Error uploading file:', err);
    error('خطا در بارگذاری تصویر');
  }
};

const removeImage = (index) => {
  formData.value.images.splice(index, 1);
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleDialogOpen = () => {
  console.log('Dialog opened, magazine prop:', props.magazine);
  if (props.magazine && props.magazine.id) {
    console.log('Fetching full magazine data for ID:', props.magazine.id);
    fetchMagazineById(props.magazine.id);
  } else {
    console.log('No magazine provided, resetting form and fetching categories');
    resetForm();
    fetchCategories();
  }
};

const validateForm = () => {
  errors.value = {};
  
  if (!formData.value.title || !formData.value.title.trim()) {
    errors.value.title = 'عنوان الزامی است';
  } else if (formData.value.title.trim().length < 2) {
    errors.value.title = 'عنوان باید حداقل ۲ کاراکتر باشد';
  } else if (formData.value.title.trim().length > 200) {
    errors.value.title = 'عنوان نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد';
  }
  
  if (!formData.value.text || !formData.value.text.trim()) {
    errors.value.text = 'متن خبر الزامی است';
  } else if (formData.value.text.trim().length < 10) {
    errors.value.text = 'متن خبر باید حداقل ۱۰ کاراکتر باشد';
  }
  
  if (!formData.value.categoryId) {
    errors.value.categoryId = 'انتخاب دسته‌بندی الزامی است';
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = () => {
  if (validateForm()) {
    const submitData = {
      id: props.magazine?.id || null,
      title: formData.value.title,
      text: formData.value.text,
      categoryId: formData.value.categoryId,
      active: formData.value.active,
      images: formData.value.images,
      magazineType: props.magazineType
    };

    emit('submit', submitData);
  }
};

const resetForm = () => {
  formData.value = {
    title: '',
    text: '',
    categoryId: '',
    active: true,
    images: []
  };
  errors.value = {};
};

const closeDialog = () => {
  emit('close');
};

watch(() => props.magazine, (newMagazine) => {
  try {
    if (newMagazine && typeof newMagazine === 'object' && newMagazine.id) {
      console.log('Magazine prop changed, fetching full data for ID:', newMagazine.id);
      fetchMagazineById(newMagazine.id);
    } else if (!newMagazine) {
      resetForm();
    }
  } catch (error) {
    console.error('Error updating form data:', error);
    resetForm();
  }
}, { immediate: true, deep: true });

watch(() => props.show, (show) => {
  try {
    if (show) {
      handleDialogOpen();
    } else {
      resetForm();
    }
  } catch (error) {
    console.error('Error handling show change:', error);
  }
}, { immediate: true });

watch([() => props.show, () => props.magazine], ([show, magazine]) => {
  if (show && magazine && magazine.id) {
    console.log('Both show and magazine changed, fetching data for ID:', magazine.id);
    fetchMagazineById(magazine.id);
  }
}, { immediate: true });

onMounted(() => {
  if (props.show && !props.magazine) {
    fetchCategories();
  }
});
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

.form-input,
.form-textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  color: #374151;
  background-color: white;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.error,
.form-textarea.error {
  border-color: #ef4444;
}

.form-input.error:focus,
.form-textarea.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.error-message {
  display: block;
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.25rem;
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-input {
  width: 1rem;
  height: 1rem;
  accent-color: #3b82f6;
}

.checkbox-label {
  font-size: 0.875rem;
  color: #374151;
  cursor: pointer;
}

.images-container {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  padding: 1rem;
  background-color: #f9fafb;
}

.image-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.image-name {
  font-size: 0.875rem;
  color: #374151;
  flex: 1;
  margin-right: 1rem;
}

.remove-image-btn {
  background: #ef4444;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.remove-image-btn:hover {
  background: #dc2626;
}

.upload-section {
  margin-top: 0.5rem;
}

.upload-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.upload-btn:hover {
  background: #2563eb;
}

.form-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: space-between;
  margin-top: 2rem;
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
  font-weight: 600;
}

.btn-confirm.success {
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
}

.btn-confirm:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.btn-cancel {
  background: #f1f5f9;
  color: #64748b;
}

.btn-cancel:hover:not(:disabled) {
  background: #e2e8f0;
  color: #475569;
  transform: translateY(-1px);
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

/* RTL specific adjustments */
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

.image-item {
  flex-direction: row-reverse;
}

.image-name {
  margin-right: 0;
  margin-left: 1rem;
}

/* Responsive */
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

/* Loading Overlay */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  border-radius: 0.5rem;
}

.loading-content {
  text-align: center;
  padding: 2rem;
}

.loading-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid #e5e7eb;
  border-top: 3px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

.loading-text {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.loading-form {
  opacity: 0.5;
  pointer-events: none;
}

.dialog-body {
  position: relative;
}
</style>