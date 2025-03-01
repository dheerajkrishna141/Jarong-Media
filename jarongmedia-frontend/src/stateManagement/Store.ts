import { room } from "@/Components/Admin/Hotel/AddRoom";
import { create } from "zustand";

export interface BookingQuery {
  checkInDate?: string;
  checkOutDate?: string;
  room?: room;
  adults?: string;
  children?: string;
  totalAmount?: number;
}

interface BookingQueryStore {
  bookingQuery: BookingQuery;
  setRoom: (room: room) => void;
  setDates: (checkIn: string, checkOut: string) => void;
  setCustomersAndTotal: (
    adults: string,
    children: string,
    totalAmount: number
  ) => void;
}

const useBookingQueryStore = create<BookingQueryStore>((set) => ({
  bookingQuery: {},

  setRoom: (room) =>
    set((store) => ({
      bookingQuery: { ...store.bookingQuery, room: room },
    })),
  setDates: (checkIn, checkOut) =>
    set((store) => ({
      bookingQuery: {
        ...store.bookingQuery,
        checkInDate: checkIn,
        checkOutDate: checkOut,
      },
    })),
  setCustomersAndTotal: (adults, children, total) =>
    set((store) => ({
      bookingQuery: {
        ...store.bookingQuery,
        adults: adults,
        children: children,
        totalAmount: total,
      },
    })),
}));

export default useBookingQueryStore;
