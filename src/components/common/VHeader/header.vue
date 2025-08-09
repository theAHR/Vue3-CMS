<template>
  <header class="header">
    <div class="container">
      <div class="header-left">
        <button 
          class="mobile-menu-toggle"
          :class="{ 'active': mobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div class="logo">
        <a href="/" aria-label="TSP Sadad Homepage">
          <img src="@/assets/img/horizontal-logo.svg" alt="TSP Sadad" class="logo-img" />
        </a>
      </div>

      <div class="header-right">
        <button class="action-btn secondary mobile-login" aria-label="Login" @click="navigateToLogin">
          <img src="@/assets/img/login-button.svg" alt="login" class="login-icon" />
        </button>
      </div>

      <nav class="nav-desktop">
        <div class="nav-items">
          <div 
            v-for="menu in menus" 
            :key="menu.title"
            class="nav-item"
            @mouseenter="openDropdown(menu)"
            @mouseleave="closeDropdown(menu)"
          >
            <a 
              :href="menu.to || '#'"
              class="nav-link"
              @click="menu.children ? toggleDropdown(menu, $event) : null"
            >
              {{ menu.title }}
              <svg 
                v-if="menu.children" 
                class="dropdown-icon"
                :class="{ 'rotated': menu.model }"
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="currentColor"
              >
                <path d="M6 8L2 4h8L6 8z"/>
              </svg>
            </a>
            
            <div 
              v-if="menu.children && menu.model" 
              class="dropdown-menu"
            >
              <a 
                v-for="child in menu.children"
                :key="child.title"
                :href="child.to"
                class="dropdown-item"
              >
                {{ child.title }}
              </a>
            </div>
          </div>
        </div>

        <div class="header-actions">
          <button class="action-btn primary" @click="downloadCatalog">
            دانلود کاتالوگ
          </button>
          <button class="action-btn secondary" @click="navigateToLogin">
            ورود | ثبت‌نام
          </button>
        </div>
      </nav>

      <nav class="nav-mobile" :class="{ 'mobile-open': mobileMenuOpen }">
        <div class="nav-items">
          <div 
            v-for="menu in menus" 
            :key="menu.title"
            class="nav-item"
          >
            <a 
              :href="menu.to || '#'"
              class="nav-link"
              @click="menu.children ? toggleDropdown(menu, $event) : null"
            >
              {{ menu.title }}
              <svg 
                v-if="menu.children" 
                class="dropdown-icon"
                :class="{ 'rotated': menu.model }"
                width="12" 
                height="12" 
                viewBox="0 0 12 12" 
                fill="currentColor"
              >
                <path d="M6 8L2 4h8L6 8z"/>
              </svg>
            </a>
            
            <div 
              v-if="menu.children && menu.model" 
              class="dropdown-menu"
            >
              <a 
                v-for="child in menu.children"
                :key="child.title"
                :href="child.to"
                class="dropdown-item"
              >
                {{ child.title }}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <transition name="fade">
      <div v-if="mobileMenuOpen" class="backdrop" @click="toggleMobileMenu"></div>
    </transition>
  </header>
</template>

<script>
import { ref, reactive } from 'vue'
import catalogPdf from '@/assets/catalog.pdf'

const menuData = [
  {
    title: 'معرفی شرکت',
    model: false,
    children: [
      { title: 'ماموریت و چشم‌انداز', to: '/mission-and-vision' },
      { title: 'مدیرعامل', to: '/ceo' },
      { title: 'اعضای هیئت مدیره', to: '/board-members' },
      { title: 'سهامداران', to: '/shareholders' },
      { title: 'درباره ما', to: '/about-us' }
    ]
  },
  {
    title: 'معرفی خدمات',
    model: false,
    children: [
      { title: 'سامانه تحت وب', to: '/services/web-application' },
      { title: 'پایانه فروشگاهی', to: '/services/pos' },
      { title: 'وب سرویس API', to: '/services/web-service' },
      { title: 'نرم‌افزار موبایل همراه', to: '/services/mobile-application' }
    ]
  },
  {
    title: 'اطلاع رسانی',
    model: false,
    children: [
      { title: 'اطلاعیه‌ها', to: '/announcements' },
      { title: 'اخبار', to: '/news' },
      { title: 'بخشنامه‌ها', to: '/circulars' },
      { title: 'دستورالعمل‌ها', to: '/instructions' }
    ]
  },
  {
    title: 'آموزش',
    model: false,
    children: [
      { title: 'چندرسانه‌ای', to: '/tutorials' },
      { title: 'سئوالات متداول', to: '/faq' },
      { title: 'راهنما سامانه', to: '/help' }
    ]
  },
  {
    title: 'تماس با ما',
    model: false,
    children: [
      { title: 'راه ارتباطی', to: '/contact-us' },
      { title: 'درخواست همکاری', to: '/cooperation-request' }
    ]
  }
]

export default {
  name: 'Header',
  setup() {
    const mobileMenuOpen = ref(false)
    const menus = reactive(menuData.map(menu => ({ ...menu })))

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const openDropdown = (menu) => {
      if (menu.children && window.innerWidth > 768) {
        menu.model = true
      }
    }

    const closeDropdown = (menu) => {
      if (menu.children && window.innerWidth > 768) {
        menu.model = false
      }
    }

    const toggleDropdown = (menu, event) => {
      if (menu.children) {
        event.preventDefault()
        menu.model = !menu.model
      }
    }

    const navigateToLogin = () => {
      window.open('https://www.sadadtsp.ir/panel/account/auth', '_blank')
    }

    const downloadCatalog = () => {
      const link = document.createElement('a')
      link.href = catalogPdf
      link.download = 'catalog.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    return {
      menus,
      mobileMenuOpen,
      toggleMobileMenu,
      openDropdown,
      closeDropdown,
      toggleDropdown,
      navigateToLogin,
      downloadCatalog
    }
  }
}
</script>

<style scoped>
.header {
  background: white;
  color: #333;
  position: sticky;
  padding-top: 10px;
  padding-bottom: 5px;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #e5e5e5;
  font-size: 14px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.logo a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
}

.logo-img {
  height: 50px;
  width: auto;
  margin-left: 50px;
}

.nav-desktop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: 2rem;
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.nav-link:hover {
  background-color: #f5f5f5;
  color: #514a9b;
}

.dropdown-icon {
  transition: transform 0.3s ease;
}

.dropdown-icon.rotated {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 100;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  min-width: 180px;
  z-index: 1001;
  margin-top: 0px;
  opacity: 0;
  animation: fadeInDown 0.3s ease forwards;
}

@keyframes fadeInDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #333;
  text-decoration: none;
  transition: background 0.3s ease;
  border-bottom: 1px solid #f0f0f0;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn {
  padding: 0.6rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: 14px;
  border: none;
  white-space: nowrap;
}

.action-btn.primary {
  background: linear-gradient(0deg, #4b4a79 0%, #514a9b 50%, #514a9b 100%);
  color: white;
}

.action-btn.primary:hover {
  background: linear-gradient(0deg, #4b4a79 0%, #514a9b 50%, #514a9b 100%);
  transform: translateY(-1px);
}

.action-btn.secondary {
  background: transparent;
  color: #1b1a3f;
  border: 1px solid #dadada;
}

.action-btn.secondary:hover {
  background: #514a9b;
  color: white;
  border-color: #514a9b;
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  flex-direction: column;
  gap: 4px;
}

.mobile-menu-toggle span {
  width: 22px;
  height: 2px;
  background: #333;
  border-radius: 2px;
  transition: 0.3s;
}

.mobile-menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.nav-mobile {
  display: none;
}

.header-left,
.header-right {
  display: none;
}

.mobile-login {
  display: none;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  z-index: 1000;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .container {
    height: 60px;
    padding: 0 1rem;
    position: relative;
  }

  .header-left,
  .header-right {
    display: flex;
    align-items: center;
    z-index: 1;
  }

  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .logo-img {
    height: 45px;
  }

  .nav-desktop {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .mobile-login {
    display: flex;
    width: 32px !important;
    height: 32px !important;
    min-width: 32px !important;
    min-height: 32px !important;
    padding: 0 !important;
    border-radius: 8px !important;
    align-items: center;
    justify-content: center;
    background: #5c54ad !important;
    color: white !important;
    border: none !important;
    box-shadow: 0 2px 8px rgba(119, 110, 196, 0.10);
    overflow: hidden;
  }

  .mobile-login:hover {
    background: #514a9b !important;
    color: white !important;
    box-shadow: 0 2px 8px rgba(119, 110, 196, 0.15);
    border: none !important;
  }

  .login-icon {
    width: 18px;
    height: 18px;
    margin: 0;
    filter: brightness(0) invert(1);
  }

  .nav-mobile {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: white;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    z-index: 1001;
  }

  .nav-mobile.mobile-open {
    transform: translateX(0);
  }

  .nav-mobile .nav-items {
    flex-direction: column;
    gap: 0;
    width: 100%;
    padding: 1rem 0;
  }

  .nav-mobile .nav-item {
    width: 100%;
  }

  .nav-mobile .nav-link {
    width: 100%;
    padding: 0.75rem 1.5rem;
    text-align: right;
    border-bottom: 1px solid #f0f0f0;
    justify-content: space-between;
    border-radius: 0;
  }

  .nav-mobile .dropdown-menu {
    position: static;
    border: none;
    border-radius: 0;
    box-shadow: none;
    min-width: unset;
    width: 100%;
    padding: 0;
    margin: 0;
    animation: none;
    opacity: 1;
    transform: none;
    background: #f8f9fa;
  }

  .nav-mobile .dropdown-item {
    padding: 0.75rem 2rem;
    text-align: right;
    font-size: 0.9rem;
    border-bottom: 1px solid #e5e5e5;
    background: #f8f9fa;
  }

}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }

  .logo-img {
    height: 40px;
  }

  .nav-mobile {
    width: 85%;
  }
}
</style>