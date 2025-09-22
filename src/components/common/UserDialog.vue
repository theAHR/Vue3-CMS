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
          <h3 class="dialog-title">{{ isEdit ? 'ویرایش کاربر' : 'ایجاد کاربر' }}</h3>
        </div>

        <div class="dialog-body">
          <div v-if="isLoadingUser" class="loading-overlay">
            <div class="loading-spinner"></div>
          </div>
          
          <form @submit.prevent="handleSubmit" :class="{ 'loading-form': isLoadingUser }">
            <div class="form-row">
              <div class="form-group form-group-half">
                <label for="name" class="form-label">
                  نام
                  <span class="required">*</span>
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.name }"
                  placeholder="وارد کنید ..."
                  @input="clearError('name')"
                />
                <div v-if="errors.name" class="error-notification">
                  <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="error-text">{{ errors.name }}</span>
                </div>
              </div>

              <div class="form-group form-group-half">
                <label for="lastName" class="form-label">
                  نام خانوادگی
                  <span class="required">*</span>
                </label>
                <input
                  id="lastName"
                  v-model="formData.lastName"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.lastName }"
                  placeholder="وارد کنید ..."
                  @input="clearError('lastName')"
                />
                <div v-if="errors.lastName" class="error-notification">
                  <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="error-text">{{ errors.lastName }}</span>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group form-group-half">
                <label for="mobileNo" class="form-label">
                  شماره موبایل
                  <span class="required">*</span>
                </label>
                <input
                  id="mobileNo"
                  v-model="formData.mobileNo"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.mobileNo }"
                  placeholder="وارد کنید ..."
                  @input="clearError('mobileNo')"
                />
                <div v-if="errors.mobileNo" class="error-notification">
                  <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="error-text">{{ errors.mobileNo }}</span>
                </div>
              </div>

              <div class="form-group form-group-half">
                <label for="username" class="form-label">
                  نام کاربری
                  <span class="required">*</span>
                </label>
                <input
                  id="username"
                  v-model="formData.username"
                  type="text"
                  class="form-input"
                  :class="{ 'error': errors.username }"
                  placeholder="وارد کنید ..."
                  @input="clearError('username')"
                />
                <div v-if="errors.username" class="error-notification">
                  <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="error-text">{{ errors.username }}</span>
                </div>
              </div>
            </div>

            <div v-if="!isEdit" class="form-group">
              <label for="password" class="form-label">
                کلمه عبور
                <span class="required">*</span>
              </label>
              <input
                id="password"
                v-model="formData.password"
                type="password"
                class="form-input"
                :class="{ 'error': errors.password }"
                placeholder="وارد کنید ..."
                @input="clearError('password')"
              />
              <div v-if="errors.password" class="error-notification">
                <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="error-text">{{ errors.password }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group form-group-half">
                <VSelect
                  id="role"
                  v-model="formData.role"
                  :options="roleOptions"
                  placeholder="انتخاب نقش"
                  :error-message="errors.role"
                  @change="clearError('role')"
                />
              </div>

              <div class="form-group form-group-half">
                <div class="toggle-group">
                  <label for="active" class="toggle-label">وضعیت : </label>
                  <div class="toggle-switch">
                    <input
                      id="active"
                      v-model="formData.active"
                      type="checkbox"
                      class="toggle-input"
                    />
                    <span class="toggle-slider"></span>
                  </div>
                  <span class="toggle-text">{{ formData.active ? 'فعال' : 'غیرفعال' }}</span>
                </div>
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
import { userService } from '@/services/api/user';
import { useSnackbar } from '@/utils/snackbar';
import VSelect from './VSelect.vue';

const props = defineProps({
  show: { type: Boolean, default: false },
  user: { type: Object, default: null },
  loading: { type: Boolean, default: false }
});

const emit = defineEmits(['close', 'submit']);

const { success, error } = useSnackbar();

const formData = ref({
  name: '',
  lastName: '',
  mobileNo: '',
  username: '',
  password: '',
  role: '',
  active: true
});

const errors = ref({});
const isLoadingUser = ref(false);

const isEdit = computed(() => !!props.user);

const roleOptions = [
  { value: 1, label: 'منابع انسانی' },
  { value: 2, label: 'کارشناس پشتیبانی' },
  { value: 3, label: 'سرپرست پشتیبانی' },
  { value: 4, label: 'مدیر سیستم' },
  { value: 5, label: 'روابط عمومی' }
];

const fetchUserById = async (id) => {
  isLoadingUser.value = true;
  try {
    const response = await userService.getById(id);
    if (response.data.success && response.data.object) {
      const userData = response.data.object;
      
      formData.value = {
        name: userData.name || '',
        lastName: userData.lastName || '',
        mobileNo: userData.mobileNo || '',
        username: userData.username || '',
        password: '',
        role: userData.userRole || '',
        active: userData.active !== undefined ? userData.active : true
      };
    }
  } catch (err) {
    error('خطا در دریافت اطلاعات کاربر');
  } finally {
    isLoadingUser.value = false;
  }
};

const handleDialogOpen = () => {
  if (props.user && props.user.id) {
    fetchUserById(props.user.id);
  } else {
    resetForm();
  }
};

const validateForm = () => {
  errors.value = {};
  
  if (!formData.value.name || !formData.value.name.trim()) {
    errors.value.name = 'نام الزامی است';
  } else if (formData.value.name.trim().length < 2) {
    errors.value.name = 'نام باید حداقل ۲ کاراکتر باشد';
  }
  
  if (!formData.value.lastName || !formData.value.lastName.trim()) {
    errors.value.lastName = 'نام خانوادگی الزامی است';
  } else if (formData.value.lastName.trim().length < 2) {
    errors.value.lastName = 'نام خانوادگی باید حداقل ۲ کاراکتر باشد';
  }
  
  if (!formData.value.mobileNo || !formData.value.mobileNo.trim()) {
    errors.value.mobileNo = 'شماره موبایل الزامی است';
  } else if (!/^09\d{9}$/.test(formData.value.mobileNo.trim())) {
    errors.value.mobileNo = 'شماره موبایل باید با 09 شروع شده و 11 رقم باشد';
  }
  
  if (!formData.value.username || !formData.value.username.trim()) {
    errors.value.username = 'نام کاربری الزامی است';
  } else if (formData.value.username.trim().length < 3) {
    errors.value.username = 'نام کاربری باید حداقل ۳ کاراکتر باشد';
  }
  
  if (!isEdit.value) {
    if (!formData.value.password || !formData.value.password.trim()) {
      errors.value.password = 'کلمه عبور الزامی است';
    } else if (formData.value.password.trim().length < 6) {
      errors.value.password = 'کلمه عبور باید حداقل ۶ کاراکتر باشد';
    }
  }
  
  if (!formData.value.role) {
    errors.value.role = 'انتخاب نقش الزامی است';
  }
  
  return Object.keys(errors.value).length === 0;
};

const handleSubmit = (event) => {
  event.preventDefault();
  
  if (validateForm()) {
    const submitData = {
      id: props.user?.id || null,
      name: formData.value.name,
      lastName: formData.value.lastName,
      mobileNo: formData.value.mobileNo,
      username: formData.value.username,
      role: formData.value.role,
      active: formData.value.active
    };

    if (!isEdit.value) {
      submitData.password = formData.value.password;
    }

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
    name: '',
    lastName: '',
    mobileNo: '',
    username: '',
    password: '',
    role: '',
    active: true
  };
  errors.value = {};
};

const closeDialog = () => {
  emit('close');
};

watch(() => props.show, (show) => {
  if (show) {
    handleDialogOpen();
  } else {
    resetForm();
  }
}, { immediate: true });

onMounted(() => {
  if (props.show && !props.user) {
    resetForm();
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

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
}

.form-group-half {
  flex: 1;
  margin-bottom: 0;
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

.toggle-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.toggle-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin: 0;
}

.toggle-switch {
  position: relative;
  display: inline-block;
  width: 3rem;
  height: 1.5rem;
}

.toggle-input {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  cursor: pointer;
  z-index: 1;
}

.toggle-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #cbd5e1;
  transition: 0.3s;
  border-radius: 1.5rem;
  pointer-events: none;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 1.25rem;
  width: 1.25rem;
  left: 0.125rem;
  bottom: 0.125rem;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-input:checked + .toggle-slider {
  background-color: #40ac6d;
}

.toggle-input:checked + .toggle-slider:before {
  transform: translateX(1.5rem);
}

.toggle-text {
  font-size: 0.875rem;
  font-weight: 600;
  color: #636464;
  min-width: 3rem;
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
</style>
