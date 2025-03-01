import { hotelDTOWithId } from "@/Components/Admin/Hotel/AddRoom";
import { httpHotelService } from "@/services/httpHotelService";
import { useQuery } from "@tanstack/react-query";

const useHotels = () => {
  const hotelService = new httpHotelService("/public/hotel");
  return useQuery<hotelDTOWithId[], any>({
    queryKey: ["hotel", "all"],
    queryFn: () => {
      return hotelService.getHotels();
    },
  });
};

export default useHotels;
