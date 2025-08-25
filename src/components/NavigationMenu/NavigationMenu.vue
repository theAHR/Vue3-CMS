<template>
  <div v-if="appStore.isMobileSidebarOpen" class="mobile-overlay" @click="appStore.closeMobileSidebar"></div>
  
  <aside class="sidebar" :class="{ 'mobile-open': appStore.isMobileSidebarOpen }">
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <div class="logo-container">
        <div class="logo-icon">
          <img src="@/assets/img/img/white-logo.png" alt="لوگو" class="logo-image" />
        </div>
        <h2 class="logo-text">پنل مدیریت محتوا</h2>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="menu" role="navigation">
      <div class="menu-section">
        <template v-for="item in allMenuItems" :key="item.title">
          <!-- Single Menu Item -->
          <router-link
            v-if="!item.children"
            :to="item.to"
            class="menu-link"
            active-class="active"
            @click="handleMenuClick"
          >
            <div class="icon-container">
              <img :src="item.icon" class="icon" :alt="item.title" />
            </div>
            <span class="menu-text">{{ item.title }}</span>
          </router-link>

          <!-- Accordion Menu Item -->
          <div v-else class="accordion">
            <div
              class="accordion-header"
              @click="toggleAccordion(item.key)"
              :class="{ active: isParentActive(item.paths) }"
            >
              <div class="icon-container">
                <img :src="item.icon" class="icon" :alt="item.title" />
              </div>
              <span class="menu-text">{{ item.title }}</span>
              <div class="accordion-arrow" :class="{ open: openAccordions[item.key] }">
                <img :src="arrowIcon" alt="arrow" />
              </div>
            </div>
            <div class="accordion-body" :class="{ open: openAccordions[item.key] }">
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
          <img :src="profileImage" class="avatar" alt="مدیر سیستم" />
        </div>
                  <div class="profile-details">
            <h3 class="profile-name">{{ PROFILE_DATA.name }}</h3>
            <p class="profile-role">{{ PROFILE_DATA.role }}</p>
          </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useAppStore } from "@/stores/app"

// Assets
import profileImage from "@/assets/img/img/HajAmir.jpg"
import homeIcon from "@/assets/img/icons/home.svg"
import newsIcon from "@/assets/img/icons/news.svg"
import announcementIcon from "@/assets/img/icons/announcement.svg"
import circularIcon from "@/assets/img/icons/circular.svg"
import instructionIcon from "@/assets/img/icons/instruction.svg"
import faqIcon from "@/assets/img/icons/faq.svg"
import jobIcon from "@/assets/img/icons/job.svg"
import mediaIcon from "@/assets/img/icons/media.svg"
import guideIcon from "@/assets/img/icons/guide-icon.svg"
import contactIcon from "@/assets/img/icons/contact.svg"
import socialIcon from "@/assets/img/icons/social.svg"
import userIcon from "@/assets/img/icons/user.svg"
import roleIcon from "@/assets/img/icons/role.svg"
import commentIcon from "@/assets/img/icons/comment.svg"
import arrowIcon from "@/assets/img/icons/arrow.svg"

// Constants
const PROFILE_DATA = {
  name: "حاج امیر",
  role: "مدیر سیستم"
}

const MOBILE_BREAKPOINT = 768

// Icons mapping
const icons = {
  home: homeIcon,
  news: newsIcon,
  announcement: announcementIcon,
  circular: circularIcon,
  instruction: instructionIcon,
  faq: faqIcon,
  job: jobIcon,
  media: mediaIcon,
  guide: guideIcon,
  contact: contactIcon,
  social: socialIcon,
  user: userIcon,
  role: roleIcon,
  comment: commentIcon
}

// Menu configuration
const mainMenuItems = [
  { title: "داشبورد", to: "/dashboard", icon: icons.home },
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
  { title: "نظرات کاربران", to: "/rate-and-review", icon: icons.comment },
  { title: "شبکه‌های اجتماعی", to: "/social-networks", icon: icons.social },
]

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
]

// Composables
const route = useRoute()
const appStore = useAppStore()

// Reactive state
const openAccordions = ref({})

// Computed properties
const allMenuItems = computed(() => [...mainMenuItems, ...systemMenuItems])

// Methods
const toggleAccordion = (key) => {
  openAccordions.value[key] = !openAccordions.value[key]
}

const isParentActive = (paths) => {
  return paths.some((path) => route.path.startsWith(path))
}

const autoOpenAccordions = () => {
  allMenuItems.value.forEach((item) => {
    if (item.children && isParentActive(item.paths)) {
      openAccordions.value[item.key] = true
    }
  })
}

const handleMenuClick = () => {
  if (window.innerWidth <= MOBILE_BREAKPOINT) {
    appStore.closeMobileSidebar()
  }
}

const handleResize = () => {
  if (window.innerWidth > MOBILE_BREAKPOINT) {
    appStore.closeMobileSidebar()
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

// Watchers
watch(() => route.path, autoOpenAccordions, { immediate: true })
</script>

<style scoped>
/* Base Sidebar Styles */
.sidebar {
  width: 300px;
  height: 100vh;
  background: #18181c;
  color: #fff;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  transition: transform 0.3s ease;
  font-family: YekanRegular, 'YekanRegular', sans-serif;
  right: 0;
  top: 0;
  transform: translateX(0);
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
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Sidebar Header */
.sidebar-header {
  padding: 18px 12px;
  text-align: center;
  border-bottom: 1px solid #23232b;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: #23232b;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-image {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.logo-text {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  color: #fff;
}

/* Navigation Menu */
.menu {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
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
  margin-bottom: 0;
}

/* Menu Links */
.menu-link,
.accordion-header {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  gap: 10px;
  color: #d1d1d6;
  text-decoration: none;
  transition: background 0.2s;
  margin-right: 0;
  font-size: 0.97rem;
  cursor: pointer;
}

.menu-link:hover,
.accordion-header:hover {
  background: #23232b;
  color: #fff;
}

.menu-link.active,
.accordion-header.active {
  background: #23232b;
  color: #fff;
}

.icon-container {
  width: 28px;
  height: 28px;
  background: #23232b;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.8;
}

.menu-text {
  flex: 1;
  font-size: 0.9rem;
  font-weight: 400;
}

/* Accordion Styles */
.accordion-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s;
  transform: rotate(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
}

.accordion-arrow img {
  width: 14px;
  height: 14px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.5;
  transition: all 0.3s ease;
}

.accordion-arrow.open {
  transform: rotate(90deg);
}

.accordion-arrow.open img {
  opacity: 0.8;
}

.accordion-body {
  overflow: hidden;
  transition: max-height 0.3s, opacity 0.3s;
  max-height: 0;
  opacity: 0;
}

.accordion-body.open {
  max-height: 200px;
  opacity: 1;
}

.accordion-content {
  /* Removed unused transform and transition */
}

/* Submenu Links */
.submenu-link {
  display: flex;
  align-items: center;
  padding: 8px 36px;
  font-size: 0.92rem;
  color: #bdbdc2;
  text-decoration: none;
  transition: background 0.2s;
  gap: 8px;
}

.submenu-link:hover {
  background: #23232b;
  color: #fff;
}

.submenu-link.active {
  background: #23232b;
  color: #fff;
}

.submenu-dot {
  width: 4px;
  height: 4px;
  background: currentColor;
  border-radius: 50%;
  opacity: 0.6;
}

/* Profile Section */
.profile {
  flex-shrink: 0;
  padding: 12px 10px;
  border-top: 1px solid #23232b;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #23232b;
  transition: border-color 0.2s, transform 0.2s;
}

.avatar:hover {
  border-color: #667eea;
  transform: scale(1.05);
}

.profile-details {
  flex: 1;
}

.profile-name {
  margin: 0 0 2px 0;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
}

.profile-role {
  margin: 0;
  font-size: 0.8rem;
  color: #bdbdc2;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 60%;
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
    width: 70%;
  }
  
  .logo-text {
    font-size: 1rem;
  }
}

@media (max-width: 360px) {
  .sidebar {
    width: 60%;
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