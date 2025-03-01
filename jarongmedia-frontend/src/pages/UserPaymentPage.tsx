import HotelBookingService from "@/services/HotelBookingService";
import { Loader } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BookingErrorPage from "./BookingErrorPage";
import { useNavigate } from "react-router-dom";

const UserPaymentPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  useEffect(() => {
    HotelBookingService.initiatePayment()
      .then((data) => {
        window.location.replace(data.sessionUrl);
      })
      .catch(() => {
        navigate("/user/booking/error");
      });
  });

  return <Loader />;
};

export default UserPaymentPage;
