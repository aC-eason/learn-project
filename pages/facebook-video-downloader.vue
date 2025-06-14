<template>
  <div class="app-container">
    <Header />

    <div class="main-wrapper">
      <!-- Header Section -->
      <header class="hero-section">
        <div class="hero-content">
          <div class="hero-icon">
            <svg
              t="1749911527188"
              class="icon"
              viewBox="0 0 1025 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3185"
              width="40"
              height="40"
            >
              <path
                d="M512.040873 0c-282.312218 0-512.040873 229.667345-512.040873 512s229.728655 512 512.040873 512 512.040873-229.667345 512.040873-512-229.728655-512-512.040873-512zM512.040873 989.891191c-263.510478 0-477.870754-214.40115-477.870754-477.891191s214.360276-477.891191 477.870754-477.891191 477.870754 214.40115 477.870754 477.891191-214.360276 477.891191-477.870754 477.891191zM623.809045 224.619487l-85.200495 0c-108.498304-1.083144-122.374805 66.071768-122.374805 138.744581l0 52.84924-47.903564 0c-9.421307-1.083144-17.08506 6.539736-15.961043 15.961043l0 95.807129c-1.124017 9.421307 6.539736 17.044186 15.961043 15.961043l47.903564 0 0 239.497386c-0.98096 9.421307 6.641919 17.044186 16.063226 15.961043l97.544246 0c9.421307 1.083144 17.044186-6.539736 14.060432-15.961043l0.06131-239.497386 79.82565 0c9.421307 1.083144 17.08506-6.539736 15.961043-15.961043l0-95.807129c1.124017-9.421307-6.539736-17.044186-15.961043-15.961043l-79.927833 0 0.102183-47.903564c3.106374-20.395801 3.106374-17.08506 22.030735-15.961043l57.120505 0c4.434758-0.98096 9.15563-0.449607 12.486808-3.678601s5.231789-7.622879 4.128208-12.302878l0-95.807129c1.144454-9.421307-6.519299-17.044186-15.940606-15.961043zM606.723985 318.628188l-40.035445-1.532751c-49.599808 0-53.748453 26.9151-53.748453 54.484174l-0.12262 60.553866c0 4.536942 1.798427 8.869517 4.986549 12.098511 3.188121 3.188121 7.541133 4.986549 12.078074 4.986549l77.986349 0 0 61.69832-77.925039 0c-9.421307 0-17.044186 7.622879-17.08506 17.044186l-0.040873 239.517822-64.641201 0 0-239.497386c0-9.421307-6.417116-17.044186-15.879296-17.044186l-47.985311 0 0-61.69832 47.985311 0c4.536942 0 8.869517-1.777991 12.078074-4.986549 3.188121-3.228995 3.760348-7.561569 3.760348-12.098511l0-68.810282c0-71.58967 14.469165-105.698479 90.432284-105.698479l68.115435 0 0 60.983036z"
                fill="#e6e6e6"
                p-id="3186"
              ></path>
            </svg>
          </div>
          <h1 class="hero-title">Facebook Video Downloader</h1>
          <p class="hero-subtitle">
            Download Facebook videos in HD and SD quality instantly. Fast, free,
            and secure video downloader for all your favorite FB content.
          </p>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="downloader-card">
          <!-- Input Section -->
          <div class="input-section">
            <label for="videoUrl" class="input-label">
              <svg
                class="label-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                ></path>
              </svg>
              Facebook Video URL
            </label>
            <div class="input-wrapper">
              <input
                id="videoUrl"
                v-model="videoUrl"
                :disabled="isLoading"
                type="url"
                class="url-input"
                placeholder="Paste Facebook video URL here (e.g., https://www.facebook.com/watch?v=...)"
              />
              <div class="input-decoration"></div>
            </div>
            <p class="input-hint">
              Copy and paste the Facebook video URL you want to download
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="action-section">
            <button
              @click="downloadVideo"
              :disabled="!isValidUrl || isLoading"
              class="btn btn-primary"
            >
              <span v-if="isLoading" class="loading-spinner"></span>
              <svg
                v-else
                class="btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                ></path>
              </svg>
              {{ isLoading ? "Processing..." : "Get Download Links" }}
            </button>

            <button
              @click="clearAll"
              :disabled="isLoading"
              class="btn btn-secondary"
            >
              <svg
                class="btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
              Clear
            </button>
          </div>

          <!-- Results Section -->
          <div v-if="showResult" class="results-section">
            <!-- Success Result -->
            <div
              v-if="result && result.status === 200"
              class="result-card success"
            >
              <div class="result-header">
                <div class="result-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div class="result-info">
                  <h3 class="result-title">Video Ready for Download</h3>
                  <p class="video-title">{{ result.data.title }}</p>
                </div>
              </div>

              <div class="download-options">
                <div class="download-item">
                  <div class="quality-info">
                    <div class="quality-badge hd">HD</div>
                    <span class="quality-label">High Definition</span>
                  </div>
                  <a
                    :href="result.data.hd_url"
                    download
                    class="download-btn hd-btn"
                    target="_blank"
                  >
                    <svg
                      class="download-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      ></path>
                    </svg>
                    Download HD
                  </a>
                </div>

                <div class="download-item">
                  <div class="quality-info">
                    <div class="quality-badge sd">SD</div>
                    <span class="quality-label">Standard Definition</span>
                  </div>
                  <a
                    :href="result.data.sd_url"
                    download
                    class="download-btn sd-btn"
                    target="_blank"
                  >
                    <svg
                      class="download-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      ></path>
                    </svg>
                    Download SD
                  </a>
                </div>
              </div>
            </div>

            <!-- Error Result -->
            <div
              v-else-if="result && result.status === 404"
              class="result-card error"
            >
              <div class="result-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div class="result-content">
                <h4 class="result-status">Video Not Found</h4>
                <p class="result-message">
                  The Facebook video URL is invalid or the video is not
                  accessible. Please check the URL and try again.
                </p>
                <div class="error-tips">
                  <h5>Tips:</h5>
                  <ul>
                    <li>Make sure the video is public</li>
                    <li>Check if the URL is complete and correct</li>
                    <li>Try copying the URL again from Facebook</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- General Error -->
            <div v-else-if="error" class="result-card error">
              <div class="result-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div class="result-content">
                <h4 class="result-status">Download Failed</h4>
                <p class="result-message">{{ error }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- How to Use Section -->
        <section class="how-to-section">
          <h2 class="section-title">How to Download Facebook Videos</h2>
          <div class="steps-container">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 class="step-title">Copy Video URL</h3>
                <p class="step-description">
                  Go to Facebook, find the video you want to download, and copy
                  its URL from the address bar or share menu.
                </p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 class="step-title">Paste URL</h3>
                <p class="step-description">
                  Paste the Facebook video URL into the input field above and
                  click "Get Download Links".
                </p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 class="step-title">Choose Quality & Download</h3>
                <p class="step-description">
                  Select your preferred video quality (HD or SD) and click the
                  download button to save the video to your device.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="features-section">
          <h2 class="section-title">Why Choose Our FB Video Downloader?</h2>
          <div class="features-grid">
            <!-- <div class="feature-card">
              <div class="feature-icon quality">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v1M7 4V3a1 1 0 011-1h8a1 1 0 011 1v1m-9 4v10a2 2 0 002 2h6a2 2 0 002-2V8M9 8h6"></path>
                </svg>
              </div>
              <h3 class="feature-title">HD Quality Downloads</h3>
              <p class="feature-description">Download Facebook videos in original HD quality without any compression or quality loss.</p>
            </div> -->

            <div class="feature-card">
              <div class="feature-icon speed">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <h3 class="feature-title">Lightning Fast</h3>
              <p class="feature-description">
                Get download links instantly with our optimized processing
                system. No waiting, no delays.
              </p>
            </div>

            <div class="feature-card">
              <div class="feature-icon security">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <h3 class="feature-title">100% Safe & Secure</h3>
              <p class="feature-description">
                No malware, no ads, no registration required. Your privacy and
                security are our top priority.
              </p>
            </div>

            <div class="feature-card">
              <div class="feature-icon free">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
              </div>
              <h3 class="feature-title">Completely Free</h3>
              <p class="feature-description">
                Download unlimited Facebook videos without any cost. No hidden
                fees or premium subscriptions.
              </p>
            </div>
          </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq-section">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <div class="faq-container">
            <div class="faq-item">
              <h3 class="faq-question">
                Is it legal to download Facebook videos?
              </h3>
              <p class="faq-answer">
                You should only download videos that you have permission to
                download, such as your own videos or videos where you have
                explicit permission from the owner.
              </p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">What video formats are supported?</h3>
              <p class="faq-answer">
                Our tool downloads Facebook videos in MP4 format, which is
                compatible with most devices and media players.
              </p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">
                Can I download private Facebook videos?
              </h3>
              <p class="faq-answer">
                No, our tool can only download public Facebook videos. Private
                videos require special permissions and cannot be accessed.
              </p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">Do you store the downloaded videos?</h3>
              <p class="faq-answer">
                No, we don't store any videos on our servers. The download links
                are generated in real-time and expire after a certain period.
              </p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">
                Why can't I download some Facebook videos?
              </h3>
              <p class="faq-answer">
                Some videos may be restricted, private, or have special
                protection settings that prevent downloading. Make sure the
                video is public and accessible.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// State management
const videoUrl = ref("");
const isLoading = ref(false);
const showResult = ref(false);
const result = ref(null);
const error = ref("");

// Computed properties
const isValidUrl = computed(() => {
  if (!videoUrl.value) return false;
  try {
    const url = new URL(videoUrl.value);
    return (
      url.hostname.includes("facebook.com") || url.hostname.includes("fb.com")
    );
  } catch {
    return false;
  }
});

// Reusable API service class
class ApiService {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  async request(url, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error("API request failed:", err);
      throw new Error(err.message || "Network request failed");
    }
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }
}

// Initialize API service
const apiService = new ApiService();

// Download video method
const downloadVideo = async () => {
  if (!isValidUrl.value) {
    error.value = "Please enter a valid Facebook video URL";
    showResult.value = true;
    return;
  }

  isLoading.value = true;
  showResult.value = false;
  result.value = null;
  error.value = "";

  try {
    const response = await apiService.post(
      "https://kithubs.com/api/video/facebook/download",
      {
        url: videoUrl.value.trim(),
      }
    );

    result.value = response;
  } catch (err) {
    error.value =
      "Failed to process video. Please check the URL and try again.";
    console.error("Video download failed:", err);
  } finally {
    isLoading.value = false;
    showResult.value = true;
  }
};

// Clear all content
const clearAll = () => {
  videoUrl.value = "";
  showResult.value = false;
  result.value = null;
  error.value = "";
};
</script>

<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
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

.hero-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  animation: float 3s ease-in-out infinite;
}

.hero-icon svg {
  width: 40px;
  height: 40px;
  stroke-width: 1.5;
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

.downloader-card {
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
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.label-icon {
  width: 20px;
  height: 20px;
  color: #1e3c72;
}

.input-wrapper {
  position: relative;
  margin-bottom: 8px;
}

.url-input {
  width: 100%;
  padding: 20px 24px;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
  background: #fafafa;
}

.url-input:focus {
  outline: none;
  border-color: #1e3c72;
  box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.1);
  background: white;
}

.url-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.7;
}

.input-decoration {
  position: absolute;
  bottom: 0;
  left: 24px;
  right: 24px;
  height: 2px;
  background: linear-gradient(90deg, #1e3c72, #2a5298);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.url-input:focus + .input-decoration {
  transform: scaleX(1);
}

.input-hint {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
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
  min-width: 180px;
  justify-content: center;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.btn-primary {
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: white;
  flex: 1;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(30, 60, 114, 0.3);
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

.result-card {
  border-radius: 16px;
  padding: 24px;
  border: 2px solid;
}

.result-card.success {
  background: linear-gradient(135deg, #f0fdf4, #dcfce7);
  border-color: #bbf7d0;
}

.result-card.error {
  background: linear-gradient(135deg, #fef2f2, #fee2e2);
  border-color: #fecaca;
}

.result-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.result-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.success .result-icon {
  background: #16a34a;
  color: white;
}

.error .result-icon {
  background: #dc2626;
  color: white;
}

.result-icon svg {
  width: 24px;
  height: 24px;
}

.result-info {
  flex: 1;
}

.result-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #16a34a;
  margin: 0 0 8px 0;
}

.video-title {
  font-size: 1rem;
  color: #374151;
  margin: 0;
  font-weight: 500;
}

.download-options {
  display: grid;
  gap: 16px;
}

.download-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.quality-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.quality-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.quality-badge.hd {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.quality-badge.sd {
  background: linear-gradient(135deg, #10b981, #047857);
  color: white;
}

.quality-label {
  font-weight: 500;
  color: #374151;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.download-icon {
  width: 18px;
  height: 18px;
}

.hd-btn {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.hd-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
}

.sd-btn {
  background: linear-gradient(135deg, #10b981, #047857);
  color: white;
}

.sd-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
}

.result-content {
  flex: 1;
}

.result-status {
  font-size: 1.125rem;
  font-weight: 700;
  color: #dc2626;
  margin: 0 0 8px 0;
}

.result-message {
  color: #374151;
  margin: 0 0 16px 0;
}

.error-tips h5 {
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
}

.error-tips ul {
  margin: 0;
  padding-left: 20px;
  color: #6b7280;
}

.error-tips li {
  margin-bottom: 4px;
}

/* How to Use Section */
.how-to-section {
  margin-bottom: 80px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  color: white;
  margin-bottom: 48px;
}

.steps-container {
  display: grid;
  gap: 32px;
  max-width: 800px;
  margin: 0 auto;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  background: rgba(255, 255, 255, 0.1);
  padding: 32px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.step-number {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #fff, #e0e7ff);
  color: #1e3c72;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  margin: 0 0 8px 0;
}

.step-description {
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.6;
}

/* Features Section */
.features-section {
  margin-bottom: 80px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

.feature-icon.quality {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.feature-icon.speed {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.feature-icon.security {
  background: linear-gradient(135deg, #10b981, #047857);
  color: white;
}

.feature-icon.free {
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
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

  .downloader-card {
    padding: 32px 24px;
  }

  .action-section {
    flex-direction: column;
  }

  .btn {
    min-width: auto;
  }

  .download-item {
    flex-direction: column;
    gap: 16px;
    text-align: center;
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

  .step-item {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 0 40px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .downloader-card {
    padding: 24px 16px;
  }

  .url-input {
    padding: 16px 20px;
  }
}
</style>