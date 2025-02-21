import { featureDTO } from "@/Components/AddFeature";
import { hotelDTOWithId, roomDTO } from "@/Components/AddRoom";
import { availabilityDTOWithId } from "@/hooks/useAvailability";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "./api-client";

class httpHotelService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  addHotel(config: AxiosRequestConfig) {
    return axiosInstance
      .post(this.endpoint + "/create", config.data)
      .then((res) => res.data);
  }

  addFeature(config: AxiosRequestConfig) {
    return axiosInstance
      .post(this.endpoint + "/feature", config.data)
      .then((res) => res.data);
  }

  getFeatures() {
    return axiosInstance
      .get<featureDTO[]>(this.endpoint + "/feature/all")
      .then((res) => res.data);
  }

  getHotels() {
    return axiosInstance
      .get<hotelDTOWithId[]>(this.endpoint + "/hotel/all")
      .then((res) => res.data);
  }

  getRooms() {
    return axiosInstance
      .get<roomDTO[]>(this.endpoint + "/room/all")
      .then((res) => res.data);
  }

  addRoom(config: AxiosRequestConfig) {
    return axiosInstance
      .post(this.endpoint + "/room", config.data)
      .then((res) => res.data);
  }

  getRoomById(id: string) {
    return axiosInstance
      .get<roomDTO>(this.endpoint + `/${id}`)
      .then((res) => res.data);
  }

  getHotelById(id: string) {
    return axiosInstance.get(this.endpoint + `/${id}`).then((res) => res.data);
  }

  addAvailability(config: AxiosRequestConfig) {
    return axiosInstance
      .post(this.endpoint + "/room/availability", config.data)
      .then((res) => res.data);
  }

  getAvailability() {
    return axiosInstance
      .get<availabilityDTOWithId[]>(this.endpoint + "/room/availability/all")
      .then((res) => res.data);
  }
}

const hotelDTOFunction = (endpoint: string) => new httpHotelService(endpoint);

export { hotelDTOFunction, httpHotelService };
