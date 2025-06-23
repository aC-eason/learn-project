import { apiService } from "@/utils/api"


export const googleLoginApi = async (data:{client_id:String}) => {
  try {
    const response = await apiService.post("/api/user/google-login", data);
    return response;
  } catch (error) {
    console.error("Google login API error:", error);
    throw error;
  }
}