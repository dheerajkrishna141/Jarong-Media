import { room } from "@/Components/Admin/Hotel/AddRoom";
import { response } from "@/services/httpHotelBookingService";
import { httpHotelService } from "@/services/httpHotelService";
import { useQuery } from "@tanstack/react-query";

const useRooms = (pageNo?: number) => {
  const roomClient = new httpHotelService("/public");

  return useQuery<response<room>, any>({
    queryKey: ["room", pageNo],
    queryFn: () => {
      return roomClient.getRooms({
        params: {
          pageNo: pageNo,
        },
      });
    },
  });
};

export default useRooms;
