import { AxiosRequestConfig } from "axios";
import apiClient from "./api-client";

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

interface fetchedResponse {
  endUser: fetchedUser;
  status: boolean;
  message: string;
}
class UserService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  login(config: AxiosRequestConfig) {
    return apiClient
      .get<fetchedResponse>(this.endpoint + "/login", config)
      .then((res) => res.data);
  }

  register(config: AxiosRequestConfig) {
    return apiClient
      .post(this.endpoint + "/register", config.data)
      .then((data) => data.data);
  }

  verify(config: AxiosRequestConfig) {
    return apiClient
      .post(this.endpoint + "/verify", null, config)
      .then((data) => data.data);
  }

  logout() {
    return apiClient.post("/logout").then((res) => res.data);
  }
}

const userDTOFunction = (endpoint: string) => new UserService(endpoint);

export default userDTOFunction;
