<template>
  <div class="page-wrapper">
    <div class="main-wrapper">
      <!-- Hero Section for the Tool -->
      <header class="hero-section">
        <div class="hero-content">
          <div class="hero-icon">
            <ImageIcon />
          </div>
          <h1 class="hero-title">Image Processing Tool</h1>
          <p class="hero-subtitle">
            Resize, compress, and convert your images instantly. Fast, free, and secure.
          </p>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="main-content">
        <div class="tool-card">
          <!-- Upload Section -->
          <div class="input-section">
            <label for="file-upload" class="input-label">
              <UploadIcon />
              Upload Your Image
            </label>
            <div class="input-wrapper">
              <input
                id="file-upload"
                type="file"
                @change="handleFileChange"
                accept="image/*"
                class="url-input"
                placeholder="Click to select or drag & drop an image"
              />
              <div class="input-decoration"></div>
            </div>
            <p class="input-hint">
              Select an image file (JPG, PNG, WebP) from your device.
            </p>
          </div>

          <div v-if="originalImage" class="processing-area">
            <!-- Image Previews -->
            <div class="image-preview-container">
              <div class="image-card">
                <h3>Original Image</h3>
                <img :src="originalImageSrc" alt="Original Image" class="image-preview" />
                <p class="image-info">Dimensions: {{ originalImage.width }}x{{ originalImage.height }}px</p>
                <p class="image-info">Size: {{ (originalImageInfo.size / 1024).toFixed(2) }} KB</p>
              </div>
              <div class="image-card">
                <h3>Processed Image</h3>
                <canvas ref="canvas" class="image-preview processed-canvas"></canvas>
                <p v-if="processedImageInfo" class="image-info">
                  Dimensions: {{ processedImageInfo.width }}x{{ processedImageInfo.height }}px
                </p>
                <p v-if="processedImageInfo && processedImageInfo.size" class="image-info">
                  Size: {{ (processedImageInfo.size / 1024).toFixed(2) }} KB
                </p>
                <p v-else class="image-info">Process image to see preview.</p>
              </div>
            </div>

            <!-- Tool Options -->
            <div class="controls-grid">
              <div class="control-group">
                <h3>Resize Options</h3>
                <div class="input-row">
                  <label for="width-input">Width (px):</label>
                  <input id="width-input" type="number" v-model.number="newWidth" placeholder="Auto" class="text-input" />
                </div>
                <div class="input-row">
                  <label for="height-input">Height (px):</label>
                  <input id="height-input" type="number" v-model.number="newHeight" placeholder="Auto" class="text-input" />
                </div>
                <div class="input-row">
                  <label for="scale-input">Scale (%):</label>
                  <input id="scale-input" type="number" v-model.number="scaleFactor" min="1" max="200" placeholder="100" class="text-input" />
                </div>
                <button @click="resetDimensions" class="btn btn-secondary reset-button">Reset Dimensions</button>
              </div>

              <div class="control-group">
                <h3>Output Format & Quality</h3>
                <div class="input-row">
                  <label for="format-select">Format:</label>
                  <select id="format-select" v-model="outputFormat" class="select-input">
                    <option value="image/jpeg">JPEG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </div>
                <div v-if="outputFormat === 'image/jpeg'" class="input-row">
                  <label for="quality-slider">Quality (JPEG):</label>
                  <input id="quality-slider" type="range" v-model.number="jpegQuality" min="10" max="100" step="1" class="range-input" />
                  <span>{{ jpegQuality }}%</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="action-section">
              <button @click="processImage" :disabled="isLoading" class="btn btn-primary">
                <span v-if="isLoading" class="loading-spinner"></span>
                <ProcessIcon v-else />
                {{ isLoading ? 'Processing...' : 'Process Image' }}
              </button>
              <button @click="downloadImage" :disabled="!processedImageSrc" class="btn btn-secondary">
                <DownloadIcon />
                Download Image
              </button>
            </div>
          </div>
        </div>

        <!-- How to Use Section -->
        <section class="how-to-section">
          <h2 class="section-title">How to Use Our Image Tool</h2>
          <div class="steps-container">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 class="step-title">Upload Your Image</h3>
                <p class="step-description">
                  Click the "Upload Your Image" button or drag and drop your image file into the designated area.
                </p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 class="step-title">Adjust Settings</h3>
                <p class="step-description">
                  Choose your desired options: resize by width/height/scale, adjust JPEG quality, or convert to a new format.
                </p>
              </div>
            </div>

            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 class="step-title">Process & Download</h3>
                <p class="step-description">
                  Click "Process Image" to see the result, then click "Download Image" to save it to your device.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Features Section -->
        <section class="features-section">
          <h2 class="section-title">Why Choose Our Image Tool?</h2>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon speed">
                <SpeedIcon />
              </div>
              <h3 class="feature-title">Lightning Fast</h3>
              <p class="feature-description">
                Get your images processed instantly with our optimized client-side engine.
              </p>
            </div>

            <div class="feature-card">
              <div class="feature-icon security">
                <SecurityIcon />
              </div>
              <h3 class="feature-title">100% Private & Secure</h3>
              <p class="feature-description">
                All image processing happens directly in your browser. Your files never leave your device.
              </p>
            </div>

            <div class="feature-card">
              <div class="feature-icon free">
                <FreeIcon />
              </div>
              <h3 class="feature-title">Completely Free</h3>
              <p class="feature-description">
                Enjoy unlimited image processing without any cost or hidden fees.
              </p>
            </div>
          </div>
        </section>

        <!-- FAQ Section -->
        <section class="faq-section">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <div class="faq-container">
            <div class="faq-item">
              <h3 class="faq-question">What image formats are supported for upload?</h3>
              <p class="faq-answer">
                Our tool supports common image formats like JPEG, PNG, and WebP for upload.
              </p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">Can I convert images to different formats?</h3>
              <p class="faq-answer">
                Yes, you can convert your images to JPEG, PNG, or WebP formats using the "Output Format" option.
              </p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">Is there a limit to image file size?</h3>
              <p class="faq-answer">
                While there's no strict limit imposed by the tool, very large images might take longer to process depending on your device's performance.
              </p>
            </div>
            <div class="faq-item">
              <h3 class="faq-question">Are my images uploaded to a server?</h3>
              <p class="faq-answer">
                No, all image processing is done locally in your browser. Your images are never uploaded to our servers, ensuring your privacy.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, h, onMounted } from 'vue';

// --- Icon Components (Matching your homepage's style) ---
const ImageIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'currentColor', width: '40', height: '40' }, [
  h('path', { d: 'M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z' })
]);

const UploadIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', width: '20', height: '20' }, [
  h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
  h('polyline', { points: '17 8 12 3 7 8' }),
  h('line', { x1: '12', y1: '3', x2: '12', y2: '15' })
]);

const ProcessIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', width: '20', height: '20' }, [
  h('path', { d: 'M12 2v4' }),
  h('path', { d: 'M12 18v4' }),
  h('path', { d: 'M4.93 4.93l2.83 2.83' }),
  h('path', { d: 'M16.24 16.24l2.83 2.83' }),
  h('path', { d: 'M2 12h4' }),
  h('path', { d: 'M18 12h4' }),
  h('path', { d: 'M4.93 19.07l2.83-2.83' }),
  h('path', { d: 'M16.24 7.76l2.83-2.83' })
]);

const DownloadIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', width: '20', height: '20' }, [
  h('path', { d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' }),
  h('polyline', { points: '7 10 12 15 17 10' }),
  h('line', { x1: '12', y1: '15', x2: '12', y2: '3' })
]);

const SpeedIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', width: '32', height: '32' }, [
  h('path', { d: 'M13 10V3L4 14h7v7l9-11h-7z' })
]);

const SecurityIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', width: '32', height: '32' }, [
  h('path', { d: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' })
]);

const FreeIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round', width: '32', height: '32' }, [
  h('path', { d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' })
]);

// --- Reactive State ---
const originalImage = ref<HTMLImageElement | null>(null);
const originalImageSrc = ref<string | null>(null);
const originalImageInfo = reactive({ width: 0, height: 0, size: 0 });

const processedImageSrc = ref<string | null>(null);
const processedImageInfo = reactive({ width: 0, height: 0, size: 0 });

const newWidth = ref<number | null>(null);
const newHeight = ref<number | null>(null);
const scaleFactor = ref<number>(100); // Default 100%

const outputFormat = ref<string>('image/jpeg');
const jpegQuality = ref<number>(80); // Default JPEG quality

const isLoading = ref<boolean>(false);
const canvas = ref<HTMLCanvasElement | null>(null); // Reference to the canvas element

// --- SEO Setup ---
useHead({
  title: 'Image Processing Tool - Resize, Compress, Convert | Kithubs',
  meta: [
    { name: 'description', content: 'A free online tool to resize, compress, and convert your images (JPG, PNG, WebP) instantly. Optimize image size and format for web and more.' },
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
    { property: 'og:url', content: 'https://kithubs.com/image-tool' }, // Update with your actual URL
    { property: 'og:title', content: 'Image Processing Tool - Resize, Compress, Convert | Kithubs' },
    { property: 'og:description', content: 'A free online tool to resize, compress, and convert your images (JPG, PNG, WebP) instantly. Optimize image size and format for web and more.' },
    { property: 'og:image', content: 'https://kithubs.com/logo.png' }, // Use your site's logo
  ],
  link: [{ rel: 'canonical', href: 'https://kithubs.com/image-tool' }], // Update with your actual URL
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Kithubs Image Processing Tool",
        description: "Easily resize, compress, and convert images online for free. Supports JPG, PNG, WebP formats with custom dimensions and quality settings.",
        url: "https://kithubs.com/image-tool", // Update with your actual URL
        logo: "https://kithubs.com/logo.png",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: [
          "Image Resizer",
          "Image Compressor",
          "Image Converter",
          "Free and Fast",
          "Client-Side Processing (Privacy)",
          "No Account Required",
        ],
        author: {
          "@type": "Organization",
          name: "Chenyx",
        },
      }),
    },
  ],
});

// --- Functions ---

// Handle file input change
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    isLoading.value = true;
    originalImageInfo.size = file.size; // Store original file size

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        originalImage.value = img;
        originalImageSrc.value = e.target?.result as string;
        originalImageInfo.width = img.width;
        originalImageInfo.height = img.height;

        // Reset and set initial dimensions for processing
        resetDimensions();
        processImage(); // Automatically process on image load
        isLoading.value = false;
      };
      img.onerror = () => {
        isLoading.value = false;
        alert('Could not load image. Please ensure it is a valid image file.');
        resetToolState();
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    resetToolState();
  }
};

// Reset dimensions to original image size
const resetDimensions = () => {
  if (originalImage.value) {
    newWidth.value = originalImage.value.width;
    newHeight.value = originalImage.value.height;
    scaleFactor.value = 100;
  }
};

// Reset all tool state
const resetToolState = () => {
  originalImage.value = null;
  originalImageSrc.value = null;
  originalImageInfo.width = 0;
  originalImageInfo.height = 0;
  originalImageInfo.size = 0;

  processedImageSrc.value = null;
  processedImageInfo.width = 0;
  processedImageInfo.height = 0;
  processedImageInfo.size = 0;

  newWidth.value = null;
  newHeight.value = null;
  scaleFactor.value = 100;
  outputFormat.value = 'image/jpeg';
  jpegQuality.value = 80;
  isLoading.value = false;

  if (canvas.value) {
    const ctx = canvas.value.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    }
    canvas.value.width = 0;
    canvas.value.height = 0;
  }
};

// Process the image based on current settings
const processImage = async () => {
  if (!originalImage.value || !canvas.value) {
    processedImageSrc.value = null;
    processedImageInfo.width = 0;
    processedImageInfo.height = 0;
    processedImageInfo.size = 0;
    return;
  }

  isLoading.value = true;
  const ctx = canvas.value.getContext('2d');
  if (!ctx) {
    isLoading.value = false;
    return;
  }

  let targetWidth = originalImage.value.width;
  let targetHeight = originalImage.value.height;

  // Apply scale factor first if provided
  if (scaleFactor.value !== 100 && scaleFactor.value > 0) {
    targetWidth = originalImage.value.width * (scaleFactor.value / 100);
    targetHeight = originalImage.value.height * (scaleFactor.value / 100);
  }

  // Apply explicit width/height, maintaining aspect ratio if only one is set
  if (newWidth.value && newWidth.value > 0 && newHeight.value && newHeight.value > 0) {
    targetWidth = newWidth.value;
    targetHeight = newHeight.value;
  } else if (newWidth.value && newWidth.value > 0) {
    targetWidth = newWidth.value;
    targetHeight = (originalImage.value.height / originalImage.value.width) * targetWidth;
  } else if (newHeight.value && newHeight.value > 0) {
    targetHeight = newHeight.value;
    targetWidth = (originalImage.value.width / originalImage.value.height) * targetHeight;
  }

  // Ensure dimensions are integers
  targetWidth = Math.round(targetWidth);
  targetHeight = Math.round(targetHeight);

  canvas.value.width = targetWidth;
  canvas.value.height = targetHeight;

  ctx.clearRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(originalImage.value, 0, 0, targetWidth, targetHeight);

  // Get processed image data URL
  let dataUrl;
  if (outputFormat.value === 'image/jpeg') {
    dataUrl = canvas.value.toDataURL(outputFormat.value, jpegQuality.value / 100);
  } else {
    dataUrl = canvas.value.toDataURL(outputFormat.value);
  }

  processedImageSrc.value = dataUrl;

  // Get accurate size of the processed image
  try {
    const blob = await (await fetch(dataUrl)).blob();
    processedImageInfo.size = blob.size;
  } catch (error) {
    console.error("Error getting blob size:", error);
    processedImageInfo.size = 0; // Fallback
  }

  processedImageInfo.width = targetWidth;
  processedImageInfo.height = targetHeight;
  isLoading.value = false;
};

// Download the processed image
const downloadImage = () => {
  if (processedImageSrc.value) {
    const link = document.createElement('a');
    link.href = processedImageSrc.value;
    const filename = `kithubs_image.${outputFormat.value.split('/')[1].split('+')[0]}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// Watch for changes in processing options to re-process automatically
watch([newWidth, newHeight, scaleFactor, outputFormat, jpegQuality], () => {
  if (originalImage.value && !isLoading.value) {
    processImage();
  }
}, { deep: true }); // Deep watch for reactive objects like newWidth/newHeight

// Initial processing when component mounts and image is available
watch(originalImage, (newVal) => {
  if (newVal) {
    processImage();
  }
});
</script>

<style scoped>
/* --- Global Styles (Copied from your index.vue for consistency) --- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%); /* Matching video downloader */
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  line-height: 1.6;
}

.main-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-content {
  padding-bottom: 80px;
}

/* --- Hero Section (Adapted from your video downloader) --- */
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

/* --- Tool Card (Adapted from your video downloader's .downloader-card) --- */
.tool-card {
  background: white;
  border-radius: 24px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  margin-bottom: 80px;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

/* --- Input Section (Adapted from your video downloader) --- */
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

.input-label svg {
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

/* --- Processing Area --- */
.processing-area {
  border-top: 1px solid #e5e7eb;
  padding-top: 32px;
}

.image-preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  margin-bottom: 40px;
}

.image-card {
  flex: 1;
  min-width: 300px;
  max-width: 45%;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  background-color: #fafafa;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.image-card h3 {
  font-size: 1.4em;
  margin-bottom: 15px;
  color: #1e3c72; /* Primary color for titles */
}

.image-preview {
  max-width: 100%;
  height: auto;
  max-height: 250px; /* Limit height for better layout */
  border: 1px solid #eee;
  border-radius: 8px;
  display: block;
  margin: 0 auto 15px auto;
  background-color: #fff;
  object-fit: contain; /* Ensure image fits without cropping */
}

.processed-canvas {
  background-color: #fff; /* Ensure canvas background is white */
}

.image-info {
  font-size: 0.9em;
  color: #555;
  margin-top: 5px;
}

/* --- Controls Grid --- */
.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.control-group {
  background-color: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.control-group h3 {
  font-size: 1.6em;
  margin-bottom: 20px;
  color: #111827;
}

.input-row {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.input-row label {
  flex: 1;
  margin-right: 15px;
  font-weight: 600;
  color: #555;
}

.text-input,
.select-input {
  flex: 2;
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1em;
  color: #333;
  background-color: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.text-input:focus,
.select-input:focus {
  outline: none;
  border-color: #1e3c72;
  box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.1);
}

.range-input {
  flex: 2;
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  background: #ddd;
  outline: none;
  opacity: 0.7;
  transition: opacity .2s;
  border-radius: 4px;
}

.range-input:hover {
  opacity: 1;
}

.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #1e3c72; /* Matching primary color */
  cursor: pointer;
  box-shadow: 0 0 0 2px rgba(30, 60, 114, 0.3);
}

.range-input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #1e3c72;
  cursor: pointer;
  box-shadow: 0 0 0 2px rgba(30, 60, 114, 0.3);
}

.input-row span {
  font-weight: 600;
  color: #555;
  min-width: 40px; /* Ensure percentage display has space */
  text-align: right;
}

.reset-button {
  background: #f3f4f6; /* Matching btn-secondary */
  color: #374151;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;
}

.reset-button:hover {
  background: #e5e7eb;
  transform: translateY(-1px);
}

/* --- Action Buttons (Adapted from your video downloader) --- */
.action-section {
  display: flex;
  gap: 16px;
  margin-top: 32px;
  flex-wrap: wrap;
  justify-content: center; /* Center buttons */
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

.btn svg {
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

/* --- Section Titles (Copied from your index.vue) --- */
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 48px; /* Adjusted from 60px to match video downloader */
  color: white; /* Changed to white for consistency with hero */
}

.section-title .highlight {
  background: linear-gradient(45deg, #ff6b6b, #feca57); /* Matching homepage highlight */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* --- How to Use Section (Copied from your video downloader) --- */
.how-to-section {
  margin-bottom: 80px;
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

/* --- Features Section (Copied from your video downloader) --- */
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

/* --- FAQ Section (Copied from your video downloader) --- */
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

/* --- Animations (Copied from your video downloader) --- */
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

/* --- Responsive Design (Adapted from your video downloader) --- */
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

  .tool-card {
    padding: 32px 24px;
  }

  .action-section {
    flex-direction: column;
  }

  .btn {
    min-width: auto;
  }

  .image-preview-container {
    flex-direction: column;
    align-items: center;
  }

  .image-card {
    max-width: 100%;
  }

  .controls-grid {
    grid-template-columns: 1fr;
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

  .tool-card {
    padding: 24px 16px;
  }

  .url-input {
    padding: 16px 20px;
  }
}
</style>
