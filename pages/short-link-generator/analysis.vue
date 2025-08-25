<template>
  <div class="page-container">
    <div class="main-container">
      <!-- Header -->
      <div class="header">
        <div>
          <h1 class="title">User Generation History</h1>
          <p class="subtitle">View and analyze your URL generation history</p>
        </div>
        <div class="stats-badges">
          <span class="badge"> Total: {{ historyData.length }} URLs </span>
          <span class="badge">
            Trackable: {{ trackableItems.length }} URLs
          </span>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="loading-content">
          <div class="spinner"></div>
          <span class="loading-text">Loading your history...</span>
        </div>
      </div>

      <!-- Main Content -->
      <div v-else>
        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-content">
              <div>
                <p class="stat-label">Total URLs</p>
                <p class="stat-value">{{ historyData.length }}</p>
                <p class="stat-description">Generated URLs in your history</p>
              </div>
              <div class="stat-icon">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-content">
              <div>
                <p class="stat-label">Trackable URLs</p>
                <p class="stat-value">{{ trackableItems.length }}</p>
                <p class="stat-description">URLs available for analysis</p>
              </div>
              <div class="stat-icon">
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Tabs -->
        <div class="tabs-container">
          <div class="tabs-header">
            <nav class="tabs-nav">
              <button
                @click="activeTab = 'history'"
                class="tab-button"
                :class="{ active: activeTab === 'history' }"
              >
                History
              </button>
              <button
                @click="activeTab = 'analytics'"
                :disabled="!analysisData"
                class="tab-button"
                :class="{
                  active: activeTab === 'analytics' && analysisData,
                  disabled: !analysisData,
                }"
              >
                Analytics
              </button>
            </nav>
          </div>

          <!-- History Tab -->
          <div v-if="activeTab === 'history'" class="tab-content">
            <div class="tab-header">
              <h3 class="tab-title">URL Generation History</h3>
              <p class="tab-description">
                All your generated URLs. Items marked as trackable can be
                analyzed for insights.
              </p>
            </div>

            <!-- Added pagination controls and mobile-optimized table -->
            <!-- Pagination Controls -->
            <div class="pagination-controls">
              <div class="pagination-info">
                <span class="pagination-text">
                  Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
                  {{
                    Math.min(currentPage * itemsPerPage, historyData.length)
                  }}
                  of {{ historyData.length }} entries
                </span>
              </div>
              <div class="pagination-buttons">
                <button
                  @click="goToPage(currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="pagination-btn"
                  :class="{ disabled: currentPage === 1 }"
                >
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                  Previous
                </button>

                <div class="page-numbers">
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    class="page-number"
                    :class="{ active: page === currentPage }"
                  >
                    {{ page }}
                  </button>
                </div>

                <button
                  @click="goToPage(currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="pagination-btn"
                  :class="{ disabled: currentPage === totalPages }"
                >
                  Next
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Mobile Card View -->
            <div class="mobile-cards md:hidden">
              <div
                v-for="item in paginatedData"
                :key="item.id"
                class="mobile-card"
              >
                <div class="mobile-card-header">
                  <div class="short-code-mobile">{{ item.short_code }}</div>
                  <span
                    class="status-badge-mobile"
                    :class="
                      item.is_tracked === 0 ? 'not-trackable' : 'trackable'
                    "
                  >
                    {{ item.is_tracked === 0 ? "Not Trackable" : "Trackable" }}
                  </span>
                </div>
                <div class="mobile-card-content">
                  <div class="url-section">
                    <label class="mobile-label">Original URL:</label>
                    <div class="url-text-mobile" :title="item.original_url">
                      {{ item.original_url }}
                    </div>
                  </div>
                  <div class="date-section">
                    <label class="mobile-label">Created:</label>
                    <span class="date-text-mobile">{{
                      formatDate(item.created_at)
                    }}</span>
                  </div>
                  <div class="action-section" v-if="item.is_tracked === 1">
                    <button
                      @click="handleAnalyzeSpecificItem(item)"
                      :disabled="analysisLoading"
                      class="action-button-mobile"
                      :class="{ disabled: analysisLoading }"
                    >
                      <span
                        v-if="analysisLoading"
                        class="loading-button-content"
                      >
                        <div class="button-spinner-small"></div>
                        Analyzing...
                      </span>
                      <span v-else>Analyze</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop Table View -->
            <div class="table-container hidden md:block">
              <table class="data-table">
                <thead class="table-header">
                  <tr>
                    <th class="table-th">Short Code</th>
                    <th class="table-th">Original URL</th>
                    <th class="table-th">Status</th>
                    <th class="table-th">Created</th>
                    <th class="table-th">Actions</th>
                  </tr>
                </thead>
                <tbody class="table-body">
                  <tr
                    v-for="item in paginatedData"
                    :key="item.id"
                    class="table-row"
                  >
                    <td class="table-td">
                      <div class="short-code">{{ item.short_code }}</div>
                    </td>
                    <td class="table-td">
                      <div class="url-text" :title="item.original_url">
                        {{ item.original_url }}
                      </div>
                    </td>
                    <td class="table-td">
                      <span
                        class="status-badge"
                        :class="
                          item.is_tracked === 0 ? 'not-trackable' : 'trackable'
                        "
                      >
                        {{
                          item.is_tracked === 0 ? "Not Trackable" : "Trackable"
                        }}
                      </span>
                    </td>
                    <td class="table-td">
                      <span class="date-text">{{
                        formatDate(item.created_at)
                      }}</span>
                    </td>
                    <td class="table-td">
                      <button
                        v-if="item.is_tracked === 1"
                        @click="handleAnalyzeSpecificItem(item)"
                        :disabled="analysisLoading"
                        class="action-button"
                        :class="{ disabled: analysisLoading }"
                      >
                        <span
                          v-if="analysisLoading"
                          class="loading-button-content"
                        >
                          <div class="button-spinner-small"></div>
                          Analyzing...
                        </span>
                        <span v-else>Analyze</span>
                      </button>
                      <span v-else class="no-action">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Analytics Tab -->
          <div
            v-if="activeTab === 'analytics' && analysisData"
            class="tab-content"
          >
            <div class="tab-header">
              <h3 class="tab-title">Analytics Dashboard</h3>
              <p class="tab-description">
                Insights and trends from your trackable URLs
              </p>
            </div>

            <!-- Analytics Overview -->
            <div class="analytics-grid">
              <div class="analytics-card blue">
                <div class="analytics-content">
                  <div class="analytics-icon blue">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      ></path>
                    </svg>
                  </div>
                  <div class="analytics-info">
                    <p class="analytics-label">Total Clicks</p>
                    <p class="analytics-value">
                      {{ analysisData.total.toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="analytics-card green">
                <div class="analytics-content">
                  <div class="analytics-icon green">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div class="analytics-info">
                    <p class="analytics-label">Desktop Users</p>
                    <p class="analytics-value">
                      {{
                        Math.round(
                          (analysisData.device_analysis.desktop /
                            analysisData.total) *
                            100
                        )
                      }}%
                    </p>
                  </div>
                </div>
              </div>

              <div class="analytics-card purple">
                <div class="analytics-content">
                  <div class="analytics-icon purple">
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div class="analytics-info">
                    <p class="analytics-label">Mobile Users</p>
                    <p class="analytics-value">
                      {{
                        Math.round(
                          (analysisData.device_analysis.mobile /
                            analysisData.total) *
                            100
                        )
                      }}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Charts -->
            <div class="charts-grid">
              <!-- Daily Trends Line Chart -->
              <div class="chart-card">
                <h4 class="chart-title">Daily Click Trends</h4>
                <div class="chart-container">
                  <canvas ref="lineChart" class="chart-canvas"></canvas>
                </div>
              </div>

              <!-- Device Analysis Pie Chart -->
              <div class="chart-card">
                <h4 class="chart-title">Device Distribution</h4>
                <div class="chart-container centered">
                  <canvas ref="pieChart" class="pie-chart"></canvas>
                </div>
              </div>

              <!-- Referrer Analysis -->
              <div class="chart-card full-width">
                <h4 class="chart-title">Top Referrers</h4>
                <div class="referrer-list">
                  <div
                    v-for="(count, referrer) in analysisData.referer_analysis"
                    :key="referrer"
                    class="referrer-item"
                  >
                    <div class="referrer-info">
                      <div class="referrer-dot"></div>
                      <span class="referrer-name">{{ referrer }}</span>
                    </div>
                    <div class="referrer-stats">
                      <div class="progress-bar">
                        <div
                          class="progress-fill"
                          :style="{
                            width: `${(count / analysisData.total) * 100}%`,
                          }"
                        ></div>
                      </div>
                      <span class="referrer-count">{{
                        count.toLocaleString()
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { getShortList, analysisShortInfo } from "@/services/apiServices";

// Reactive data
const historyData = ref([]);
const analysisData = ref(null);
const loading = ref(true);
const analysisLoading = ref(false);
const activeTab = ref("history");

const currentPage = ref(1);
const itemsPerPage = ref(10);

// Chart refs
const lineChart = ref(null);
const pieChart = ref(null);

// Computed
const trackableItems = computed(() => {
  return historyData.value.filter((item) => item.is_tracked === 1);
});

const totalPages = computed(() => {
  return Math.ceil(historyData.value.length / itemsPerPage.value);
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return historyData.value.slice(start, end);
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const handleAnalyzeSpecificItem = async (item) => {
  analysisLoading.value = true;
  let short_code = item.short_code;
  try {
    const response = await analysisShortInfo(short_code); // You can pass item.id or item.short_code here
    if (response.status === 200) {
      analysisData.value = response.analysis;
      activeTab.value = "analytics";

      // Wait for DOM update then render charts
      await nextTick();
      renderCharts();
    }
  } catch (error) {
    console.error(
      "Failed to fetch analysis data for item:",
      item.short_code,
      error
    );
  } finally {
    analysisLoading.value = false;
  }
};

const formatDate = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const renderCharts = async () => {
  if (!analysisData.value) return;

  await nextTick();

  // Render line chart
  if (lineChart.value) {
    renderLineChart();
  }

  // Render pie chart
  if (pieChart.value) {
    renderPieChart();
  }
};

const renderLineChart = () => {
  const canvas = lineChart.value;
  const ctx = canvas.getContext("2d");
  const data = analysisData.value.daily_trends;

  // Set canvas size
  canvas.width = canvas.offsetWidth * 2;
  canvas.height = canvas.offsetHeight * 2;
  ctx.scale(2, 2);

  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  const padding = 40;

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Find max value for scaling
  const maxValue = Math.max(...data.map((d) => d.count));
  const minValue = 0;

  // Draw grid lines
  ctx.strokeStyle = "#e5e7eb";
  ctx.lineWidth = 1;

  // Horizontal grid lines
  for (let i = 0; i <= 5; i++) {
    const y = padding + ((height - 2 * padding) * i) / 5;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  // Vertical grid lines
  for (let i = 0; i < data.length; i++) {
    const x = padding + ((width - 2 * padding) * i) / (data.length - 1);
    ctx.beginPath();
    ctx.moveTo(x, padding);
    ctx.lineTo(x, height - padding);
    ctx.stroke();
  }

  // Draw line
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 3;
  ctx.beginPath();

  data.forEach((point, index) => {
    const x = padding + ((width - 2 * padding) * index) / (data.length - 1);
    const y =
      height -
      padding -
      ((height - 2 * padding) * (point.count - minValue)) /
        (maxValue - minValue);

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.stroke();

  // Draw points
  ctx.fillStyle = "#3b82f6";
  data.forEach((point, index) => {
    const x = padding + ((width - 2 * padding) * index) / (data.length - 1);
    const y =
      height -
      padding -
      ((height - 2 * padding) * (point.count - minValue)) /
        (maxValue - minValue);

    ctx.beginPath();
    ctx.arc(x, y, 4, 0, 2 * Math.PI);
    ctx.fill();
  });

  // Draw labels
  ctx.fillStyle = "#6b7280";
  ctx.font = "12px sans-serif";
  ctx.textAlign = "center";

  // X-axis labels (dates)
  data.forEach((point, index) => {
    const x = padding + ((width - 2 * padding) * index) / (data.length - 1);
    const date = new Date(point.date);
    const label = `${date.getMonth() + 1}/${date.getDate()}`;
    ctx.fillText(label, x, height - padding + 20);
  });

  // Y-axis labels (values)
  ctx.textAlign = "right";
  for (let i = 0; i <= 5; i++) {
    const value = Math.round(minValue + ((maxValue - minValue) * (5 - i)) / 5);
    const y = padding + ((height - 2 * padding) * i) / 5;
    ctx.fillText(value.toString(), padding - 10, y + 4);
  }
};

const renderPieChart = () => {
  const canvas = pieChart.value;
  const ctx = canvas.getContext("2d");
  const data = analysisData.value.device_analysis;

  // Set canvas size
  canvas.width = 200;
  canvas.height = 200;

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const radius = 80;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate total and angles
  const total = data.desktop + data.mobile;
  const desktopAngle = (data.desktop / total) * 2 * Math.PI;
  const mobileAngle = (data.mobile / total) * 2 * Math.PI;

  let currentAngle = -Math.PI / 2; // Start from top

  // Draw desktop slice
  ctx.fillStyle = "#3b82f6";
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + desktopAngle);
  ctx.closePath();
  ctx.fill();

  currentAngle += desktopAngle;

  // Draw mobile slice
  ctx.fillStyle = "#8b5cf6";
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + mobileAngle);
  ctx.closePath();
  ctx.fill();

  // Draw labels
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 14px sans-serif";
  ctx.textAlign = "center";

  // Desktop label
  const desktopLabelAngle = -Math.PI / 2 + desktopAngle / 2;
  const desktopLabelX = centerX + Math.cos(desktopLabelAngle) * (radius * 0.7);
  const desktopLabelY = centerY + Math.sin(desktopLabelAngle) * (radius * 0.7);
  ctx.fillText(
    `${Math.round((data.desktop / total) * 100)}%`,
    desktopLabelX,
    desktopLabelY
  );

  // Mobile label
  const mobileLabelAngle = -Math.PI / 2 + desktopAngle + mobileAngle / 2;
  const mobileLabelX = centerX + Math.cos(mobileLabelAngle) * (radius * 0.7);
  const mobileLabelY = centerY + Math.sin(mobileLabelAngle) * (radius * 0.7);
  ctx.fillText(
    `${Math.round((data.mobile / total) * 100)}%`,
    mobileLabelX,
    mobileLabelY
  );
};

// Lifecycle
onMounted(async () => {
  try {
    const response = await getShortList({ limit: 100, offset: 1 });
    if (response.status === 200) {
      historyData.value = response.shorts;
    }
  } catch (error) {
    console.error("Failed to fetch history data:", error);
  } finally {
    loading.value = false;
  }
});

// Watch for tab changes to render charts
watch(activeTab, async (newTab) => {
  if (newTab === "analytics" && analysisData.value) {
    await nextTick();
    renderCharts();
  }
});
</script>

<style scoped>
/* Replaced all Tailwind classes with native CSS */
/* Added mobile-first responsive design and pagination styles */
.page-container {
  min-height: 100vh;
  padding: 16px;
  background: linear-gradient(45deg, #667eea, #764ba2);
}

@media (min-width: 768px) {
  .page-container {
    padding: 24px;
  }
}

.main-container {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 768px) {
  .main-container {
    gap: 24px;
  }
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 768px) {
  .header {
    flex-direction: row;
    align-items: center;
  }
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  margin: 0;
}

@media (min-width: 768px) {
  .title {
    font-size: 1.875rem;
  }
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  margin: 8px 0 0 0;
  font-size: 0.875rem;
}

@media (min-width: 768px) {
  .subtitle {
    font-size: 1rem;
  }
}

.stats-badges {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

@media (min-width: 768px) {
  .stats-badges {
    gap: 16px;
  }
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  backdrop-filter: blur(4px);
}

@media (min-width: 768px) {
  .badge {
    padding: 4px 10px;
  }
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
}

.loading-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-bottom: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: white;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
    margin-bottom: 32px;
  }
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (min-width: 768px) {
  .stat-card {
    padding: 24px;
  }
}

.stat-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 4px 0;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  margin: 0 0 4px 0;
}

@media (min-width: 768px) {
  .stat-value {
    font-size: 1.5rem;
  }
}

.stat-description {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.stat-icon {
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: white;
}

@media (min-width: 768px) {
  .stat-icon {
    padding: 12px;
  }
}

.tabs-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tabs-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.tabs-nav {
  display: flex;
  gap: 24px;
  padding: 0 16px;
}

@media (min-width: 768px) {
  .tabs-nav {
    gap: 32px;
    padding: 0 24px;
  }
}

.tab-button {
  padding: 16px 4px;
  border-bottom: 2px solid transparent;
  font-weight: 500;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-button:hover:not(.disabled) {
  color: rgba(255, 255, 255, 0.8);
  border-bottom-color: rgba(255, 255, 255, 0.3);
}

.tab-button.active {
  border-bottom-color: white;
  color: white;
}

.tab-button.disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.tab-content {
  padding: 16px;
}

@media (min-width: 768px) {
  .tab-content {
    padding: 24px;
  }
}

.tab-header {
  margin-bottom: 16px;
}

.tab-title {
  font-size: 1rem;
  font-weight: 500;
  color: white;
  margin: 0 0 8px 0;
}

@media (min-width: 768px) {
  .tab-title {
    font-size: 1.125rem;
  }
}

.tab-description {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

/* Pagination Styles */
.pagination-controls {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
}

@media (min-width: 768px) {
  .pagination-controls {
    flex-direction: row;
    justify-content: space-between;
  }
}

.pagination-info {
  order: 2;
}

@media (min-width: 768px) {
  .pagination-info {
    order: 1;
  }
}

.pagination-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.pagination-buttons {
  display: flex;
  align-items: center;
  gap: 8px;
  order: 1;
}

@media (min-width: 768px) {
  .pagination-buttons {
    order: 2;
  }
}

.pagination-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
}

.pagination-btn:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.pagination-btn.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 4px;
}

.page-number {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  backdrop-filter: blur(4px);
}

.page-number:hover {
  background: rgba(255, 255, 255, 0.3);
}

.page-number.active {
  background: rgba(255, 255, 255, 0.4);
  border-color: rgba(255, 255, 255, 0.6);
}

/* Mobile Card Styles */
.mobile-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.mobile-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 16px;
}

.mobile-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.short-code-mobile {
  font-size: 1rem;
  font-weight: 600;
  color: white;
}

.status-badge-mobile {
  display: inline-flex;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
}

.status-badge-mobile.not-trackable {
  background: #fecaca;
  color: #991b1b;
}

.status-badge-mobile.trackable {
  background: #bbf7d0;
  color: #166534;
}

.mobile-card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.url-section,
.date-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.url-text-mobile {
  font-size: 0.875rem;
  color: white;
  word-break: break-all;
  line-height: 1.4;
}

.date-text-mobile {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.action-section {
  margin-top: 8px;
}

.action-button-mobile {
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 6px;
  transition: background-color 0.2s;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.action-button-mobile:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.action-button-mobile.disabled {
  background: rgba(255, 255, 255, 0.1);
  cursor: not-allowed;
}

/* Desktop Table Styles */
.table-container {
  overflow-x: auto;
}

.data-table {
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.table-header {
  background: rgba(255, 255, 255, 0.1);
}

.table-th {
  padding: 12px 24px;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.table-body {
  background: rgba(255, 255, 255, 0.05);
}

.table-row {
  transition: background-color 0.2s;
}

.table-row:hover {
  background: rgba(255, 255, 255, 0.1);
}

.table-row:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.table-td {
  padding: 16px 24px;
  white-space: nowrap;
}

.short-code {
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
}

.url-text {
  font-size: 0.875rem;
  color: white;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-badge {
  display: inline-flex;
  padding: 4px 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 9999px;
}

.status-badge.not-trackable {
  background: #fecaca;
  color: #991b1b;
}

.status-badge.trackable {
  background: #bbf7d0;
  color: #166534;
}

.date-text {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.8);
}

.action-button {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 0.75rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
}

.action-button:hover:not(.disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.action-button.disabled {
  background: rgba(255, 255, 255, 0.1);
  cursor: not-allowed;
}

.no-action {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
}

.loading-button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.button-spinner-small {
  width: 12px;
  height: 12px;
  border: 1px solid transparent;
  border-bottom: 1px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Analytics Styles */
.analytics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 24px;
}

@media (min-width: 768px) {
  .analytics-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin-bottom: 32px;
  }
}

.analytics-card {
  border-radius: 8px;
  padding: 20px;
  border: 1px solid #e5e7eb;
}

@media (min-width: 768px) {
  .analytics-card {
    padding: 24px;
  }
}

.analytics-card.blue {
  background: #eff6ff;
}

.analytics-card.green {
  background: #f0fdf4;
}

.analytics-card.purple {
  background: #faf5ff;
}

.analytics-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.analytics-icon {
  padding: 8px;
  border-radius: 8px;
}

.analytics-icon.blue {
  background: #dbeafe;
  color: #2563eb;
}

.analytics-icon.green {
  background: #dcfce7;
  color: #16a34a;
}

.analytics-icon.purple {
  background: #f3e8ff;
  color: #9333ea;
}

.analytics-label {
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 4px 0;
}

.analytics-card.blue .analytics-label {
  color: #2563eb;
}

.analytics-card.green .analytics-label {
  color: #16a34a;
}

.analytics-card.purple .analytics-label {
  color: #9333ea;
}

.analytics-value {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
}

@media (min-width: 768px) {
  .analytics-value {
    font-size: 1.5rem;
  }
}

.analytics-card.blue .analytics-value {
  color: #1e3a8a;
}

.analytics-card.green .analytics-value {
  color: #14532d;
}

.analytics-card.purple .analytics-value {
  color: #581c87;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .charts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }
}

.chart-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

@media (min-width: 768px) {
  .chart-card {
    padding: 24px;
  }
}

.chart-card.full-width {
  grid-column: 1 / -1;
}

.chart-title {
  font-size: 1rem;
  font-weight: 500;
  color: #111827;
  margin: 0 0 16px 0;
}

@media (min-width: 768px) {
  .chart-title {
    font-size: 1.125rem;
  }
}

.chart-container {
  height: 200px;
}

@media (min-width: 768px) {
  .chart-container {
    height: 256px;
  }
}

.chart-container.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-canvas {
  width: 100%;
  height: 100%;
}

.pie-chart {
  max-width: 100%;
  max-height: 100%;
}

.referrer-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.referrer-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;
}

@media (min-width: 768px) {
  .referrer-item {
    flex-direction: row;
    gap: 0;
  }
}

.referrer-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.referrer-dot {
  width: 16px;
  height: 16px;
  background: #3b82f6;
  border-radius: 50%;
}

.referrer-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.referrer-stats {
  display: flex;
  align-items: center;
  gap: 12px;
}

.progress-bar {
  width: 100px;
  background: #e5e7eb;
  border-radius: 9999px;
  height: 8px;
}

@media (min-width: 768px) {
  .progress-bar {
    width: 128px;
  }
}

.progress-fill {
  background: #3b82f6;
  height: 8px;
  border-radius: 9999px;
  transition: width 0.3s ease;
}

.referrer-count {
  font-size: 0.875rem;
  color: #6b7280;
  width: 64px;
  text-align: right;
}

/* Utility Classes */
.hidden {
  display: none;
}

@media (min-width: 768px) {
  .md\:hidden {
    display: none;
  }

  .md\:block {
    display: block;
  }
}

/* Custom scrollbar */
.table-container::-webkit-scrollbar {
  height: 6px;
}

.table-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.table-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
