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
            <div class="menu-badge" v-if="item.badge">{{ item.badge }}</div>
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

// Import icon SVGs
import homeIcon from "@/assets/img/icons/home.svg";
import newsIcon from "@/assets/img/icons/news.svg";
import announcementIcon from "@/assets/img/icons/announcement.svg";
import circularIcon from "@/assets/img/icons/circular.svg";
import instructionIcon from "@/assets/img/icons/instruction.svg";
import faqIcon from "@/assets/img/icons/faq.svg";
import jobIcon from "@/assets/img/icons/job.svg";
import mediaIcon from "@/assets/img/icons/media.svg";
import guideIcon from "@/assets/img/icons/guide-icon.svg";
import contactIcon from "@/assets/img/icons/contact.svg";
import socialIcon from "@/assets/img/icons/social.svg";
import userIcon from "@/assets/img/icons/user.svg";
import roleIcon from "@/assets/img/icons/role.svg";
import commentIcon from "@/assets/img/icons/comment.svg";

// Icon mapping
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
  { title: "نظرات کاربران", to: "/rate-and-review", icon: icons.comment },
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
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.8;
  transition: all 0.3s ease;
}

.menu-link:hover .icon,
.accordion-header:hover .icon,
.menu-link.active .icon,
.accordion-header.active .icon {
  opacity: 1;
  filter: brightness(0) invert(1);
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
  transform: rotate(180deg);
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