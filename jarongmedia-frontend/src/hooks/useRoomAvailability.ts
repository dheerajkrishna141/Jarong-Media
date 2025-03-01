import { availabilityDTO } from "@/Components/Admin/Hotel/AddAvailability";
import { room } from "@/Components/Admin/Hotel/AddRoom";
import { response } from "@/services/httpHotelBookingService";
import { httpHotelService } from "@/services/httpHotelService";
import { useQuery } from "@tanstack/react-query";

export interface availabilityDTOWithId extends availabilityDTO {
  id: string;
}
const useRoomAvailability = (checkInDate?: string, checkOutDate?: string) => {
  const availabilityClient = new httpHotelService("/public");
  return useQuery<room[], any>({
    queryKey: ["availability", checkInDate, checkOutDate],
    queryFn: () => {
      // if (checkInDate === undefined || checkOutDate === undefined) {
      //   return Promise.resolve([]);
      // }
      return availabilityClient.getAvailabilityByDates({
        params: {
          checkIn: checkInDate,
          checkOut: checkOutDate,
        },
      });
    },
    retry: 1,
    staleTime: 5 * 60 * 1000, //5 mins
  });
};

export default useRoomAvailability;
