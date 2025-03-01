import { room } from "@/Components/Admin/Hotel/AddRoom";
import { httpHotelService } from "@/services/httpHotelService";
import { useQuery } from "@tanstack/react-query";

const useRoomById = (roomId: string) => {
  const roomClient = new httpHotelService("/public/room");

  return useQuery<room, any>({
    queryKey: ["room", roomId],
    queryFn: () => {
      return roomClient.getRoomById(roomId);
    },
  });
};

export default useRoomById;
