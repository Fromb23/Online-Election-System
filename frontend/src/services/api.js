import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:5000/api",
});
// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
