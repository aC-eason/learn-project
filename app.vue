<template>
  <div>
    <Header  />
    <NuxtPage />
    <Footer />
    <LoginModel :show="store.showLoginModal"/>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { useWebsiteStore } from '~/stores/website'

const store = useWebsiteStore()
</script>

