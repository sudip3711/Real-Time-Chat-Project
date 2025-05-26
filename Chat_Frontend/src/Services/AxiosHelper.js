import axios from "axios";
export const baseURL="https://chat-backend-production-adf7.up.railway.app";
export const httpClient = axios.create({
    baseURL:baseURL
})