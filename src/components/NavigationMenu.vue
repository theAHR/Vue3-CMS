<template>
  <nav class="navigation-menu">
    <div class="menu-header">
      <h2>پنل مدیریت</h2>
    </div>

    <!-- Profile Section -->
    <div class="profile-section">
      <div class="profile-info">
        <div class="profile-avatar">
          <span class="profile-icon">👤</span>
        </div>
        <div class="profile-details">
          <h3 class="profile-name">مدیر سیستم</h3>
          <p class="profile-role">Administrator</p>
        </div>
      </div>
      <div class="profile-actions">
        <router-link to="/account/profile" class="profile-action-btn" title="پروفایل">
          <span>⚙️</span>
        </router-link>
        <router-link to="/account/logout" class="profile-action-btn logout-btn" title="خروج">
          <span>🚪</span>
        </router-link>
      </div>
    </div>
    
    <div class="menu-sections">
      <!-- Dashboard -->
      <div class="menu-item">
        <router-link to="/dashboard" class="menu-link" active-class="active">
          <span class="menu-icon">📊</span>
          <span class="menu-text">داشبورد</span>
        </router-link>
      </div>

      <!-- News Management -->
      <div class="accordion-menu">
        <div class="accordion-header" @click="toggleAccordion('news')" :class="{ 'active': isParentActive('/news') }">
          <span class="menu-icon">📰</span>
          <span class="menu-text">خبر</span>
          <span class="accordion-icon" :class="{ 'open': openSections.news }">▼</span>
        </div>
        <div class="accordion-content" :class="{ 'open': openSections.news }">
          <router-link to="/news/list" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">لیست اخبار</span>
          </router-link>
          <router-link to="/news/categories" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">دسته‌بندی اخبار</span>
          </router-link>
        </div>
      </div>

      <!-- Announcements Management -->
      <div class="accordion-menu">
        <div class="accordion-header" @click="toggleAccordion('announcements')" :class="{ 'active': isParentActive('/announcements') }">
          <span class="menu-icon">📢</span>
          <span class="menu-text">اطلاعیه‌ها</span>
          <span class="accordion-icon" :class="{ 'open': openSections.announcements }">▼</span>
        </div>
        <div class="accordion-content" :class="{ 'open': openSections.announcements }">
          <router-link to="/announcements/list" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">لیست اطلاعیه‌ها</span>
          </router-link>
          <router-link to="/announcements/categories" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">دسته‌بندی اطلاعیه‌ها</span>
          </router-link>
        </div>
      </div>

      <!-- Circulars Management -->
      <div class="accordion-menu">
        <div class="accordion-header" @click="toggleAccordion('circulars')" :class="{ 'active': isParentActive('/circulars') }">
          <span class="menu-icon">📄</span>
          <span class="menu-text">بخشنامه‌ها</span>
          <span class="accordion-icon" :class="{ 'open': openSections.circulars }">▼</span>
        </div>
        <div class="accordion-content" :class="{ 'open': openSections.circulars }">
          <router-link to="/circulars/list" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">لیست بخشنامه‌ها</span>
          </router-link>
          <router-link to="/circulars/categories" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">دسته‌بندی بخشنامه‌ها</span>
          </router-link>
        </div>
      </div>

      <!-- Instructions Management -->
      <div class="accordion-menu">
        <div class="accordion-header" @click="toggleAccordion('instructions')" :class="{ 'active': isParentActive('/instructions') }">
          <span class="menu-icon">📋</span>
          <span class="menu-text">دستورالعمل‌ها</span>
          <span class="accordion-icon" :class="{ 'open': openSections.instructions }">▼</span>
        </div>
        <div class="accordion-content" :class="{ 'open': openSections.instructions }">
          <router-link to="/instructions/list" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">لیست دستورالعمل‌ها</span>
          </router-link>
          <router-link to="/instructions/categories" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">دسته‌بندی دستورالعمل‌ها</span>
          </router-link>
        </div>
      </div>

      <!-- FAQ Management -->
      <div class="accordion-menu">
        <div class="accordion-header" @click="toggleAccordion('faq')" :class="{ 'active': isParentActive('/faq') }">
          <span class="menu-icon">❓</span>
          <span class="menu-text">سوالات متداول</span>
          <span class="accordion-icon" :class="{ 'open': openSections.faq }">▼</span>
        </div>
        <div class="accordion-content" :class="{ 'open': openSections.faq }">
          <router-link to="/faq" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">لیست سوالات</span>
          </router-link>
          <router-link to="/faq-group" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">دسته‌بندی سوالات</span>
          </router-link>
        </div>
      </div>

      <!-- Job Management -->
      <div class="accordion-menu">
        <div class="accordion-header" @click="toggleAccordion('jobs')" :class="{ 'active': isParentActive('/job') }">
          <span class="menu-icon">💼</span>
          <span class="menu-text">مدیریت شغل</span>
          <span class="accordion-icon" :class="{ 'open': openSections.jobs }">▼</span>
        </div>
        <div class="accordion-content" :class="{ 'open': openSections.jobs }">
          <router-link to="/job" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">بخش سازمانی</span>
          </router-link>
          <router-link to="/job-sections" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">مشاغل</span>
          </router-link>
          <router-link to="/job-requests" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">درخواست‌ها</span>
          </router-link>
        </div>
      </div>

      <!-- Multimedia -->
      <div class="menu-item">
        <router-link to="/multimedia" class="menu-link" active-class="active">
          <span class="menu-icon">🎥</span>
          <span class="menu-text">ویدئوهای آموزشی</span>
        </router-link>
      </div>

      <!-- Guide -->
      <div class="menu-item">
        <router-link to="/guide" class="menu-link" active-class="active">
          <span class="menu-icon">📖</span>
          <span class="menu-text">راهنما</span>
        </router-link>
      </div>

      <!-- Contact Requests -->
      <div class="menu-item">
        <router-link to="/contact-requests" class="menu-link" active-class="active">
          <span class="menu-icon">📞</span>
          <span class="menu-text">درخواست‌های تماس</span>
        </router-link>
      </div>

      <!-- Rate and Review -->
      <div class="menu-item">
        <router-link to="/rate-and-review" class="menu-link" active-class="active">
          <span class="menu-icon">⭐</span>
          <span class="menu-text">نظرات کاربران</span>
        </router-link>
      </div>

      <!-- Social Networks -->
      <div class="menu-item">
        <router-link to="/social-networks" class="menu-link" active-class="active">
          <span class="menu-icon">🌐</span>
          <span class="menu-text">شبکه‌های اجتماعی</span>
        </router-link>
      </div>

      <!-- User Management -->
      <div class="accordion-menu">
        <div class="accordion-header" @click="toggleAccordion('users')" :class="{ 'active': isParentActive(['/users', '/roles']) }">
          <span class="menu-icon">👥</span>
          <span class="menu-text">مدیریت کاربران</span>
          <span class="accordion-icon" :class="{ 'open': openSections.users }">▼</span>
        </div>
        <div class="accordion-content" :class="{ 'open': openSections.users }">
          <router-link to="/users" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">کاربران</span>
          </router-link>
          <router-link to="/roles" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">نقش‌ها</span>
          </router-link>
        </div>
      </div>

      <!-- Account -->
      <div class="accordion-menu">
        <div class="accordion-header" @click="toggleAccordion('account')" :class="{ 'active': isParentActive('/account') }">
          <span class="menu-icon">👤</span>
          <span class="menu-text">حساب کاربری</span>
          <span class="accordion-icon" :class="{ 'open': openSections.account }">▼</span>
        </div>
        <div class="accordion-content" :class="{ 'open': openSections.account }">
          <router-link to="/account/profile" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">پروفایل</span>
          </router-link>
          <router-link to="/account/auth" class="menu-link sub-menu" active-class="active">
            <span class="menu-text">احراز هویت</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const openSections = ref({
  news: false,
  announcements: false,
  circulars: false,
  instructions: false,
  faq: false,
  jobs: false,
  users: false,
  account: false
})

function toggleAccordion(section) {
  openSections.value[section] = !openSections.value[section]
}

function isParentActive(paths) {
  const currentPath = route.path
  if (Array.isArray(paths)) {
    return paths.some(path => currentPath.startsWith(path))
  }
  return currentPath.startsWith(paths)
}

// Auto-open accordion based on current route
function autoOpenAccordion() {
  const currentPath = route.path
  
  if (currentPath.startsWith('/news')) {
    openSections.value.news = true
  } else if (currentPath.startsWith('/announcements')) {
    openSections.value.announcements = true
  } else if (currentPath.startsWith('/circulars')) {
    openSections.value.circulars = true
  } else if (currentPath.startsWith('/instructions')) {
    openSections.value.instructions = true
  } else if (currentPath.startsWith('/faq')) {
    openSections.value.faq = true
  } else if (currentPath.startsWith('/job')) {
    openSections.value.jobs = true
  } else if (currentPath.startsWith('/users') || currentPath.startsWith('/roles')) {
    openSections.value.users = true
  } else if (currentPath.startsWith('/account')) {
    openSections.value.account = true
  }
}

// Watch route changes
watch(() => route.path, () => {
  autoOpenAccordion()
})

onMounted(() => {
  autoOpenAccordion()
  console.log('NavigationMenu component mounted successfully!')
})
</script>

<style scoped>
.navigation-menu {
  width: 300px;
  height: 100vh;
  background: linear-gradient(145deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 0;
  overflow-y: auto;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.menu-header {
  padding: 25px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  background: rgba(0, 0, 0, 0.1);
}

.menu-header h2 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Profile Section Styles */
.profile-section {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.profile-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.profile-icon {
  font-size: 1.5rem;
  color: white;
}

.profile-details {
  flex: 1;
  direction: rtl;
}

.profile-name {
  margin: 0 0 4px 0;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  line-height: 1.2;
}

.profile-role {
  margin: 0;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1;
}

.profile-actions {
  display: flex;
  gap: 8px;
}

.profile-action-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
  border-color: rgba(255, 255, 255, 0.2);
}

.profile-action-btn span {
  font-size: 0.9rem;
}

.logout-btn:hover {
  background: rgba(231, 76, 60, 0.2);
  border-color: rgba(231, 76, 60, 0.3);
}

.menu-sections {
  padding: 15px 0;
}

.menu-item {
  margin-bottom: 2px;
}

.menu-link {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 4px solid transparent;
  position: relative;
}

.menu-link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
  border-right-color: rgba(255, 255, 255, 0.3);
  transform: translateX(-2px);
}

.menu-link.active {
  background: linear-gradient(90deg, rgba(74, 144, 226, 0.2), rgba(74, 144, 226, 0.1));
  color: white;
  border-right-color: #4a90e2;
  font-weight: 600;
  box-shadow: inset 0 0 20px rgba(74, 144, 226, 0.1);
}

.menu-link.sub-menu {
  padding-right: 50px;
  font-size: 0.9rem;
}

.menu-link.sub-menu:hover {
  background: rgba(74, 144, 226, 0.1);
  border-right-color: rgba(74, 144, 226, 0.5);
}

.menu-link.sub-menu.active {
  background: linear-gradient(90deg, rgba(74, 144, 226, 0.25), rgba(74, 144, 226, 0.15));
  border-right-color: #4a90e2;
}

.menu-icon {
  font-size: 1.3rem;
  margin-left: 15px;
  width: 24px;
  text-align: center;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.menu-text {
  font-size: 0.95rem;
  font-weight: 500;
  direction: rtl;
  text-align: right;
  flex: 1;
}

/* Accordion styles */
.accordion-menu {
  margin-bottom: 2px;
}

.accordion-header {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 4px solid transparent;
  user-select: none;
}

.accordion-header:hover {
  background: rgba(255, 255, 255, 0.08);
  color: white;
  transform: translateX(-2px);
}

.accordion-header.active {
  background: linear-gradient(90deg, rgba(74, 144, 226, 0.15), rgba(74, 144, 226, 0.08));
  color: white;
  border-right-color: rgba(74, 144, 226, 0.6);
  font-weight: 600;
}

.accordion-icon {
  margin-right: auto;
  font-size: 0.8rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.7;
}

.accordion-icon.open {
  transform: rotate(180deg);
  opacity: 1;
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(0, 0, 0, 0.1);
}

.accordion-content.open {
  max-height: 600px;
}

/* Enhanced scrollbar styling */
.navigation-menu::-webkit-scrollbar {
  width: 6px;
}

.navigation-menu::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.navigation-menu::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2));
  border-radius: 3px;
}

.navigation-menu::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.4));
}

/* Animation for menu items */
.menu-item, .accordion-menu {
  animation: fadeInUp 0.3s ease-out backwards;
}

.menu-item:nth-child(2) { animation-delay: 0.1s; }
.menu-item:nth-child(3) { animation-delay: 0.2s; }
.accordion-menu:nth-child(2) { animation-delay: 0.1s; }
.accordion-menu:nth-child(3) { animation-delay: 0.2s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .navigation-menu {
    width: 100%;
    height: auto;
    position: relative;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .menu-text {
    font-size: 0.9rem;
  }
  
  .menu-icon {
    font-size: 1.1rem;
    margin-left: 12px;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .navigation-menu {
    background: linear-gradient(145deg, #1a202c 0%, #2d3748 100%);
  }
  
  .menu-header {
    background: rgba(0, 0, 0, 0.2);
  }
}

/* RTL Support improvements */
[dir="rtl"] .menu-text {
  text-align: right;
}

/* Focus states for accessibility */
.menu-link:focus,
.accordion-header:focus {
  outline: 2px solid #4a90e2;
  outline-offset: -2px;
}
</style>