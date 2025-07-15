import { apiService } from "@/utils/api";

export const googleLoginApi = async (data: { client_id: String }) => {
  try {
    const response = await apiService.request("/api/user/google-login", data, "POST");
    return response;
  } catch (error) {
    console.error("Google login API error:", error);
    throw error;
  }
};

export const UserInfoApi = async () => {
  try {
    const response = await apiService.request("/api/user/info");
    return response;
  } catch (error) {
    console.error("Get User Info error:", error);
    throw error;
  }
};

export const createShortUrl = async (data: { url: String; is_tracked: Boolean }) => {
  try {
    const response = await apiService.request("/api/shorts/create", data,"POST");
    return response;
  } catch (error) {
    console.error("Create short url error:", error);
    throw error;
  }
};
