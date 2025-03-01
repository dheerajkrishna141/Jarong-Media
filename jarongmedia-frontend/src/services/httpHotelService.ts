import { featureDTO } from "@/Components/Admin/Hotel/AddFeature";
import { hotelDTOWithId, room } from "@/Components/Admin/Hotel/AddRoom";
import { availabilityDTOWithId } from "@/hooks/useRoomAvailability";
import { AxiosRequestConfig } from "axios";
import axiosInstance from "./api-client";
import { response } from "./httpHotelBookingService";

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
      .get<hotelDTOWithId[]>(this.endpoint + "/all")
      .then((res) => res.data);
  }

  getRooms(config: AxiosRequestConfig) {
    return axiosInstance
      .get<response<room>>(this.endpoint + "/room/all", config)
      .then((res) => res.data);
  }

  addRoom(config: AxiosRequestConfig) {
    return axiosInstance
      .post(this.endpoint + "/room", config.data)
      .then((res) => res.data);
  }

  getRoomById(id: string) {
    return axiosInstance
      .get<room>(this.endpoint + `/${id}`)
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

  getAvailabilityByDates(config: AxiosRequestConfig) {
    return axiosInstance
      .get<room[]>(this.endpoint + "/room/availability", config)
      .then((res) => res.data);
  }
}

const hotelDTOFunction = (endpoint: string) => new httpHotelService(endpoint);

export { hotelDTOFunction, httpHotelService };
