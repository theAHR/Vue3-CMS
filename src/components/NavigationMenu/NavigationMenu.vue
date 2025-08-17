<template>
  <!-- Mobile Hamburger Button -->
  <button 
    class="mobile-hamburger" 
    @click="toggleMobileSidebar"
    :class="{ active: isMobileSidebarOpen }"
    aria-label="منوی موبایل"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <!-- Mobile Overlay -->
  <div 
    class="mobile-overlay" 
    :class="{ active: isMobileSidebarOpen }"
    @click="closeMobileSidebar"
  ></div>

  <!-- Sidebar Navigation -->
  <aside class="sidebar" :class="{ 'mobile-open': isMobileSidebarOpen }">
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="logo-container">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <h2 class="logo-text">پنل مدیریت</h2>
      </div>
      <p class="header-subtitle">سیستم مدیریت محتوا</p>
    </div>

    <!-- Navigation Menu -->
    <nav class="menu" role="navigation">
      <div class="menu-section">
        <h3 class="menu-section-title">منوی اصلی</h3>
        <template v-for="item in mainMenuItems" :key="item.title">
          <router-link
            v-if="!item.children"
            :to="item.to"
            class="menu-link"
            active-class="active"
            @click="handleMenuClick"
          >
            <div class="icon-container">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor" v-html="item.icon"></svg>
            </div>
            <span class="menu-text">{{ item.title }}</span>
            <div class="menu-badge" v-if="item.badge">{{ item.badge }}</div>
          </router-link>

          <div v-else class="accordion">
            <div
              class="accordion-header"
              @click="toggle(item.key)"
              :class="{ active: isParentActive(item.paths) }"
            >
              <div class="icon-container">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor" v-html="item.icon"></svg>
              </div>
              <span class="menu-text">{{ item.title }}</span>
              <div class="accordion-arrow" :class="{ open: open[item.key] }">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            </div>
            <div class="accordion-body" :class="{ open: open[item.key] }">
              <div class="accordion-content">
                <router-link
                  v-for="child in item.children"
                  :key="child.title"
                  :to="child.to"
                  class="submenu-link"
                  active-class="active"
                  @click="handleMenuClick"
                >
                  <span class="submenu-dot"></span>
                  {{ child.title }}
                </router-link>
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="menu-section">
        <h3 class="menu-section-title">مدیریت سیستم</h3>
        <template v-for="item in systemMenuItems" :key="item.title">
          <router-link
            v-if="!item.children"
            :to="item.to"
            class="menu-link"
            active-class="active"
            @click="handleMenuClick"
          >
            <div class="icon-container">
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor" v-html="item.icon"></svg>
            </div>
            <span class="menu-text">{{ item.title }}</span>
          </router-link>

          <div v-else class="accordion">
            <div
              class="accordion-header"
              @click="toggle(item.key)"
              :class="{ active: isParentActive(item.paths) }"
            >
              <div class="icon-container">
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor" v-html="item.icon"></svg>
              </div>
              <span class="menu-text">{{ item.title }}</span>
              <div class="accordion-arrow" :class="{ open: open[item.key] }">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                </svg>
              </div>
            </div>
            <div class="accordion-body" :class="{ open: open[item.key] }">
              <div class="accordion-content">
                <router-link
                  v-for="child in item.children"
                  :key="child.title"
                  :to="child.to"
                  class="submenu-link"
                  active-class="active"
                  @click="handleMenuClick"
                >
                  <span class="submenu-dot"></span>
                  {{ child.title }}
                </router-link>
              </div>
            </div>
          </div>
        </template>
      </div>
    </nav>

    <!-- User Profile Section -->
    <div class="profile">
      <div class="profile-info">
        <div class="avatar-container">
          <img :src="HajAmir" class="avatar" alt="مدیر سیستم" />
          <div class="status-indicator online"></div>
        </div>
        <div class="profile-details">
          <h3 class="profile-name">حاج امیر</h3>
          <p class="profile-role">مدیر سیستم</p>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

// Import profile image
import HajAmir from "@/assets/img/img/HajAmir.jpg";

// Icon SVG paths
const icons = {
  home: '<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>',
  news: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z"/>',
  announcement: '<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>',
  circular: '<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8V4h6v4h4v10z"/>',
  instruction: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>',
  faq: '<path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 16h2v-2h-2v2zm0-4h2V6h-2v8z"/>',
  job: '<path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>',
  media: '<path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>',
  guide: '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>',
  contact: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
  rate: '<path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 9c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm7 8H6v-1.4c0-2 4-3.1 6-3.1s6 1.1 6 3.1V19z"/>',
  social: '<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>',
  user: '<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>'
};

const route = useRoute();
const open = ref({});
const isMobileSidebarOpen = ref(false);

// Main menu items
const mainMenuItems = [
  { title: "داشبورد", to: "/dashboard", icon: icons.home, badge: "جدید" },
  {
    title: "خبر",
    key: "news",
    icon: icons.news,
    paths: ["/news"],
    children: [
      { title: "لیست اخبار", to: "/news/list" },
      { title: "دسته‌بندی اخبار", to: "/news/categories" },
    ],
  },
  {
    title: "اطلاعیه‌ها",
    key: "announcements",
    icon: icons.announcement,
    paths: ["/announcements"],
    children: [
      { title: "لیست اطلاعیه‌ها", to: "/announcements/list" },
      { title: "دسته‌بندی اطلاعیه‌ها", to: "/announcements/categories" },
    ],
  },
  {
    title: "بخشنامه‌ها",
    key: "circulars",
    icon: icons.circular,
    paths: ["/circulars"],
    children: [
      { title: "لیست بخشنامه‌ها", to: "/circulars/list" },
      { title: "دسته‌بندی بخشنامه‌ها", to: "/circulars/categories" },
    ],
  },
  {
    title: "دستورالعمل‌ها",
    key: "instructions",
    icon: icons.instruction,
    paths: ["/instructions"],
    children: [
      { title: "لیست دستورالعمل‌ها", to: "/instructions/list" },
      { title: "دسته‌بندی دستورالعمل‌ها", to: "/instructions/categories" },
    ],
  },
  {
    title: "سوالات متداول",
    key: "faq",
    icon: icons.faq,
    paths: ["/faq", "/faq-group"],
    children: [
      { title: "لیست سوالات", to: "/faq" },
      { title: "دسته‌بندی سوالات", to: "/faq-group" },
    ],
  },
  {
    title: "مدیریت شغل",
    key: "jobs",
    icon: icons.job,
    paths: ["/job"],
    children: [
      { title: "بخش سازمانی", to: "/job" },
      { title: "مشاغل", to: "/job-sections" },
      { title: "درخواست‌ها", to: "/job-requests" },
    ],
  },
  { title: "ویدئوهای آموزشی", to: "/multimedia", icon: icons.media },
  { title: "راهنما", to: "/guide", icon: icons.guide },
  { title: "درخواست‌های تماس", to: "/contact-requests", icon: icons.contact },
  { title: "نظرات کاربران", to: "/rate-and-review", icon: icons.rate },
  { title: "شبکه‌های اجتماعی", to: "/social-networks", icon: icons.social },
];

// System management menu items
const systemMenuItems = [
  {
    title: "مدیریت کاربران",
    key: "users",
    icon: icons.user,
    paths: ["/users", "/roles"],
    children: [
      { title: "کاربران", to: "/users" },
      { title: "نقش‌ها", to: "/roles" },
    ],
  }
];

function toggle(key) {
  open.value[key] = !open.value[key];
}

function isParentActive(paths) {
  return paths.some((p) => route.path.startsWith(p));
}

function autoOpen() {
  [...mainMenuItems, ...systemMenuItems].forEach((item) => {
    if (item.children && isParentActive(item.paths)) {
      open.value[item.key] = true;
    }
  });
}

function toggleMobileSidebar() {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
}

function closeMobileSidebar() {
  isMobileSidebarOpen.value = false;
}

function handleMenuClick() {
  if (window.innerWidth <= 768) {
    closeMobileSidebar();
  }
}

function handleResize() {
  if (window.innerWidth > 768) {
    isMobileSidebarOpen.value = false;
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});

watch(() => route.path, autoOpen, { immediate: true });
</script>

<style scoped>
/* Mobile Hamburger Button */
.mobile-hamburger {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.mobile-hamburger:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
}

.mobile-hamburger span {
  width: 22px;
  height: 2px;
  background: #fff;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
  border-radius: 1px;
}

.mobile-hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.mobile-hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scale(0);
}

.mobile-hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Sidebar */
.sidebar {
  width: 300px;
  height: 100vh;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* Sidebar Header */
.sidebar-header {
  padding: 25px 20px;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo-icon svg {
  width: 24px;
  height: 24px;
}

.logo-text {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-subtitle {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
}

/* Menu */
.menu {
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
}

.menu::-webkit-scrollbar {
  width: 6px;
}

.menu::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

.menu::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.menu::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

.menu-section {
  margin-bottom: 25px;
}

.menu-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 20px 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Menu Links */
.menu-link,
.accordion-header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 14px 20px;
  gap: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 0 25px 25px 0;
  margin-right: 10px;
}

.menu-link:hover,
.accordion-header:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateX(5px);
}

.menu-link.active,
.accordion-header.active {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  color: #fff;
  border-right: 3px solid #667eea;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.icon-container {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.menu-link:hover .icon-container,
.accordion-header:hover .icon-container,
.menu-link.active .icon-container,
.accordion-header.active .icon-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: scale(1.1);
}

.icon {
  width: 20px;
  height: 20px;
  color: currentColor;
}

.menu-text {
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
}

.menu-badge {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 12px;
  text-align: center;
  min-width: 20px;
}

/* Accordion */
.accordion-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  color: rgba(255, 255, 255, 0.6);
}

.accordion-arrow.open {
  transform: rotate(90deg);
  color: #667eea;
}

.accordion-body {
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 0;
  opacity: 0;
}

.accordion-body.open {
  max-height: 300px;
  opacity: 1;
}

.accordion-content {
  transform: translateY(-10px);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-body.open .accordion-content {
  transform: translateY(0);
}

.submenu-link {
  display: flex;
  align-items: center;
  padding: 12px 55px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s ease;
  gap: 12px;
}

.submenu-link:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  transform: translateX(5px);
}

.submenu-link.active {
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
  border-right: 2px solid #667eea;
}

.submenu-dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  opacity: 0.6;
}

/* Profile Section */
.profile {
  flex-shrink: 0;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.avatar:hover {
  border-color: #667eea;
  transform: scale(1.05);
}

.status-indicator {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid #1a1a2e;
}

.status-indicator.online {
  background: #00d4aa;
}

.profile-details {
  flex: 1;
}

.profile-name {
  margin: 0 0 4px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
}

.profile-role {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Responsive Design */
@media (max-width: 768px) {
  .mobile-hamburger {
    display: flex;
  }

  .sidebar {
    width: 85%;
    transform: translateX(100%);
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .sidebar-header {
    padding: 20px 15px;
  }

  .logo-text {
    font-size: 1.1rem;
  }

  .menu-link,
  .accordion-header {
    padding: 12px 15px;
  }

  .submenu-link {
    padding: 10px 45px;
    font-size: 0.85rem;
  }

  .profile {
    padding: 15px;
  }

  .profile-name {
    font-size: 0.9rem;
  }

  .profile-role {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 90%;
  }
  
  .mobile-hamburger {
    width: 45px;
    height: 45px;
    top: 15px;
    right: 15px;
  }
  
  .mobile-hamburger span {
    width: 20px;
  }

  .logo-text {
    font-size: 1rem;
  }

  .header-subtitle {
    font-size: 0.8rem;
  }
}

@media (max-width: 360px) {
  .sidebar {
    width: 95%;
  }

  .sidebar-header {
    padding: 15px 10px;
  }

  .menu-link,
  .accordion-header {
    padding: 10px 12px;
  }

  .submenu-link {
    padding: 8px 40px;
  }
}
</style>