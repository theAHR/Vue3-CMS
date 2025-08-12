<template>
  <nav class="navigation-menu">
    <div class="menu-header">
      <h2>CMS Admin</h2>
    </div>
    
    <div class="menu-sections">
      <!-- Dashboard -->
      <div class="menu-section">
        <h3 class="section-title">Main</h3>
        <router-link to="/dashboard" class="menu-item" active-class="active">
          <span class="menu-icon">📊</span>
          <span class="menu-text">Dashboard</span>
        </router-link>
      </div>

      <!-- User Management -->
      <div class="menu-section">
        <h3 class="section-title">User Management</h3>
        <router-link to="/users" class="menu-item" active-class="active">
          <span class="menu-icon">👥</span>
          <span class="menu-text">Users</span>
        </router-link>
        <router-link to="/roles" class="menu-item" active-class="active">
          <span class="menu-icon">🔐</span>
          <span class="menu-text">Roles</span>
        </router-link>
      </div>

      <!-- Content Management -->
      <div class="menu-section">
        <h3 class="section-title">Content</h3>
        <router-link to="/news/list" class="menu-item" active-class="active">
          <span class="menu-icon">📰</span>
          <span class="menu-text">News</span>
        </router-link>
        <router-link to="/news/categories" class="menu-item" active-class="active">
          <span class="menu-icon">📂</span>
          <span class="menu-text">News Categories</span>
        </router-link>
        <router-link to="/announcements/list" class="menu-item" active-class="active">
          <span class="menu-icon">📢</span>
          <span class="menu-text">Announcements</span>
        </router-link>
        <router-link to="/announcements/categories" class="menu-item" active-class="active">
          <span class="menu-icon">📁</span>
          <span class="menu-text">Announcement Categories</span>
        </router-link>
        <router-link to="/circulars/list" class="menu-item" active-class="active">
          <span class="menu-icon">📋</span>
          <span class="menu-text">Circulars</span>
        </router-link>
        <router-link to="/circulars/categories" class="menu-item" active-class="active">
          <span class="menu-icon">📑</span>
          <span class="menu-text">Circular Categories</span>
        </router-link>
        <router-link to="/multimedia" class="menu-item" active-class="active">
          <span class="menu-icon">🎬</span>
          <span class="menu-text">Multimedia</span>
        </router-link>
        <router-link to="/guides" class="menu-item" active-class="active">
          <span class="menu-icon">📖</span>
          <span class="menu-text">Guides</span>
        </router-link>
      </div>

      <!-- FAQ Management -->
      <div class="menu-section">
        <h3 class="section-title">FAQ</h3>
        <router-link to="/faq" class="menu-item" active-class="active">
          <span class="menu-icon">❓</span>
          <span class="menu-text">FAQ List</span>
        </router-link>
        <router-link to="/faq-group" class="menu-item" active-class="active">
          <span class="menu-icon">📚</span>
          <span class="menu-text">FAQ Categories</span>
        </router-link>
      </div>

      <!-- Job Management -->
      <div class="menu-section">
        <h3 class="section-title">Jobs</h3>
        <router-link to="/jobs" class="menu-item" active-class="active">
          <span class="menu-icon">💼</span>
          <span class="menu-text">Jobs</span>
        </router-link>
        <router-link to="/job-sections" class="menu-item" active-class="active">
          <span class="menu-icon">🏢</span>
          <span class="menu-text">Job Sections</span>
        </router-link>
        <router-link to="/job-requests" class="menu-item" active-class="active">
          <span class="menu-icon">📝</span>
          <span class="menu-text">Job Requests</span>
        </router-link>
      </div>

      <!-- Communication -->
      <div class="menu-section">
        <h3 class="section-title">Communication</h3>
        <router-link to="/contact-requests" class="menu-item" active-class="active">
          <span class="menu-icon">📞</span>
          <span class="menu-text">Contact Requests</span>
        </router-link>
        <router-link to="/social-networks" class="menu-item" active-class="active">
          <span class="menu-icon">🌐</span>
          <span class="menu-text">Social Networks</span>
        </router-link>
        <router-link to="/rate-and-review" class="menu-item" active-class="active">
          <span class="menu-icon">⭐</span>
          <span class="menu-text">Reviews & Ratings</span>
        </router-link>
      </div>

      <!-- Account -->
      <div class="menu-section">
        <h3 class="section-title">Account</h3>
        <router-link to="/account/profile" class="menu-item" active-class="active">
          <span class="menu-icon">👤</span>
          <span class="menu-text">Profile</span>
        </router-link>
        <router-link to="/account/logout" class="menu-item" active-class="active">
          <span class="menu-icon">🚪</span>
          <span class="menu-text">Logout</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('NavigationMenu component mounted successfully!')
})
</script>

<style scoped>
.navigation-menu {
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0;
  overflow-y: auto;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
}

.menu-header {
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.menu-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
}

.menu-sections {
  padding: 20px 0;
}

.menu-section {
  margin-bottom: 30px;
}

.section-title {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 20px 10px 20px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  border-right: 3px solid transparent;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-right-color: rgba(255, 255, 255, 0.5);
}

.menu-item.active {
  background: rgba(255, 255, 255, 0.15);
  color: white;
  border-right-color: #fff;
  font-weight: 500;
}

.menu-icon {
  font-size: 1.2rem;
  margin-right: 12px;
  width: 20px;
  text-align: center;
}

.menu-text {
  font-size: 0.9rem;
  font-weight: 400;
}

/* Scrollbar styling */
.navigation-menu::-webkit-scrollbar {
  width: 4px;
}

.navigation-menu::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.navigation-menu::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.navigation-menu::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Responsive design */
@media (max-width: 768px) {
  .navigation-menu {
    width: 100%;
    height: auto;
    position: relative;
  }
  
  .menu-sections {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  
  .menu-section {
    flex: 1;
    min-width: 200px;
  }
}
</style> 