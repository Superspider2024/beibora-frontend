import axios from "axios";

const api = axios.create({
  // Your Live Railway Backend URL
  baseURL: "https://beibora-production.up.railway.app/api", 
});

// This automatically attaches your security token to every request
api.interceptors.request.use((config) => {
  // We check for 'window' so Next.js doesn't crash during server rendering
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("beibora_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;