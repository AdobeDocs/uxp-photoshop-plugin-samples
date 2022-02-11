import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  responseType: "json",
});

export default api;
