import BookingCard from "@/Components/Booking/BookingCard";
import HeroSection from "@/Components/Booking/HeroSection";
import RoomGrid from "@/Components/Booking/RoomGrid";
import NavBar from "@/Components/User/Layout/NavBar";
import { Box, Show } from "@chakra-ui/react";
import type { FC } from "react";
import { Outlet, useLocation } from "react-router-dom";

const BookingPage: FC = () => {
  const location = useLocation();

  const onBooking = location.pathname === "/user/booking";
  const onConfirmation = location.pathname === "/user/booking/confirmation";
  return (
    <Box>
      <NavBar />
      <Show when={!onConfirmation}>
        <HeroSection />
      </Show>
      <Show when={onBooking}>
        <BookingCard />
      </Show>
      <Outlet />
    </Box>
  );
};

export default BookingPage;
