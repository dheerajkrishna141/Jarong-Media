import { hotelDTOWithId } from "@/Components/Admin/Hotel/AddRoom";
import { httpHotelService } from "@/services/httpHotelService";
import { useQuery } from "@tanstack/react-query";

const useHotelById = (hotelId: string) => {
  const hotelClient = new httpHotelService("/admin/hotel");

  return useQuery<hotelDTOWithId, any>({
    queryKey: ["hotel", hotelId],
    queryFn: () => {
      return hotelClient.getHotelById(hotelId);
    },
  });
};

export default useHotelById;
