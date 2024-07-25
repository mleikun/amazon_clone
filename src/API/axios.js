import axios from "axios";

const axiosInstance = axios.create({
  //baseURL: "http://127.0.0.1:5001/clone-c4f4c/us-central1/api",
  baseURL: "https://api-6rdhujv26a-uc.a.run.app",
});

export { axiosInstance };
