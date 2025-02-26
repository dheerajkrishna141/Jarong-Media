import { fetchedResponse } from "@/services/httpUserService";
import UserService from "@/services/UserService";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const useAuth = () => {
  const location = useLocation();
  return useQuery<fetchedResponse, any>({
    queryKey: ["user", "me", location.pathname],
    queryFn: () => {
      return UserService.me();
    },
    retry: 2,
  });
};

export default useAuth;
