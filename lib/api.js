import axios from "axios"

const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://usevouched.com"
    : "http://localhost:3001"

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})
