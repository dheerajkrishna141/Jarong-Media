import { AxiosRequestConfig } from "axios";
import axiosInstance from "./api-client";
import { response } from "./httpHotelBookingService";
import { requestFormWithId } from "./httpUserService";

class httpRequestService {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getRequests(config: AxiosRequestConfig) {
    return axiosInstance
      .get<response<requestFormWithId>>(this.endpoint + "/requests", config)
      .then((res) => res.data);
  }
}

export default httpRequestService;
