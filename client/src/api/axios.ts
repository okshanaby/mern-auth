import { redirectToLogin } from "@/utils";
import axios from "axios";
import { toast } from "sonner";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: baseURL, // adjust if not using vite proxy
  withCredentials: true,
});

API.interceptors.response.use(
  response => response,
  error => {
    if (error.status === 403) {
      redirectToLogin();
    }

    if (error.response) {
      const data = error.response.data;

      // 🔍 If it's a validation error array
      if (Array.isArray(data.errors)) {
        data.errors.forEach((err: { field?: string; message: string }) => {
          toast.error(err.message || "Validation error");
        });
      }
      // 🔍 If it's a generic message
      else if (data.message) {
        toast.error(data.message);
      } else {
        toast.error("Something went wrong");
      }
    } else if (error.request) {
      toast.error("No response from server");
    } else {
      toast.error(error.message || "Unexpected error");
    }

    return Promise.reject(error);
  }
);

export default API;
