<template>
  <header class="header">
    <div class="container">
      <div class="logo">
        <NuxtLink to="/">
          <h1>Kit<span>hubs</span></h1>
        </NuxtLink>
      </div>
      
      <nav class="main-nav" :class="{ 'active': menuOpen }">
        <ul class="nav-list">
          <li class="nav-item">
            <NuxtLink to="/" class="nav-link" :class="{ 'active': currentRoute === '/' }" @click="closeMenu">
              Home
            </NuxtLink>
          </li>
          
          <!-- Text Tools Dropdown -->
          <li class="nav-item dropdown" @mouseenter="showDropdown('text')" @mouseleave="hideDropdown('text')">
            <NuxtLink to="/" class="nav-link" :class="{ 'active': currentRoute.startsWith('/tools/text') }" @click="closeMenu">
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
            <NuxtLink to="/" class="nav-link" :class="{ 'active': currentRoute.startsWith('/tools/image') }" @click="closeMenu">
              Image Tools
              <Icon name="chevron-down" class="dropdown-icon" />
            </NuxtLink>
            <ul class="dropdown-menu" :class="{ 'show': activeDropdown === 'image' }">
              <li><NuxtLink to="/tools/image/compressor" class="dropdown-link" @click="closeMenu">
                <Icon name="minimize-2" class="tool-icon" />
                Image Compressor
              </NuxtLink></li>
            </ul>
          </li>

          <!-- Video Tools Dropdown -->
          <li class="nav-item dropdown" @mouseenter="showDropdown('video')" @mouseleave="hideDropdown('video')">
            <NuxtLink to="/" class="nav-link" :class="{ 'active': currentRoute.startsWith('/tools/video') }" @click="closeMenu">
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
              <li><NuxtLink to="/" class="dropdown-link" @click="closeMenu">
                <Icon name="instagram" class="tool-icon" />
                Instagram Downloader
              </NuxtLink></li>
            </ul>
          </li>
        </ul>
        
        <div class="nav-actions">
          <button class="theme-toggle" @click="toggleTheme" :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
            <Icon :name="isDark ? 'sun' : 'moon'" />
          </button>
        </div>
      </nav>
      
      <div class="nav-toggle" @click="toggleMenu" :class="{ 'active': menuOpen }">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineComponent, h } from 'vue'
import { useRoute } from 'vue-router';

// Reactive state
const menuOpen = ref(false)
const activeDropdown = ref(null)
const isDark = ref(false)

// Get current route
const route = useRoute()
const currentRoute = computed(() => route.path)

// Methods
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMenu = () => {
  menuOpen.value = false
  activeDropdown.value = null
}

const showDropdown = (dropdown) => {
  if (window.innerWidth > 768) {
    activeDropdown.value = dropdown
  }
}

const hideDropdown = (dropdown) => {
  if (window.innerWidth > 768) {
    setTimeout(() => {
      if (activeDropdown.value === dropdown) {
        activeDropdown.value = null
      }
    }, 100)
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
  }
}

const handleEscape = (event) => {
  if (event.key === 'Escape') {
    closeMenu()
  }
}

// Lifecycle
onMounted(() => {
  // Initialize theme
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  
  // Add event listeners
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
      'instagram': 'M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z'
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

.logo h1 {
  font-size: 32px;
  font-weight: 800;
  color: #1f2937;
  margin: 0;
  letter-spacing: -0.5px;
  transition: color 0.3s ease;
}

:global(.dark) .logo h1 {
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

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  min-width: 300px; /* Adjusted for standard dropdown */
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
  display: flex; /* Changed to flex for icon alignment */
  align-items: center;
  gap: 0.75rem; /* Spacing between icon and text */
  padding: 0.75rem 1rem;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s ease;
  border-radius: 8px; /* Added border-radius for individual items */
  margin: 0 0.5rem; /* Added margin for spacing within dropdown */
}

:global(.dark) .dropdown-link {
  color: #d1d5db;
}

.dropdown-link:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  transform: translateX(4px); /* Added subtle hover effect */
}

:global(.dark) .dropdown-link:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.tool-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0; /* Prevent icon from shrinking */
  opacity: 0.7; /* Slightly faded icon */
  transition: opacity 0.2s ease;
}

.dropdown-link:hover .tool-icon {
  opacity: 1; /* Icon becomes fully opaque on hover */
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: rgba(107, 114, 128, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #6b7280;
}

:global(.dark) .theme-toggle {
  background: rgba(209, 213, 219, 0.1);
  color: #d1d5db;
}

.theme-toggle:hover {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
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

/* Removed .mega-menu specific styles */

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
    display: none; /* Hidden by default on mobile, controlled by JS */
    padding: 0; /* Reset padding for mobile */
  }
  
  :global(.dark) .dropdown-menu {
    background: rgba(59, 130, 246, 0.1);
  }
  
  .dropdown-menu.show {
    display: block;
  }
  
  .dropdown-link {
    margin: 0; /* Reset margin for mobile */
    border-bottom: 1px solid rgba(0, 0, 0, 0.03); /* Lighter border for sub-items */
    padding-left: 2rem; /* Indent sub-items */
  }

  :global(.dark) .dropdown-link {
    border-bottom-color: rgba(255, 255, 255, 0.05);
  }
  
  .nav-actions {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    justify-content: center;
  }
  
  :global(.dark) .nav-actions {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  .logo h1 {
    font-size: 28px;
  }
}
</style>
