import { z } from "zod";

export const bookingSchema = z
  .object({
    // Reservation Details
    checkIn: z.string().min(1, { message: "Check In Required" }),
    checkOut: z.string().min(1, { message: "Check Out Required" }),
    arrivalFrom: z.string().optional(),
    bookingType: z.array(
      z.string().min(1, { message: "Booking type is required" })
    ),
    remarks: z.string(),
    purposeOfVisit: z.string(),
    // Room Details
    hotel: z.array(z.string().min(1, { message: "Hotel is required" })),

    roomType: z.array(
      z.string().min(1, { message: "Booking type is required" })
    ),
    roomId: z.array(z.string().min(1, { message: "Room is required" })),
    adults: z.string(),
    children: z.string(),

    // Customer Details
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),

    // Additional Form Elements

    paymentMethod: z.string(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  });

export type BookingFormData = z.infer<typeof bookingSchema>;
