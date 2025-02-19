import { featureDTO } from "@/Components/AddFeature";
import { hotelDTOWithId, roomDTO } from "@/Components/AddRoom";
import { AxiosRequestConfig } from "axios";
import apiClient from "./api-client";

class httpHotelService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  addHotel(config: AxiosRequestConfig) {
    return apiClient
      .post(this.endpoint + "/create", config.data)
      .then((res) => res.data);
  }

  addFeature(config: AxiosRequestConfig) {
    return apiClient
      .post(this.endpoint + "/feature", config.data)
      .then((res) => res.data);
  }

  getFeatures() {
    return apiClient
      .get<featureDTO[]>(this.endpoint + "/feature/all")
      .then((res) => res.data);
  }

  getHotels() {
    return apiClient
      .get<hotelDTOWithId[]>(this.endpoint + "/hotel/all")
      .then((res) => res.data);
  }

  getRooms() {
    return apiClient
      .get<roomDTO[]>(this.endpoint + "/room/all")
      .then((res) => res.data);
  }

  addRoom(config: AxiosRequestConfig) {
    return apiClient
      .post(this.endpoint + "/room", config.data)
      .then((res) => res.data);
  }

  addAvailability(config: AxiosRequestConfig) {
    return apiClient
      .post(this.endpoint + "/room/availability", config.data)
      .then((res) => res.data);
  }
}

const hotelDTOFunction = (endpoint: string) => new httpHotelService(endpoint);

export default hotelDTOFunction;
