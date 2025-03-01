"use client";

import { Checkbox } from "@/Components/UI/checkbox";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Field,
  Flex,
  Grid,
  Heading,
  Input,
  Tag,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

import { CONSTANTS } from "@/constants/AppConstants";
import useAddHotelBooking from "@/hooks/useAddHotelBooking";
import useSessionStorage from "@/hooks/useSessionStorage";
import { HotelBookingDTO } from "@/services/httpHotelBookingService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { room } from "../Admin/Hotel/AddRoom";
import Footer from "../User/Layout/Footer";

const checkOutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),

  requests: z.string(),
  arrivalFrom: z.string(),

  purposeOfVisit: z.string(),
});

type checkOurFormData = z.infer<typeof checkOutSchema>;

type CheckOutData = {
  checkIn: string;
  checkOut: string;
  adults: string;
  children: string;
  totalAmount: number;
  room: room;
  days: number;
};

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<checkOurFormData>({
    resolver: zodResolver(checkOutSchema),
  });
  const { getItem: getCheckOut } = useSessionStorage(
    CONSTANTS.CHECKOUT_STORAGE_KEY
  );

  const {
    mutate: createBooking,
    isPending,
    isError,
    error,
  } = useAddHotelBooking();

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const booking: CheckOutData = JSON.parse(getCheckOut() || "{}");

  const handlePayment = (data: checkOurFormData) => {
    console.log(data);
    const processedData: HotelBookingDTO = {
      checkInDate: booking.checkIn,
      checkOutDate: booking.checkOut,
      hotelId: booking.room.hotelId,
      roomId: booking.room.id,
      roomDetails: {
        adults: booking.adults,
        children: booking.children,
      },
      status: "payment_pending",
      totalAmount: booking.totalAmount,
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
        purpose_of_visit: data.purposeOfVisit,
        remarks: data.requests,
      },
    };

    createBooking(processedData);
  };

  return (
    <Box>
      {isError && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Error Placing Order</Alert.Title>
            <Alert.Description>{error.response.data.message}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
      <Box
        as="form"
        onSubmit={handleSubmit((data) => {
          handlePayment(data);
        })}
      >
        {/* Main Content */}
        <Box py={8}>
          <Container maxW="container.xl">
            <VStack gap={8} align="stretch">
              {/* Coupon Section */}
              <Box bg="teal.500" p={4} borderRadius="md">
                <Flex align="center" gap={2}>
                  <Tag.Root>
                    <Tag.Label>
                      Have a coupon? Click here to enter your code
                    </Tag.Label>
                  </Tag.Root>
                </Flex>
              </Box>
              {/* Checkout Grid */}
              <Grid templateColumns={{ base: "1fr", lg: "3fr 2fr" }} gap={8}>
                {/* Left Column - Billing Details */}
                <Box>
                  <Card.Root shadow={"lg"} mb={6}>
                    <Card.Header>
                      <Heading>Customer Details</Heading>
                    </Card.Header>
                    <Card.Body>
                      {/* <VStack
                    gap={6}
                    align="stretch"
                    bg="white"
                    p={6}
                    borderRadius="md"
                    boxShadow="sm"
                  > */}
                      {/* <Grid
                      templateColumns={{ base: "1fr", sm: "1fr 1fr" }}
                      gap={4}
                    > */}
                      <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                        gap={6}
                      >
                        <Field.Root invalid={!!errors.firstName}>
                          <Field.Label>First Name</Field.Label>
                          <Input
                            {...register("firstName")}
                            placeholder="First Name"
                          />
                          <Field.ErrorText>
                            {errors.firstName?.message}
                          </Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={!!errors.lastName}>
                          <Field.Label>Last Name</Field.Label>
                          <Input
                            {...register("lastName")}
                            placeholder="Last Name"
                          />
                          <Field.ErrorText>
                            {errors.lastName?.message}
                          </Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={!!errors.email}>
                          <Field.Label>Email</Field.Label>
                          <Input
                            type="email"
                            {...register("email")}
                            placeholder="Email"
                          />
                          <Field.ErrorText>
                            {errors.email?.message}
                          </Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={!!errors.phone}>
                          <Field.Label>Phone</Field.Label>
                          <Input
                            type="tel"
                            {...register("phone")}
                            placeholder="Phone"
                          />
                          <Field.ErrorText>
                            {errors.phone?.message}
                          </Field.ErrorText>
                        </Field.Root>
                        <Field.Root
                          gridColumn={{ md: "span 2" }}
                          invalid={!!errors.address}
                        >
                          <Field.Label>Address</Field.Label>
                          <Textarea
                            {...register("address")}
                            placeholder="Address"
                          />
                          <Field.ErrorText>
                            {errors.address?.message}
                          </Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={!!errors.city}>
                          <Field.Label>City</Field.Label>
                          <Input {...register("city")} placeholder="City" />
                          <Field.ErrorText>
                            {errors.city?.message}
                          </Field.ErrorText>
                        </Field.Root>
                        <Field.Root invalid={!!errors.country}>
                          <Field.Label>Country</Field.Label>
                          <Input
                            {...register("country")}
                            placeholder="Country"
                          />
                          <Field.ErrorText>
                            {errors.country?.message}
                          </Field.ErrorText>
                        </Field.Root>
                      </Grid>
                    </Card.Body>
                  </Card.Root>
                  <Card.Root shadow={"lg"} mb={6}>
                    <Card.Header>
                      <Heading>Additional Details</Heading>
                    </Card.Header>
                    <Card.Body>
                      <Field.Root>
                        <Field.Label>Arrival From</Field.Label>
                        <Input
                          {...register("arrivalFrom")}
                          placeholder="Arrival From"
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Purpose of Visit</Field.Label>
                        <Input
                          {...register("purposeOfVisit")}
                          placeholder="Purpose of Visit"
                        />
                      </Field.Root>
                      <Field.Root gridColumn={{ md: "span 2", lg: "span 3" }}>
                        <Field.Label>Requests</Field.Label>
                        <Textarea
                          {...register("requests")}
                          placeholder="Remarks"
                          rows={3}
                        />
                      </Field.Root>
                    </Card.Body>
                  </Card.Root>
                  {/* </VStack> */}
                </Box>
                {/* Right Column - Order Summary */}
                <Box>
                  <Card.Root shadow={"lg"} mb={6}>
                    <Card.Header>
                      <Heading size="md">Checkout total</Heading>
                    </Card.Header>
                    <Card.Body>
                      <Box>
                        <Flex justify="space-between" mb={4}>
                          <Text fontSize="xl" fontWeight="semibold">
                            Jargon Dev&apos;s Hotel
                          </Text>
                          <Box textAlign="right">
                            <Text fontSize="xl" fontWeight="semibold">
                              ${booking.totalAmount}
                            </Text>
                            <Text color="gray.500" fontSize="sm">
                              ${booking.totalAmount}.00 payable in total
                            </Text>
                          </Box>
                        </Flex>
                        <Text color="gray.500" mb={6}>
                          address
                        </Text>
                        <VStack align="stretch" gap={4}>
                          <Box>
                            <Text color="gray.500">Room:</Text>
                            <Text>{booking.room?.category}</Text>
                          </Box>
                          <Box>
                            <Text color="gray.500">Date:</Text>
                            <Flex gap={4}>
                              <Text>{booking.checkIn}</Text>
                              <Text>{booking.checkOut}</Text>
                            </Flex>
                          </Box>
                          <Box>
                            <Text color="gray.500">Adults:</Text>
                            <Text>{booking.adults}</Text>
                          </Box>
                          <Box>
                            <Text color="gray.500">Children:</Text>
                            <Text>{booking.children}</Text>
                          </Box>
                          <Box>
                            <Text color="gray.500">Service:</Text>
                            <Text>Morning coffee</Text>
                            <Text>Gym and Spa</Text>
                            <Text>Serve dinner</Text>
                          </Box>
                          <Box>
                            <Text color="gray.500">Quantity:</Text>
                            <Text>{booking.days} days</Text>
                          </Box>
                          <Box pt={4}>
                            <Flex justify="space-between" mb={2}>
                              <Text fontWeight="semibold">Subtotal</Text>
                              <Text fontWeight="semibold">
                                ${booking.totalAmount}.00
                              </Text>
                            </Flex>
                            <Flex justify="space-between" mb={2}>
                              <Text fontWeight="semibold">Total</Text>
                              <Text fontWeight="semibold">
                                ${booking.totalAmount}.00
                              </Text>
                            </Flex>
                            <Flex justify="space-between" mb={2}>
                              <Text fontWeight="semibold">To Pay</Text>
                              <Text fontWeight="semibold">
                                ${booking.totalAmount}.00
                              </Text>
                            </Flex>
                          </Box>
                        </VStack>
                      </Box>
                      <Checkbox
                        mt={10}
                        colorPalette={"black"}
                        variant={"subtle"}
                        checked={isCheckboxChecked}
                        onCheckedChange={(e) =>
                          setIsCheckboxChecked(!!e.checked)
                        }
                        gap="4"
                        alignItems="flex-start"
                      >
                        <Box lineHeight="1">
                          I agree to the terms and conditions
                        </Box>
                        <Box fontWeight="normal" color="fg.muted" mt="1">
                          By completing this booking I acknowledge I have read
                          and accepted the{" "}
                          <Link color="blue.500" to="#">
                            Privacy Policies
                          </Link>
                          .
                        </Box>
                      </Checkbox>
                      <Button
                        mt={10}
                        colorPalette="teal"
                        type="submit"
                        size="lg"
                        disabled={!isCheckboxChecked}
                        loading={isPending}
                        spinnerPlacement="start"
                      >
                        Place order
                      </Button>
                    </Card.Body>
                  </Card.Root>
                </Box>
              </Grid>
            </VStack>
          </Container>
        </Box>
        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default CheckoutPage;
