import { Axios, AxiosRequestConfig } from "axios";
import axiosInstance from "./api-client";

export interface HotelBookingDTO {
  hotelId: string;
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  customerDetails: {
    [key: string]: string;
  };
  roomDetails: {
    [key: string]: string;
  };
  additionalDetails: {
    [key: string]: string;
  };
  status: string;
  totalAmount: number;
}

export interface paymentResponse {
  status: string;
  message: string;
  sessionId: string;
  sessionUrl: string;
}

export interface response<T> {
  content: T[];
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
}

export interface HotelBookingDTOWithCC extends HotelBookingDTO {
  id: number;
  confirmationCode: string;
}

class httpHoteBookingService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  initiatePayment(config: AxiosRequestConfig) {
    return axiosInstance
      .post<paymentResponse>(this.endpoint + "/initiatePayment", config.data)
      .then((res) => res.data);
  }

  getBookings(config: AxiosRequestConfig) {
    return axiosInstance
      .get<response<HotelBookingDTOWithCC>>(this.endpoint + "/all", config)
      .then((res) => res.data);
  }
  getTodayBookings(todaysDate: string, config: AxiosRequestConfig) {
    return axiosInstance
      .get<response<HotelBookingDTOWithCC>>(
        this.endpoint + `/all/${todaysDate}`,
        config
      )
      .then((res) => res.data);
  }

  createBooking(config: AxiosRequestConfig) {
    return axiosInstance
      .post<HotelBookingDTOWithCC>(this.endpoint, config.data)
      .then((res) => res.data);
  }

  getBookingConfirmation(config: AxiosRequestConfig) {
    return axiosInstance
      .get<HotelBookingDTOWithCC>(this.endpoint + "/confirmation", config)
      .then((res) => res.data);
  }
}
const hotelBookingDTOFunction = (endpoint: string) =>
  new httpHoteBookingService(endpoint);

export { httpHoteBookingService, hotelBookingDTOFunction };
