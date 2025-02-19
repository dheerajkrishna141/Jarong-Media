import axios from "axios";
import { CONSTANTS } from "../constants/AppConstants";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: CONSTANTS.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response.data.status === 401) {
      const navigate = useNavigate();
      navigate("/login", { replace: true });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
