import { CONSTANTS } from "@/constants/AppConstants";
import HotelBookingService from "@/services/HotelBookingService";
import { userWithId } from "@/services/httpUserService";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import useSessionStorage from "./useSessionStorage";

const useBookingConfirmation = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id") || "";

  const { getItem: getUser } = useSessionStorage(CONSTANTS.USER_STORAGE_KEY);
  const user: userWithId = JSON.parse(getUser() || "");
  return useQuery({
    queryKey: ["confirmation", user.id],
    queryFn: () => {
      return HotelBookingService.getBookingConfirmation({
        params: {
          session_id: sessionId,
        },
      });
    },
    staleTime: 30 * 60 * 1000, //30 minutes
  });
};

export default useBookingConfirmation;
