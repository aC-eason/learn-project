<template>
  <div>
    <Header />
    <NuxtPage />
    <Footer />
    <ClientOnly>
      <LoginModel :show="store.showLoginModal" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useWebsiteStore } from '~/stores/website';

const store = useWebsiteStore();

// 可选：在客户端初始化时检查状态
onMounted(() => {
  console.log('Client mounted, showLoginModal:', store.showLoginModal);
});
</script>