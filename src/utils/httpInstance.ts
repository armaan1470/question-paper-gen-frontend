// src/utils/httpInstance.ts
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";


// Create an Axios instance
export const httpInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});


// Request interceptor (automatically attach token)
httpInstance.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().auth.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor (handle errors globally)
httpInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            useAuthStore.getState().auth.resetAccessToken();
        }
        return Promise.reject(error);
    }
);
