<template>
    <footer class="footer">
      <div class="container">
        <div class="footer-top">
          <div class="footer-logo">
            <h2>Maya<span>Tools</span></h2>
            <p>提供各种实用的在线工具，帮助用户提高工作效率，简化日常任务。</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h3>快速链接</h3>
              <ul>
                <li><a href="/">首页</a></li>
                <li><a href="/tools">工具集</a></li>
                <li><a href="/guide">使用指南</a></li>
                <li><a href="/about">关于我们</a></li>
              </ul>
            </div>
            <div class="link-group">
              <h3>热门工具</h3>
              <ul>
                <li><a href="/tools/json">JSON 格式化</a></li>
                <li><a href="/tools/image">图片压缩</a></li>
                <li><a href="/tools/code">代码美化</a></li>
                <li><a href="/tools/color">颜色选择器</a></li>
              </ul>
            </div>
            <div class="link-group">
              <h3>联系我们</h3>
              <ul>
                <li><a href="mailto:contact@mayatools.com">邮箱: contact@mayatools.com</a></li>
                <li><a href="#">微信: MayaTools</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© {{ currentYear }} Maya Tools. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  // 计算当前年份
  const currentYear = computed(() => new Date().getFullYear())
  </script>
  
  <style scoped>
  .footer {
    background-color: #2c3e50;
    color: white;
    padding: 60px 0 20px;
  }
  
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .footer-top {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }
  
  .footer-logo {
    flex: 1;
    min-width: 250px;
    margin-bottom: 30px;
  }
  
  .footer-logo h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 15px;
  }
  
  .footer-logo span {
    color: #4a9ced;
  }
  
  .footer-logo p {
    color: #ccc;
    max-width: 300px;
  }
  
  .footer-links {
    flex: 2;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .link-group {
    flex: 1;
    min-width: 150px;
    margin-bottom: 30px;
  }
  
  .link-group h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
    color: white;
  }
  
  .link-group ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .link-group li {
    margin-bottom: 10px;
  }
  
  .link-group a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .link-group a:hover {
    color: #4a9ced;
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .footer-bottom p {
    color: #aaa;
    font-size: 14px;
    margin: 0;
  }
  
  @media (max-width: 768px) {
    .footer-top {
      flex-direction: column;
    }
    
    .footer-logo {
      text-align: center;
      margin-bottom: 30px;
    }
    
    .footer-logo p {
      margin: 0 auto;
    }
    
    .footer-links {
      flex-direction: column;
    }
    
    .link-group {
      text-align: center;
    }
  }
  </style>