import useAddHotelBooking from "@/hooks/useAddHotelBooking";
import useHotels from "@/hooks/useHotels";
import useRooms from "@/hooks/useRooms";
import { HotelBookingDTO } from "@/services/httpHotelBookingService";
import {
  Box,
  Button,
  Card,
  createListCollection,
  Field,
  Fieldset,
  FieldsetErrorText,
  Flex,
  Grid,
  Heading,
  Input,
  RadioGroup,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { bookingSchema, type BookingFormData } from "../schema/BookingSchema";
import { hotelDTOWithId, roomDTO } from "./AddRoom";
import { Radio } from "./UI/radio";

const roomType = createListCollection({
  items: [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "suite", label: "Suite" },
  ],
});

const bookingType = createListCollection({
  items: [
    { value: "standard", label: "Standard" },
    { value: "business", label: "Business" },
    { value: "luxury", label: "Luxury" },
  ],
});

const paymentMethod = createListCollection({
  items: [
    { value: "credit", label: "Credit Card" },
    { value: "debit", label: "Debit Card" },
    { value: "cash", label: "Cash" },
  ],
});

const BookRoom = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const roomId = watch("roomId");
  const { data: roomData } = useRooms();
  const { data: hotelData } = useHotels();
  const { mutate: createBooking } = useAddHotelBooking();

  const allRooms: roomDTO[] = roomData || [];
  const allHotels: hotelDTOWithId[] = hotelData || [];

  const selectedHotel = watch("hotel");

  const shortListedRooms = useMemo(() => {
    if (!selectedHotel) return [] as roomDTO[];
    return allRooms?.filter((room) => room.hotelId === selectedHotel[0]);
  }, [selectedHotel]);

  const rooms = createListCollection({
    items: shortListedRooms?.map((room) => ({
      label: room.id,
      value: room.id,
    })),
  });

  const hotels = createListCollection({
    items: allHotels.map((hotel) => ({
      label: hotel.name,
      value: hotel.id,
    })),
  });

  const totalAmount = useMemo(() => {
    if (!checkIn || !checkOut || !roomId) {
      return 0;
    }
    const daysDifference =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);

    const selectedRoom = roomData?.filter((room) => {
      return room.id === roomId[0];
    });
    const ratePerDay = selectedRoom ? selectedRoom[0].pricePerNight : 0;
    return (ratePerDay || 0) * daysDifference;
  }, [checkIn, checkOut, roomId]);

  const handleBookingSubmit = (data: BookingFormData) => {
    const processedData: HotelBookingDTO = {
      checkInDate: data.checkIn,
      checkOutDate: data.checkOut,
      customerDetails: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        city: data.city,
        country: data.country,
      },
      additionalDetails: {
        arrival_from: data.arrivalFrom || "",
        booking_type: data.bookingType[0],
        purpose_of_visit: data.purposeOfVisit,
        remarks: data.remarks,
        payment_method: data.paymentMethod,
      },
      hotelId: data.hotel[0],
      status: "",
      roomId: data.roomId[0],
      totalAmount: totalAmount,
      roomDetails: {
        room_type: data.roomType[0],
        adults: data.adults,
        children: data.children,
      },
    };

    if (data.paymentMethod === "cash") {
      processedData.status = "booked";
    } else {
      processedData.status = "payment_pending";
    }

    createBooking(processedData);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit((data) => {
        handleBookingSubmit(data);
      })}
      p={4}
    >
      <Heading size={"3xl"} mb={6}>
        Fill Out Booking Details
      </Heading>

      <Card.Root shadow={"lg"} mb={6}>
        <Card.Header>
          <Heading size="md">Reservation Details</Heading>
        </Card.Header>
        <Card.Body>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={6}
          >
            <Field.Root invalid={!!errors.checkIn}>
              <Field.Label>Check In</Field.Label>
              <Input type="date" {...register("checkIn")} />
              <Field.ErrorText>{errors.checkIn?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.checkOut}>
              <Field.Label>Check Out</Field.Label>
              <Input type="date" {...register("checkOut")} />
              <Field.ErrorText>{errors.checkOut?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label>Arrival From</Field.Label>
              <Input {...register("arrivalFrom")} placeholder="Arrival From" />
            </Field.Root>

            <Field.Root invalid={!!errors.hotel}>
              <Field.Label>Hotel</Field.Label>
              <Controller
                control={control}
                name="hotel"
                render={({ field }) => (
                  <SelectRoot
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={hotels}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select Hotel" />
                    </SelectTrigger>
                    <SelectContent>
                      {hotels.items.map((hotel) => (
                        <SelectItem item={hotel} key={hotel.value}>
                          {hotel.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
              <Field.ErrorText>{errors.hotel?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.bookingType}>
              <Field.Label>Booking Type</Field.Label>
              <Controller
                control={control}
                name="bookingType"
                render={({ field }) => (
                  <SelectRoot
                    name={field.name}
                    // value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={bookingType}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select booking type" />
                    </SelectTrigger>
                    <SelectContent>
                      {bookingType.items.map((type) => (
                        <SelectItem item={type} key={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
              <Field.ErrorText>{errors.bookingType?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root>
              <Field.Label>Purpose of Visit</Field.Label>
              <Input
                {...register("purposeOfVisit")}
                placeholder="Purpose of Visit"
              />
            </Field.Root>

            <Field.Root gridColumn={{ md: "span 2", lg: "span 3" }}>
              <Field.Label>Remarks</Field.Label>
              <Textarea
                {...register("remarks")}
                placeholder="Remarks"
                rows={3}
              />
            </Field.Root>
          </Grid>
        </Card.Body>
      </Card.Root>

      <Card.Root shadow={"lg"} mb={6}>
        <Card.Header>
          <Heading size="md">Room Details</Heading>
        </Card.Header>
        <Card.Body>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <Field.Root invalid={!!errors.roomType}>
              <Field.Label>Room Type</Field.Label>
              <Controller
                control={control}
                name="roomType"
                render={({ field }) => (
                  <SelectRoot
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={roomType}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomType.items.map((type) => (
                        <SelectItem item={type} key={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
              <Field.ErrorText>{errors.roomType?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              invalid={!!errors.roomId}
              disabled={shortListedRooms.length === 0}
            >
              <Field.Label>Room Id</Field.Label>
              <Controller
                control={control}
                name="roomId"
                render={({ field }) => (
                  <SelectRoot
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={rooms}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select Room" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.items.map((room) => (
                        <SelectItem item={room} key={room.value}>
                          {room.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
              <Field.ErrorText>{errors.roomId?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.adults}>
              <Field.Label>Adults</Field.Label>
              <Input type="number" {...register("adults")} />
              <Field.ErrorText>{errors.adults?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.children}>
              <Field.Label>Children</Field.Label>
              <Input type="number" {...register("children")} />
              <Field.ErrorText>{errors.children?.message}</Field.ErrorText>
            </Field.Root>
          </Grid>
        </Card.Body>
      </Card.Root>

      <Card.Root shadow={"lg"} mb={6}>
        <Card.Header>
          <Heading size="md">Customer Details</Heading>
        </Card.Header>
        <Card.Body>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <Field.Root invalid={!!errors.firstName}>
              <Field.Label>First Name</Field.Label>
              <Input {...register("firstName")} placeholder="First Name" />
              <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.lastName}>
              <Field.Label>Last Name</Field.Label>
              <Input {...register("lastName")} placeholder="Last Name" />
              <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.email}>
              <Field.Label>Email</Field.Label>
              <Input type="email" {...register("email")} placeholder="Email" />
              <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.phone}>
              <Field.Label>Phone</Field.Label>
              <Input type="tel" {...register("phone")} placeholder="Phone" />
              <Field.ErrorText>{errors.phone?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root
              gridColumn={{ md: "span 2" }}
              invalid={!!errors.address}
            >
              <Field.Label>Address</Field.Label>
              <Textarea {...register("address")} placeholder="Address" />
              <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.city}>
              <Field.Label>City</Field.Label>
              <Input {...register("city")} placeholder="City" />
              <Field.ErrorText>{errors.city?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.country}>
              <Field.Label>Country</Field.Label>
              <Input {...register("country")} placeholder="Country" />
              <Field.ErrorText>{errors.country?.message}</Field.ErrorText>
            </Field.Root>
          </Grid>
        </Card.Body>
      </Card.Root>

      <Card.Root shadow={"lg"} mb={6}>
        <Card.Header>
          <Heading size="md">Payment Details</Heading>
        </Card.Header>
        <Card.Body>
          <Stack>
            <Box mb={5}>
              <Text>Total Amount: {`$${totalAmount}`}</Text>
            </Box>

            <Fieldset.Root invalid={!!errors.paymentMethod}>
              <Fieldset.Legend mb={3}>Payment Method</Fieldset.Legend>
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <RadioGroup.Root
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => {
                      field.onChange(value);
                    }}
                  >
                    {/* <HStack gap="6"> */}
                    <Flex gap={6}>
                      {paymentMethod.items.map((item) => (
                        <Radio
                          key={item.value}
                          value={item.value}
                          inputProps={{ onBlur: field.onBlur }}
                        >
                          {item.label}
                        </Radio>
                      ))}
                    </Flex>
                    {/* </HStack> */}
                  </RadioGroup.Root>
                )}
              />
              <FieldsetErrorText>
                {errors.paymentMethod?.message}
              </FieldsetErrorText>
            </Fieldset.Root>
          </Stack>
        </Card.Body>
      </Card.Root>

      <Flex justifyContent={"end"} gap={4}>
        <Button size="md" variant={"outline"} type="reset">
          Cancel
        </Button>
        <Button size="md" type="submit">
          Submit
        </Button>
      </Flex>
    </Box>
  );
};

export default BookRoom;
