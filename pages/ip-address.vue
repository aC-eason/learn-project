<template>
  <div class="ip-lookup-container">
    <!-- SEO Meta Tags -->
    <Head>
      <title>IP Address Lookup - Find IP Location & Details</title>
      <meta name="description" content="Free IP address lookup tool. Find location, ISP, and detailed information for any IP address. Fast, accurate, and easy to use." />
      <meta name="keywords" content="IP lookup, IP address, geolocation, IP tracker, find IP location" />
      <meta property="og:title" content="IP Address Lookup Tool" />
      <meta property="og:description" content="Find detailed information about any IP address including location, ISP, and more." />
      <meta property="og:type" content="website" />
    </Head>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <h1 class="hero-title">IP Address Lookup</h1>
        <p class="hero-subtitle">
          Discover detailed information about any IP address including location, ISP, and network details
        </p>
        
        <!-- Search Form -->
        <div class="search-form">
          <div class="input-group">
            <input
              v-model="ipInput"
              type="text"
              placeholder="Enter IP address (e.g., 8.8.8.8 or 2001:4860:4860::8888)"
              class="ip-input"
              :class="{ 'error': inputError }"
              @keyup.enter="lookupIP"
            />
            <button 
              @click="lookupIP" 
              :disabled="loading || !ipInput.trim()"
              class="lookup-btn"
            >
              <span v-if="loading" class="loading-spinner"></span>
              {{ loading ? 'Looking up...' : 'Lookup' }}
            </button>
          </div>
          <p v-if="inputError" class="error-message">{{ inputError }}</p>
        </div>
      </div>
    </section>

    <!-- Results Section -->
    <section v-if="ipData || error" class="results-section">
      <div class="container">
        <!-- Error State -->
        <div v-if="error" class="error-card">
          <h3>Error</h3>
          <p>{{ error }}</p>
        </div>

        <!-- Success State -->
        <div v-if="ipData" class="results-grid">
          <!-- Basic Information -->
          <div class="info-card">
            <h3 class="card-title">Basic Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">IP Address:</span>
                <span class="value">{{ ipData.ip }}</span>
              </div>
              <div class="info-item">
                <span class="label">Location:</span>
                <span class="value">{{ ipData.ip_location }}</span>
              </div>
              <div class="info-item">
                <span class="label">Country:</span>
                <span class="value">{{ ipData.country }}</span>
              </div>
            </div>
          </div>

          <!-- Network Information -->
          <div class="info-card">
            <h3 class="card-title">Network Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="label">ISP/Provider:</span>
                <span class="value">{{ ipData.ip_provider }}</span>
              </div>
              <div class="info-item">
                <span class="label">IP Type:</span>
                <span class="value">{{ getIPType(ipData.ip) }}</span>
              </div>
            </div>
          </div>

          <!-- Additional Details -->
          <div class="info-card full-width">
            <h3 class="card-title">Summary</h3>
            <p class="summary-text">
              The IP address <strong>{{ ipData.ip }}</strong> is located in 
              <strong>{{ ipData.ip_location }}</strong> and is provided by 
              <strong>{{ ipData.ip_provider }}</strong>. This is a 
              <strong>{{ getIPType(ipData.ip) }}</strong> address.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title">Why Use Our IP Lookup Tool?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🌍</div>
            <h3>Accurate Location</h3>
            <p>Get precise geographical information for any IP address worldwide</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>Privacy Focused</h3>
            <p>We don't store your search queries or personal information</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Fast Results</h3>
            <p>Get instant results with our optimized lookup system</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Works perfectly on all devices and screen sizes</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {getIpInfo } from "@/services/apiServices";

// Reactive data
const ipInput = ref('')
const ipData = ref(null)
const loading = ref(false)
const error = ref('')
const inputError = ref('')

// IP validation regex
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::1$|^::$/

// Validate IP address
const validateIP = (ip) => {
  if (!ip || !ip.trim()) {
    return 'Please enter an IP address'
  }
  
  const trimmedIP = ip.trim()
  if (!ipv4Regex.test(trimmedIP) && !ipv6Regex.test(trimmedIP)) {
    return 'Please enter a valid IPv4 or IPv6 address'
  }
  
  return null
}

// Get IP type
const getIPType = (ip) => {
  if (ipv4Regex.test(ip)) return 'IPv4'
  if (ipv6Regex.test(ip)) return 'IPv6'
  return 'Unknown'
}

const lookupIP = async () => {
  // Reset states
  error.value = ''
  inputError.value = ''
  ipData.value = null
  
  // Validate input
  const validationError = validateIP(ipInput.value)
  if (validationError) {
    inputError.value = validationError
    return
  }
  
  loading.value = true
  
  try {
    const result = await getIpInfo(ipInput.value.trim())
   
    if (result.status === 200 && result.message === 'success' && result.data) {
      ipData.value = result.data
    } else {
      throw new Error(result.message || 'Failed to lookup IP address')
    }
  } catch (err) {
    console.error('IP lookup error:', err)
    error.value = err.message || 'Failed to lookup IP address. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Reset and base styles */
* {
  box-sizing: border-box;
}

.ip-lookup-container {
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Search Form */
.search-form {
  max-width: 600px;
  margin: 0 auto;
}

.input-group {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
}

.ip-input {
  flex: 1;
  padding: 16px 20px;
  font-size: 16px;
  border: 2px solid transparent;
  border-radius: 12px;
  background: white;
  transition: all 0.3s ease;
}

.ip-input:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.ip-input.error {
  border-color: #ef4444;
}

.lookup-btn {
  padding: 16px 32px;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  justify-content: center;
}

.lookup-btn:hover:not(:disabled) {
  background: #4338ca;
  transform: translateY(-1px);
}

.lookup-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.loading-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  color: #ef4444;
  font-size: 14px;
  margin: 0;
  text-align: left;
}

/* Results Section */
.results-section {
  padding: 60px 0;
  background: #f8fafc;
}

.error-card {
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  color: #dc2626;
}

.error-card h3 {
  margin: 0 0 8px 0;
  font-size: 1.25rem;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.info-card {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.1);
}

.info-card.full-width {
  grid-column: 1 / -1;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1f2937;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 12px;
}

.info-grid {
  display: grid;
  gap: 16px;
}

.info-item {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #f3f4f6;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: #6b7280;
}

.value {
  color: #1f2937;
  font-weight: 500;
}

.summary-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #4b5563;
  margin: 0;
}

/* Features Section */
.features-section {
  padding: 80px 0;
  background: white;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1f2937;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.feature-card {
  text-align: center;
  padding: 32px 24px;
  border-radius: 16px;
  background: #f8fafc;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.feature-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  margin: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .lookup-btn {
    width: 100%;
  }
  
  .info-item {
    grid-template-columns: 1fr;
    gap: 4px;
  }
  
  .label {
    font-size: 14px;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .results-section {
    padding: 40px 0;
  }
  
  .features-section {
    padding: 60px 0;
  }
  
  .info-card {
    padding: 24px;
  }
}
</style>
