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
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z
  .object({
    roomId: z.string().min(1, { message: "Room Id is required" }),
    hotelId: z.string().min(1, { message: "Hotel Id is required" }),

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

const AddAvailability = () => {
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const status = createListCollection({
    items: [
      { label: "Available", value: "available" },
      { label: "Booked", value: "booked" },
    ],
  });
  return (
    <div>
      <Box
        as="form"
        onSubmit={handleSubmit((data) => {
          console.log(data);
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
              <Field.Root invalid={errors.roomId ? true : false}>
                <Field.Label>Room Id</Field.Label>
                <Input type="text" {...register("roomId")} />
                <Field.ErrorText>{errors.roomId?.message}</Field.ErrorText>
              </Field.Root>
              <Field.Root invalid={errors.hotelId ? true : false}>
                <Field.Label>Hotel Id</Field.Label>
                <Input type="text" {...register("hotelId")} />
                <Field.ErrorText>{errors.hotelId?.message}</Field.ErrorText>
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
