import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(function (response) {
  return response.data;
});

export { api };
