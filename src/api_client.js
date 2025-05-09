import axios from "axios";

// Create an Axios instance (optional but recommended)
const api_client = axios.create({
  baseURL: "https://gym-management-henna.vercel.app",
});

// Add a request interceptor
api_client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api_client;
