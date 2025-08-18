<template>
  <div v-if="appStore.isMobileSidebarOpen" class="mobile-overlay" @click="appStore.closeMobileSidebar"></div>
  <aside class="sidebar" :class="{ 'mobile-open': appStore.isMobileSidebarOpen }">
    <div class="sidebar-header">
      <div class="logo-container">
        <div class="logo-icon">
          <img src="@/assets/img/img/white-logo.png" alt="لوگو" class="logo-image" />
        </div>
        <h2 class="logo-text">پنل مدیریت محتوا</h2>
      </div>
    </div>
    <nav class="menu" role="navigation">
      <div class="menu-section">
        <template v-for="item in [...mainMenuItems, ...systemMenuItems]" :key="item.title">
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
          <div v-else class="accordion">
            <div
              class="accordion-header"
              @click="toggle(item.key)"
              :class="{ active: isParentActive(item.paths) }"
            >
              <div class="icon-container">
                <img :src="item.icon" class="icon" :alt="item.title" />
              </div>
              <span class="menu-text">{{ item.title }}</span>
              <div class="accordion-arrow" :class="{ open: open[item.key] }">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 10l3 3 3-3"/>
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
    <div class="profile">
      <div class="profile-info">
        <div class="avatar-container">
          <img :src="HajAmir" class="avatar" alt="مدیر سیستم" />
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
import { ref, watch, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import { useAppStore } from "@/stores/app"
import HajAmir from "@/assets/img/img/HajAmir.jpg"
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

const route = useRoute()
const appStore = useAppStore()
const open = ref({})

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

function toggle(key) {
  open.value[key] = !open.value[key]
}

function isParentActive(paths) {
  return paths.some((p) => route.path.startsWith(p))
}

function autoOpen() {
  [...mainMenuItems, ...systemMenuItems].forEach((item) => {
    if (item.children && isParentActive(item.paths)) {
      open.value[item.key] = true
    }
  })
}

function handleMenuClick() {
  if (window.innerWidth <= 768) {
    appStore.closeMobileSidebar()
  }
}

function handleResize() {
  if (window.innerWidth > 768) {
    appStore.closeMobileSidebar()
  }
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
watch(() => route.path, autoOpen, { immediate: true })
</script>

<style scoped>
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

.sidebar-header {
  padding: 18px 12px;
  text-align: center;
  border-bottom: 1px solid #23232b;
  background: none;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 0;
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

.logo-icon .logo-image {
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

.header-subtitle {
  margin: 4px 0 0 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  font-family: YekanRegular, 'YekanRegular', sans-serif;
}

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

.accordion-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s;
  color: #888;
  transform: rotate(90deg);
}

.accordion-arrow.open {
  transform: rotate(180deg);
  color: #fff;
}

.accordion-body {
  overflow: hidden;
  background: none;
  transition: max-height 0.3s, opacity 0.3s;
  max-height: 0;
  opacity: 0;
}

.accordion-body.open {
  max-height: 200px;
  opacity: 1;
}

.accordion-content {
  transform: none;
  transition: none;
}

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

.profile {
  flex-shrink: 0;
  padding: 12px 10px;
  background: none;
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

@media (max-width: 768px) {
  .sidebar {
    width: 60%;
    transform: translateX(100%);
    right: 0;
    left: auto;
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

  .header-subtitle {
    font-size: 0.8rem;
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