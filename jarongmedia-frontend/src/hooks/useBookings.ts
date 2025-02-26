import HotelBookingService from "@/services/HotelBookingService";
import { useQuery } from "@tanstack/react-query";

interface queryObject {
  pageNo: number;
  searchInput: string;
}
const useBookings = (QueryObject: queryObject) => {
  return useQuery({
    queryKey: ["bookings", QueryObject],
    queryFn: () => {
      return HotelBookingService.getBookings({
        params: {
          pageNo: QueryObject.pageNo,
          search_cc: QueryObject.searchInput,
        },
      });
    },
    staleTime: 15 * 60 * 1000, //15mins
  });
};

export default useBookings;
