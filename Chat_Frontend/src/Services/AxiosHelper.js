import axios from "axios";
export const baseURL="https://chat-backend3-2-latest.onrender.com";
export const httpClient = axios.create({
    baseURL:baseURL
})

// import axios from "axios";

// // Example condition: use Railway in production, Render otherwise
// export const baseURL = process.env.NODE_ENV === "production"
//   ? "https://chat-backend32-production.up.railway.app"
//   : "https://chat-backend3-2-latest.onrender.com";

// export const httpClient = axios.create({
//   baseURL: baseURL,
// });
