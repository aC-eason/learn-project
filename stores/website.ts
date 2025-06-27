import { defineStore } from 'pinia';

type UserInfo = {
  id: string;
  username: string;
  email: string;
  avatar: string;
} | null;

export const useWebsiteStore = defineStore('websiteStore', {
  state: () => ({
    token: '' as string,
    userInfo: null as UserInfo,
    showLoginModal: false as boolean,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setShowLoginModal(show: boolean) {
      console.log('Setting showLoginModal to:', show);
      this.showLoginModal = show;
    },
    setUserInfo(user: Partial<NonNullable<UserInfo>>) {
      this.userInfo = { ...this.userInfo, ...user };
    },
    logout() {
      this.token = '';
      this.userInfo = null;
    },
  },
  persist: {
    storage: process.client ? localStorage : undefined, // 仅在客户端使用 localStorage
    paths: ['token', 'userInfo', 'showLoginModal'], // 显式指定持久化的字段
  },
});