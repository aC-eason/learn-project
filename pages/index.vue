<template>
  <div class="page-wrapper">
    <Header />
    <main class="main-content">
      <!-- Hero Section -->
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <div class="hero-text">
              <h1 class="hero-title">
                Convenient & Efficient<br />
                <span class="highlight">Web Toolkit</span>
              </h1>
              <p class="hero-description">
                Providing various commonly used online tools to improve your work efficiency
              </p>
              <div class="hero-buttons">
                <button class="btn btn-primary">Get Started</button>
                <button class="btn btn-secondary">Learn More</button>
              </div>
            </div>
            <div class="hero-image">
              <div class="image-placeholder">
                <div class="floating-card card-1"></div>
                <div class="floating-card card-2"></div>
                <div class="floating-card card-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="categories">
        <div class="container">
          <h2 class="section-title">
            What We <span class="highlight">Support</span>
          </h2>
          <div class="category-grid">
            <div class="category-card" v-for="category in categories" :key="category.id">
              <div class="category-icon">
                <component :is="category.icon" />
              </div>
              <h3 class="category-title">{{ category.title }}</h3>
              <p class="category-description">{{ category.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Popular Tools Section -->
      <section class="popular-tools">
        <div class="container">
          <h2 class="section-title">
            Popular <span class="highlight">Tools</span>
          </h2>
          <div class="tools-grid">
            <div class="tool-card" v-for="tool in popularTools" :key="tool.id">
              <div class="tool-icon">
                <component :is="tool.icon" />
              </div>
              <h3 class="tool-title">{{ tool.title }}</h3>
              <p class="tool-description">{{ tool.description }}</p>
              <button class="tool-button">Try Now</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="container">
          <div class="features-content">
            <div class="features-text">
              <h2 class="section-title">
                Why Choose <span class="highlight">Our Tools</span>
              </h2>
              <div class="features-list">
                <div class="feature-item" v-for="feature in features" :key="feature.id">
                  <div class="feature-icon">
                    <component :is="feature.icon" />
                  </div>
                  <div class="feature-content">
                    <h4>{{ feature.title }}</h4>
                    <p>{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="features-image">
              <div class="stats-card">
                <div class="stat">
                  <span class="stat-number">50K+</span>
                  <span class="stat-label">Active Users</span>
                </div>
                <div class="stat">
                  <span class="stat-number">10M+</span>
                  <span class="stat-label">Weekly Operations</span>
                </div>
                <div class="stat">
                  <span class="stat-number">99.9%</span>
                  <span class="stat-label">Uptime</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
</template>

<script setup>

useHead({
  title: 'Web Toolkit - Convenient & Efficient Online Tools',
  meta: [
    { name: 'description', content: 'Providing various commonly used online tools to improve your work efficiency' }
  ]
})

// Icon components (you can replace these with your preferred icon library)
const FormatIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  width: '48',
  height: '48'
}, [
  h('path', { d: 'M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z' })
])

const DownloadIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  width: '48',
  height: '48'
}, [
  h('path', { d: 'M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z' })
])

const TextIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  width: '48',
  height: '48'
}, [
  h('path', { d: 'M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,7.87 17.26,7.87H5.74C5.21,7.87 4.75,7.74 4.3,8.61L3.34,8.35L4.5,4H18.5M6.31,10H17.69L16.5,20H7.5L6.31,10Z' })
])

const ImageIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  width: '48',
  height: '48'
}, [
  h('path', { d: 'M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z' })
])

const CheckIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  width: '24',
  height: '24'
}, [
  h('path', { d: 'M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z' })
])

const SpeedIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  width: '24',
  height: '24'
}, [
  h('path', { d: 'M12,16A3,3 0 0,1 9,13C9,11.88 9.61,10.9 10.5,10.39L20.21,4.77L14.68,14.35C14.18,15.33 13.17,16 12,16M12,3C13.81,3 15.5,3.5 16.97,4.32L14.87,5.53C14,5.19 13,5 12,5A8,8 0 0,0 4,13C4,15.21 4.89,17.21 6.34,18.65H6.35C6.74,19.04 6.74,19.67 6.35,20.06C5.96,20.45 5.33,20.45 4.94,20.06C3.1,18.22 2,15.76 2,13A10,10 0 0,1 12,3Z' })
])

const SecurityIcon = () => h('svg', {
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  width: '24',
  height: '24'
}, [
  h('path', { d: 'M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V16H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z' })
])

// Data
const categories = ref([
  {
    id: 1,
    title: 'Download',
    description: 'Download videos, images and files from various platforms',
    icon: DownloadIcon
  },
  {
    id: 2,
    title: 'Text',
    description: 'Text processing, conversion and manipulation tools',
    icon: TextIcon
  },
  {
    id: 3,
    title: 'Image',
    description: 'Image editing, compression and conversion utilities',
    icon: ImageIcon
  }
])

const popularTools = ref([
  {
    id: 1,
    title: 'JSON Formatter',
    description: 'Beautify and validate JSON data for easy reading and editing',
    icon: FormatIcon
  },
  {
    id: 2,
    title: 'Image Compressor',
    description: 'Optimize image size while maintaining good visual quality',
    icon: ImageIcon
  },
  {
    id: 3,
    title: 'Video Downloader',
    description: 'Download videos from popular platforms quickly and easily',
    icon: DownloadIcon
  }
])

const features = ref([
  {
    id: 1,
    title: 'Fast & Reliable',
    description: 'Lightning-fast processing with 99.9% uptime guarantee',
    icon: SpeedIcon
  },
  {
    id: 2,
    title: 'Secure & Private',
    description: 'Your data is processed securely and never stored on our servers',
    icon: SecurityIcon
  },
  {
    id: 3,
    title: 'Easy to Use',
    description: 'Intuitive interface designed for both beginners and professionals',
    icon: CheckIcon
  }
])
</script>

<style scoped>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-content {
  background: #ffffff;
}

/* Hero Section */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 0;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
}

.hero-title .highlight {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 40px;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 20px;
}

.btn {
  padding: 16px 32px;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.hero-image {
  position: relative;
  height: 400px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: float 6s ease-in-out infinite;
}

.card-1 {
  width: 80px;
  height: 60px;
  top: 20%;
  left: 15%;
  animation-delay: 0s;
}

.card-2 {
  width: 100px;
  height: 80px;
  top: 50%;
  right: 20%;
  animation-delay: 2s;
}

.card-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 25%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

/* Section Styles */
section {
  padding: 100px 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  color: #2d3748;
}

.section-title .highlight {
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Categories Section */
.categories {
  background: #f8fafc;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
}

.category-card {
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.category-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #2d3748;
}

.category-description {
  color: #718096;
  line-height: 1.6;
}

/* Popular Tools Section */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
}

.tool-card {
  background: white;
  padding: 40px 30px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #e2e8f0;
  position: relative;
  overflow: hidden;
}

.tool-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.5s;
}

.tool-card:hover::before {
  left: 100%;
}

.tool-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.tool-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 24px;
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.tool-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: #2d3748;
}

.tool-description {
  color: #718096;
  line-height: 1.6;
  margin-bottom: 24px;
}

.tool-button {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tool-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Features Section */
.features {
  background: #f8fafc;
}

.features-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.features-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.feature-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.feature-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.feature-content h4 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #2d3748;
}

.feature-content p {
  color: #718096;
  line-height: 1.6;
}

.stats-card {
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.stat {
  text-align: center;
  padding: 20px;
  border-radius: 12px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content,
  .features-content {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .category-grid,
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }
  
  section {
    padding: 60px 0;
  }
  
  .hero {
    padding: 80px 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .category-card,
  .tool-card {
    padding: 30px 20px;
  }
}
</style>