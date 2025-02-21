import { toaster } from "@/Components/UI/toaster";
import { CONSTANTS } from "@/constants/AppConstants";
import HotelBookingService from "@/services/HotelBookingService";
import { HotelBookingDTO } from "@/services/httpHotelBookingService";
import { useMutation } from "@tanstack/react-query";
import useLocalStorage from "./useLocalStorage";

const useAddHotelBooking = () => {
  const { setItem: setCheckOut } = useLocalStorage(
    CONSTANTS.CHECKOUT_STORAGE_KEY
  );
  return useMutation({
    mutationKey: ["booking", "hotel"],
    mutationFn: (data: HotelBookingDTO) => {
      return HotelBookingService.createBooking({
        data: data,
      });
    },
    onSuccess: (bookingDTO) => {
      setCheckOut(bookingDTO);
      window.location.href = "/admin/checkout";
    },
    onError: (error: any) => {
      toaster.create({
        title: "Error Creating Booking",
        type: "error",
        description: error.response.data.message,
        duration: 5 * 1000, //5 seconds
      });
    },
  });
};

export default useAddHotelBooking;
