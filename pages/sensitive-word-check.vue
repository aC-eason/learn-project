<template>
    
  <div class="app-container">
    <Header />
    <div class="main-wrapper">
      <!-- Header Section -->
      <header class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">
            Sensitive Word Detection Tool
          </h1>
          <p class="hero-subtitle">
            AI-powered content moderation system that instantly detects sensitive words and ensures your content meets safety standards. Fast, accurate, and secure.
          </p>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="detection-card">
          <!-- Input Section -->
          <div class="input-section">
            <label for="textInput" class="input-label">
              Enter Text for Analysis (Max 200 characters)
            </label>
            <div class="textarea-wrapper">
              <textarea
                id="textInput"
                v-model="inputText"
                :disabled="isLoading"
                class="text-input"
                placeholder="Enter the text content you want to analyze for sensitive words..."
                maxlength="200"
              ></textarea>
              <div class="char-counter">
                {{ inputText.length }}/200
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="action-section">
            <button
              @click="checkSensitiveWord"
              :disabled="!inputText.trim() || isLoading"
              class="btn btn-primary"
            >
              <span v-if="isLoading" class="loading-spinner"></span>
              {{ isLoading ? 'Analyzing...' : 'Analyze Text' }}
            </button>
            
            <button
              @click="clearAll"
              :disabled="isLoading"
              class="btn btn-secondary"
            >
              Clear Content
            </button>
          </div>

          <!-- Results Section -->
          <div v-if="showResult" class="results-section">
            <h3 class="results-title">Analysis Results</h3>
            
            <!-- Success Result -->
            <div v-if="result && !result.has_sensitive_word" class="result-card success">
              <div class="result-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="result-content">
                <h4 class="result-status">Content Approved</h4>
                <p class="result-message">Your text is safe and contains no sensitive words</p>
              </div>
            </div>

            <!-- Warning Result -->
            <div v-else-if="result && result.has_sensitive_word" class="result-card warning">
              <div class="result-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
              <div class="result-content">
                <h4 class="result-status">Sensitive Word Detected</h4>
                <p class="result-message">The following sensitive word was found in your text:</p>
                <div class="sensitive-word-tag">
                  {{ result.sensitive_word }}
                </div>
              </div>
            </div>

            <!-- Error Result -->
            <div v-else-if="error" class="result-card error">
              <div class="result-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="result-content">
                <h4 class="result-status">Analysis Failed</h4>
                <p class="result-message">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <section class="features-section">
          <h2 class="section-title">Why Choose Our Detection Tool?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon lightning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="feature-title">Real-time Analysis</h3>
              <p class="feature-description">Instant detection and analysis of sensitive content with lightning-fast response times</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon accuracy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="feature-title">High Accuracy</h3>
              <p class="feature-description">Advanced AI algorithms ensure precise detection with over 95% accuracy rate</p>
            </div>

            <div class="feature-card">
              <div class="feature-icon security">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="feature-title">Secure & Private</h3>
              <p class="feature-description">Your data is encrypted and never stored. Complete privacy protection guaranteed</p>
            </div>
          </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq-section">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <div class="faq-container">
            <div class="faq-item">
              <h3 class="faq-question">What types of sensitive words can be detected?</h3>
              <p class="faq-answer">Our tool detects various categories including political sensitive content, illegal content, inappropriate language, and other potentially harmful words.</p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">How accurate is the detection system?</h3>
              <p class="faq-answer">Our AI-powered system maintains over 95% accuracy rate, continuously improving through advanced natural language processing techniques.</p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">Is my input data stored or saved?</h3>
              <p class="faq-answer">No, we do not store any user input data. All content is processed in real-time and immediately discarded after analysis.</p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">Can I use this tool for commercial purposes?</h3>
              <p class="faq-answer">Yes, our tool is suitable for both personal and commercial use, helping businesses maintain content compliance and safety standards.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Header from '~/components/Header.vue'

// State management
const inputText = ref('')
const isLoading = ref(false)
const showResult = ref(false)
const result = ref(null)
const error = ref('')

// Reusable API service class
class ApiService {
  constructor(baseURL = '') {
    this.baseURL = baseURL
  }

  async request(url, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (err) {
      console.error('API request failed:', err)
      throw new Error(err.message || 'Network request failed')
    }
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    })
  }

  async get(url, options = {}) {
    return this.request(url, {
      method: 'GET',
      ...options
    })
  }
}

// Initialize API service
const apiService = new ApiService()

// Sensitive word detection method
const checkSensitiveWord = async () => {
  if (!inputText.value.trim()) {
    return
  }

  isLoading.value = true
  showResult.value = false
  result.value = null
  error.value = ''

  try {
    const response = await apiService.post('https://kithubs.com/api/text/sensitiveWord/check', {
      content: inputText.value.trim()
    })

    if (response.status === 200) {
      result.value = {
        has_sensitive_word: response.has_sensitive_word,
        sensitive_word: response.sensitive_word
      }
    } else {
      throw new Error('Invalid response from server')
    }
  } catch (err) {
    error.value = 'Failed to analyze content. Please try again later.'
    console.error('Sensitive word check failed:', err)
  } finally {
    isLoading.value = false
    showResult.value = true
  }
}

// Clear all content
const clearAll = () => {
  inputText.value = ''
  showResult.value = false
  result.value = null
  error.value = ''
}
</script>

<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
}

.main-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  text-align: center;
  padding: 80px 0 60px;
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.8s ease-out;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

/* Main Content */
.main-content {
  padding-bottom: 80px;
}

.detection-card {
  background: white;
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  margin-bottom: 80px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

/* Input Section */
.input-section {
  margin-bottom: 32px;
}

.input-label {
  display: block;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.textarea-wrapper {
  position: relative;
}

.text-input {
  width: 100%;
  height: 160px;
  padding: 20px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 1rem;
  resize: none;
  transition: all 0.3s ease;
  font-family: inherit;
  background: #fafafa;
}

.text-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  background: white;
}

.text-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.7;
}

.char-counter {
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 0.875rem;
  color: #6b7280;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 8px;
}

/* Action Section */
.action-section {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.btn {
  padding: 16px 32px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 160px;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  flex: 1;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover:not(:disabled) {
  background: #e5e7eb;
  transform: translateY(-1px);
}

.loading-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Results Section */
.results-section {
  border-top: 1px solid #e5e7eb;
  padding-top: 32px;
}

.results-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 24px;
}

.result-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-radius: 16px;
  border: 2px solid;
}

.result-card.success {
  background: #f0fdf4;
  border-color: #bbf7d0;
}

.result-card.warning {
  background: #fef2f2;
  border-color: #fecaca;
}

.result-card.error {
  background: #fffbeb;
  border-color: #fed7aa;
}

.result-icon {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.result-icon svg {
  width: 100%;
  height: 100%;
}

.success .result-icon {
  color: #16a34a;
}

.warning .result-icon {
  color: #dc2626;
}

.error .result-icon {
  color: #d97706;
}

.result-content {
  flex: 1;
}

.result-status {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.success .result-status {
  color: #16a34a;
}

.warning .result-status {
  color: #dc2626;
}

.error .result-status {
  color: #d97706;
}

.result-message {
  color: #374151;
  margin-bottom: 16px;
}

.sensitive-word-tag {
  display: inline-block;
  background: #fee2e2;
  color: #991b1b;
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 600;
  border: 1px solid #fecaca;
}

/* Features Section */
.features-section {
  margin-bottom: 80px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: white;
  margin-bottom: 48px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 32px;
}

.feature-card {
  background: white;
  padding: 32px;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 24px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon.lightning {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.feature-icon.accuracy {
  background: linear-gradient(135deg, #10b981, #047857);
  color: white;
}

.feature-icon.security {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.feature-icon svg {
  width: 32px;
  height: 32px;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 12px;
}

.feature-description {
  color: #6b7280;
  line-height: 1.6;
}

/* FAQ Section */
.faq-section {
  background: white;
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #e5e7eb;
  padding: 24px 0;
}

.faq-item:last-child {
  border-bottom: none;
}

.faq-question {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 12px;
}

.faq-answer {
  color: #6b7280;
  line-height: 1.7;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .main-wrapper {
    padding: 0 16px;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.125rem;
  }
  
  .detection-card {
    padding: 32px 24px;
  }
  
  .action-section {
    flex-direction: column;
  }
  
  .btn {
    min-width: auto;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .faq-section {
    padding: 32px 24px;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 0 40px;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .detection-card {
    padding: 24px 16px;
  }
  
  .text-input {
    height: 120px;
    padding: 16px;
  }
}
</style>