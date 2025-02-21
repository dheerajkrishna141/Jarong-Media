import HotelBookingService from "@/services/HotelBookingService";
import { useQuery } from "@tanstack/react-query";

const useBookings = (pageNo: number) => {
  return useQuery({
    queryKey: ["bookings", pageNo],
    queryFn: () => {
      return HotelBookingService.getBookings({
        params: {
          pageNo: pageNo,
        },
      });
    },
    staleTime: 15 * 60 * 1000, //15mins
  });
};

export default useBookings;
