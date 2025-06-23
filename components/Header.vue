<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <NuxtLink to="/">
          <div class="logo-text" role="heading" aria-level="2">Kit<span>hubs</span></div>
        </NuxtLink>
      </div>
      
      <nav class="main-nav" :class="{ 'active': menuOpen }">
        <ul class="nav-list">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link" :class="{ 'active': currentRoute === '/' }" @click="handleNavLinkClick(false)">
              Home
            </NuxtLink>
          </li>
          
          <!-- Text Tools Dropdown -->
          <li class="nav-item dropdown" 
              @mouseenter="showDropdown('text')" 
              @mouseleave="hideDropdown('text')">
            <NuxtLink class="nav-link" 
                      :class="{ 'active': currentRoute.startsWith('/json-formatter') || currentRoute.startsWith('/sensitive-word-check'), 'dropdown-active': activeDropdown === 'text' }" 
                      @click="handleNavLinkClick(true, 'text')"
                      aria-haspopup="true"
                      :aria-expanded="activeDropdown === 'text' ? 'true' : 'false'">
              Text Tools
              <Icon name="chevron-down" class="dropdown-icon" />
            </NuxtLink>
            <ul class="dropdown-menu" :class="{ 'show': activeDropdown === 'text' }">
              <li><NuxtLink to="/json-formatter" class="dropdown-link" @click="closeMenu">
                <Icon name="code" class="tool-icon" />
                JSON Formatter
              </NuxtLink></li>
              <li><NuxtLink to="/sensitive-word-check" class="dropdown-link" @click="closeMenu">
                <Icon name="shield-check" class="tool-icon" />
                Sensitive Content Detector
              </NuxtLink></li>
            </ul>
          </li>

          <!-- Image Tools Dropdown -->
          <li class="nav-item dropdown" @mouseenter="showDropdown('image')" @mouseleave="hideDropdown('image')">
            <NuxtLink class="nav-link" :class="{ 'active': currentRoute.startsWith('/image-compressor'), 'dropdown-active': activeDropdown === 'image' }">
              Image Tools
              <Icon name="chevron-down" class="dropdown-icon" />
            </NuxtLink>
            <ul class="dropdown-menu" :class="{ 'show': activeDropdown === 'image' }">
              <li><NuxtLink to="/image-compressor" class="dropdown-link" @click="closeMenu">
                <Icon name="minimize-2" class="tool-icon" />
                Image Compressor
              </NuxtLink></li>
            </ul>
          </li>

          <!-- Video Tools Dropdown -->
          <li class="nav-item dropdown" 
              @mouseenter="showDropdown('video')" 
              @mouseleave="hideDropdown('video')">
            <NuxtLink class="nav-link" 
                      :class="{ 'active': currentRoute.startsWith('/facebook-video-downloader') || currentRoute.startsWith('/pinterest-downloader') || currentRoute.startsWith('/instagram-video-downloader'), 'dropdown-active': activeDropdown === 'video' }" 
                      @click="handleNavLinkClick(true, 'video')"
                      aria-haspopup="true"
                      :aria-expanded="activeDropdown === 'video' ? 'true' : 'false'">
              Video Tools
              <Icon name="chevron-down" class="dropdown-icon" />
            </NuxtLink>
            <ul class="dropdown-menu" :class="{ 'show': activeDropdown === 'video' }">
              <li><NuxtLink to="/facebook-video-downloader" class="dropdown-link" @click="closeMenu">
                <Icon name="facebook" class="tool-icon" />
                Facebook Video Downloader
              </NuxtLink></li>
              <li><NuxtLink to="/pinterest-downloader" class="dropdown-link" @click="closeMenu">
                <Icon name="pinterest" class="tool-icon" />
                Pinterest Downloader
              </NuxtLink></li>
              <li><NuxtLink to="/instagram-video-downloader" class="dropdown-link" @click="closeMenu">
                <Icon name="instagram" class="tool-icon" />
                Instagram Downloader
              </NuxtLink></li>
            </ul>
          </li>
        </ul>
      </nav>

      <!-- 优化后的登录/用户信息区域 -->
      <div class="login-container">
        <!-- 未登录状态 - 显示登录按钮 -->
        <div v-if="!store.userInfo" class="login-link">
          <button @click="setShowLoginModal(true)" class="login-button">
            <el-icon class="login-icon">
              <User />
            </el-icon>
            <span class="login-text">Login</span>
          </button>
        </div>
        
        <!-- 已登录状态 - 显示用户头像和下拉菜单 -->
        <div v-else class="user-info" 
             @mouseenter="showUserDropdown" 
             @mouseleave="hideUserDropdown"
             @click="toggleUserDropdown">
          <div class="user-avatar-container">
            <div class="user-avatar">
              <el-icon class="avatar-icon">
                <Avatar />
              </el-icon>
            </div>
            <div class="user-details">
              <span class="username">{{ store.userInfo.username }}</span>
              <el-icon class="user-dropdown-icon" :class="{ 'rotated': userDropdownOpen }">
                <ArrowDown />
              </el-icon>
            </div>
          </div>
          
          <!-- 用户下拉菜单 -->
          <div class="user-dropdown-menu" :class="{ 'show': userDropdownOpen }">
            <div class="user-dropdown-header">
              <div class="user-avatar-large">
                <el-icon class="avatar-icon-large">
                  <Avatar />
                </el-icon>
              </div>
              <div class="user-info-details">
                <div class="username-large">{{ store.userInfo.username }}</div>
                <div class="user-email" v-if="store.userInfo.email">{{ store.userInfo.email }}</div>
              </div>
            </div>
            
            <div class="user-dropdown-divider"></div>
            
            <ul class="user-dropdown-list">
              <!-- <li>
                <NuxtLink to="/profile" class="user-dropdown-link" @click="closeUserDropdown">
                  <el-icon class="dropdown-item-icon">
                    <User />
                  </el-icon>
                  Profile
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/settings" class="user-dropdown-link" @click="closeUserDropdown">
                  <el-icon class="dropdown-item-icon">
                    <Setting />
                  </el-icon>
                  Settings
                </NuxtLink>
              </li> -->
              <li>
                <button @click="handleLogout" class="user-dropdown-link logout-link">
                  <el-icon class="dropdown-item-icon">
                    <SwitchButton />
                  </el-icon>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="nav-toggle" @click="toggleMenu" :class="{ 'active': menuOpen }" role="button" aria-label="Toggle navigation menu" :aria-expanded="menuOpen ? 'true' : 'false'">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router'
import { User, Avatar, ArrowDown, Setting, SwitchButton } from '@element-plus/icons-vue'

const store = useWebsiteStore() 

// Reactive state
const menuOpen = ref(false)
const activeDropdown = ref(null)
const userDropdownOpen = ref(false)
const isDark = ref(false)

// Get current route
const route = useRoute()
const currentRoute = computed(() => route.path)

// Methods
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  if (!menuOpen.value) {
    activeDropdown.value = null
  }
}

const closeMenu = () => {
  menuOpen.value = false
  activeDropdown.value = null
}

const setShowLoginModal = (value) => {
  store.setShowLoginModal(value)
}

// 用户下拉菜单控制
const showUserDropdown = () => {
  if (window.innerWidth > 768) {
    userDropdownOpen.value = true
  }
}

const hideUserDropdown = () => {
  if (window.innerWidth > 768) {
    setTimeout(() => {
      userDropdownOpen.value = false
    }, 150)
  }
}

const toggleUserDropdown = () => {
  if (window.innerWidth <= 768) {
    userDropdownOpen.value = !userDropdownOpen.value
  }
}

const closeUserDropdown = () => {
  userDropdownOpen.value = false
}

// 登出功能
const handleLogout = async () => {
  try {
    await store.logout()
    closeUserDropdown()
    closeMenu()
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

// Desktop dropdown hover logic
const showDropdown = (dropdownName) => {
  if (window.innerWidth > 768) {
    activeDropdown.value = dropdownName
  }
}

const hideDropdown = (dropdownName) => {
  if (window.innerWidth > 768) {
    setTimeout(() => {
      if (activeDropdown.value === dropdownName) {
        activeDropdown.value = null
      }
    }, 100)
  }
}

// Mobile dropdown click logic
const toggleMobileDropdown = (dropdownName) => {
  if (window.innerWidth <= 768) {
    if (activeDropdown.value === dropdownName) {
      activeDropdown.value = null
    } else {
      activeDropdown.value = dropdownName
    }
  }
}

const handleNavLinkClick = (isDropdownLink, dropdownName = null) => {
  if (window.innerWidth <= 768) {
    if (isDropdownLink) {
      toggleMobileDropdown(dropdownName)
    } else {
      closeMenu()
    }
  } else {
    closeMenu()
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.header')) {
    closeMenu()
    closeUserDropdown()
  }
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
    closeUserDropdown()
  }
}

// Lifecycle
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})

// Simple Icon component
const Icon = defineComponent({
  props: {
    name: String,
    class: String
  },
  setup(props) {
    const icons = {
      'chevron-down': 'M19 9l-7 7-7-7',
      'sun': 'M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42',
      'moon': 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
      'type': 'M4 7V4h16v3M9 20h6M12 4v16',
      'code': 'M16 18l6-6-6-6M8 6l-6 6 6 6',
      'shield-check': 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      'image': 'M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM21 15l-5-5L5 21',
      'minimize-2': 'M4 14h6m0 0v6m0-6l-7 7M20 10h-6m0 0V4m0 6l7-7',
      'video': 'M23 7l-7 5 7 5V7zM1 5a2 2 0 012-2h9a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5z',
      'facebook': 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
      'pinterest': 'M8 11.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.853 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.176-4.068-2.845 0-4.516 2.135-4.516 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.334.135-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.97-.527-2.297-1.155l-.624 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z',
      'user': 'M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8Z'
    }
    
    return () => h('svg', {
      class: ['icon', props.class],
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      'stroke-width': '2',
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round'
    }, [
      h('path', { d: icons[props.name] })
    ])
  }
})
</script>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s ease;
}

:global(.dark) .header {
  background: rgba(17, 24, 39, 0.95);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 70px;
}

.logo a {
  text-decoration: none;
}

.logo .logo-text { 
  font-size: 32px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
}

:global(.dark) .logo .logo-text {
  color: #f9fafb;
}

.logo span {
  color: #3b82f6;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-nav {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-left: 30px;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
  gap: 0.5rem;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  font-size: 15px;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
}

:global(.dark) .nav-link {
  color: #d1d5db;
}

.nav-link:hover,
.nav-link.active {
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}

:global(.dark) .nav-link:hover,
:global(.dark) .nav-link.active {
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.15);
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
}

.dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

@media (max-width: 768px) {
  .nav-link.dropdown-active .dropdown-icon {
    transform: rotate(180deg);
  }
  .container{
    justify-content: space-between;
  }
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  min-width: 300px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.2s ease;
  z-index: 1000;
  list-style: none;
  margin: 0;
}

:global(.dark) .dropdown-menu {
  background: #374151;
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: 0 0.5rem;
}

:global(.dark) .dropdown-link {
  color: #d1d5db;
}

.dropdown-link:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  transform: translateX(4px);
}

:global(.dark) .dropdown-link:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.tool-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.dropdown-link:hover .tool-icon {
  opacity: 1;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.nav-toggle:hover {
  background: rgba(107, 114, 128, 0.1);
}

.nav-toggle span {
  width: 24px;
  height: 2px;
  background-color: #374151;
  margin: 2px 0;
  transition: all 0.3s ease;
  border-radius: 1px;
}

:global(.dark) .nav-toggle span {
  background-color: #d1d5db;
}

.nav-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.active span:nth-child(2) {
  opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.icon {
  width: 20px;
  height: 20px;
}

/* 登录容器样式 */
.login-container {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* 登录按钮样式 */
.login-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  padding: 0.6rem 1.2rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.login-button:hover {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

.login-icon {
  font-size: 18px;
}

.login-text {
  font-weight: 600;
}

/* 用户信息容器 */
.user-info {
  position: relative;
  cursor: pointer;
}

.user-avatar-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  transition: all 0.2s ease;
  background: rgba(59, 130, 246, 0.05);
}

.user-avatar-container:hover {
  background: rgba(59, 130, 246, 0.1);
}

:global(.dark) .user-avatar-container {
  background: rgba(59, 130, 246, 0.1);
}

:global(.dark) .user-avatar-container:hover {
  background: rgba(59, 130, 246, 0.15);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.avatar-icon {
  font-size: 20px;
}

.user-details {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.username {
  font-weight: 600;
  color: #1f2937;
  font-size: 15px;
}

:global(.dark) .username {
  color: #f9fafb;
}

.user-dropdown-icon {
  font-size: 14px;
  color: #6b7280;
  transition: transform 0.2s ease;
}

.user-dropdown-icon.rotated {
  transform: rotate(180deg);
}

:global(.dark) .user-dropdown-icon {
  color: #d1d5db;
}

/* 用户下拉菜单 */
.user-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 0;
  min-width: 280px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
  overflow: hidden;
  margin-top: 0.5rem;
}

:global(.dark) .user-dropdown-menu {
  background: #374151;
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.user-dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.user-dropdown-header {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  display: flex;
  align-items: center;
  gap: 1rem;
}

:global(.dark) .user-dropdown-header {
  background: linear-gradient(135deg, #4b5563, #374151);
}

.user-avatar-large {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.avatar-icon-large {
  font-size: 24px;
}

.user-info-details {
  flex: 1;
}

.username-large {
  font-weight: 700;
  color: #1f2937;
  font-size: 16px;
  margin-bottom: 0.25rem;
}

:global(.dark) .username-large {
  color: #f9fafb;
}

.user-email {
  font-size: 13px;
  color: #6b7280;
}

:global(.dark) .user-email {
  color: #d1d5db;
}

.user-dropdown-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 0;
}

:global(.dark) .user-dropdown-divider {
  background: rgba(255, 255, 255, 0.1);
}

.user-dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
}

.user-dropdown-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

:global(.dark) .user-dropdown-link {
  color: #d1d5db;
}

.user-dropdown-link:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

:global(.dark) .user-dropdown-link:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.logout-link {
  color: #ef4444 !important;
}

.logout-link:hover {
  background: rgba(239, 68, 68, 0.1) !important;
  color: #dc2626 !important;
}

:global(.dark) .logout-link {
  color: #f87171 !important;
}

:global(.dark) .logout-link:hover {
  background: rgba(239, 68, 68, 0.15) !important;
  color: #ef4444 !important;
}

.dropdown-item-icon {
  font-size: 16px;
  opacity: 0.7;
}

.user-dropdown-link:hover .dropdown-item-icon {
  opacity: 1;
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }
  
  .main-nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding: 1rem;
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    height: calc(100vh - 70px);
    overflow-y: auto;
  }
  
  :global(.dark) .main-nav {
    background: rgba(17, 24, 39, 0.98);
    border-top-color: rgba(255, 255, 255, 0.1);
  }
  
  .main-nav.active {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
  }
  
  .nav-list {
    flex-direction: column;
    gap: 0;
    width: 100%;
  }
  
  .nav-item {
    width: 100%;
  }
  
  .nav-link {
    padding: 1rem;
    justify-content: space-between;
    border-radius: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  
  :global(.dark) .nav-link {
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  
  .dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
    background: rgba(59, 130, 246, 0.05);
    border-radius: 0;
    margin-left: 1rem;
    opacity: 1;
    visibility: visible;
    transform: none;
    display: none;
    padding: 0;
  }
  
  :global(.dark) .dropdown-menu {
    background: rgba(59, 130, 246, 0.1);
  }
  
  .dropdown-menu.show {
    display: block;
  }
  
  .dropdown-link {
    margin: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.03);
    padding-left: 2rem;
  }

  :global(.dark) .dropdown-link {
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }

  .login-container {
    margin-left: 0;
    width: 100%;
    justify-content: center;
    padding: 1rem 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    margin-top: 1rem;
  }

  :global(.dark) .login-container {
    border-top-color: rgba(255, 255, 255, 0.1);
  }

  .login-button {
    width: auto;
    padding: 0.8rem 1.5rem;
  }

  .user-info {
    width: 100%;
  }

  .user-avatar-container {
    justify-content: center;
    padding: 1rem;
  }

  .user-dropdown-menu {
    position: static;
    margin-top: 0;
    border-radius: 0;
    box-shadow: none;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(59, 130, 246, 0.05);
  }

  :global(.dark) .user-dropdown-menu {
    border-top-color: rgba(255, 255, 255, 0.1);
    background: rgba(59, 130, 246, 0.1);
  }

  .user-dropdown-header {
    background: transparent;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .logo .logo-text {
    font-size: 28px;
  }

  .user-avatar {
    width: 32px;
    height: 32px;
  }

  .avatar-icon {
    font-size: 18px;
  }

  .username {
    font-size: 14px;
  }

  .login-button {
    padding: 0.7rem 1.2rem;
    font-size: 14px;
  }
}
</style>