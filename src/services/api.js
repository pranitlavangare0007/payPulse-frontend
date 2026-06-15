import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" }
});

api.interceptors.request.use(config => {
  const url = config.url || "";

  const isPublic = ["/login", "/register"]
    .some(p => url.startsWith(p));

  if (!isPublic) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    const status=err?.response?.status;
    const msg = err?.response?.data?.message;

    if(status === 401){
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      sessionStorage.removeItem("selectedAccount");
      alert("Session expired. Please login again.");
       window.location.href="/login";
      return Promise.reject(err);
    }
    if (msg) {
      alert(msg);
    } else {
      alert("Server not reachable");
    }

    return Promise.reject(err);
  }
);

export default api;
