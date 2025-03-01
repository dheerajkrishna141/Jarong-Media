"use client";

import useBookingQueryStore from "@/stateManagement/Store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  Box,
  Button,
  Card,
  Container,
  Field,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuListCheck } from "react-icons/lu";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import useRoomById from "@/hooks/useRoomById";
import useSessionStorage from "@/hooks/useSessionStorage";
import { CONSTANTS } from "@/constants/AppConstants";

const bookingScheme = z
  .object({
    checkIn: z.date({ required_error: "Check In Required" }),
    checkOut: z.date({ required_error: "Check Out Required" }),
    adults: z.string().min(1, { message: "Atleast one adult is required!" }),
    children: z.string(),
  })
  .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  });

export type bookingData = z.infer<typeof bookingScheme>;

const RoomDetails = () => {
  const amenities = [
    "Air Conditioning",
    "Free WiFi",
    "Room Service",
    "Mini Bar",
    "Coffee Maker",
    "Premium TV",
    "Safe Box",
    "Bath Robes",
  ];

  const params = useParams();
  const booking = useBookingQueryStore((s) => s.bookingQuery);
  const updateBookingCustomers = useBookingQueryStore(
    (s) => s.setCustomersAndTotal
  );

  const { data: room } = useRoomById(params.id || "");

  const { setItem: setCheckOut } = useSessionStorage(
    CONSTANTS.CHECKOUT_STORAGE_KEY
  );

  const updateBookingDates = useBookingQueryStore((s) => s.setDates);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<bookingData>({
    resolver: zodResolver(bookingScheme),
  });

  console.log(room?.availability);

  const actualRoomAvailability = room?.availability.filter(
    (room) => room.status === "available"
  );

  console.log(actualRoomAvailability);

  const parsedAvailability = actualRoomAvailability?.map(
    ({ checkInDate, checkOutDate }) => ({
      checkIn: new Date(checkInDate),
      checkOut: new Date(checkOutDate),
    })
  );

  const isDateAvailable = (date: Date) => {
    if (!parsedAvailability) return false;
    return parsedAvailability?.some(
      ({ checkIn, checkOut }) =>
        date >= checkIn &&
        date <= new Date(checkOut.getTime() + 24 * 60 * 60 * 1000)
    );
  };

  const updateStoreOnSubmit = (data: bookingData) => {
    const formattedData = {
      ...data,
      checkIn: data.checkIn.toISOString().split("T")[0], // Formats to YYYY-MM-DD
      checkOut: data.checkOut.toISOString().split("T")[0], // Formats to YYYY-MM-DD
    };
    const daysDifference =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);

    setCheckOut({
      ...formattedData,
      totalAmount: totalAmount,
      room: room,
      days: daysDifference,
    });

    updateBookingCustomers(
      formattedData.adults,
      formattedData.children,
      totalAmount
    );
    updateBookingDates(formattedData.checkIn, formattedData.checkOut);

    navigate("/user/booking/checkout");
  };

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const totalAmount = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 0;
    }
    const daysDifference =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);

    const ratePerDay = room?.pricePerNight || 0;
    return (ratePerDay || 0) * daysDifference;
  }, [checkIn, checkOut, booking]);

  return (
    <Container maxW="container.xl" py={8}>
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
        {/* Left Column - Images */}
        <VStack gap={4} align="stretch">
          <Box overflow="hidden" borderRadius="lg" boxShadow="md">
            <Image
              src="/placeholder.svg?height=440&width=670"
              alt="Deluxe Room Main View"
              w="full"
              h="440px"
              objectFit="cover"
              bg="gray.200"
            />
          </Box>
          <SimpleGrid columns={3} gap={4}>
            <Box overflow="hidden" borderRadius="lg" boxShadow="md">
              <Image
                src="/placeholder.svg?height=439&width=327"
                alt="Room Detail 1"
                w="full"
                h="200px"
                objectFit="cover"
                bg="gray.200"
              />
            </Box>
            <Box overflow="hidden" borderRadius="lg" boxShadow="md">
              <Image
                src="/placeholder.svg?height=212&width=327"
                alt="Room Detail 2"
                w="full"
                h="200px"
                objectFit="cover"
                bg="gray.200"
              />
            </Box>
            <Box overflow="hidden" borderRadius="lg" boxShadow="md">
              <Image
                src="/placeholder.svg?height=212&width=327"
                alt="Room Detail 3"
                w="full"
                h="200px"
                objectFit="cover"
                bg="gray.200"
              />
            </Box>
          </SimpleGrid>
        </VStack>

        {/* Right Column - Details & Booking */}
        <VStack gap={6} align="stretch">
          <Card.Root boxShadow="md">
            <Card.Body>
              <Box
                as="form"
                onSubmit={handleSubmit((data) => {
                  updateStoreOnSubmit(data);
                })}
              >
                <VStack align="stretch" gap={4}>
                  <Heading size="lg" color="blue.600">
                    DELUXE ROOM
                  </Heading>
                  <Text color="gray.600">
                    Our deluxe rooms offer a perfect blend of comfort and
                    luxury. Featuring modern amenities and elegant design, these
                    spacious rooms ensure a memorable stay for our guests.
                  </Text>
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Field.Root invalid={!!errors.checkIn}>
                      <Field.Label>Check-In-Date</Field.Label>
                      <Controller
                        name="checkIn"
                        control={control}
                        render={({ field }) => (
                          <Box p={2} boxShadow={"sm"} borderRadius={"md"}>
                            <DatePicker
                              selected={field.value}
                              onChange={field.onChange}
                              minDate={new Date()} // Disable past dates
                              filterDate={isDateAvailable} // Only enable available dates
                              placeholderText="Select Check-In Date"
                            />
                          </Box>
                        )}
                      />
                      <Field.ErrorText>
                        {errors.checkIn?.message}
                      </Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.checkOut}>
                      <Field.Label>Check-Out-Date</Field.Label>
                      <Controller
                        name="checkOut"
                        control={control}
                        render={({ field }) => (
                          <Box p={2} boxShadow={"sm"} borderRadius={"md"}>
                            <DatePicker
                              selected={field.value}
                              onChange={field.onChange}
                              minDate={new Date()}
                              filterDate={isDateAvailable}
                              placeholderText="Select Check-Out Date"
                            />
                          </Box>
                        )}
                      />
                      <Field.ErrorText>
                        {errors.checkOut?.message}
                      </Field.ErrorText>
                    </Field.Root>

                    <Field.Root invalid={!!errors.adults}>
                      <Field.Label>Adults</Field.Label>
                      <Input type="number" {...register("adults")} />
                      <Field.ErrorText>
                        {errors.adults?.message}
                      </Field.ErrorText>
                    </Field.Root>
                    <Field.Root invalid={!!errors.children}>
                      <Field.Label>Children</Field.Label>
                      <Input type="number" {...register("children")} />
                      <Field.ErrorText>
                        {errors.children?.message}
                      </Field.ErrorText>
                    </Field.Root>
                  </Grid>
                  <Box pt={4}>
                    <Heading size="md" mb={4}>
                      ROOM AMENITIES
                    </Heading>
                    <SimpleGrid columns={2} gap={3}>
                      {amenities.map((amenity) => (
                        <Box key={amenity} display="flex" alignItems="center">
                          <LuListCheck color="green.500" />
                          {amenity}
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Box>
                  <Flex justify="space-between" align="center" pt={4}>
                    <Heading size="lg">
                      ${totalAmount < 0 ? 0 : totalAmount}
                    </Heading>
                    <Button colorScheme="blue" type="submit" size="lg" px={8}>
                      BOOK NOW
                    </Button>
                  </Flex>
                </VStack>
              </Box>
            </Card.Body>
          </Card.Root>
        </VStack>
      </Grid>
    </Container>
  );
};

export default RoomDetails;
