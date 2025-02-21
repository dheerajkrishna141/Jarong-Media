import axios from "axios";
import { CONSTANTS } from "../constants/AppConstants";

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
    if (
      error.response.data.status === 401 &&
      error.response.data.message === CONSTANTS.UNAUTHORIZED_ACCESS
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
