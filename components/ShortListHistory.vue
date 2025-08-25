<template>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h2 class="title">Short Link History</h2>
      <p class="subtitle">Manage and track all your shortened links</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <span class="loading-text">Loading your links...</span>
    </div>

    <!-- Empty State -->
    <div v-else-if="!shortLinks.length" class="empty-state">
      <el-icon class="empty-icon">
        <Link />
      </el-icon>
      <h3 class="empty-title">No short links yet</h3>
      <p class="empty-description">
        Create your first short link to get started!
      </p>
    </div>

    <!-- Links List -->
    <div v-else class="links-container">
      <div v-for="link in shortLinks" :key="link.id" class="link-card">
        <!-- Top Row: Original URL and Status -->
        <div class="card-header">
          <div class="url-section">
            <div class="url-header">
              <span class="label">Original URL</span>
              <span
                :class="[
                  'status-badge',
                  link.is_tracked ? 'status-tracked' : 'status-untracked',
                ]"
              >
                <div
                  :class="[
                    'status-dot',
                    link.is_tracked ? 'dot-green' : 'dot-gray',
                  ]"
                ></div>
                {{ link.is_tracked ? "Tracking Enabled" : "No Tracking" }}
              </span>
            </div>
            <a
              :href="link.original_url"
              target="_blank"
              class="original-url"
              :title="link.original_url"
            >
              {{ link.original_url }}
            </a>
          </div>
        </div>

        <!-- Middle Row: Short Link -->
        <div class="short-link-section">
          <span class="label">Short Link</span>
          <div class="short-link-container">
            <code class="short-link-code">
              https://kithubs.com/link/{{ link.short_code }}
            </code>
            <button
              @click="
                copyToClipboard(
                  `https://kithubs.com/link/${link.short_code}`,
                  link.id
                )
              "
              class="copy-button"
              :title="'Copy short link'"
            >
              Copy
            </button>
          </div>
          <div v-if="copiedId === link.id" class="copy-success">
            <el-icon>
              <Check />
            </el-icon>
            Copied to clipboard!
          </div>
        </div>

        <!-- Bottom Row: Metadata and Actions -->
        <div class="card-footer">
          <div class="metadata">
            <div class="metadata-item">
              <el-icon><Calendar /></el-icon>
              <span class="metadata-label">Created:</span>
              <span class="metadata-value">{{
                formatDate(link.created_at)
              }}</span>
            </div>
          </div>

          <div class="actions">
            <button
              @click="viewAnalytics(link)"
              :disabled="!link.is_tracked"
              :class="[
                'action-button',
                'analytics-button',
                { disabled: !link.is_tracked },
              ]"
            >
              <el-icon><TrendCharts /></el-icon>
              <span class="button-text">Analytics</span>
            </button>
            <!-- <button
              @click="deleteLink(link)"
              class="action-button delete-button"
            >
              <el-icon><Delete /></el-icon>
              <span class="button-text">Delete</span>
            </button> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="shortLinks.length > 0" class="load-more-section">
      <button @click="loadMore" class="load-more-button">
        <el-icon><Refresh /></el-icon>
        Load More Links
      </button>
      <p class="load-more-info">
        Showing {{ shortLinks.length }} of {{ totalCount }} links
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getShortList } from "@/services/apiServices";
import { get } from "lodash";
import { defineExpose } from "vue";

// Store
const store = useWebsiteStore();

// Reactive data
const loading = ref(false);
const copiedId = ref(null);
const shortLinks = ref([]);
const totalCount = ref(0);

// Methods
const fetchShortLinks = async () => {
  if (!store.token) {
    return;
  }
  loading.value = true;
  try {
    getShortList({ limit: 5 }).then((response) => {
      console.log("Fetched short links:", response);
      if (response.status === 200) {
        shortLinks.value = response.shorts;
      } else {
        console.error("Failed to fetch short links:", response.message);
      }
    });
  } catch (error) {
    console.error("Failed to fetch short links:", error);
  } finally {
    loading.value = false;
  }
};

// 使用 defineExpose 暴露方法
defineExpose({
  fetchShortLinks: fetchShortLinks,
});

const copyToClipboard = async (text, linkId) => {
  try {
    await navigator.clipboard.writeText(text);
    copiedId.value = linkId;
    setTimeout(() => {
      copiedId.value = null;
    }, 2000);
  } catch (error) {
    console.error("Failed to copy:", error);
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    copiedId.value = linkId;
    setTimeout(() => {
      copiedId.value = null;
    }, 2000);
  }
};

const formatDate = (datetime) => {
  if (!datetime || datetime == 0) return "N/A";

  // 假设时间戳是秒级，转换为毫秒（如果时间戳已经是毫秒级，可移除 * 1000）
  const date = new Date(datetime * 1000);

  // 使用 toLocaleString 转换为当地时间，带上时区信息
  return date.toLocaleString({
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

const viewAnalytics = (link) => {
  window.open(`/short-link-generator/analysis`, "_blank");
};

const deleteLink = (link) => {
  if (
    confirm(
      `Are you sure you want to delete the short link for "${link.original_url}"?`
    )
  ) {
    shortLinks.value = shortLinks.value.filter((item) => item.id !== link.id);
    totalCount.value = shortLinks.value.length;
    console.log("Deleted link:", link);
  }
};

const loadMore = () => {
  console.log("Loading more links...");
};

onMounted(() => {
  fetchShortLinks();
});
</script>

<style scoped>
/* Container */
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px;
}

/* Header */
.header {
  margin-bottom: 24px;
}

.title {
  font-size: 28px;
  font-weight: bold;
  color: #1f2937;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #6b7280;
  margin: 0;
  font-size: 16px;
}

/* Loading */
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 64px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 2px solid #e5e7eb;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-left: 12px;
  color: #6b7280;
  font-size: 18px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 64px 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.empty-icon {
  font-size: 80px;
  color: #d1d5db;
  margin-bottom: 16px;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
}

.empty-description {
  color: #6b7280;
  margin: 0 0 24px 0;
}

.create-button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.15s;
}

.create-button:hover {
  background: #2563eb;
}

/* Links Container */
.links-container {
  display: grid;
  gap: 16px;
}

/* Link Card */
.link-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: box-shadow 0.2s;
}

.link-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.link-card > * {
  padding: 24px;
}

/* Card Header */
.card-header {
  padding-bottom: 16px;
}

.url-section {
  flex: 1;
  min-width: 0;
}

.url-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  flex-wrap: wrap;
  gap: 8px;
}

.label {
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid;
}

.status-tracked {
  background: #dcfce7;
  color: #166534;
  border-color: #bbf7d0;
}

.status-untracked {
  background: #f3f4f6;
  color: #4b5563;
  border-color: #e5e7eb;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 6px;
}

.dot-green {
  background: #10b981;
}

.dot-gray {
  background: #9ca3af;
}

.original-url {
  color: #1f2937;
  font-weight: 500;
  font-size: 18px;
  text-decoration: none;
  display: block;
  word-break: break-all;
  transition: color 0.15s;
}

.original-url:hover {
  color: #2563eb;
}

/* Short Link Section */
.short-link-section {
  padding-top: 0;
  padding-bottom: 16px;
}

.short-link-container {
  display: flex;
  align-items: center;
  background: #f9fafb;
  border-radius: 8px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  margin-top: 8px;
}

.short-link-code {
  color: #2563eb;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
  font-size: 16px;
  font-weight: 500;
  flex: 1;
  word-break: break-all;
}

.copy-button {
  margin-left: 12px;
  padding: 8px;
  background: transparent;
  border: none;
  color: #6b7280;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s;
}

.copy-button:hover {
  color: #2563eb;
  background: #dbeafe;
}

.check-icon {
  color: #10b981;
}

.copy-success {
  font-size: 12px;
  color: #10b981;
  font-weight: 500;
  margin-top: 4px;
  display: flex;
  align-items: center;
}

.copy-success .el-icon {
  margin-right: 4px;
}

/* Card Footer */
.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;
  flex-wrap: wrap;
  gap: 16px;
}

.metadata {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.metadata-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #6b7280;
}

.metadata-item .el-icon {
  margin-right: 4px;
}

.metadata-label {
  font-weight: 500;
  margin-right: 4px;
}

.metadata-value {
  font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-button {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.15s;
}

.action-button .el-icon {
  margin-right: 6px;
}

.analytics-button {
  color: #1d4ed8;
  background: #dbeafe;
  border-color: #93c5fd;
}

.analytics-button:hover:not(.disabled) {
  background: #bfdbfe;
}

.analytics-button.disabled {
  color: #9ca3af;
  background: #f9fafb;
  border-color: #e5e7eb;
  cursor: not-allowed;
}

.delete-button {
  color: #dc2626;
  background: #fef2f2;
  border-color: #fecaca;
}

.delete-button:hover {
  background: #fee2e2;
}

/* Load More Section */
.load-more-section {
  margin-top: 32px;
  text-align: center;
}

.load-more-button {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.15s;
}

.load-more-button:hover {
  background: #f9fafb;
}

.load-more-button .el-icon {
  margin-right: 8px;
}

.load-more-info {
  font-size: 14px;
  color: #6b7280;
  margin: 8px 0 0 0;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .container {
    padding: 12px;
  }

  .title {
    font-size: 24px;
  }

  .subtitle {
    font-size: 14px;
  }

  .link-card > * {
    padding: 16px;
  }

  .url-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .original-url {
    font-size: 16px;
  }

  .short-link-code {
    font-size: 14px;
  }

  .card-footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .metadata {
    gap: 16px;
    width: 100%;
  }

  .metadata-item {
    font-size: 12px;
  }

  .actions {
    width: 100%;
    justify-content: flex-end;
  }

  .action-button {
    font-size: 12px;
    padding: 8px 12px;
  }

  .button-text {
    display: none;
  }

  .load-more-button {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 8px;
  }

  .link-card > * {
    padding: 12px;
  }

  .metadata {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .short-link-container {
    flex-direction: column;
    align-items: stretch;
  }

  .copy-button {
    margin-left: 0;
    margin-top: 8px;
    align-self: flex-end;
  }
}
</style>