import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust if backend URL differs
  withCredentials: true, // Send cookies with requests for auth
});

export default api;
