<template>
  <div class="main-container">
    <header class="header">
      <h1 class="title">Timestamp Converter</h1>
      <p class="subtitle">
        Convert between Unix timestamps and human-readable dates
      </p>
    </header>

    <main class="main">
      <!-- Current Timestamp Display -->
      <section class="current-time-section">
        <div class="current-time-card">
          <h2>Current Timestamp</h2>
          <div class="current-timestamp">{{ currentTimestamp }}</div>
          <div class="current-date">{{ currentDate }}</div>
          <button @click="refreshCurrentTime" class="refresh-btn">
            Refresh
          </button>
        </div>
      </section>

      <!-- Conversion Tools -->
      <div class="converter-grid">
        <!-- Timestamp to Date -->
        <section class="converter-section">
          <div class="converter-card">
            <h2 class="converter-title">
              <span class="icon">🕐</span>
              Timestamp to Date
            </h2>
            <div class="input-group">
              <label for="timestamp-input">Enter Timestamp:</label>
              <input
                id="timestamp-input"
                v-model="timestampInput"
                type="number"
                placeholder="1640995200"
                class="input-field"
                @input="convertTimestampToDate"
              />
              <div class="input-hint">
                Unix timestamp (seconds or milliseconds)
              </div>
            </div>
            <div class="result-group">
              <label>Converted Date:</label>
              <div class="result-display">
                {{ timestampResult || "Enter a timestamp above" }}
              </div>
            </div>
          </div>
        </section>

        <!-- Date to Timestamp -->
        <section class="converter-section">
          <div class="converter-card">
            <h2 class="converter-title">
              <span class="icon">📅</span>
              Date to Timestamp
            </h2>
            <div class="input-group">
              <label for="date-input">Select Date & Time:</label>
              <input
                id="date-input"
                v-model="dateInput"
                type="datetime-local"
                class="input-field"
                @input="convertDateToTimestamp"
              />
            </div>
            <div class="result-group">
              <label>Unix Timestamp:</label>
              <div class="result-display">
                {{ dateResult || "Select a date above" }}
              </div>
              <button
                v-if="dateResult"
                @click="copyToClipboard(dateResult)"
                class="copy-btn"
              >
                Copy
              </button>
            </div>
          </div>
        </section>
      </div>

      <!-- Code Examples Section -->
      <section class="code-examples-section">
        <h2 class="section-title">
          Get Current Timestamp in Different Languages
        </h2>
        <div class="code-grid">
          <div
            class="code-card"
            v-for="example in codeExamples"
            :key="example.language"
          >
            <div class="code-header">
              <h3 class="code-language">{{ example.language }}</h3>
              <button
                @click="copyToClipboard(example.code)"
                class="copy-code-btn"
              >
                Copy
              </button>
            </div>
            <pre class="code-block"><code>{{ example.code }}</code></pre>
          </div>
        </div>
      </section>

      <!-- Information Section -->
      <section class="info-section">
        <div class="info-card">
          <h2>About Unix Timestamps</h2>
          <p>
            A Unix timestamp is the number of seconds that have elapsed since
            January 1, 1970, 00:00:00 UTC. It's a widely used standard for
            representing time in computer systems.
          </p>
          <ul>
            <li>
              <strong>Seconds:</strong> Standard Unix timestamp (10 digits)
            </li>
            <li>
              <strong>Milliseconds:</strong> JavaScript timestamp (13 digits)
            </li>
            <li>
              <strong>UTC:</strong> All timestamps are in Coordinated Universal
              Time
            </li>
          </ul>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2024 Timestamp Converter Tool</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Reactive data
const currentTimestamp = ref("");
const currentDate = ref("");
const timestampInput = ref("");
const timestampResult = ref("");
const dateInput = ref("");
const dateResult = ref("");

let intervalId = null;

// Code examples for different programming languages
const codeExamples = ref([
  {
    language: "JavaScript",
    code: `// Get current timestamp in seconds
const timestamp = Math.floor(Date.now() / 1000);

// Get current timestamp in milliseconds
const timestampMs = Date.now();`,
  },
  {
    language: "Python",
    code: `import time
import datetime

# Get current timestamp
timestamp = int(time.time())

# Using datetime
timestamp = int(datetime.datetime.now().timestamp())`,
  },
  {
    language: "PHP",
    code: `<?php
// Get current timestamp
$timestamp = time();

// Using DateTime
$timestamp = (new DateTime())->getTimestamp();
?>`,
  },
  {
    language: "Java",
    code: `// Get current timestamp in seconds
long timestamp = System.currentTimeMillis() / 1000;

// Using Instant
long timestamp = Instant.now().getEpochSecond();`,
  },
  {
    language: "C#",
    code: `// Get current timestamp
long timestamp = DateTimeOffset.Now.ToUnixTimeSeconds();

// Using DateTime
long timestamp = ((DateTimeOffset)DateTime.Now).ToUnixTimeSeconds();`,
  },
  {
    language: "Go",
    code: `package main
import (
    "time"
)
// Get current timestamp
timestamp := time.Now().Unix()

// Get timestamp in milliseconds
timestampMs := time.Now().UnixMilli()`,
  },
  {
    language: "Ruby",
    code: `# Get current timestamp
timestamp = Time.now.to_i

# Using DateTime
timestamp = DateTime.now.to_time.to_i`,
  },
  {
    language: "Rust",
    code: `use std::time::{SystemTime, UNIX_EPOCH};

// Get current timestamp
let timestamp = SystemTime::now()
    .duration_since(UNIX_EPOCH)
    .unwrap()
    .as_secs();`,
  },
]);

// Methods
const updateCurrentTime = () => {
  const now = new Date();
  currentTimestamp.value = Math.floor(now.getTime() / 1000);
  currentDate.value = now.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
};

const refreshCurrentTime = () => {
  updateCurrentTime();
};

const convertTimestampToDate = () => {
  if (!timestampInput.value) {
    timestampResult.value = "";
    return;
  }

  let timestamp = parseInt(timestampInput.value);

  // Handle both seconds and milliseconds
  if (timestamp.toString().length === 10) {
    timestamp *= 1000;
  }

  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      timestampResult.value = "Invalid timestamp";
      return;
    }

    timestampResult.value = date.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  } catch (error) {
    timestampResult.value = "Invalid timestamp";
  }
};

const convertDateToTimestamp = () => {
  if (!dateInput.value) {
    dateResult.value = "";
    return;
  }

  try {
    const date = new Date(dateInput.value);
    if (isNaN(date.getTime())) {
      dateResult.value = "Invalid date";
      return;
    }

    dateResult.value = Math.floor(date.getTime() / 1000).toString();
  } catch (error) {
    dateResult.value = "Invalid date";
  }
};

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    // You could add a toast notification here
  } catch (error) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
};

// Lifecycle
onMounted(() => {
  updateCurrentTime();
  intervalId = setInterval(updateCurrentTime, 1000);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

useHead({
  title: "Timestamp Converter - Convert Timestamp to Date & Vice Versa",
  meta: [
    {
      name: "description",
      content:
        "Free online timestamp converter tool. Easily convert timestamps to human-readable dates or dates to timestamps. Accurate, fast, and user-friendly.",
    },
    {
      name: "keywords",
      content:
        "timestamp converter, unix timestamp, date to timestamp, timestamp to date, online time converter, epoch converter",
    },
    { name: "robots", content: "index, follow" },
    { name: "author", content: "Kithubs" },
    { property: "og:title", content: "Timestamp Converter - Kithubs" },
    {
      property: "og:description",
      content:
        "Convert timestamps to dates or dates to timestamps with our free, accurate, and easy-to-use online tool.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://kithubs.com/timestamp-converter" },
    { property: "og:image", content: "https://kithubs.com/logo.png" },
    { property: "og:site_name", content: "Kithubs" },
  ],
  link: [{ rel: "canonical", href: "https://kithubs.com/timestamp-converter" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Timestamp Converter",
        url: "https://kithubs.com/timestamp-converter",
        description:
          "Free online tool to convert timestamps to human-readable dates and dates to timestamps with high accuracy.",
        publisher: {
          "@type": "Organization",
          name: "Kithubs",
          logo: {
            "@type": "ImageObject",
            url: "https://kithubs.com/logo.png",
          },
        },
        applicationCategory: "Utilities",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Timestamp to Date Conversion",
          "Date to Timestamp Conversion",
          "Unix Epoch Support",
          "User-Friendly Interface",
        ],
      }),
    },
  ],
});
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.main-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
}

.header {
  text-align: center;
  padding: 2rem 1rem;
  color: white;
}

.title {
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-weight: 700;
}

.subtitle {
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 2rem 1rem;
}

.current-time-section {
  margin-bottom: 2rem;
}

.current-time-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.current-time-card h2 {
  margin: 0 0 1rem 0;
  color: #4a5568;
  font-size: 1.5rem;
}

.current-timestamp {
  font-size: 2rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
  font-family: "Courier New", monospace;
}

.current-date {
  font-size: 1.1rem;
  color: #718096;
  margin-bottom: 1rem;
}

.refresh-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.refresh-btn:hover {
  background: #5a67d8;
}

.converter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.converter-section {
  display: flex;
  flex-direction: column;
}

.converter-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  height: 100%;
}

.converter-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 0 1.5rem 0;
  color: #4a5568;
  font-size: 1.3rem;
}

.icon {
  font-size: 1.5rem;
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4a5568;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: #667eea;
}

.input-hint {
  font-size: 0.8rem;
  color: #718096;
  margin-top: 0.25rem;
}

.result-group {
  position: relative;
}

.result-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4a5568;
}

.result-display {
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.75rem;
  min-height: 3rem;
  font-family: "Courier New", monospace;
  color: #2d3748;
  word-break: break-all;
}

.copy-btn {
  position: absolute;
  right: 0.5rem;
  top: 2rem;
  background: #48bb78;
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.2s;
}

.copy-btn:hover {
  background: #38a169;
}

.code-examples-section {
  margin-bottom: 3rem;
}

.section-title {
  text-align: center;
  color: white;
  font-size: 2rem;
  margin-bottom: 2rem;
}

.code-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.code-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #2d3748;
  color: white;
}

.code-language {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.copy-code-btn {
  background: #4299e1;
  color: white;
  border: none;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: background-color 0.2s;
}

.copy-code-btn:hover {
  background: #3182ce;
}

.code-block {
  margin: 0;
  padding: 1.5rem;
  background: #1a202c;
  color: #e2e8f0;
  font-family: "Courier New", monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-x: auto;
  height: 300px;
  white-space: pre-wrap;
  word-break: break-all;
  border-radius: 0 0 12px 12px;
}

.info-section {
  margin-bottom: 2rem;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.info-card h2 {
  color: #4a5568;
  margin-bottom: 1rem;
}

.info-card p {
  color: #718096;
  margin-bottom: 1rem;
}

.info-card ul {
  color: #718096;
  padding-left: 1.5rem;
}

.info-card li {
  margin-bottom: 0.5rem;
}

.footer {
  text-align: center;
  padding: 2rem;
  color: white;
  opacity: 0.8;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .converter-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .code-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .current-time-card,
  .converter-card,
  .info-card {
    padding: 1.5rem;
  }

  .current-timestamp {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .code-block {
    font-size: 0.8rem;
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .main {
    padding: 0 0.5rem 2rem 0.5rem;
  }

  .header {
    padding: 1.5rem 0.5rem;
  }

  .title {
    font-size: 1.8rem;
  }

  .current-time-card,
  .converter-card,
  .info-card {
    padding: 1rem;
  }

  .converter-title {
    font-size: 1.1rem;
  }

  .current-timestamp {
    font-size: 1.3rem;
  }
}
</style>