import HotelService from "@/services/HotelService";
import {
  Box,
  Button,
  Card,
  createListCollection,
  Field,
  Grid,
  Heading,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { hotelDTOWithId, roomDTO } from "./AddRoom";
import { toaster } from "./UI/toaster";

const formSchema = z
  .object({
    roomId: z.array(z.string().min(1, { message: "Hotel is required" })),
    hotel: z.array(z.string().min(1, { message: "Hotel is required" })),

    checkInDate: z.string({ required_error: "Check In Date is required" }),
    checkOutDate: z.string({ required_error: "Check Out Date is required" }),
    status: z.array(z.string().min(1, { message: "Category is required" })),
  })
  .refine(
    (data) => {
      const checkIn = new Date(data.checkInDate);
      const checkOut = new Date(data.checkOutDate);
      return checkOut > checkIn;
    },
    {
      message: "Check Out Date must be after Check In Date",
      path: ["checkOutDate"],
    }
  );

type FormValues = z.infer<typeof formSchema>;

export interface availabilityDTO {
  roomId: string;
  hotelId: string;
  status: string;
  checkInDate: string;
  checkOutDate: string;
}

const AddAvailability = () => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const [hotelInfo, setHotelInfo] = useState<hotelDTOWithId[]>([]);
  const [roomInfo, setRoomInfo] = useState<roomDTO[]>([]);

  useEffect(() => {
    HotelService.getRooms().then((data) => {
      setRoomInfo(data);
    });

    HotelService.getHotels().then((data) => {
      setHotelInfo(data);
    });
  }, []);

  const hotels = createListCollection({
    items: hotelInfo.map((hotel) => ({
      label: hotel.name,
      value: hotel.id,
    })),
  });
  const rooms = createListCollection({
    items: roomInfo.map((room) => ({
      label: room.id,
      value: room.id,
    })),
  });

  const status = createListCollection({
    items: [
      { label: "Available", value: "available" },
      { label: "Booked", value: "booked" },
    ],
  });

  const handleAvailabilitySubmit = (data: FormValues) => {
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
      <Box
        as="form"
        onSubmit={handleSubmit((data) => {
          handleAvailabilitySubmit(data);
        })}
        p={4}
      >
        <Heading size={"3xl"} mb={6}>
          Fill Out Availability
        </Heading>

        <Card.Root shadow={"lg"} mb={6}>
          <Card.Header>
            <Heading size="md">Availability Details</Heading>
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
              <Field.Root invalid={!!errors.roomId}>
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
                        <SelectValueText placeholder="Select Hotel" />
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
              <Field.Root invalid={errors.checkInDate ? true : false}>
                <Field.Label>Check In Date</Field.Label>
                <Input type="date" {...register("checkInDate")} />
                <Field.ErrorText>{errors.checkInDate?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={errors.checkOutDate ? true : false}>
                <Field.Label>Check Out Date</Field.Label>
                <Input type="date" {...register("checkOutDate")} />
                <Field.ErrorText>
                  {errors.checkOutDate?.message}
                </Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={!!errors.status}>
                <Field.Label>Status</Field.Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <SelectRoot
                      name={field.name}
                      value={field.value}
                      onValueChange={({ value }) => field.onChange(value)}
                      onInteractOutside={() => field.onBlur()}
                      collection={status}
                    >
                      <SelectTrigger>
                        <SelectValueText placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {status.items.map((movie: any) => (
                          <SelectItem item={movie} key={movie.value}>
                            {movie.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                  )}
                />
                <Field.ErrorText>{errors.status?.message}</Field.ErrorText>
              </Field.Root>
            </Grid>
          </Card.Body>
        </Card.Root>
        <Box className="flex justify-end" gap={4}>
          <Button type="reset" variant={"outline"} size="md">
            Cancel
          </Button>
          <Button type="submit" size="md">
            Submit
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default AddAvailability;
