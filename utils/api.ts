class ApiService {
  constructor(baseURL = "") {
    this.baseURL = baseURL;
  }

  async request(url, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error("API request failed:", err);
      throw new Error(err.message || "Network request failed");
    }
  }

  async post(url, data, options = {}) {
    return this.request(url, {
      method: "POST",
      body: JSON.stringify(data),
      ...options,
    });
  }
}


// Initialize API service
export const apiService = new ApiService("https://kithubs.com");
