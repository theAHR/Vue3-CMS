<template>
  <button 
    class="mobile-hamburger" 
    @click="toggleMobileSidebar"
    :class="{ active: isMobileSidebarOpen }"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div 
    class="mobile-overlay" 
    :class="{ active: isMobileSidebarOpen }"
    @click="closeMobileSidebar"
  ></div>

  <aside class="sidebar" :class="{ 'mobile-open': isMobileSidebarOpen }">
    <div class="sidebar-header">
      <h2>پنل مدیریت</h2>
    </div>

    <nav class="menu">
      <template v-for="item in menuItems" :key="item.title">
        <router-link
          v-if="!item.children"
          :to="item.to"
          class="menu-link"
          active-class="active"
          @click="handleMenuClick"
        >
          <img :src="item.icon" class="icon icon-white" />
          <span>{{ item.title }}</span>
        </router-link>

        <div v-else class="accordion">
          <div
            class="accordion-header"
            @click="toggle(item.key)"
            :class="{ active: isParentActive(item.paths) }"
          >
            <img :src="item.icon" class="icon icon-white" />
            <span>{{ item.title }}</span>
            <img :src="ArrowIcon" class="arrow icon-white" :class="{ open: open[item.key] }" />
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
                {{ child.title }}
              </router-link>
            </div>
          </div>
        </div>
      </template>
    </nav>

    <div class="profile">
      <div class="profile-info">
        <img :src="LogoutIcon" class="avatar" alt="مدیر سیستم" />
        <div>
          <h3>مدیر سیستم</h3>
          <p>Administrator</p>
        </div>
      </div>
      <div class="profile-actions">
        <router-link to="/account/profile" class="action-btn" title="پروفایل" @click="handleMenuClick">
          <img :src="GuideIcon" width="16" class="icon-white" />
        </router-link>
        <router-link to="/account/logout" class="action-btn logout" title="خروج" @click="handleMenuClick">
          <img :src="LogoutIcon" width="16" class="icon-white" />
        </router-link>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

import HomeIcon from "@/assets/img/icons/home.svg";
import NewsIcon from "@/assets/img/icons/news.svg";
import AnnouncementIcon from "@/assets/img/icons/announcement.svg";
import CircularIcon from "@/assets/img/icons/circular.svg";
import InstructionIcon from "@/assets/img/icons/instruction.svg";
import FaqIcon from "@/assets/img/icons/faq.svg";
import JobIcon from "@/assets/img/icons/job.svg";
import MediaIcon from "@/assets/img/icons/media.svg";
import GuideIcon from "@/assets/img/icons/guide-icon.svg";
import ContactIcon from "@/assets/img/icons/contact.svg";
import RateIcon from "@/assets/img/icons/comment.svg";
import SocialIcon from "@/assets/img/icons/social.svg";
import UserIcon from "@/assets/img/icons/user.svg";
import ArrowIcon from "@/assets/img/icons/arrow.svg"
import LogoutIcon from "@/assets/img/icons/logout.svg";

const route = useRoute();
const open = ref({});
const isMobileSidebarOpen = ref(false);

const menuItems = [
  { title: "داشبورد", to: "/dashboard", icon: HomeIcon },
  {
    title: "خبر",
    key: "news",
    icon: NewsIcon,
    paths: ["/news"],
    children: [
      { title: "لیست اخبار", to: "/news/list" },
      { title: "دسته‌بندی اخبار", to: "/news/categories" },
    ],
  },
  {
    title: "اطلاعیه‌ها",
    key: "announcements",
    icon: AnnouncementIcon,
    paths: ["/announcements"],
    children: [
      { title: "لیست اطلاعیه‌ها", to: "/announcements/list" },
      { title: "دسته‌بندی اطلاعیه‌ها", to: "/announcements/categories" },
    ],
  },
  {
    title: "بخشنامه‌ها",
    key: "circulars",
    icon: CircularIcon,
    paths: ["/circulars"],
    children: [
      { title: "لیست بخشنامه‌ها", to: "/circulars/list" },
      { title: "دسته‌بندی بخشنامه‌ها", to: "/circulars/categories" },
    ],
  },
  {
    title: "دستورالعمل‌ها",
    key: "instructions",
    icon: InstructionIcon,
    paths: ["/instructions"],
    children: [
      { title: "لیست دستورالعمل‌ها", to: "/instructions/list" },
      { title: "دسته‌بندی دستورالعمل‌ها", to: "/instructions/categories" },
    ],
  },
  {
    title: "سوالات متداول",
    key: "faq",
    icon: FaqIcon,
    paths: ["/faq", "/faq-group"],
    children: [
      { title: "لیست سوالات", to: "/faq" },
      { title: "دسته‌بندی سوالات", to: "/faq-group" },
    ],
  },
  {
    title: "مدیریت شغل",
    key: "jobs",
    icon: JobIcon,
    paths: ["/job"],
    children: [
      { title: "بخش سازمانی", to: "/job" },
      { title: "مشاغل", to: "/job-sections" },
      { title: "درخواست‌ها", to: "/job-requests" },
    ],
  },
  { title: "ویدئوهای آموزشی", to: "/multimedia", icon: MediaIcon },
  { title: "راهنما", to: "/guide", icon: GuideIcon },
  { title: "درخواست‌های تماس", to: "/contact-requests", icon: ContactIcon },
  { title: "نظرات کاربران", to: "/rate-and-review", icon: RateIcon },
  { title: "شبکه‌های اجتماعی", to: "/social-networks", icon: SocialIcon },
  {
    title: "مدیریت کاربران",
    key: "users",
    icon: UserIcon,
    paths: ["/users", "/roles"],
    children: [
      { title: "کاربران", to: "/users" },
      { title: "نقش‌ها", to: "/roles" },
    ],
  },
  {
    title: "حساب کاربری",
    key: "account",
    icon: UserIcon,
    paths: ["/account"],
    children: [
      { title: "پروفایل", to: "/account/profile" },
      { title: "احراز هویت", to: "/account/auth" },
    ],
  },
];

function toggle(key) {
  open.value[key] = !open.value[key];
}

function isParentActive(paths) {
  return paths.some((p) => route.path.startsWith(p));
}

function autoOpen() {
  menuItems.forEach((item) => {
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
.mobile-hamburger {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1001;
  width: 45px;
  height: 45px;
  background: #313131;
  border: none;
  border-radius: 8px;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.mobile-hamburger span {
  width: 20px;
  height: 2px;
  background: #fff;
  transition: all 0.3s ease;
  transform-origin: center;
}

.mobile-hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-hamburger.active span:nth-child(2) {
  opacity: 0;
}

.mobile-hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

.sidebar {
  width: 280px;
  height: 100vh;
  background: #313131;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1000;
  transition: transform 0.3s ease;
}

.sidebar-header {
  padding: 20px;
  font-size: 1 rem;
  text-align: center;
  border-bottom: 1px solid rgba(252, 252, 252, 0.15);
}

.menu {
  flex: 1;
  overflow-y: auto;
  padding: 10px 0;
}
.menu::-webkit-scrollbar {
  display: none;
}
.menu {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.profile {
  flex-shrink: 0;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffffff;
  padding: 4px;
}

.profile h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
}

.profile p {
  margin: 0;
  font-size: 0.75rem;
  color: #ccc;
}

.profile-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn.logout {
  background: rgba(255, 255, 255, 0.2);
}

.menu-link,
.accordion-header {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 18px;
  gap: 10px;
  color: #ddd;
  text-decoration: none;
  transition: 0.3s;
}

.menu-link:hover,
.accordion-header:hover {
  background: rgba(196, 196, 196, 0.1);
  color: #fff;
}

.menu-link.active,
.accordion-header.active {
  background: rgba(222, 225, 228, 0.25);
  border-right: 3px solid #d3d3d3;
  color: #fff;
}

.icon {
  width: 20px;
  height: 20px;
}
.icon-white {
  filter: brightness(0) invert(1);
}

.accordion .arrow {
  position: absolute;
  left: 18px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 12px;
  height: 12px;
  transform: rotate(180deg);
}

.accordion .arrow.open {
  transform: rotate(90deg);
}

.accordion-body {
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
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
  display: block;
  padding: 10px 45px;
  font-size: 0.9rem;
  color: #ccc;
  text-decoration: none;
}

.submenu-link:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.submenu-link.active {
  background: rgba(218, 218, 218, 0.2);
  color: #fff;
  border-right: 2px solid rgb(145, 150, 155);
}

@media (max-width: 768px) {
  .mobile-hamburger {
    display: flex;
  }

  .mobile-close {
    display: block;
  }

  .sidebar {
    width: 50%;
    transform: translateX(100%);
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }

  .sidebar-header {
    padding: 15px 20px;
    font-size: 1.2rem;
  }

  .menu-link,
  .accordion-header {
    padding: 10px 15px;
  }

  .submenu-link {
    padding: 8px 35px;
    font-size: 0.85rem;
  }

  .profile {
    padding: 12px 15px;
  }

  .profile h3 {
    font-size: 0.85rem;
  }

  .profile p {
    font-size: 0.7rem;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 75%;
  }
  
  .mobile-hamburger {
    width: 40px;
    height: 40px;
    top: 15px;
    right: 15px;
  }
  
  .mobile-hamburger span {
    width: 18px;
  }
}

@media (max-width: 360px) {
  .sidebar {
    width: 85%;
  }
}
</style>