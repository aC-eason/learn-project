import { useWebsiteStore } from '~/stores/website';

class ApiService {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  async request(url, data = {}, method = "GET") {
    try {
      const store = useWebsiteStore();
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": store.token ? store.token : ""
        },
        method
      };

      // 仅对非 GET/HEAD 请求添加 body
      let finalUrl = `${this.baseURL}${url}`;
      if (method === "GET" || method === "HEAD") {
        // 将 data 转换为查询参数
        if (Object.keys(data).length > 0) {
          const params = new URLSearchParams(data);
          finalUrl += `?${params.toString()}`;
        }
      } else {
        // 对 POST/PUT 等请求，添加 body
        config.body = Object.keys(data).length > 0 ? JSON.stringify(data) : undefined;
      }

      const response = await fetch(finalUrl, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.status === 401) {
        store.logout();
      }

      return result;
    } catch (err) {
      console.error("API request failed:", err);
      throw new Error(err.message || "Network request failed");
    }
  }
}

// Initialize API service
export const apiService = new ApiService("https://kithubs.com");