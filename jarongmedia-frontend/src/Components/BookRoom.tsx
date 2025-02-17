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
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { bookingSchema, type BookingFormData } from "../schema/BookingSchema";
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
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  return (
    <Box
      as="form"
      onSubmit={handleSubmit((data) => {
        console.log(data);
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

            <Field.Root invalid={!!errors.roomNo}>
              <Field.Label>Room No</Field.Label>
              <Input {...register("roomNo")} placeholder="Room Number" />
              <Field.ErrorText>{errors.roomNo?.message}</Field.ErrorText>
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
          <Heading size="md">Additional Details</Heading>
        </Card.Header>
        <Card.Body>
          <Fieldset.Root invalid={!!errors.paymentMethod}>
            <Fieldset.Legend>Payment Method</Fieldset.Legend>
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
