import { AxiosRequestConfig } from "axios";
import axiosInstance from "./api-client";

export interface user {
  firstName: string;
  lastName: string;
  email: string;
  dob?: string;
}
export interface userWithId extends user {
  id: number;
}
export interface userRegister extends user {
  password: string;
  roles: string[];
}

interface fetchedUser {
  endUser: { user: user; id: number };
  roles: {
    authority: string;
  }[];
}

export interface fetchedResponse {
  endUser: fetchedUser;
  status: boolean;
  message: string;
}
class httpUserService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  login(config: AxiosRequestConfig) {
    return axiosInstance
      .get<fetchedResponse>(this.endpoint + "/login", config)
      .then((res) => res.data);
  }

  me() {
    return axiosInstance
      .get<fetchedResponse>(this.endpoint + "/me")
      .then((res) => res.data);
  }

  googleLogin(config: AxiosRequestConfig) {
    return axiosInstance
      .get<fetchedResponse>(this.endpoint + "/callback", config)
      .then((res) => {
        console.log(res.data);

        return res.data;
      });
  }

  register(config: AxiosRequestConfig) {
    return axiosInstance
      .post(this.endpoint + "/register", config.data)
      .then((data) => data.data);
  }

  verify(config: AxiosRequestConfig) {
    return axiosInstance
      .post(this.endpoint + "/verify", null, config)
      .then((data) => data.data);
  }

  logout() {
    return axiosInstance.post("/logout").then((res) => res.data);
  }
}

const userDTOFunction = (endpoint: string) => new httpUserService(endpoint);

export { userDTOFunction, httpUserService };
