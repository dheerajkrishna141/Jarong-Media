import axios from "axios";
import { CONSTANTS } from "../constants/AppConstants";

const axiosInstance = axios.create({
  baseURL: CONSTANTS.BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
