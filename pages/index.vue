<template>
  <div>
    <Header />
    <main>
      <!-- 英雄区域 -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h2>便捷高效的<br /><span>Web工具集</span></h2>
            <p>提供各种常用的在线工具，提高您的工作效率</p>
          </div>
          <div class="hero-image">
            <div class="image-placeholder"></div>
          </div>
        </div>
      </section>

      <!-- 工具分类区域 -->
      <section class="categories">
        <div class="container">
          <h2 class="section-title">工具<span>分类</span></h2>
          <div class="category-grid">
            <div class="category-card">
              <div class="category-icon format-icon"></div>
              <h3>格式转换</h3>
            </div>
            <div class="category-card">
              <div class="category-icon image-icon"></div>
              <h3>图像处理</h3>
            </div>
            <div class="category-card">
              <div class="category-icon code-icon"></div>
              <h3>开发工具</h3>
            </div>
            <div class="category-card">
              <div class="category-icon text-icon"></div>
              <h3>文本工具</h3>
            </div>
          </div>
        </div>
      </section>

      <!-- 热门工具区域 -->
      <section class="popular-tools">
        <div class="container">
          <h2 class="section-title">热门<span>工具</span></h2>
          <div class="tools-grid">
            <div class="tool-card">
              <div class="tool-icon"></div>
              <h3>JSON 格式化</h3>
              <p>美化和验证 JSON 数据，便于阅读和编辑</p>
            </div>
            <div class="tool-card">
              <div class="tool-icon"></div>
              <h3>图片压缩</h3>
              <p>优化图片大小，保持良好的视觉质量</p>
            </div>
            <div class="tool-card">
              <div class="tool-icon"></div>
              <h3>代码美化</h3>
              <p>格式化各种编程语言的代码，提高可读性</p>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>
  

<script setup>
</script>
  
  <style>
/* 样式保持不变 */
</style>