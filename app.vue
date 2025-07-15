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
import { UserInfoApi } from "@/services/apiServices";

const store = useWebsiteStore();
onMounted(() => {
  UserInfoApi();
});

</script>