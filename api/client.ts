import axios from "axios";
import { Platform } from "react-native";

const baseURL = Platform.OS === "android"
  ? "http://10.0.2.2:8000/api"
  : "http://127.0.0.1:8000/api";

export const api = axios.create({ baseURL, timeout: 15000 });

api.interceptors.request.use((c) => {
  console.log("👉", c.method?.toUpperCase(), c.baseURL + (c.url || ""), c.params || c.data);
  return c;
});
api.interceptors.response.use(
  (r) => { console.log("✅", r.status, r.config.url); return r; },
  (e) => { console.log("❌", e.response?.status, e.response?.data ?? e.message); return Promise.reject(e); }
);
