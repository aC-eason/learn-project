<template>
    <header class="header">
      <div class="container">
        <div class="logo">
          <h1>Kithubs<span> Tools</span></h1>
        </div>
        <nav class="main-nav" :class="{ 'active': menuOpen }">
          <ul>
            <li><a href="/" :class="{ 'active': currentRoute === '/' }">首页</a></li>
            <li><a href="/tools" :class="{ 'active': currentRoute === '/tools' }">工具集</a></li>
            <li><a href="/guide" :class="{ 'active': currentRoute === '/guide' }">使用指南</a></li>
            <li><a href="/about" :class="{ 'active': currentRoute === '/about' }">关于我们</a></li>
            <li><a href="/contact" :class="{ 'active': currentRoute === '/contact' }">联系我们</a></li>
          </ul>
        </nav>
        <div class="nav-toggle" @click="toggleMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import { useRoute } from 'vue-router'
  
  // 获取当前路由
  const route = useRoute()
  const currentRoute = computed(() => route.path)
  
  // 响应式状态
  const menuOpen = ref(false)
  
  // 切换菜单方法
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }
  </script>
  
  <style scoped>
  .header {
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo h1 {
    font-size: 28px;
    font-weight: 700;
    color: #333;
    margin: 0;
  }
  
  .logo span {
    color: #4a9ced;
  }
  
  .main-nav ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .main-nav li {
    margin-left: 30px;
  }
  
  .main-nav a {
    text-decoration: none;
    color: #555;
    font-weight: 500;
    font-size: 16px;
    transition: color 0.3s;
  }
  
  .main-nav a:hover,
  .main-nav a.active {
    color: #4a9ced;
  }
  
  .nav-toggle {
    display: none;
    flex-direction: column;
    cursor: pointer;
  }
  
  .nav-toggle span {
    width: 25px;
    height: 3px;
    background-color: #333;
    margin: 2px 0;
    transition: all 0.3s;
  }
  
  @media (max-width: 768px) {
    .nav-toggle {
      display: flex;
    }
    
    .main-nav {
      position: fixed;
      top: 70px;
      left: 0;
      width: 100%;
      background-color: #fff;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
      padding: 20px;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s;
    }
    
    .main-nav.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
    
    .main-nav ul {
      flex-direction: column;
    }
    
    .main-nav li {
      margin: 15px 0;
      margin-left: 0;
    }
  }
  </style>