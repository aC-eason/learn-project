<template>
  <div class="app-container">
    <!-- SEO Head -->

    <div class="main-wrapper">
      <!-- Header Section -->
      <header class="hero-section">
        <div class="hero-content">
          <div class="hero-icon">
            <svg
              t="1749915806182"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2350"
              width="40"
              height="40"
            >
              <path
                d="M748.311273 421.701818c0-106.170182-88.110545-205.079273-221.975273-205.079273-166.632727 0-250.600727 121.949091-250.600727 223.650909 0 61.579636 22.807273 116.363636 71.819636 136.750545 8.005818 3.351273 15.220364 0.093091 17.547636-8.936727 1.582545-6.283636 5.445818-22.155636 7.121455-28.718545 2.373818-8.983273 1.442909-12.101818-5.026909-19.968C353.047273 502.318545 344.064 480.349091 344.064 449.163636c0-90.437818 66.280727-171.426909 172.637091-171.426909 94.161455 0 145.92 58.740364 145.92 137.169455 0 103.237818-44.730182 190.324364-111.197091 190.324364-36.724364 0-64.139636-30.952727-55.342545-68.933818 10.519273-45.335273 30.952727-94.301091 30.952727-127.022545 0-29.277091-15.406545-53.76-47.290182-53.76-37.515636 0-67.630545 39.610182-67.630545 92.672 0 33.792 11.217455 56.645818 11.217455 56.645818s-38.4 166.027636-45.102545 195.072c-6.097455 26.484364-7.028364 55.575273-6.190545 80.151273 2.56 22.062545 23.924364 40.029091 42.449455 15.825455 13.032727-21.271273 27.042909-48.128 34.304-75.031273 4.328727-15.918545 24.669091-98.397091 24.669091-98.397091 12.194909 23.738182 47.802182 44.637091 85.690182 44.637091C671.837091 667.042909 748.311273 562.129455 748.311273 421.701818z"
                p-id="2351"
                fill="#fff"
              ></path>
              <path
                d="M1024 512c0-282.763636-229.236364-512-512-512C229.236364 0 0 229.236364 0 512s229.236364 512 512 512C794.763636 1024 1024 794.763636 1024 512zM46.545455 512C46.545455 254.929455 254.929455 46.545455 512 46.545455c257.070545 0 465.454545 208.384 465.454545 465.454545 0 257.070545-208.384 465.454545-465.454545 465.454545C254.929455 977.454545 46.545455 769.070545 46.545455 512z"
                p-id="2352"
                fill="#fff"
              ></path>
            </svg>
          </div>
          <h1 class="hero-title">Pinterest Video Downloader</h1>
          <p class="hero-subtitle">
            Download Pinterest videos in high quality instantly. Save your
            favorite Pinterest video content with our fast and secure downloader
            tool.
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
              Pinterest Video URL
            </label>
            <div class="input-wrapper">
              <input
                id="videoUrl"
                v-model="videoUrl"
                :disabled="isLoading"
                type="url"
                class="url-input"
                placeholder="Paste Pinterest video URL here (e.g., https://pin,it/...)"
              />
              <div class="input-decoration"></div>
            </div>
            <p class="input-hint">
              Copy and paste the Pinterest video URL you want to download
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
              {{ isLoading ? "Processing..." : "Get Download Link" }}
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
              <div class="video-preview">
                <div class="video-thumbnail">
                  <img
                    :src="result.data.cover"
                    :alt="result.data.title"
                    class="thumbnail-image"
                  />
                  <div class="play-overlay">
                    <svg
                      class="play-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div class="video-info">
                  <h3 class="video-title">{{ result.data.title }}</h3>
                  <div class="video-details">
                    <div class="detail-item">
                      <span class="detail-label">Quality:</span>
                      <span class="detail-value quality-badge">{{
                        result.data.quality
                      }}</span>
                    </div>
                    <div class="detail-item">
                      <span class="detail-label">Format:</span>
                      <span class="detail-value format-badge">{{
                        result.data.format.toUpperCase()
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="download-section">
                <a
                  :href="result.data.download"
                  download
                  class="download-btn"
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
                  Download Video ({{ result.data.quality }})
                </a>
                <p class="download-note">
                  Click the button above to download the video to your device
                </p>
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
                  The Pinterest video URL is invalid or the video is not
                  accessible. Please check the URL and try again.
                </p>
                <div class="error-tips">
                  <h5>Troubleshooting Tips:</h5>
                  <ul>
                    <li>Make sure the Pinterest pin contains a video</li>
                    <li>Check if the URL is complete and correct</li>
                    <li>Ensure the pin is publicly accessible</li>
                    <li>Try copying the URL again from Pinterest</li>
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
          <h2 class="section-title">How to Download Pinterest Videos</h2>
          <div class="steps-container">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 class="step-title">Find Pinterest Video</h3>
                <p class="step-description">
                  Browse Pinterest and find the video pin you want to download.
                  Click on the pin to open it.
                </p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 class="step-title">Copy Video URL</h3>
                <p class="step-description">
                  Copy the Pinterest video URL from your browser's address bar
                  or use the share button to get the link.
                </p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 class="step-title">Download Video</h3>
                <p class="step-description">
                  Paste the URL into our tool, click "Get Download Link", and
                  then download the video to your device.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="features-section">
          <h2 class="section-title">
            Why Choose Our Pinterest Video Downloader?
          </h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon quality">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <h3 class="feature-title">High Quality Downloads</h3>
              <p class="feature-description">
                Download Pinterest videos in their original quality without any
                compression or watermarks.
              </p>
            </div>

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
              <h3 class="feature-title">Super Fast Processing</h3>
              <p class="feature-description">
                Get download links instantly with our optimized servers. No
                waiting time, no delays.
              </p>
            </div>
            <!-- 
            <div class="feature-card">
              <div class="feature-icon preview">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </div>
              <h3 class="feature-title">Video Preview</h3>
              <p class="feature-description">Preview video thumbnail and details before downloading to ensure you get the right content.</p>
            </div> -->

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
              <h3 class="feature-title">Safe & Secure</h3>
              <p class="feature-description">
                No malware, no registration required. Your privacy and security
                are our top priority.
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
                Is it legal to download Pinterest videos?
              </h3>
              <p class="faq-answer">
                You should only download videos that you have permission to
                download, such as your own content or videos where you have
                explicit permission from the creator.
              </p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">What video formats are supported?</h3>
              <p class="faq-answer">
                Our tool downloads Pinterest videos in MP4 format, which is
                compatible with most devices and media players.
              </p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">
                Can I download private Pinterest videos?
              </h3>
              <p class="faq-answer">
                No, our tool can only download public Pinterest videos. Private
                pins require special permissions and cannot be accessed.
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
                Why can't I download some Pinterest videos?
              </h3>
              <p class="faq-answer">
                Some pins may not contain videos, be private, or have
                restrictions that prevent downloading. Make sure the pin is
                public and contains a video.
              </p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">Is this service free to use?</h3>
              <p class="faq-answer">
                Yes, our Pinterest video downloader is completely free to use
                with no hidden costs or premium subscriptions required.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
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
      url.hostname.includes("pinterest.com") || url.hostname.includes("pin.it")
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
    error.value = "Please enter a valid Pinterest video URL";
    showResult.value = true;
    return;
  }

  isLoading.value = true;
  showResult.value = false;
  result.value = null;
  error.value = "";

  try {
    const response = await apiService.post(
      "https://kithubs.com/api/video/pinterest/download",
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
  background: linear-gradient(
    135deg,
    #fdf2f8 0%,
    #fce7f3 25%,
    #fbcfe8 50%,
    #f3e8ff 100%
  );
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
  color: #1f2937;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: #e60023;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 30px rgba(236, 72, 153, 0.3);
  animation: float 3s ease-in-out infinite;
}

.hero-icon svg {
  width: 40px;
  height: 40px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 24px;
  background: linear-gradient(135deg, #1f2937, #374151, #6b7280);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: fadeInUp 0.8s ease-out;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
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
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
  margin-bottom: 80px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
  border: 1px solid rgba(236, 72, 153, 0.1);
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
  color: #ec4899;
}

.input-wrapper {
  position: relative;
  margin-bottom: 8px;
}

.url-input {
  width: 100%;
  padding: 20px 24px;
  border: 2px solid #f3f4f6;
  border-radius: 16px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: inherit;
  background: #fafafa;
}

.url-input:focus {
  outline: none;
  border-color: #ec4899;
  box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
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
  background: linear-gradient(90deg, #ec4899, #be185d);
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
  background: linear-gradient(135deg, #ec4899, #be185d);
  color: white;
  flex: 1;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.2);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.3);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  background: #f8fafc;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover:not(:disabled) {
  background: #f1f5f9;
  border-color: #cbd5e1;
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
  border-top: 1px solid #f1f5f9;
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

.video-preview {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  align-items: flex-start;
}

.video-thumbnail {
  position: relative;
  flex-shrink: 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.thumbnail-image {
  width: 200px;
  height: 150px;
  object-fit: cover;
  display: block;
}

.play-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.play-icon {
  width: 20px;
  height: 20px;
  margin-left: 2px;
}

.video-info {
  flex: 1;
}

.video-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 16px 0;
  line-height: 1.4;
}

.video-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.detail-label {
  font-weight: 500;
  color: #6b7280;
}

.detail-value {
  font-weight: 600;
}

.quality-badge {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.format-badge {
  background: linear-gradient(135deg, #10b981, #047857);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
}

.download-section {
  text-align: center;
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #ec4899, #be185d);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.3s ease;
  margin-bottom: 12px;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.2);
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(236, 72, 153, 0.3);
}

.download-icon {
  width: 24px;
  height: 24px;
}

.download-note {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.result-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: #dc2626;
  color: white;
  margin-bottom: 16px;
}

.result-icon svg {
  width: 24px;
  height: 24px;
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
  color: #1f2937;
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
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(236, 72, 153, 0.1);
}

.step-number {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #ec4899, #be185d);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(236, 72, 153, 0.2);
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.step-description {
  color: #6b7280;
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  border: 1px solid rgba(236, 72, 153, 0.1);
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
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
  background: linear-gradient(135deg, #ec4899, #be185d);
  color: white;
}

.feature-icon.speed {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.feature-icon.preview {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.feature-icon.security {
  background: linear-gradient(135deg, #10b981, #047857);
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
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(236, 72, 153, 0.1);
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #f1f5f9;
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

  .video-preview {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .thumbnail-image {
    width: 100%;
    max-width: 300px;
    height: auto;
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

  .thumbnail-image {
    width: 100%;
    height: 200px;
  }
}
</style>