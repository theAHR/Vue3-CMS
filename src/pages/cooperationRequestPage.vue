<template>
  <div class="cooperation-page">
    <section class="intro-section">
      <div class="container">
        <div class="intro-content">
          <div class="intro-text">
            <p>ما در شرکت اعتماد پردازش سداد همواره به دنبال جذب نیروهای توانمند، خلاق و پرانرژی هستیم که با دانش و تعهد خود بتوانند در مسیر رشد و پیشرفت شرکت سهیم باشند. همکاری با ما فرصتی استثنایی برای شما فراهم می‌آورد تا در محیطی پویا، نوآور و پیشرو کار کنید و تجربه‌ای بی‌نظیر از تعامل با تیمی حرفه‌ای و همدل را کسب کنید. ما به دنبال افرادی هستیم که با انگیزه و پشتکار خود بتوانند به ارتقاء کیفیت خدمات و محصولات شرکت کمک کنند. شرکت ما محیطی فراهم می‌کند که در آن افراد می‌توانند توانمندی‌های خود را به نمایش بگذارند و به توسعه شخصی و حرفه‌ای خود بپردازند. در این مسیر، برنامه‌های آموزشی و توسعه مهارت‌ها نیز به عنوان بخشی از فرهنگ سازمانی ما محسوب می‌شوند. پیوستن به تیم ما نه تنها یک فرصت شغلی، بلکه یک تجربه‌ی منحصر به فرد برای رشد و پیشرفت در کنار دیگر همکاران متعهد و بااستعداد خواهد بود.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="join-team-section">
      <div class="container">
        <div class="section-header title-center">
          <div class="title-group">
            <div class="title-header">
              <div class="title-icon-left"></div>
              <h2>به تیم ما بپیوندید</h2>
              <div class="title-icon-right"></div>
            </div>
            <p>در حال حاضر برای موقعیت‌های شغلی زیر می‌توانید رزومه خود را ارسال کنید</p>
          </div>
        </div>
        <div class="jobs-container" v-if="!loading">
          <div class="jobs-grid">
            <div 
              v-for="job in jobs" 
              :key="job.id" 
              class="job-card"
              :class="{ 'expanded': expandedJob === job.id }"
            >
                             <div class="job-header">
                 <h3 class="job-title">{{ job.title }}</h3>
                 <div class="job-actions">
                   <button 
                     class="apply-btn"
                     @click="applyForJob(job)"
                   >
                     درخواست همکاری
                   </button>
                   <button 
                     class="expand-btn"
                     @click="toggleJobExpansion(job.id)"
                   >
                     <span v-if="expandedJob !== job.id">جزئیات بیشتر</span>
                     <span v-else>بستن</span>
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M8 4L4 8L8 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                     </svg>
                   </button>
                 </div>
               </div>
              
              <div class="job-details" v-if="expandedJob === job.id">
                <div class="job-description">
                  <h4>توضیحات شغل:</h4>
                  <p>{{ job.description }}</p>
                </div>
                <div class="job-requirements">
                  <h4>مهارت‌ها و شرایط:</h4>
                  <p>{{ job.requirement }}</p>
                </div>
                <div class="job-date">
                  <span>تاریخ انتشار: {{ formatDate(job.createDate) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="home-news__loading">
          <div class="home-news__spinner"></div>
          <p>در حال بارگذاری موقعیت‌های شغلی...</p>
        </div>

        <div v-else-if="error" class="home-news__error">
          <p>{{ error }}</p>
        </div>

        <div v-else-if="!loading && jobs.length === 0" class="no-jobs">
          <p>در حال حاضر موقعیت شغلی فعالی وجود ندارد.</p>
        </div>
      </div>
    </section>

    <section class="application-form-section">
      <div class="container">
        <div class="section-header">
          <div class="title-group">
            <div class="title-header">
              <img src="/src/assets/img/title-green.svg" alt="" class="title-icon" />
              <h2>ارسال درخواست فرصت شغلی</h2>
            </div>
          </div>
        </div>
        
        <div class="form-content">
          <div class="form-illustration">
            <img src="/src/assets/img/cooperation-illustration.png" alt="تصویر درخواست شغل" />
          </div>
          
          <div class="form-wrapper">
            <form @submit.prevent="submitApplication" class="application-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="fullName">نام و نام خانوادگی <span class="required">*</span></label>
                  <input 
                    id="fullName"
                    v-model="formData.applicantFullName" 
                    type="text" 
                    required 
                    placeholder="وارد کنید ..."
                    :class="{ error: fieldErrors.applicantFullName }"
                    @input="validateField('applicantFullName', formData.applicantFullName)"
                    @blur="validateField('applicantFullName', formData.applicantFullName)"
                  />
                  <div v-if="fieldErrors.applicantFullName" class="field-error">{{ fieldErrors.applicantFullName }}</div>
                </div>
                <div class="form-group">
                  <label for="mobile">شماره موبایل <span class="required">*</span></label>
                  <input 
                    id="mobile"
                    v-model="formData.applicantMobileNumber" 
                    type="tel" 
                    required 
                    placeholder="وارد کنید ..."
                    :class="{ error: fieldErrors.applicantMobileNumber }"
                    @input="validateField('applicantMobileNumber', formData.applicantMobileNumber)"
                    @blur="validateField('applicantMobileNumber', formData.applicantMobileNumber)"
                  />
                  <div v-if="fieldErrors.applicantMobileNumber" class="field-error">{{ fieldErrors.applicantMobileNumber }}</div>
                </div>
              </div>
              
              <div class="form-row">
                <div class="form-group">
                  <label for="email">آدرس ایمیل <span class="required">*</span></label>
                  <input 
                    id="email"
                    v-model="formData.applicantMail" 
                    type="email" 
                    required 
                    placeholder="وارد کنید ..."
                    :class="{ error: fieldErrors.applicantMail }"
                    @input="validateField('applicantMail', formData.applicantMail)"
                    @blur="validateField('applicantMail', formData.applicantMail)"
                  />
                  <div v-if="fieldErrors.applicantMail" class="field-error">{{ fieldErrors.applicantMail }}</div>
                </div>
                <div class="form-group">
                  <label for="jobId">انتخاب موقعیت شغلی <span class="required">*</span></label>
                  <div class="custom-select" :class="{ 'error': fieldErrors.jobId, 'open': isDropdownOpen }">
                    <div class="select-header" @click="toggleDropdown">
                      <span class="select-value" :class="{ 'placeholder': !formData.jobId }">
                        {{ getSelectedJobTitle() || 'انتخاب موقعیت شغلی...' }}
                      </span>
                      <svg class="select-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6L8 10L4 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="select-dropdown" v-if="isDropdownOpen">
                      <div 
                        v-for="job in jobs" 
                        :key="job.id" 
                        class="select-option"
                        :class="{ 'selected': formData.jobId === job.id }"
                        @click="selectJob(job)"
                      >
                        <span class="option-title">{{ job.title }}</span>
                        <span class="option-indicator" v-if="formData.jobId === job.id">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 4L6 11L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div v-if="fieldErrors.jobId" class="field-error">{{ fieldErrors.jobId }}</div>
                </div>
              </div>
              
              <div class="form-group full-width">
                <label for="description">توضیحات <span class="required">*</span></label>
                <textarea 
                  id="description"
                  v-model="formData.applicantDescription" 
                  rows="4" 
                  required 
                  placeholder="وارد کنید ..."
                  :class="{ error: fieldErrors.applicantDescription }"
                  @input="validateField('applicantDescription', formData.applicantDescription)"
                  @blur="validateField('applicantDescription', formData.applicantDescription)"
                ></textarea>
                <div v-if="fieldErrors.applicantDescription" class="field-error">{{ fieldErrors.applicantDescription }}</div>
              </div>
              
              <div class="form-group full-width">
                <label for="resume">بارگذاری فایل رزومه <span class="required">*</span></label>
                <div class="file-upload">
                  <input 
                    id="resume"
                    type="file" 
                    ref="fileInput"
                    @change="handleFileUpload"
                    accept=".pdf,.doc,.docx"
                    required
                    :class="{ error: fieldErrors.applicantResume }"
                  />
                  <button type="button" class="file-btn" @click="$refs.fileInput.click()">
                    انتخاب فایل
                  </button>
                  <span v-if="selectedFile" class="file-name">{{ selectedFile.name }}</span>
                </div>
                <div v-if="fieldErrors.applicantResume" class="field-error">{{ fieldErrors.applicantResume }}</div>
                <small class="file-hint">فرمت‌های مجاز: PDF, DOC, DOCX (حداکثر 5MB)</small>
              </div>
              
              <button type="submit" :disabled="isSubmitting" class="submit-btn">
                <span v-if="!isSubmitting">ارسال درخواست</span>
                <div v-else class="spinner"></div>
              </button>
            </form>
            
            <div v-if="submitStatus" :class="['status-message', submitStatus.type]">
              {{ submitStatus.message }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import axios from '../plugins/axios'
import { baseURL } from '@/config/api'

// Job data
const jobs = ref([])
const loading = ref(true)
const error = ref(null)
const expandedJob = ref(null)

// Form data
const formData = reactive({
  jobId: '',
  applicantFullName: '',
  applicantMobileNumber: '',
  applicantMail: '',
  applicantDescription: '',
  applicantResume: null
})

const selectedFile = ref(null)
const isSubmitting = ref(false)
const submitStatus = ref(null)
const isDropdownOpen = ref(false)

// Validation errors
const fieldErrors = reactive({
  jobId: '',
  applicantFullName: '',
  applicantMobileNumber: '',
  applicantMail: '',
  applicantDescription: '',
  applicantResume: ''
})

// Fetch jobs from API
async function fetchJobs() {
  try {
    loading.value = true
    error.value = null
    const response = await axios.get(`${baseURL}/api/v1/jobs/search?skip=0&take=10&active=true&sort=des%7CcreateDate`)
    
    if (response.data.success) {
      jobs.value = response.data.list
    } else {
      error.value = 'خطا در دریافت اطلاعات';
      console.error('Failed to fetch jobs:', response.data.message)
    }
  } catch (err) {
    error.value = 'خطا در دریافت اطلاعات';
    console.error('Error fetching jobs:', err)
  } finally {
    loading.value = false
  }
}

function toggleJobExpansion(jobId) {
  expandedJob.value = expandedJob.value === jobId ? null : jobId
}

function applyForJob(job) {
  formData.jobId = job.id
  
  const formSection = document.querySelector('.application-form-section')
  if (formSection) {
    formSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }
  fieldErrors.jobId = ''
}

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}
function selectJob(job) {
  formData.jobId = job.id
  isDropdownOpen.value = false
  validateField('jobId', formData.jobId)
}

// Get selected job title
function getSelectedJobTitle() {
  if (!formData.jobId) return ''
  const selectedJob = jobs.value.find(job => job.id === formData.jobId)
  return selectedJob ? selectedJob.title : ''
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Handle file upload
function handleFileUpload(event) {
  const file = event.target.files[0]
  if (file) {
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      fieldErrors.applicantResume = 'حجم فایل نباید بیشتر از 5 مگابایت باشد'
      event.target.value = ''
      selectedFile.value = null
      return
    }
    
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      fieldErrors.applicantResume = 'فقط فایل‌های PDF، DOC و DOCX مجاز هستند'
      event.target.value = ''
      selectedFile.value = null
      return
    }
    
    selectedFile.value = file
    formData.applicantResume = file
    fieldErrors.applicantResume = ''
  }
}

// Validation functions
const validatePhone = (phone) => {
  if (!phone) return ''
  if (!/^09\d{9}$/.test(phone)) {
    return 'فرمت وارد شده صحیح نیست'
  }
  return ''
}

const validateEmail = (email) => {
  if (!email) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return 'فرمت وارد شده صحیح نیست'
  }
  return ''
}

// Validate field
const validateField = (fieldName, value) => {
  switch (fieldName) {
    case 'applicantMobileNumber':
      fieldErrors.applicantMobileNumber = validatePhone(value)
      break
    case 'applicantMail':
      fieldErrors.applicantMail = validateEmail(value)
      break
    case 'applicantFullName':
      fieldErrors.applicantFullName = !value ? 'این فیلد الزامی است' : ''
      break
    case 'jobId':
      fieldErrors.jobId = !value ? 'لطفا یک موقعیت شغلی انتخاب کنید' : ''
      break
    case 'applicantDescription':
      if (!value) {
        fieldErrors.applicantDescription = 'این فیلد الزامی است'
      } else if (value.length < 10) {
        fieldErrors.applicantDescription = 'توضیحات حداقل باید شامل ۱۰ کاراکتر باشد'
      } else {
        fieldErrors.applicantDescription = ''
      }
      break
  }
}

async function submitApplication() {
  if (isSubmitting.value) return

  validateField('applicantFullName', formData.applicantFullName)
  validateField('applicantMobileNumber', formData.applicantMobileNumber)
  validateField('applicantMail', formData.applicantMail)
  validateField('jobId', formData.jobId)
  validateField('applicantDescription', formData.applicantDescription)
  
  if (!formData.applicantResume) {
    fieldErrors.applicantResume = 'لطفا فایل رزومه را انتخاب کنید'
  } else {
    fieldErrors.applicantResume = ''
  }

  const hasErrors = Object.values(fieldErrors).some(error => error !== '')
  if (hasErrors) {
    submitStatus.value = {
      type: 'error',
      message: 'لطفا خطاهای فرم را برطرف کنید'
    }
    return
  }
  
  isSubmitting.value = true
  submitStatus.value = null
  
  try {
    const formDataToSend = new FormData()
    formDataToSend.append('jobId', formData.jobId)
    formDataToSend.append('applicantFullName', formData.applicantFullName)
    formDataToSend.append('applicantMobileNumber', formData.applicantMobileNumber)
    formDataToSend.append('applicantMail', formData.applicantMail)
    formDataToSend.append('applicantDescription', formData.applicantDescription)
    formDataToSend.append('applicantResume', formData.applicantResume)
    
    const response = await axios.post(`${baseURL}/api/v1/job-requests`, formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    // Check if the response indicates success
    if (response.status >= 200 && response.status < 300) {
      submitStatus.value = {
        type: 'success',
        message: 'درخواست شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت.'
      }

      // Reset form data
      Object.keys(formData).forEach(key => {
        if (key !== 'applicantResume') {
          formData[key] = ''
        }
      })
      selectedFile.value = null
      
      // Reset file input
      const fileInput = document.getElementById('resume')
      if (fileInput) {
        fileInput.value = ''
      }
      
      // Clear field errors
      Object.keys(fieldErrors).forEach(key => {
        fieldErrors[key] = ''
      })
    } else {
      throw new Error('API returned non-success status')
    }
    
  } catch (error) {
    console.error('Error submitting application:', error)
    
    // Check if it's a network error or API error
    let errorMessage = 'خطا در ارسال درخواست. لطفا دوباره تلاش کنید.'
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', error.response.data)
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message
      }
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = 'خطا در اتصال به سرور. لطفا اتصال اینترنت خود را بررسی کنید.'
    }
    
    submitStatus.value = {
      type: 'error',
      message: errorMessage
    }
  } finally {
    isSubmitting.value = false
  }
}

function handleClickOutside(event) {
  const select = event.target.closest('.custom-select')
  if (!select && isDropdownOpen.value) {
    isDropdownOpen.value = false
  }
}

onMounted(() => {
  fetchJobs()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
@import '../components/home/section-header.css';

.section-header .title-group .title-header .title-icon {
  width: 70px;
  height: 70px;
  flex-shrink: 0;
  object-fit: contain;
}

:root {
  --main-font: 'YekanRegular', Arial, sans-serif;
  --main-accent: #514a9b;
  --main-bg: #ffffff;
  --card-bg: #ffffff;
  --section-bg: #fafafa;
  --border-radius: 8px;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 4px 16px rgba(0, 0, 0, 0.12);
}

@font-face {
  font-family: 'YekanRegular';
  src: url('@/assets/fonts/woff/IRANYekanX-Regular.woff') format('woff');
  font-style: normal;
}

.cooperation-page {
  font-family: var(--main-font);
  background: var(--main-bg);
  padding: 40px 0;
  margin-bottom: 60px;
}

.intro-section {
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%);
  padding: 60px 0;
  margin-bottom: 40px;
}

.join-team-section {
  padding: 40px 0;
}

.application-form-section {
  background: var(--section-bg);
  padding: 60px 0;
  margin-top: 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.intro-content {
  text-align: center;
  max-width: 1200px;
}

.intro-text p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin: 0;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.section-header p {
  color: #666;
  font-size: 1rem;
}

.jobs-container {
  margin-top: 40px;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.job-card {
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  padding: 24px;
  box-shadow: var(--shadow);
  transition: all 0.3s ease;
}

.job-card.expanded {
  border-color: var(--main-accent);
}

.job-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.job-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.job-title {
  font-size: 1.2rem;
  color: #333;
  margin: 0;
  font-weight: 600;
  flex: 1;
}

.apply-btn {
  background: #3a3273;
  border-color: #3a3273;
  border-radius: 6px;
  padding: 10px 16px;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-weight: 500;
}

.expand-btn {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 8px 16px;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.expand-btn svg {
  transition: transform 0.2s ease;
  transform: rotate(0deg);
}

.job-card.expanded .expand-btn svg {
  transform: rotate(-90deg);
}

.job-details {
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
  margin-top: 16px;
}

.job-description,
.job-requirements {
  margin-bottom: 16px;
}

.job-description h4,
.job-requirements h4 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 8px;
  font-weight: 600;
}

.job-description p,
.job-requirements p {
  color: #666;
  line-height: 1.6;
  font-size: 0.9rem;
  margin: 0;
  white-space: pre-line;
}

.job-date {
  font-size: 0.85rem;
  color: #999;
  text-align: left;
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

/* No Jobs State */
.no-jobs {
  text-align: center;
  padding: 60px 20px;
  color: #666;
  font-size: 1rem;
}

/* Application Form Section */

.form-content {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-top: 40px;
  width: 100%;
  box-sizing: border-box;
}

.form-wrapper {
  flex: 1.2;
  max-width: 600px;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid #e8e8e8;
  padding: 32px;
  box-shadow: var(--shadow);
  width: 100%;
  box-sizing: border-box;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

.form-group.full-width {
  flex: none;
  width: 100%;
}

.form-group label {
  display: block;
  color: #333;
  margin-bottom: 8px;
  font-size: 0.95rem;
  font-weight: 500;
}

.required {
  color: #e74c3c;
  margin-right: 2px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 0.95rem;
  background: var(--main-bg);
  transition: all 0.2s ease;
  font-family: var(--main-font);
  box-sizing: border-box;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-align: right;
  direction: rtl;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  text-align: right;
  direction: rtl;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--main-accent);
  box-shadow: 0 0 0 3px rgba(81, 74, 155, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

/* Custom Select Styles */
.custom-select {
  position: relative;
  width: 100%;
}

.select-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  background: var(--main-bg);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 48px;
}

.select-header:hover {
  border-color: #d1d5db;
  background-color: #f9fafb;
}

.custom-select.open .select-header {
  border-color: var(--main-accent);
  box-shadow: 0 0 0 3px rgba(81, 74, 155, 0.1);
}

.custom-select.error .select-header {
  border-color: #e74c3c;
  background-color: #fff5f5;
}

.select-value {
  color: #333;
  font-size: 0.95rem;
  flex: 1;
  text-align: right;
}

.select-value.placeholder {
  color: #999;
}

.select-arrow {
  color: #666;
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-right: 8px;
}

.custom-select.open .select-arrow {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  margin-top: -1px;
}

.select-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #f0f0f0;
}

.select-option:last-child {
  border-bottom: none;
}

.select-option.selected {
  background-color: var(--main-accent);
}

.option-title {
  font-size: 0.95rem;
  flex: 1;
  text-align: right;
}

.option-indicator {
  color: currentColor;
  flex-shrink: 0;
  margin-left: 8px;
}

.file-upload {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.file-upload input[type="file"] {
  display: none;
}

.file-btn {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 10px 16px;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.file-btn:hover {
  background: #e8e8e8;
  border-color: #ccc;
}

.file-name {
  color: #666;
  font-size: 0.9rem;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-hint {
  color: #999;
  font-size: 0.8rem;
  margin-top: 4px;
  display: block;
}

.field-error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.field-error::before {
  content: "⚠";
  font-size: 0.9rem;
}

.form-group input.error,
.form-group textarea.error {
  border-color: #e74c3c;
  background-color: #fff5f5;
}

.submit-btn {
  width: 100%;
  margin-top: 24px;
  padding: 14px 20px;
  background: #463d8a;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #3a3273;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.submit-btn .spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

.status-message {
  margin-top: 16px;
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  font-size: 0.9rem;
}

.status-message.success {
  background: #e8f5e8;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}

.status-message.error {
  background: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
}

.form-illustration {
  flex: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-illustration img {
  max-width: 80%;
  height: auto;
}

/* Responsive Design */
@media (max-width: 900px) {
  .jobs-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .form-content {
    flex-direction: column;
    gap: 40px;
  }
  
  .form-wrapper {
    max-width: 100%;
    width: 100%;
  }
  
  .form-illustration {
    flex: 1;
  }
  
  .form-illustration img {
    max-width: 60%;
  }
}

@media (max-width: 768px) {
  .cooperation-page {
    padding: 20px 0;
  }
  
  .container {
    padding: 0 16px;
  }
  
  .intro-section {
    padding: 20px 0;
    margin: 0;
  }
  
  .join-team-section {
    padding: 20px 0;
    margin: 0;
  }
  
  .application-form-section {
    padding: 20px 0;
    margin: 0;
  }
  
  .intro-text p {
    font-size: 1rem;
  }
  
  .section-header h2 {
    font-size: 1.6rem;
  }
  
  .job-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .job-actions {
    align-self: flex-end;
    flex-direction: column;
    gap: 8px;
  }
  
  .apply-btn,
  .expand-btn {
    width: 100%;
    justify-content: center;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-wrapper {
    padding: 24px 20px;
    width: 100%;
    max-width: 100%;
  }
  
  .form-illustration img {
    max-width: 50%;
  }
}

@media (max-width: 480px) {
  .cooperation-page {
    padding: 20px 0;
  }
  
  .container {
    padding: 0 12px;
  }
  
  .intro-section {
    padding: 20px 0;
    margin: 0;
  }
  
  .join-team-section {
    padding: 20px 0;
    margin: 0;
  }
  
  .application-form-section {
    padding: 20px 0;
    margin: 0;
  }
  
  .section-header h2 {
    font-size: 1.4rem;
  }
  
  .form-wrapper {
    padding: 20px 16px;
  }
  
  .file-upload {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .file-btn {
    width: 100%;
    text-align: center;
  }
}
</style>