import { availabilityDTO } from "@/Components/AddAvailability";
import { httpHotelService } from "@/services/httpHotelService";
import { useQuery } from "@tanstack/react-query";

export interface availabilityDTOWithId extends availabilityDTO {
  id: string;
}
const useAvailability = () => {
  const availabilityClient = new httpHotelService("/public");
  return useQuery<availabilityDTOWithId[], any>({
    queryKey: ["availability"],
    queryFn: () => {
      return availabilityClient.getAvailability();
    },
    staleTime: 5 * 60 * 1000, //5 mins
  });
};

export default useAvailability;
