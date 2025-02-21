import HotelBookingService from "@/services/HotelBookingService";
import {
  HotelBookingDTOWithCC,
  response,
} from "@/services/httpHotelBookingService";
import { useQuery } from "@tanstack/react-query";

const useTodayBookings = (date: string, pageNo: number) => {
  return useQuery<response<HotelBookingDTOWithCC>, any>({
    queryKey: ["HotelBookings", pageNo],
    queryFn: () => {
      return HotelBookingService.getTodayBookings(date, {
        params: {
          pageNo: pageNo,
        },
      });
    },

    staleTime: 30 * 60 * 1000, //30mins
  });
};

export default useTodayBookings;
