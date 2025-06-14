<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-logo">
          <NuxtLink to="/">
            <h2>Kit<span>hubs</span></h2>
          </NuxtLink>
          <p>Providing various practical online tools to help users improve work efficiency and simplify daily tasks.</p>
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h3>Quick Links</h3>
            <ul>
              <li><NuxtLink to="/">Home</NuxtLink></li>
              <li><NuxtLink to="/tools/text">Text Tools</NuxtLink></li>
              <li><NuxtLink to="/tools/image">Image Tools</NuxtLink></li>
              <li><NuxtLink to="/tools/video">Video Tools</NuxtLink></li>
            </ul>
          </div>
          <div class="link-group">
            <h3>Popular Tools</h3>
            <ul>
              <li><NuxtLink to="/json-formatter">JSON Formatter</NuxtLink></li>
              <li><NuxtLink to="/">Image Compressor</NuxtLink></li>
              <li><NuxtLink to="/facebook-video-downloader">Facebook Video Downloader</NuxtLink></li>
              <li><NuxtLink to="/sensitive-word-check">Sensitive Content Detector</NuxtLink></li>
            </ul>
          </div>
          <div class="link-group">
            <h3>Contact Us</h3>
            <ul>
              <li><a href="mailto:chenyx1012@gmail.com">Email: chenyx1012@gmail.com</a></li>
              <!-- Add more contact info if needed -->
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Kithubs Tools. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

// Calculate current year
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background-color: #1f2937; /* Darker background for contrast */
  color: #f9fafb; /* Light text color */
  padding: 60px 0 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05); /* Subtle top border */
}

:global(.dark) .footer {
  background-color: #111827; /* Even darker in dark mode */
  border-top-color: rgba(255, 255, 255, 0.1);
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 40px;
  gap: 30px; /* Added gap for better spacing */
}

.footer-logo {
  flex: 1;
  min-width: 280px; /* Slightly wider for better readability */
  margin-bottom: 30px;
}

.footer-logo a {
  text-decoration: none;
}

.footer-logo h2 {
  font-size: 32px; /* Larger font size */
  font-weight: 800; /* Bolder font */
  margin-bottom: 15px;
  color: #f9fafb; /* Ensure logo text is white */
  letter-spacing: -0.5px;
}

.footer-logo span {
  color: #3b82f6;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-logo p {
  color: #d1d5db; /* Lighter grey for description */
  max-width: 350px; /* Increased max-width */
  line-height: 1.6;
  font-size: 15px;
}

.footer-links {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* Distribute links more evenly */
  gap: 20px; /* Gap between link groups */
}

.link-group {
  flex: 1;
  min-width: 180px; /* Adjusted min-width */
  margin-bottom: 30px;
}

.link-group h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #f9fafb; /* White for headings */
  position: relative;
  padding-bottom: 5px;
}

.link-group h3::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 60px;
  height: 2px;
  background-color: #3b82f6; /* Accent line under heading */
  border-radius: 1px;
}

.link-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-group li {
  margin-bottom: 12px; /* Increased spacing between list items */
}

.link-group a {
  color: #9ca3af; /* Slightly darker grey for links */
  text-decoration: none;
  transition: color 0.3s ease, transform 0.2s ease;
  font-size: 15px;
  display: inline-block; /* Allows transform */
}

.link-group a:hover {
  color: #60a5fa; /* Lighter blue on hover */
  transform: translateX(5px); /* Subtle slide effect */
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  color: #9ca3af; /* Consistent grey for copyright */
  font-size: 14px;
  margin: 0;
}

@media (max-width: 768px) {
  .footer-top {
    flex-direction: column;
    align-items: center; /* Center items in column layout */
    text-align: center;
  }
  
  .footer-logo {
    min-width: auto;
    margin-bottom: 40px;
  }
  
  .footer-logo p {
    margin: 0 auto;
    max-width: 90%;
  }
  
  .footer-links {
    flex-direction: column;
    align-items: center;
    gap: 40px; /* Increased gap between groups on mobile */
  }
  
  .link-group {
    min-width: auto;
    width: 100%; /* Full width for link groups */
    text-align: center;
  }

  .link-group h3::after {
    left: 50%;
    transform: translateX(-50%); /* Center the accent line */
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 40px 0 15px;
  }
  .container {
    padding: 0 15px;
  }
  .footer-logo h2 {
    font-size: 28px;
  }
  .footer-logo p {
    font-size: 14px;
  }
  .link-group h3 {
    font-size: 16px;
  }
  .link-group a {
    font-size: 14px;
  }
}
</style>
