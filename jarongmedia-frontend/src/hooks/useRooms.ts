import { roomDTO } from "@/Components/AddRoom";
import { httpHotelService } from "@/services/httpHotelService";
import { useQuery } from "@tanstack/react-query";

const useRooms = () => {
  const roomClient = new httpHotelService("/admin/hotel");

  return useQuery<roomDTO[], any>({
    queryKey: ["room", "all"],
    queryFn: () => {
      return roomClient.getRooms();
    },
  });
};

export default useRooms;
