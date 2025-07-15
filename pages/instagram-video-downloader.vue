<script setup>
import { ref, computed } from "vue";

// State management
const instagramUrl = ref("");
const isLoading = ref(false);
const showResult = ref(false);
const result = ref(null);
const error = ref("");

const faq_data = ref([
   {
    question: "Is it legal to download Instagram content?",
    answer:
      "You should only download content that you have permission to download, such as your own posts or content where you have explicit permission from the creator. Always respect copyright and intellectual property rights.",
  },
   {
    question: "What types of Instagram content can I download?",
    answer:
      "Our tool supports downloading single photos, videos, reels, stories, IGTV videos, and carousel posts with multiple images. It automatically detects the content type and provides appropriate download options.",
  },
  {
    question: "Can I download private Instagram content?",
    answer:
      "No, our tool can only download public Instagram content. Private posts require special permissions and cannot be accessed through our downloader.",
  },
  {
    question: "Do you store the downloaded content?",
    answer:
      "No, we don't store any content on our servers. The download links are generated in real-time and expire after a certain period. Your privacy is protected.",
  },
  {
    question: "Why can't I download some Instagram content?",
    answer:
      "Some content may be private, deleted, region-restricted, or have download restrictions. Make sure the content is public and accessible from your location.",
  },
  {
    question: "What quality will the downloaded content be?",
    answer:
      "Our tool downloads Instagram content in its original quality and resolution, maintaining the same quality as posted on Instagram without any compression.",
  },
  {
    question: "How do I download carousel posts with multiple photos?",
    answer:
      "When you paste a carousel post URL, our tool will detect all photos in the post and provide individual download links plus a \"Download All\" option for convenience.",
  },
  {
    question: "Is there a limit to how many files I can download?",
    answer:
      "No, there are no limits. You can download as many Instagram photos and videos as you want, completely free of charge.",
  },
])

// Computed properties
const isValidUrl = computed(() => {
  if (!instagramUrl.value) return false;
  try {
    const url = new URL(instagramUrl.value);
    return (
      url.hostname.includes("instagram.com") ||
      url.hostname.includes("instagr.am")
    );
  } catch {
    return false;
  }
});

// Helper functions
const getSuccessTitle = () => {
  if (!result.value) return "";
  switch (result.value.data.type) {
    case 1:
      return "Photo Ready for Download";
    case 2:
      return "Video Ready for Download";
    case 3:
      return "Carousel Photos Ready";
    default:
      return "Content Ready";
  }
};

const getContentTypeText = () => {
  if (!result.value) return "";
  switch (result.value.data.type) {
    case 1:
      return "Single Instagram Photo";
    case 2:
      return "Instagram Video/Reel";
    case 3:
      return `Carousel Post (${result.value.data.source_url.length} photos)`;
    default:
      return "Instagram Content";
  }
};

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

// Download content method
const downloadContent = async () => {
  if (!isValidUrl.value) {
    error.value = "Please enter a valid Instagram URL";
    showResult.value = true;
    return;
  }

  isLoading.value = true;
  showResult.value = false;
  result.value = null;
  error.value = "";

  try {
    const response = await apiService.post(
      "https://kithubs.com/api/video/instagram/download",
      {
        url: instagramUrl.value.trim(),
      }
    );

    result.value = response;
  } catch (err) {
    error.value =
      "Failed to process content. Please check the URL and try again.";
    console.error("Content download failed:", err);
  } finally {
    isLoading.value = false;
    showResult.value = true;
  }
};

// Download all photos from carousel
const downloadAllPhotos = () => {
  if (result.value && result.value.data.source_url) {
    result.value.data.source_url.forEach((url, index) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `instagram_photo_${index + 1}.jpg`;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
};

// Clear all content
const clearAll = () => {
  instagramUrl.value = "";
  showResult.value = false;
  result.value = null;
  error.value = "";
};

useHead({
  title: "Free Instagram Video & Photo Downloader | Kithubs",
  meta: [
    {
      name: "description",
      content:
        "Download Instagram videos, photos, Reels, and stories for free with Kithubs’ online tool. Save HD content easily, no login needed. Try now!",
    },
    { charset: "UTF-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
    {
      name: "robots",
      content:
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    {
      property: "og:url",
      content: "https://kithubs.com/instagram-video-downloader",
    },
    {
      property: "og:title",
      content: "Free Instagram Video & Photo Downloader | Kithubs",
    },
    {
      property: "og:description",
      content:
        "Download Instagram videos, photos, Reels, and stories for free with Kithubs’ online tool. Save HD content easily, no login needed. Try now!",
    },
    {
      property: "og:image",
      content: "https://kithubs.com/logo.png",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://kithubs.com/instagram-video-downloader",
    },
  ],
  script: [
    // JSON-LD
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Kithubs Instagram Video & Photo Downloader - Free Tool",
        description:
          "Effortlessly download Instagram videos, photos, Reels, and Stories in HD with Kithubs’ free online tool. No login required!",
        url: "https://kithubs.com/instagram-video-downloader",
        logo: "https://kithubs.com/logo.png",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Instagram Video Downloader",
          "Photo Downloader",
          "Reels and Stories Downloader",
          "HD Quality Downloads",
          "No Login Needed",
        ],
        author: {
          "@type": "Organization",
          name: "Chenyx",
        },
      }),
    },
  ],
});
</script>


<template>
  <div class="app-container">
    
    <div class="main-wrapper">
      <!-- Header Section -->
      <header class="hero-section">
        <div class="hero-content">
          <div class="hero-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
              />
            </svg>
          </div>
          <h1 class="hero-title">Instagram Downloader</h1>
          <p class="hero-subtitle">
            Download Instagram photos, videos, reels, and carousel posts in
            original quality. Fast, free, and secure Instagram content
            downloader.
          </p>

          <!-- Content Type Indicators -->
          <div class="content-types">
            <div class="type-badge">
              <svg
                class="type-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              Photos
            </div>
            <div class="type-badge">
              <svg
                class="type-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              Videos
            </div>
            <div class="type-badge">
              <svg
                class="type-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
              Carousels
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="downloader-card">
          <!-- Input Section -->
          <div class="input-section">
            <label for="instagramUrl" class="input-label">
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
                  d="M13 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                ></path>
              </svg>
              Instagram Post URL
            </label>
            <div class="input-wrapper">
              <input
                id="instagramUrl"
                v-model="instagramUrl"
                :disabled="isLoading"
                type="url"
                class="url-input"
                placeholder="Paste Instagram URL here (posts, reels, stories...)"
                @keyup.enter="downloadContent"
              />
              <div class="input-decoration"></div>
            </div>
            <p class="input-hint">
              <svg
                class="hint-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              Supports posts, reels, stories, IGTV, and carousel posts
            </p>
          </div>

          <!-- Action Buttons -->
          <div class="action-section">
            <button
              @click="downloadContent"
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
              {{ isLoading ? "Processing..." : "Download Content" }}
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
              v-if="result && result.status === 200 && result.data.type > 0"
              class="result-card success"
            >
              <div class="result-header">
                <div class="result-icon success-icon">
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
                  <h3 class="result-title">{{ getSuccessTitle() }}</h3>
                  <p class="content-type">{{ getContentTypeText() }}</p>
                </div>
              </div>

              <div class="download-section">
                <!-- Single Photo/Video -->
                <div
                  v-if="result.data.type === 1 || result.data.type === 2"
                  class="single-download"
                >
                  <div class="media-preview">
                    <div class="media-icon">
                      <svg
                        v-if="result.data.type === 1"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <svg
                        v-else
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        ></path>
                      </svg>
                    </div>
                    <div class="media-info">
                      <h4 class="media-title">
                        {{
                          result.data.type === 1
                            ? "Instagram Photo"
                            : "Instagram Video"
                        }}
                      </h4>
                      <p class="media-desc">
                        High quality
                        {{ result.data.type === 1 ? "image" : "video" }} ready
                        for download
                      </p>
                    </div>
                  </div>
                  <a
                    :href="result.data.source_url[0]"
                    download
                    class="download-btn primary"
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
                    Download {{ result.data.type === 1 ? "Photo" : "Video" }}
                  </a>
                </div>

                <!-- Multiple Photos (Carousel) -->
                <div
                  v-else-if="result.data.type === 3"
                  class="multiple-download"
                >
                  <div class="carousel-header">
                    <div class="carousel-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        ></path>
                      </svg>
                    </div>
                    <div class="carousel-info">
                      <h4 class="carousel-title">Instagram Carousel Post</h4>
                      <p class="carousel-desc">
                        {{ result.data.source_url.length }} photos found in this
                        post
                      </p>
                    </div>
                  </div>

                  <div class="photos-grid">
                    <div
                      v-for="(url, index) in result.data.source_url"
                      :key="index"
                      class="photo-item"
                    >
                      <div class="photo-preview">
                        <div class="photo-number">{{ index + 1 }}</div>
                        <svg
                          class="photo-icon"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <div class="photo-details">
                        <span class="photo-name">Photo {{ index + 1 }}</span>
                        <span class="photo-format">JPG Format</span>
                      </div>
                      <a
                        :href="url"
                        download
                        class="download-btn small"
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
                      </a>
                    </div>
                  </div>

                  <div class="bulk-download">
                    <button @click="downloadAllPhotos" class="btn-bulk">
                      <svg
                        class="bulk-icon"
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
                      Download All Photos ({{ result.data.source_url.length }})
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Not Found Result -->
            <div
              v-else-if="
                result && (result.status === 404 || result.data.type === 0)
              "
              class="result-card error"
            >
              <div class="result-icon error-icon">
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
                <h4 class="result-status">Content Not Found</h4>
                <p class="result-message">
                  The Instagram URL is invalid or the content is not accessible.
                  Please check the URL and try again.
                </p>
                <div class="error-tips">
                  <h5>Common Issues & Solutions:</h5>
                  <ul>
                    <li>
                      <strong>Private Account:</strong> Make sure the Instagram
                      post is public
                    </li>
                    <li>
                      <strong>Invalid URL:</strong> Check if the URL is complete
                      and correct
                    </li>
                    <li>
                      <strong>Deleted Content:</strong> The post may have been
                      removed
                    </li>
                    <li>
                      <strong>Region Restricted:</strong> Content might not be
                      available in your region
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- General Error -->
            <div v-else-if="error" class="result-card error">
              <div class="result-icon error-icon">
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
                <button @click="downloadContent" class="retry-btn">
                  <svg
                    class="retry-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- How to Use Section -->
        <section class="how-to-section">
          <h2 class="section-title">How to Download Instagram Content</h2>
          <div class="steps-container">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 class="step-title">Find Instagram Content</h3>
                <p class="step-description">
                  Open Instagram and navigate to the post, reel, story, or IGTV
                  video you want to download. Works with photos, videos, and
                  carousel posts.
                </p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 class="step-title">Copy the URL</h3>
                <p class="step-description">
                  Tap the three dots menu (⋯) and select "Copy Link" or copy the
                  URL from your browser's address bar if using desktop.
                </p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 class="step-title">Download Content</h3>
                <p class="step-description">
                  Paste the URL into our tool above, click "Download Content",
                  and save your photos or videos in original quality.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="features-section">
          <h2 class="section-title">Why Choose Our Instagram Downloader?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon all-types">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  ></path>
                </svg>
              </div>
              <h3 class="feature-title">All Content Types</h3>
              <p class="feature-description">
                Download single photos, videos, reels, stories, IGTV, and
                carousel posts with multiple images.
              </p>
            </div>

            <div class="feature-card">
              <div class="feature-icon quality">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 class="feature-title">Original Quality</h3>
              <p class="feature-description">
                Download Instagram content in its original resolution and
                quality without any compression or watermarks.
              </p>
            </div>

            <div class="feature-card">
              <div class="feature-icon batch">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  ></path>
                </svg>
              </div>
              <h3 class="feature-title">Batch Downloads</h3>
              <p class="feature-description">
                Download all photos from carousel posts at once with our
                convenient batch download feature.
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
              <h3 class="feature-title">Lightning Fast</h3>
              <p class="feature-description">
                Get download links instantly with our optimized processing
                system. No waiting time or delays.
              </p>
            </div>

            <div class="feature-card">
              <div class="feature-icon privacy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
              </div>
              <h3 class="feature-title">Privacy Protected</h3>
              <p class="feature-description">
                We don't store your downloads or personal data. Your privacy and
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
              </div>
              <h3 class="feature-title">100% Free</h3>
              <p class="feature-description">
                Download unlimited Instagram content without any cost,
                registration, or subscription required.
              </p>
            </div>
          </div>
        </section>

        <!-- FAQ Section -->
         <Faqs :faqs_data="faq_data"></Faqs>
      </main>
    </div>
  </div>
</template>


<style scoped>
/* Global Styles */
* {
  box-sizing: border-box;
}

.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 10px 30px rgba(240, 147, 251, 0.3);
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
  animation: fadeInUp 0.8s ease-out;
}

.hero-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 32px;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.content-types {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.type-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.875rem;
  font-weight: 500;
}

.type-icon {
  width: 16px;
  height: 16px;
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
  animation: fadeInUp 0.8s ease-out 0.6s both;
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
  color: #667eea;
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
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
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
  background: linear-gradient(90deg, #667eea, #764ba2);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.url-input:focus + .input-decoration {
  transform: scaleX(1);
}

.input-hint {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0;
}

.hint-icon {
  width: 16px;
  height: 16px;
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
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  flex: 1;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
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

.success-icon {
  background: #16a34a;
  color: white;
}

.error-icon {
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
  margin: 0 0 4px 0;
}

.content-type {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.download-section {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
}

/* Single Download */
.single-download {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.media-preview {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
}

.media-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.media-icon svg {
  width: 32px;
  height: 32px;
}

.media-info {
  flex: 1;
}

.media-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 4px 0;
}

.media-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.download-btn.primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.download-btn.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.download-btn.small {
  padding: 8px 12px;
  font-size: 0.875rem;
  background: linear-gradient(135deg, #10b981, #047857);
  color: white;
}

.download-btn.small:hover {
  transform: translateY(-1px);
}

.download-icon {
  width: 18px;
  height: 18px;
}

/* Multiple Download */
.multiple-download {
  space-y: 24px;
}

.carousel-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.carousel-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f093fb, #f5576c);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.carousel-icon svg {
  width: 24px;
  height: 24px;
}

.carousel-info {
  flex: 1;
}

.carousel-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 4px 0;
}

.carousel-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
}

.photos-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
}

.photo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: #f8fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.photo-preview {
  display: flex;
  align-items: center;
  gap: 12px;
}

.photo-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 600;
}

.photo-icon {
  width: 24px;
  height: 24px;
  color: #6b7280;
}

.photo-details {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-left: 12px;
}

.photo-name {
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.photo-format {
  font-size: 0.75rem;
  color: #6b7280;
}

.bulk-download {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.btn-bulk {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-bulk:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
}

.bulk-icon {
  width: 18px;
  height: 18px;
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

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 12px;
}

.retry-btn:hover {
  background: #d97706;
}

.retry-icon {
  width: 16px;
  height: 16px;
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
  background: white;
  padding: 32px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.step-number {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
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
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
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

.feature-icon.all-types {
  background: linear-gradient(135deg, #f093fb, #f5576c);
  color: white;
}

.feature-icon.quality {
  background: linear-gradient(135deg, #10b981, #047857);
  color: white;
}

.feature-icon.batch {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.feature-icon.speed {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.feature-icon.privacy {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.feature-icon.free {
  background: linear-gradient(135deg, #ef4444, #dc2626);
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

  .content-types {
    flex-direction: column;
    align-items: center;
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

  .single-download {
    flex-direction: column;
    text-align: center;
  }

  .photo-item {
    flex-direction: column;
    gap: 12px;
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