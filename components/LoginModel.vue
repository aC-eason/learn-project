<template>
  <div v-if="show" class="modal-overlay" @click.self="handleClose">
    <div class="modal-content">
      <button
        class="close-button"
        @click="handleClose"
        aria-label="Close login modal"
      >
        <Icon name="x" class="icon" />
      </button>
      <h2 class="modal-title">Sign in to Kithubs</h2>
      <p class="modal-description">
        Access all features and save your preferences.
      </p>
      <div class="social-login-options">
        <ClientOnly>
          <GoogleLogin :callback="handleGoogleLogin" />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, onUnmounted, defineComponent, h } from "vue";
import { googleLoginApi } from "@/services/apiServices";

const store = useWebsiteStore();

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const handleClose = () => {
  store.showLoginModal = false; // 关闭登录模态框
};

const handleGoogleLogin = (google_resp) => {
  googleLoginApi({ client_id: google_resp.credential })
    .then((response) => {
      console.log("Google login successful:", response);
      if (response.status == 200) {
        const data = response.data
        store.token =data.token;
        store.setUserInfo({
          id: data.id,
          username: data.user_name,
          email: data.email,
          avatar:data.avatar
        })
      }

      // 处理登录成功后的逻辑
      store.showLoginModal = false; // 关闭登录模态框
    })
    .catch((error) => {
      console.error("Google login failed:", error);
      // 处理登录失败的逻辑
    });

  handleClose();
};

const handleEscape = (event) => {
  if (event.key === "Escape" && props.show) {
    handleClose();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});

// Simple Icon component (保持原样，但建议考虑使用 lucide-vue-next 等库)
// 增加了 'x' 和 'google' 图标
const Icon = defineComponent({
  props: {
    name: String,
    class: String,
  },
  setup(props) {
    const icons = {
      "chevron-down": "M19 9l-7 7-7-7",
      sun: "M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42",
      moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
      type: "M4 7V4h16v3M9 20h6M12 4v16",
      code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
      "shield-check": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
      image:
        "M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM21 15l-5-5L5 21",
      "minimize-2": "M4 14h6m0 0v6m0-6l-7 7M20 10h-6m0 0V4m0 6l7-7",
      video:
        "M23 7l-7 5 7 5V7zM1 5a2 2 0 012-2h9a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5z",
      facebook:
        "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
      pinterest:
        "M8 11.5a2.5 2.5 0 115 0 2.5 2.5 0 01-5 0zM12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.6-.299-1.486c0-1.39.806-2.428 1.81-2.428.853 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.176-4.068-2.845 0-4.516 2.135-4.516 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.223-.334.135-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.97-.527-2.297-1.155l-.624 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z",
      instagram:
        "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z",
      x: "M18 6L6 18M6 6l12 12", // Close icon
      google:
        "M12 10.9C11.34 10.9 10.79 11.45 10.79 12.12C10.79 12.79 11.34 13.34 12 13.34C12.66 13.34 13.21 12.79 13.21 12.12C13.21 11.45 12.66 10.9 12 10.9ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z", // Simple 'G' icon
    };

    return () =>
      h(
        "svg",
        {
          class: ["icon", props.class],
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
        },
        [h("path", { d: icons[props.name] })]
      );
  },
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease-out forwards;
}

.modal-content {
  background-color: white;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  position: relative;
  text-align: center;
  animation: slideIn 0.3s ease-out forwards;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

:global(.dark) .modal-content {
  background-color: #2d3748; /* Darker background for modal */
  color: #e2e8f0;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;
  color: #6b7280;
}

:global(.dark) .close-button {
  color: #9ca3af;
}

.close-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

:global(.dark) .close-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.close-button .icon {
  width: 20px;
  height: 20px;
}

.modal-title {
  font-size: 1.875rem; /* 30px */
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

:global(.dark) .modal-title {
  color: #f9fafb;
}

.modal-description {
  font-size: 1rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

:global(.dark) .modal-description {
  color: #d1d5db;
}

.social-login-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.google-login-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: #1f2937;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

:global(.dark) .google-login-button {
  background-color: #374151;
  color: #f9fafb;
  border-color: #4b5563;
}

.google-login-button:hover {
  background-color: #f9fafb;
  border-color: #9ca3af;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:global(.dark) .google-login-button:hover {
  background-color: #4b5563;
  border-color: #6b7280;
}

.google-icon {
  width: 20px;
  height: 20px;
  color: #4285f4; /* Google blue */
}

.terms-text {
  font-size: 0.875rem;
  color: #9ca3af;
  margin-top: 1rem;
}

:global(.dark) .terms-text {
  color: #6b7280;
}

.terms-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.terms-link:hover {
  text-decoration: underline;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 1.5rem;
    gap: 1rem;
  }
  .modal-title {
    font-size: 1.5rem;
  }
  .modal-description {
    font-size: 0.9rem;
  }
  .google-login-button {
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }
}
</style>