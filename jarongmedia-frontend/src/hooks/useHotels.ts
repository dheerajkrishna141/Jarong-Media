import { hotelDTOWithId } from "@/Components/Admin/Hotel/AddRoom";
import HotelService from "@/services/HotelService";
import { useQuery } from "@tanstack/react-query";

const useHotels = () => {
  return useQuery<hotelDTOWithId[], any>({
    queryKey: ["hotel", "all"],
    queryFn: () => {
      return HotelService.getHotels();
    },
  });
};

export default useHotels;
