import axios from "axios";
export const baseURL="https://chat-backend3-2-latest.onrender.com";
export const httpClient = axios.create({
    baseURL:baseURL
})