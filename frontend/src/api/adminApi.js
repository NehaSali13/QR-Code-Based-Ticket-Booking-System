import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:5000/api/admins", // Your backend URL
  
});

// Add token from localStorage
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default adminApi;
