<template>
  <header class="header">
    <div class="container">
      <!-- Logo Section -->
      <div class="logo">
        <NuxtLink to="/" class="logo-link">
          <div class="logo-text" role="heading" aria-level="2">
            Kit<span class="logo-accent">hubs</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Main Navigation -->
      <nav class="main-nav" :class="{ active: menuOpen }">
        <ul class="nav-list">
          <li class="nav-item">
            <NuxtLink
              to="/"
              class="nav-link"
              :class="{ active: currentRoute === '/' }"
              @click="handleNavLinkClick(false)"
            >
              <Icon name="home" class="nav-icon" />
              <span >Home</span>
            </NuxtLink>
          </li>

          <!-- URL Tools Dropdown -->
          <li
            class="nav-item dropdown"
            @mouseenter="showDropdown('url')"
            @mouseleave="hideDropdown('url')"
          >
            <button
              class="nav-link dropdown-trigger"
              :class="{
                active: currentRoute.startsWith('/short-urls'),
                'dropdown-active': activeDropdown === 'url',
              }"
              @click="handleNavLinkClick(true, 'url')"
              aria-haspopup="true"
              :aria-expanded="activeDropdown === 'url' ? 'true' : 'false'"
            >
              <Icon name="link" class="nav-icon" />
              <span>URL Tools</span>
              <Icon name="chevron-down" class="dropdown-icon" />
            </button>
            <ul
              class="dropdown-menu"
              :class="{ show: activeDropdown === 'url' }"
              @mouseenter="keepDropdownOpen('url')"
              @mouseleave="hideDropdown('url')"
            >
              <li>
                <NuxtLink
                  to="/short-link-generator"
                  class="dropdown-link"
                  @click="closeMenu"
                >
                  <div class="dropdown-link-content">
                    <Icon name="link-2" class="tool-icon" />
                    <div class="tool-info">
                      <span class="tool-name">Short Links Tool</span>
                      <span class="tool-desc">Create shortened URLs</span>
                    </div>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- Text Tools Dropdown -->
          <li
            class="nav-item dropdown"
            @mouseenter="showDropdown('text')"
            @mouseleave="hideDropdown('text')"
          >
            <button
              class="nav-link dropdown-trigger"
              :class="{
                active:
                  currentRoute.startsWith('/json-formatter') ||
                  currentRoute.startsWith('/sensitive-word-check'),
                'dropdown-active': activeDropdown === 'text',
              }"
              @click="handleNavLinkClick(true, 'text')"
              aria-haspopup="true"
              :aria-expanded="activeDropdown === 'text' ? 'true' : 'false'"
            >
              <Icon name="file-text" class="nav-icon" />
              <span>Text Tools</span>
              <Icon name="chevron-down" class="dropdown-icon" />
            </button>
            <ul
              class="dropdown-menu"
              :class="{ show: activeDropdown === 'text' }"
              @mouseenter="keepDropdownOpen('text')"
              @mouseleave="hideDropdown('text')"
            >
              <li>
                <NuxtLink
                  to="/json-formatter"
                  class="dropdown-link"
                  @click="closeMenu"
                >
                  <div class="dropdown-link-content">
                    <Icon name="code" class="tool-icon" />
                    <div class="tool-info">
                      <span class="tool-name">JSON Formatter</span>
                      <span class="tool-desc">Format and validate JSON</span>
                    </div>
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/sensitive-word-check"
                  class="dropdown-link"
                  @click="closeMenu"
                >
                  <div class="dropdown-link-content">
                    <Icon name="shield-check" class="tool-icon" />
                    <div class="tool-info">
                      <span class="tool-name">Content Detector</span>
                      <span class="tool-desc">Check sensitive content</span>
                    </div>
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/timestamp-converter"
                  class="dropdown-link"
                  @click="closeMenu"
                >
                  <div class="dropdown-link-content">
                    <Icon name="clock" class="tool-icon" />
                    <div class="tool-info">
                      <span class="tool-name">Timestamp Converter</span>
                      <span class="tool-desc">Convert timestamps</span>
                    </div>
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/ip-address"
                  class="dropdown-link"
                  @click="closeMenu"
                >
                  <div class="dropdown-link-content">
                    <Icon name="clock" class="tool-icon" />
                    <div class="tool-info">
                      <span class="tool-name">Ip Address</span>
                      <span class="tool-desc">Discover IP detailed information </span>
                    </div>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- Image Tools Dropdown -->
          <li
            class="nav-item dropdown"
            @mouseenter="showDropdown('image')"
            @mouseleave="hideDropdown('image')"
          >
            <button
              class="nav-link dropdown-trigger"
              :class="{
                active: currentRoute.startsWith('/image-compressor'),
                'dropdown-active': activeDropdown === 'image',
              }"
              @click="handleNavLinkClick(true, 'image')"
            >
              <Icon name="image" class="nav-icon" />
              <span>Image Tools</span>
              <Icon name="chevron-down" class="dropdown-icon" />
            </button>
            <ul
              class="dropdown-menu"
              :class="{ show: activeDropdown === 'image' }"
              @mouseenter="keepDropdownOpen('image')"
              @mouseleave="hideDropdown('image')"
            >
              <li>
                <NuxtLink
                  to="/image-compressor"
                  class="dropdown-link"
                  @click="closeMenu"
                >
                  <div class="dropdown-link-content">
                    <Icon name="compress" class="tool-icon" />
                    <div class="tool-info">
                      <span class="tool-name">Image Compressor</span>
                      <span class="tool-desc">Compress images efficiently</span>
                    </div>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- Video Tools Dropdown -->
          <li
            class="nav-item dropdown"
            @mouseenter="showDropdown('video')"
            @mouseleave="hideDropdown('video')"
          >
            <button
              class="nav-link dropdown-trigger"
              :class="{
                active:
                  currentRoute.startsWith('/facebook-video-downloader') ||
                  currentRoute.startsWith('/pinterest-downloader') ||
                  currentRoute.startsWith('/instagram-video-downloader'),
                'dropdown-active': activeDropdown === 'video',
              }"
              @click="handleNavLinkClick(true, 'video')"
            >
              <Icon name="video" class="nav-icon" />
              <span>Video Tools</span>
              <Icon name="chevron-down" class="dropdown-icon" />
            </button>
            <ul
              class="dropdown-menu"
              :class="{ show: activeDropdown === 'video' }"
              @mouseenter="keepDropdownOpen('video')"
              @mouseleave="hideDropdown('video')"
            >
              <li>
                <NuxtLink
                  to="/facebook-video-downloader"
                  class="dropdown-link"
                  @click="closeMenu"
                >
                  <div class="dropdown-link-content">
                    <Icon name="facebook" class="tool-icon" />
                    <div class="tool-info">
                      <span class="tool-name">Facebook Downloader</span>
                      <span class="tool-desc">Download Facebook videos</span>
                    </div>
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/pinterest-downloader"
                  class="dropdown-link"
                  @click="closeMenu"
                >
                  <div class="dropdown-link-content">
                    <Icon name="pinterest" class="tool-icon" />
                    <div class="tool-info">
                      <span class="tool-name">Pinterest Downloader</span>
                      <span class="tool-desc">Download Pinterest content</span>
                    </div>
                  </div>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/instagram-video-downloader"
                  class="dropdown-link"
                  @click="closeMenu"
                >
                  <div class="dropdown-link-content">
                    <Icon name="instagram" class="tool-icon" />
                    <div class="tool-info">
                      <span class="tool-name">Instagram Downloader</span>
                      <span class="tool-desc">Download Instagram videos</span>
                    </div>
                  </div>
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!-- 移动端用户区域 - 作为菜单项 -->
          <li class="nav-item mobile-user-item">
            <!-- Login Button for Mobile -->
            <div v-if="!store.userInfo" class="mobile-login-wrapper">
              <button @click="setShowLoginModal(true)" class="mobile-login-button">
                <Icon name="user" class="login-icon" />
                <span class="login-text">Sign In</span>
              </button>
            </div>

            <!-- User Menu for Mobile -->
            <div v-else class="mobile-user-menu">
              <button 
                class="mobile-user-trigger"
                @click="toggleUserDropdown"
                :class="{ active: userDropdownOpen }"
              >
                <div class="user-avatar">
                  <span class="avatar-text">{{ store.userInfo.username?.charAt(0).toUpperCase() }}</span>
                </div>
                <div class="user-info-text">
                  <span class="username">{{ store.userInfo.username }}</span>
                  <Icon name="chevron-down" class="user-chevron" :class="{ rotated: userDropdownOpen }" />
                </div>
              </button>

              <div class="mobile-user-dropdown" :class="{ show: userDropdownOpen }">
                <div class="user-dropdown-header">
                  <div class="user-avatar-large">
                    <span class="avatar-text-large">{{ store.userInfo.username?.charAt(0).toUpperCase() }}</span>
                  </div>
                  <div class="user-details">
                    <div class="username-large">{{ store.userInfo.username }}</div>
                    <div class="user-email" v-if="store.userInfo.email">
                      {{ store.userInfo.email }}
                    </div>
                  </div>
                </div>

                <div class="user-dropdown-divider"></div>

                <ul class="user-dropdown-list">
                  <li>
                    <button @click="handleLogout" class="user-dropdown-link logout-link">
                      <Icon name="log-out" class="dropdown-item-icon" />
                      <span>Sign Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Desktop User Section -->
      <div class="user-section">
        <div class="auth-container">
          <!-- Login Button -->
          <div v-if="!store.userInfo" class="login-wrapper">
            <button @click="setShowLoginModal(true)" class="login-button">
              <Icon name="user" class="login-icon" />
              <span class="login-text">Sign In</span>
            </button>
          </div>

          <!-- User Menu -->
          <div
            v-else
            class="user-menu"
            @mouseenter="showUserDropdown"
            @mouseleave="hideUserDropdown"
            @click="toggleUserDropdown"
          >
            <div class="user-trigger">
              <div class="user-avatar">
                <span class="avatar-text">{{ store.userInfo.username?.charAt(0).toUpperCase() }}</span>
              </div>
              <div class="user-info-text">
                <span class="username">{{ store.userInfo.username }}</span>
                <Icon name="chevron-down" class="user-chevron" :class="{ rotated: userDropdownOpen }" />
              </div>
            </div>

            <!-- User Dropdown -->
            <div 
              class="user-dropdown" 
              :class="{ show: userDropdownOpen }"
              @mouseenter="keepUserDropdownOpen"
              @mouseleave="hideUserDropdown"
            >
              <div class="user-dropdown-header">
                <div class="user-avatar-large">
                  <span class="avatar-text-large">{{ store.userInfo.username?.charAt(0).toUpperCase() }}</span>
                </div>
                <div class="user-details">
                  <div class="username-large">{{ store.userInfo.username }}</div>
                  <div class="user-email" v-if="store.userInfo.email">
                    {{ store.userInfo.email }}
                  </div>
                </div>
              </div>

              <div class="user-dropdown-divider"></div>

              <ul class="user-dropdown-list">
                <li>
                  <button @click="handleLogout" class="user-dropdown-link logout-link">
                    <Icon name="log-out" class="dropdown-item-icon" />
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="mobile-toggle"
        @click="toggleMenu"
        :class="{ active: menuOpen }"
        aria-label="Toggle navigation menu"
        :aria-expanded="menuOpen ? 'true' : 'false'"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>

    <!-- Mobile Menu Overlay -->
    <div class="mobile-overlay" :class="{ active: menuOpen }" @click="closeMenu"></div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, defineComponent, h } from "vue";
import { useRoute } from "vue-router";
import { useWebsiteStore } from "@/stores/website";

const store = useWebsiteStore();

// Reactive state
const menuOpen = ref(false);
const activeDropdown = ref(null);
const userDropdownOpen = ref(false);

// 添加定时器引用来管理延迟关闭
const dropdownTimer = ref(null);
const userDropdownTimer = ref(null);

// Get current route
const route = useRoute();
const currentRoute = computed(() => route.path);

// Methods
const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
  if (!menuOpen.value) {
    activeDropdown.value = null;
    userDropdownOpen.value = false;
  }
  document.body.style.overflow = menuOpen.value ? 'hidden' : '';
};

const closeMenu = () => {
  menuOpen.value = false;
  activeDropdown.value = null;
  userDropdownOpen.value = false;
  document.body.style.overflow = '';
};

const setShowLoginModal = (value) => {
  store.setShowLoginModal(value);
};

// 清除定时器的辅助函数
const clearDropdownTimer = () => {
  if (dropdownTimer.value) {
    clearTimeout(dropdownTimer.value);
    dropdownTimer.value = null;
  }
};

const clearUserDropdownTimer = () => {
  if (userDropdownTimer.value) {
    clearTimeout(userDropdownTimer.value);
    userDropdownTimer.value = null;
  }
};

// 优化后的下拉菜单方法
const showDropdown = (dropdownName) => {
  if (window.innerWidth > 768) {
    clearDropdownTimer();
    activeDropdown.value = dropdownName;
  }
};

const hideDropdown = (dropdownName) => {
  if (window.innerWidth > 768) {
    clearDropdownTimer();
    dropdownTimer.value = setTimeout(() => {
      if (activeDropdown.value === dropdownName) {
        activeDropdown.value = null;
      }
    }, 300);
  }
};

const keepDropdownOpen = (dropdownName) => {
  if (window.innerWidth > 768) {
    clearDropdownTimer();
    activeDropdown.value = dropdownName;
  }
};

// 优化后的用户下拉菜单方法
const showUserDropdown = () => {
  if (window.innerWidth > 768) {
    clearUserDropdownTimer();
    userDropdownOpen.value = true;
  }
};

const hideUserDropdown = () => {
  if (window.innerWidth > 768) {
    clearUserDropdownTimer();
    userDropdownTimer.value = setTimeout(() => {
      userDropdownOpen.value = false;
    }, 300);
  }
};

const keepUserDropdownOpen = () => {
  if (window.innerWidth > 768) {
    clearUserDropdownTimer();
    userDropdownOpen.value = true;
  }
};

const toggleUserDropdown = () => {
  if (window.innerWidth <= 768) {
    userDropdownOpen.value = !userDropdownOpen.value;
  }
};

const closeUserDropdown = () => {
  clearUserDropdownTimer();
  userDropdownOpen.value = false;
};

const handleLogout = async () => {
  try {
    await store.logout();
    closeUserDropdown();
    closeMenu();
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

const toggleMobileDropdown = (dropdownName) => {
  if (window.innerWidth <= 768) {
    if (activeDropdown.value === dropdownName) {
      activeDropdown.value = null;
    } else {
      activeDropdown.value = dropdownName;
    }
  }
};

const handleNavLinkClick = (isDropdownLink, dropdownName = null) => {
  if (window.innerWidth <= 768) {
    if (isDropdownLink) {
      toggleMobileDropdown(dropdownName);
    } else {
      closeMenu();
    }
  } else {
    closeMenu();
  }
};

const handleClickOutside = (event) => {
  if (!event.target.closest(".header")) {
    closeMenu();
    closeUserDropdown();
  }
};

const handleEscape = (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeUserDropdown();
  }
};

// Lifecycle
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("keydown", handleEscape);
  document.body.style.overflow = '';
  clearDropdownTimer();
  clearUserDropdownTimer();
});

// 统一的图标组件
const Icon = defineComponent({
  props: {
    name: String,
    class: String,
  },
  setup(props) {
    const icons = {
      "home": "M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10",
      "link": "M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71 M15 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.72-1.71",
      "file-text": "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
      "image": "M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2z M8.5 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z M21 15l-5-5L5 21",
      "video": "M23 7l-7 5 7 5V7z M1 5a2 2 0 012-2h9a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5z",
      "chevron-down": "M6 9l6 6 6-6",
      "user": "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2 M12 11a4 4 0 100-8 4 4 0 000 8z",
      "log-out": "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4 M16 17l5-5-5-5 M21 12H9",
      "link-2": "M15 7h3a5 5 0 015 5 5 5 0 01-5 5h-3m-6 0H6a5 5 0 01-5-5 5 5 0 015-5h3m0 5h6",
      "code": "M16 18l6-6-6-6 M8 6l-6 6 6 6",
      "shield-check": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4",
      "clock": "M12 2v10m0 0l4 4m-4-4l-4 4 M12 2a10 10 0 100 20 10 10 0 000-20z",
      "compress": "M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2v3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3",
      "facebook": "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
      "pinterest": "M8 11.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0z M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.853 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.176-4.068-2.845 0-4.516 2.135-4.516 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.334.135-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.176-4.068-2.845 0-4.516 2.135-4.516 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.334.135-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-1.013 0-1.97-.527-2.297l-.624 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z",
      "instagram": "M4 8a4 4 0 014-4h8a4 4 0 014 4v8a4 4 0 01-4 4H8a4 4 0 01-4-4V8z M12 14a2 2 0 100-4 2 2 0 000 4z M17.5 6.5h.01",
    };

    return () =>
      h(
        "svg",
        {
          class: ["icon", props.class],
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        },
        icons[props.name]?.split(' M').map((path, index) => 
          h("path", { 
            d: index === 0 ? path : `M${path}`,
            key: index 
          })
        ).filter(Boolean) || []
      );
  },
});
</script>

<style scoped>
/* 基础样式保持不变 */
.header {
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  height: 72px;
  gap: 2rem;
}

/* Logo Styles */
.logo {
  flex-shrink: 0;
}

.logo-link {
  text-decoration: none;
  display: block;
}

.logo-text {
  font-size: 2rem;
  font-weight: 800;
  color: #f9fafb;
  letter-spacing: -0.02em;
  transition: all 0.3s ease;
}

.logo-accent {
  background: linear-gradient(135deg, #60a5fa, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-link:hover .logo-text {
  transform: scale(1.05);
}

/* Navigation Styles */
.main-nav {
  flex: 1;
  display: flex;
  justify-content: center;
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

.nav-link,
.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #d1d5db;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: none;
  background: none;
  cursor: pointer;
  white-space: nowrap;
}

.nav-link:hover,
.nav-link.active,
.dropdown-trigger:hover,
.dropdown-trigger.active {
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.15);
  transform: translateY(-1px);
}

.nav-icon {
  width: 18px;
  height: 18px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
}

.nav-link:hover .nav-icon,
.dropdown-trigger:hover .nav-icon {
  opacity: 1;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 0.25rem;
  flex-shrink: 0;
}

.dropdown:hover .dropdown-icon,
.dropdown-trigger.dropdown-active .dropdown-icon {
  transform: rotate(180deg);
}

/* 优化的下拉菜单样式 */
.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  background: #1f2937;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  padding: 0.75rem;
  min-width: 320px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  list-style: none;
  margin: 0;
}

.dropdown-menu::before {
  content: '';
  position: absolute;
  top: -0.25rem;
  left: 0;
  right: 0;
  height: 0.25rem;
  background: transparent;
}

.dropdown-menu.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.dropdown-link {
  display: block;
  text-decoration: none;
  color: #d1d5db;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-bottom: 0.25rem;
}

.dropdown-link:last-child {
  margin-bottom: 0;
}

.dropdown-link:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  transform: translateX(4px);
}

.dropdown-link-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
}

.tool-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.dropdown-link:hover .tool-icon {
  opacity: 1;
  transform: scale(1.1);
}

.tool-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.tool-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #f9fafb;
}

.tool-desc {
  font-size: 0.85rem;
  color: #9ca3af;
}

/* User Section Styles */
.user-section {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.auth-container {
  position: relative;
}

.login-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.login-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

/* User Menu */
.user-menu {
  position: relative;
  cursor: pointer;
}

.user-trigger {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.user-trigger:hover {
  background: #374151;
  transform: translateY(-1px);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
}

.avatar-text {
  line-height: 1;
}

.user-info-text {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.username {
  font-weight: 600;
  color: #f9fafb;
  font-size: 0.95rem;
}

.user-chevron {
  width: 16px;
  height: 16px;
  color: #9ca3af;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.user-chevron.rotated {
  transform: rotate(180deg);
}

/* 优化的用户下拉菜单 */
.user-dropdown {
  position: absolute;
  top: calc(100% + 0.25rem);
  right: 0;
  background: #1f2937;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  min-width: 280px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
  overflow: hidden;
}

.user-dropdown::before {
  content: '';
  position: absolute;
  top: -0.25rem;
  left: 0;
  right: 0;
  height: 0.25rem;
  background: transparent;
}

.user-dropdown.show {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

.user-dropdown-header {
  padding: 1.5rem;
  background: #374151;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar-large {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #60a5fa, #8b5cf6);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  flex-shrink: 0;
}

.avatar-text-large {
  line-height: 1;
}

.user-details {
  flex: 1;
}

.username-large {
  font-weight: 700;
  color: #f9fafb;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.user-email {
  font-size: 0.85rem;
  color: #9ca3af;
}

.user-dropdown-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.user-dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0.75rem;
}

.user-dropdown-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #d1d5db;
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: 12px;
}

.user-dropdown-link:hover {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  transform: translateX(4px);
}

.logout-link {
  color: #f87171 !important;
}

.logout-link:hover {
  background: rgba(239, 68, 68, 0.15) !important;
  color: #ef4444 !important;
}

.dropdown-item-icon {
  width: 18px;
  height: 18px;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  flex-shrink: 0;
}

.user-dropdown-link:hover .dropdown-item-icon {
  opacity: 1;
}

/* Mobile Toggle */
.mobile-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border: none;
  background: rgba(59, 130, 246, 0.15);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 4px;
}

.mobile-toggle:hover {
  background: #60a5fa;
}

.hamburger-line {
  width: 20px;
  height: 2px;
  background-color: #d1d5db;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 1px;
}

.mobile-toggle:hover .hamburger-line {
  background-color: white;
}

.mobile-toggle.active .hamburger-line:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.mobile-toggle.active .hamburger-line:nth-child(2) {
  opacity: 0;
}

.mobile-toggle.active .hamburger-line:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

/* Mobile Overlay */
.mobile-overlay {
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
}

.mobile-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* 移动端用户区域样式 - 作为菜单项 */
.mobile-user-item {
  display: none;
}

.mobile-login-wrapper {
  width: 100%;
  padding: 0.5rem 0;
}

.mobile-login-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, #60a5fa, #3b82f6);
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  width: 100%;
  justify-content: center;
}

.mobile-login-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
}

.mobile-user-menu {
  width: 100%;
}

.mobile-user-trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  cursor: pointer;
  width: 100%;
  color: #d1d5db;
}

.mobile-user-trigger:hover {
  background: rgba(59, 130, 246, 0.25);
  color: #60a5fa;
}

.mobile-user-trigger.active {
  background: rgba(59, 130, 246, 0.25);
  color: #60a5fa;
}

.mobile-user-dropdown {
  margin: 0.5rem 0 0 1rem;
  border-radius: 12px;
  box-shadow: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #374151;
  transform: none;
  opacity: 1;
  visibility: visible;
  display: none;
  min-width: auto;
}

.mobile-user-dropdown.show {
  display: block;
}

.mobile-user-dropdown .user-dropdown-header {
  background: #1f2937;
  padding: 1rem;
}

.mobile-user-dropdown .user-dropdown-list {
  padding: 0.5rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
    height: 64px;
    gap: 1rem;
  }

  .logo-text {
    font-size: 1.75rem;
  }

  .mobile-toggle {
    display: flex;
  }

  .user-section {
    display: none;
  }

  .mobile-user-item {
    display: block;
    width: 100%;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 0.5rem;
    padding-top: 0.5rem;
  }

  .main-nav {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    background: #1f2937;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem;
    transform: translateX(-100%);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    height: calc(100vh - 64px);
    overflow-y: auto;
    z-index: 1000;
  }

  .main-nav.active {
    transform: translateX(0);
    opacity: 1;
    visibility: visible;
  }

  .nav-list {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .nav-item {
    width: 100%;
  }

  .nav-link,
  .dropdown-trigger {
    padding: 1rem;
    justify-content: space-between;
    border-radius: 12px;
    width: 100%;
  }

  .dropdown-menu {
    position: static;
    box-shadow: none;
    border: none;
    background: #374151;
    border-radius: 12px;
    margin: 0.5rem 0 0 1rem;
    opacity: 1;
    visibility: visible;
    transform: none;
    display: none;
    min-width: auto;
  }

  .dropdown-menu.show {
    display: block;
  }

  .dropdown-link-content {
    padding: 0.75rem;
  }

  .tool-name {
    font-size: 0.9rem;
  }

  .tool-desc {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.75rem;
  }

  .logo-text {
    font-size: 1.5rem;
  }

  .mobile-login-button {
    padding: 0.875rem 1.25rem;
    font-size: 0.9rem;
  }

  .mobile-user-trigger {
    padding: 0.875rem 1.25rem;
  }
}

/* 图标统一样式 */
.icon {
  width: 1em;
  height: 1em;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* 平滑动画 */
* {
  -webkit-tap-highlight-color: transparent;
}
</style>