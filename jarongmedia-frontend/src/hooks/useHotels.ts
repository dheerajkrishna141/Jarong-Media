import { hotelDTOWithId } from "@/Components/AddRoom";
import { httpHotelService } from "@/services/httpHotelService";
import { useQuery } from "@tanstack/react-query";

const useHotels = () => {
  const hotelClient = new httpHotelService("/admin/hotel");

  return useQuery<hotelDTOWithId[], any>({
    queryKey: ["hotel", "all"],
    queryFn: () => {
      return hotelClient.getHotels();
    },
  });
};

export default useHotels;
