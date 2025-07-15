<template>
  <div class="page-container">
    <div class="container">
      <!-- Enhanced Header Section -->
      <div class="header-section">
        <div class="header-icon">
          <svg
            class="icon-svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
            />
          </svg>
        </div>
        <h1 class="main-title">Create Your Short Link</h1>
        <p class="main-subtitle">
          Transform long URLs into short, shareable links. Track clicks and
          manage your links with ease.
        </p>
        <div class="header-stats">
          <div class="stat-item">
            <span class="stat-number">10M+</span>
            <span class="stat-label">Links Created</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">99.9%</span>
            <span class="stat-label">Uptime</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">< 1s</span>
            <span class="stat-label">Response Time</span>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Enhanced Form Card -->
        <div class="form-card">
          <div class="card-header">
            <div class="header-content">
              <div class="header-icon-small">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 class="card-title">URL Shortener</h2>
                <p class="card-subtitle">
                  Enter your long URL below to create a short link
                </p>
              </div>
            </div>
          </div>

          <div class="card-body">
            <el-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-position="top"
              size="large"
              @submit.prevent="createShortLink"
            >
              <el-form-item label="Original URL" prop="url" class="form-item">
                <div class="input-wrapper">
                  <div class="input-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c-1.657 0-3-4.03-3-9s1.343-9 3-9m0 18c1.657 0 3-4.03 3-9s-1.343-9-3-9m-9 9l9-9"
                      />
                    </svg>
                  </div>
                  <el-input
                    v-model="form.url"
                    placeholder="https://example.com/your-long-url"
                    clearable
                    :disabled="loading"
                    class="url-input"
                    size="large"
                  />
                </div>
              </el-form-item>

              <!-- Enhanced Options Row -->
              <div class="options-row">
                <div class="tracking-option">
                  <el-checkbox
                    v-model="form.is_tracked"
                    :disabled="loading"
                    size="large"
                    class="tracking-checkbox"
                  >
                    <div class="checkbox-content">
                      <div class="checkbox-icon">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      </div>
                      <div class="checkbox-text">
                        <span class="checkbox-title">Enable Analytics</span>
                        <span class="checkbox-desc"
                          >Track clicks and performance</span
                        >
                      </div>
                    </div>
                  </el-checkbox>
                </div>

                <el-button
                  type="primary"
                  size="large"
                  :loading="loading"
                  @click="createShortLink"
                  class="submit-button"
                >
                  <template v-if="!loading">
                    <svg
                      class="button-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    Create Short Link
                  </template>
                  <span v-else>Creating...</span>
                </el-button>
              </div>
            </el-form>
          </div>
        </div>

        <!-- Enhanced Result Card -->
        <div v-if="shortLink" class="result-card">
          <div class="result-header">
            <div class="success-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="result-header-text">
              <h3 class="result-title">Short Link Created!</h3>
              <p class="result-subtitle">Your link is ready to share</p>
            </div>
          </div>

          <div class="result-content">
            <div class="result-item">
              <label class="result-label">Your Short Link</label>
              <div class="result-input-group">
                <div class="short-link-display">
                  <span class="short-link-text">{{ shortLink }}</span>
                </div>
                <el-button
                  type="primary"
                  size="large"
                  @click="copyToClipboard"
                  class="copy-button"
                  :class="{ copied: copied }"
                >
                  <svg
                    v-if="copied"
                    class="button-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <svg
                    v-else
                    class="button-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  {{ copied ? "Copied!" : "Copy" }}
                </el-button>
              </div>
            </div>

            <div class="result-info">
              <div class="original-url-section">
                <span class="info-label">Original URL:</span>
                <span class="original-url">{{ form.url }}</span>
              </div>
              <div v-if="form.is_tracked" class="tracking-status">
                <svg
                  class="status-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Analytics Enabled
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="quick-actions">
              <button class="action-button" @click="visitLink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                Visit Link
              </button>
              <button class="action-button" @click="shareLink">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                Share
              </button>
              <button class="action-button" @click="resetForm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Create Another
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Features Section -->
        <div class="features-section">
          <div class="features-header">
            <h2 class="features-title">Why Choose Our URL Shortener?</h2>
            <p class="features-subtitle">
              Powerful features to help you manage and track your links
            </p>
          </div>

          <div class="features-grid">
            <div class="feature-item">
              <div class="feature-icon lightning">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 class="feature-title">Lightning Fast</h3>
              <p class="feature-description">
                Create short links instantly with our optimized infrastructure
                and global CDN
              </p>
            </div>

            <div class="feature-item">
              <div class="feature-icon analytics">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 class="feature-title">Advanced Analytics</h3>
              <p class="feature-description">
                Monitor your link performance with detailed analytics and
                real-time insights
              </p>
            </div>

            <div class="feature-item">
              <div class="feature-icon security">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 class="feature-title">Secure & Reliable</h3>
              <p class="feature-description">
                Your links are protected with enterprise-grade security and
                99.9% uptime
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <faqs :faqs_data="faq_data" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { useWebsiteStore } from "~/stores/website";
import { $fetch } from "ofetch";

// Store
const store = useWebsiteStore();

// Form data
const formRef = ref<FormInstance>();
const loading = ref(false);
const shortLink = ref("");
const copied = ref(false);

const form = reactive({
  url: "",
  is_tracked: false,
});

const faq_data = ref([
  {
    question: "What is the Short Link Generator Tool?",
    answer:
      "The Short Link Generator Tool is a 3-in-1 utility that allows you to create shortened URLs, customize links, and track their performance. It's designed to simplify sharing, improve user experience, and provide analytics for your links.",
  },
  {
    question: "Do I need to install software or create an account?",
    answer:
      "No software or account is needed! Our tool is web-based and works on all browsers and devices, including PC, Mac, Android, and iOS.",
  },
  {
    question: "How does the tool work?",
    answer:
      "Simply enter your long URL into the tool, and it will generate a shortened link. You can customize the link's slug, add tracking parameters for easy sharing. The tool also provides analytics to monitor clicks and user engagement.",
  },
  {
    question: "Is the Short Link Generator Tool free to use?",
    answer:
      "The Short Link Generator Tool is free to use for basic features, with a limit of creating up to 10 short links per day.",
  },
  {
    question: "Can I customize the shortened URLs?",
    answer:
      "Yes, our tool allows you to create custom short links by choosing a unique slug or branded domain to align with your brand or campaign.",
  },
  {
    question: "Are the shortened links permanent?",
    answer:
      "Yes, shortened links created with our tool are permanent unless you choose to deactivate or delete them. Expired links may redirect to a custom error page if configured.",
  },
  {
    question: "Can I edit or update a shortened link after creating it?",
    answer:
      "You can update the destination URL or customize the slug for premium accounts. Free accounts may have limited editing capabilities.",
  },
]);

// Form validation rules
const rules: FormRules = {
  url: [
    { required: true, message: "Please enter a URL", trigger: "blur" },
    {
      pattern: /^https?:\/\/.+/,
      message: "Please enter a valid URL (e.g., https://example.com)",
      trigger: "blur",
    },
  ],
};

// Create short link function
const createShortLink = async () => {
  if (!formRef.value) return;

  try {
    const valid = await formRef.value.validate();
    if (!valid) return;

    // Check if user has token
    if (!store.token) {
      store.showLoginModal = true;
      ElMessage.warning("Please login to create short links");
      return;
    }

    loading.value = true;

    const response = await $fetch("https://kithubs.com/api/shorts/create", {
      method: "POST",
      headers: {
        Authorization: store.token,
        "Content-Type": "application/json",
      },
      body: {
        url: form.url,
        is_tracked: form.is_tracked,
      },
    });
    if (response.status == 401) {
      store.token = "";
      store.userInfo = null;
      ElMessage.error("Authentication expired. Please login.");
    }

    // Handle the API response format: { status: 200, message: "...", short_code: "..." }
    if (response && response.status === 200 && response.short_code) {
      shortLink.value = response.short_code;
      ElNotification({
        title: "Success",
        message: response.message || "Short link created successfully!",
        type: "success",
        duration: 3000,
      });
    }
  } catch (error: any) {
    console.error("Error creating short link:", error);

    if (error.status === 401 || error.statusCode === 401) {
      store.showLoginModal = true;

      ElMessage.error("Authentication required. Please login.");
    } else {
      ElMessage.error(
        error.data?.message || "Failed to create short link. Please try again."
      );
    }
  } finally {
    loading.value = false;
  }
};

// Copy to clipboard function
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shortLink.value);
    copied.value = true;
    ElMessage.success("Link copied to clipboard!");

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (error) {
    ElMessage.error("Failed to copy link");
  }
};

// Visit link function
const visitLink = () => {
  window.open(shortLink.value, "_blank", "noopener,noreferrer");
};

// Share link function
const shareLink = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check out this link",
        url: shortLink.value,
      });
    } catch (error) {
      copyToClipboard();
    }
  } else {
    copyToClipboard();
  }
};

// Reset form function
const resetForm = () => {
  form.url = "";
  form.is_tracked = false;
  shortLink.value = "";
  copied.value = false;
};

// Reset form when URL changes
watch(
  () => form.url,
  () => {
    shortLink.value = "";
    copied.value = false;
  }
);

useHead({
  title: "Short Link Generator Tool - Create Custom Short URLs Easily",
  meta: [
    {
      name: "description",
      content:
        "Generate shortened URLs, customize links, and track performance with our 3-in-1 Short Link Generator Tool. Free to use with up to 10 links per day.",
    },
    {
      name: "keywords",
      content:
        "short link generator, URL shortener, custom short URLs, link tracking",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      property: "og:title",
      content: "Short Link Generator Tool - Create & Track Short URLs",
    },
    {
      property: "og:description",
      content:
        "Easily create shortened URLs, customize them, and monitor performance with our powerful 3-in-1 tool. Free plan includes up to 10 links daily.",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:url",
      content: "https://kithubs.com/short-link-generator",
    },
    {
      property: "og:image",
      content: "https://kithubs.com/logo.png",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: "https://kithubs.com/short-link-generator",
    },
  ],
  script: [
    // JSON-LD
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Short Link Generator Tool - Create Custom Short URLs Easily",
        description:
          "Easily create shortened URLs, customize them, and monitor performance with our powerful 3-in-1 tool. Free plan includes up to 10 links daily.",
        url: "https://kithubs.com/short-link-generator",
        logo: "https://kithubs.com/logo.png",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "short link generator",
          "URL shortener, custom short URLs",
          "link tracking",
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

<style scoped>
/* Enhanced Page Container */
.page-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
  position: relative;
}

.page-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
    repeat;
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  position: relative;
  z-index: 1;
}

/* Enhanced Header Section */
.header-section {
  text-align: center;
  margin-bottom: 4rem;
  color: white;
}

.header-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.icon-svg {
  width: 40px;
  height: 40px;
  stroke: white;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: linear-gradient(45deg, #ffffff, #f0f8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.main-subtitle {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
}

.header-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.8;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
}

/* Enhanced Form Card */
.form-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  margin-bottom: 3rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  color: white;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon-small {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header-icon-small svg {
  width: 24px;
  height: 24px;
  stroke: white;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
}

.card-subtitle {
  opacity: 0.9;
  font-size: 1rem;
  margin: 0;
}

.card-body {
  padding: 2.5rem;
}

/* Enhanced Form Styles */
.form-item {
  margin-bottom: 2rem;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 20px;
  height: 20px;
  color: #6b7280;
}

.input-icon svg {
  width: 100%;
  height: 100%;
}

.url-input {
  --el-input-height: 52px;
}

.url-input :deep(.el-input__wrapper) {
  padding-left: 48px;
  border-radius: 16px;
  border: 2px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.url-input :deep(.el-input__wrapper:hover) {
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.url-input :deep(.el-input__wrapper.is-focus) {
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.options-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 1rem;
}

.tracking-option {
  flex: 1;
}

.checkbox-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.checkbox-icon {
  width: 20px;
  height: 20px;
  color: #667eea;
}

.checkbox-icon svg {
  width: 100%;
  height: 100%;
}

.checkbox-text {
  display: flex;
  flex-direction: column;
}

.checkbox-title {
  font-weight: 600;
  color: #374151;
  font-size: 1rem;
}

.checkbox-desc {
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 0.125rem;
}

.submit-button {
  height: 52px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  min-width: 160px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 35px rgba(102, 126, 234, 0.5);
}

.submit-button:active {
  transform: translateY(0);
}

.button-icon {
  width: 20px;
  height: 20px;
}

/* Enhanced Result Card */
.result-card {
  background: white;
  border-radius: 24px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  margin-bottom: 3rem;
  overflow: hidden;
  animation: slideInUp 0.6s ease-out;
  border: 2px solid #10b981;
}

.result-header {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  padding: 2rem;
  color: white;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.success-badge {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.success-badge svg {
  width: 24px;
  height: 24px;
  stroke: white;
}

.result-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
}

.result-subtitle {
  opacity: 0.9;
  margin: 0;
}

.result-content {
  padding: 2.5rem;
}

.result-item {
  margin-bottom: 2rem;
}

.result-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.result-input-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.short-link-display {
  flex: 1;
  background: #f8fafc;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  font-family: "Monaco", "Menlo", monospace;
  font-size: 1.125rem;
  color: #667eea;
  font-weight: 600;
}

.short-link-text {
  word-break: break-all;
}

.copy-button {
  background: #667eea;
  border-color: #667eea;
  border-radius: 12px;
  font-weight: 600;
  min-width: 120px;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.copy-button:hover {
  background: #5a67d8;
  border-color: #5a67d8;
  transform: translateY(-1px);
}

.copy-button.copied {
  background: #10b981;
  border-color: #10b981;
}

.result-info {
  padding: 1.5rem 0;
  border-top: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
}

.original-url-section {
  margin-bottom: 1rem;
}

.info-label {
  font-weight: 600;
  color: #374151;
  display: block;
  margin-bottom: 0.5rem;
}

.original-url {
  word-break: break-all;
  color: #6b7280;
  font-size: 0.875rem;
}

.tracking-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #10b981;
  font-weight: 600;
  font-size: 0.875rem;
}

.status-icon {
  width: 16px;
  height: 16px;
}

.quick-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #374151;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
}

.action-button:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.action-button svg {
  width: 16px;
  height: 16px;
}

/* Enhanced Features Section */
.features-section {
  margin-top: 5rem;
}

.features-header {
  text-align: center;
  margin-bottom: 3rem;
  color: white;
}

.features-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.features-subtitle {
  font-size: 1.125rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-item {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 1.5rem;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon.lightning {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
}

.feature-icon.analytics {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.feature-icon.security {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.feature-icon svg {
  width: 32px;
  height: 32px;
  stroke: white;
}

.feature-title {
  font-size: 1.375rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
}

.feature-description {
  color: #6b7280;
  line-height: 1.6;
  font-size: 1rem;
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .main-title {
    font-size: 2.5rem;
  }

  .header-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .stat-divider {
    width: 40px;
    height: 1px;
  }

  .card-header,
  .card-body,
  .result-header,
  .result-content {
    padding: 1.5rem;
  }

  .options-row {
    flex-direction: column;
    gap: 1.5rem;
  }

  .submit-button {
    width: 100%;
  }

  .result-input-group {
    flex-direction: column;
    gap: 1rem;
  }

  .copy-button {
    width: 100%;
  }

  .quick-actions {
    flex-direction: column;
  }

  .action-button {
    justify-content: center;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-item {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .url-input,
  .submit-button {
    --el-input-height: 48px;
    height: 48px;
  }
}

/* Loading States */
.submit-button.is-loading {
  pointer-events: none;
}

/* Focus States */
.submit-button:focus,
.copy-button:focus,
.action-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
