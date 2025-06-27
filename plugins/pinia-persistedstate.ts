import { defineNuxtPlugin } from '#app';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export default defineNuxtPlugin((nuxtApp) => {
  // 仅在客户端注册持久化插件
  if (process.client) {
    const pinia = nuxtApp.$pinia;
    if (pinia) {
      pinia.use(piniaPluginPersistedstate);
    }
  }
});