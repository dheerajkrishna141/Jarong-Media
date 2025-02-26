import { roomDTO } from "@/Components/Admin/Hotel/AddRoom";
import { httpHotelService } from "@/services/httpHotelService";
import { useQuery } from "@tanstack/react-query";

const useRoomById = (roomId: string) => {
  const roomClient = new httpHotelService("/admin/hotel/room");

  return useQuery<roomDTO, any>({
    queryKey: ["room", roomId],
    queryFn: () => {
      console.log(roomId);

      return roomClient.getRoomById(roomId);
    },
  });
};

export default useRoomById;
