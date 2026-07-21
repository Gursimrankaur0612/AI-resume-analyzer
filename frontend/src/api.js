import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-analyzer-enam.onrender.com",
});

export default api;