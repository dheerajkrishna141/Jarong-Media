import AddAvailabilityForm, {
  AvailabilityFormValues,
} from "@/Forms/AddAvailabilityForm";
import HotelService from "@/services/HotelService";
import { toaster } from "../../UI/toaster";

export interface availabilityDTO {
  roomId: string;
  hotelId: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
}

const AddAvailability = () => {
  const handleAvailabilitySubmit = (data: AvailabilityFormValues) => {
    const processedData: availabilityDTO = {
      hotelId: data.hotel[0],
      roomId: data.roomId[0],
      checkInDate: data.checkInDate,
      checkOutDate: data.checkOutDate,
      status: data.status[0],
    };

    HotelService.addAvailability({
      data: processedData,
    })
      .then(() => {
        toaster.create({
          type: "success",
          description: "Availability Added Successfully!",
          duration: 5 * 1000, //5seconds
        });
      })
      .catch((res) => {
        toaster.create({
          title: "Error Adding Availability",
          type: "error",
          description: res.response.data.message,
          duration: 5 * 1000, //5 seconds
        });
      });
  };
  return (
    <div>
      <AddAvailabilityForm
        handleAvailabilitySubmit={handleAvailabilitySubmit}
      />
    </div>
  );
};

export default AddAvailability;
