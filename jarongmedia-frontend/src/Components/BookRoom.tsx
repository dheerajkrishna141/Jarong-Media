import React from "react";
import {
  Box,
  Heading,
  Card,
  Grid,
  Field,
  Input,
  Select,
  SelectRoot,
  Textarea,
  VStack,
  RadioGroup,
  RadioGroupRoot,
  Stack,
  Checkbox,
  CheckboxRoot,
  Switch,
  SwitchRoot,
  Button,
  NumberInput,
  NumberInputRoot,
} from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "./UI/toaster";
import { Radio } from "./UI/radio";

const BookRoom = () => {
  const [formData, setFormData] = useState({
    // Reservation Details
    checkIn: "",
    checkOut: "",
    arrivalFrom: "",
    bookingType: "",
    bookingReference: "",
    purposeOfVisit: "",
    remarks: "",

    // Room Details
    roomType: "",
    roomNo: "",
    adults: 0,
    children: 0,

    // Customer Details (Extended)
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    idType: "",
    idNumber: "",

    // Additional Form Elements
    newsletter: false,
    termsAccepted: false,
    paymentMethod: "",
    specialRequests: [],
    rating: 5,
  });
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    toaster.create({
      title: "Form Submitted",
      description: "Check console for form data",
      type: "success",
      duration: 5000,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      <Heading mb={6}>Fill Out Booking Details</Heading>

      {/* Reservation Details Card. */}
      <Card.Root mb={6}>
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
            <Field.Root required>
              <Field.Label>Check In</Field.Label>
              <Input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Check Out</Field.Label>
              <Input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Arrival From</Field.Label>
              <Input
                name="arrivalFrom"
                value={formData.arrivalFrom}
                onChange={handleInputChange}
                placeholder="Arrival From"
              />
            </Field.Root>
            {/* 
            <Field.Root>
              <Field.Label>Booking Type</Field.Label>
              <SelectRoot
                name="bookingType"
                value={formData.bookingType}
                onChange={handleInputChange}
                placeholder="Choose Booking Type"
              >
                <Select.Item value="standard">Standard</Select.Item>
                <Select.Item value="business">Business</Select.Item>
                <Select.Item value="luxury">Luxury</Select.Item>
              </SelectRoot>
            </Field.Root> */}

            <Field.Root>
              <Field.Label>Booking Reference No</Field.Label>
              <Input
                name="bookingReference"
                value={formData.bookingReference}
                onChange={handleInputChange}
                placeholder="Booking Reference No."
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Purpose of Visit</Field.Label>
              <Input
                name="purposeOfVisit"
                value={formData.purposeOfVisit}
                onChange={handleInputChange}
                placeholder="Purpose of Visit"
              />
            </Field.Root>

            <Field.Root gridColumn={{ md: "span 2", lg: "span 3" }}>
              <Field.Label>Remarks</Field.Label>
              <Textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Remarks"
                rows={3}
              />
            </Field.Root>
          </Grid>
        </Card.Body>
      </Card.Root>

      {/* Room Details sCard. */}
      <Card.Root mb={6}>
        <Card.Header>
          <Heading size="md">Room Details</Heading>
        </Card.Header>
        <Card.Body>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <Field.Root required>
              <Field.Label>Room Type</Field.Label>
              {/* <Select
                name="roomType"
                value={formData.roomType}
                onChange={handleInputChange}
                placeholder="Choose Room Type"
              >
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
              </Select> */}
            </Field.Root>

            <Field.Root required>
              <Field.Label>Room No</Field.Label>
              {/* <Select name="roomNo" value={formData.roomNo} onChange={handleInputChange} placeholder="Choose Room No">
                <option value="101">101</option>
                <option value="102">102</option>
                <option value="103">103</option>
              </Select> */}
            </Field.Root>

            <Field.Root>
              <Field.Label>Adults</Field.Label>
              {/* <NumberInputRoot min={0} max={10} defaultValue={"0"}>
                <NumberInput name="adults" value={formData.adults} onChange={handleInputChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput> */}
            </Field.Root>

            <Field.Root>
              <Field.Label>Children</Field.Label>
              {/* <NumberInput min={0} max={10} defaultValue={0}>
                <NumberInputField name="children" value={formData.children} onChange={handleInputChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput> */}
            </Field.Root>
          </Grid>
        </Card.Body>
      </Card.Root>

      {/* Customer Details Card. */}
      <Card.Root mb={6}>
        <Card.Header>
          <Heading size="md">Customer Details</Heading>
        </Card.Header>
        <Card.Body>
          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
            <Field.Root required>
              <Field.Label>First Name</Field.Label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Last Name</Field.Label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Email</Field.Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </Field.Root>

            <Field.Root required>
              <Field.Label>Phone</Field.Label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
              />
            </Field.Root>

            <Field.Root gridColumn={{ md: "span 2" }}>
              <Field.Label>Address</Field.Label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>City</Field.Label>
              <Input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Country</Field.Label>
              {/* <Select name="country" value={formData.country} onChange={handleInputChange} placeholder="Select Country">
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
              </Select> */}
            </Field.Root>
          </Grid>
        </Card.Body>
      </Card.Root>

      {/* Additional Form Elements Card. */}
      <Card.Root mb={6}>
        <Card.Header>
          <Heading size="md">Additional Details</Heading>
        </Card.Header>
        <Card.Body>
          <VStack gap={6} align="stretch">
            <Field.Root>
              <Field.Label>Payment Method</Field.Label>
              <RadioGroupRoot
                name="paymentMethod"
                // onChange={(value) =>
                //     setFormData(
                //     (prev) => ({ ...prev, paymentMethod: value })
                // )}
              >
                <Stack direction="row" gap={4}>
                  <Radio value="credit">Credit Card.</Radio>
                  <Radio value="debit">Debit Card.</Radio>
                  <Radio value="cash">Cash</Radio>
                </Stack>
              </RadioGroupRoot>
            </Field.Root>

            <Field.Root>
              <Field.Label>Special Requests</Field.Label>
              <Stack gap={2}>
                <CheckboxRoot
                //   onChange={(e) => {
                //     const value = "earlyCheckIn"
                //     setFormData((prev) => ({
                //       ...prev,
                //       specialRequests: e.target.checked
                //         ? [...prev.specialRequests, value]
                //         : prev.specialRequests.filter((item) => item !== value),
                //     }))
                //   }}
                >
                  Early Check-in
                </CheckboxRoot>
                <CheckboxRoot
                //   onChange={(e) => {
                //     const value = "lateCheckOut"
                //     setFormData((prev) => ({
                //       ...prev,
                //       specialRequests: e.target.checked
                //         ? [...prev.specialRequests, value]
                //         : prev.specialRequests.filter((item) => item !== value),
                //     }))
                //   }}
                >
                  Late Check-out
                </CheckboxRoot>
              </Stack>
            </Field.Root>

            <Field.Root display="flex" alignItems="center">
              <Field.Label mb="0">Subscribe to Newsletter</Field.Label>
              <SwitchRoot
                name="newsletter"
                checked={formData.newsletter}
                onChange={(e) => setFormData((prev) => ({ ...prev }))}
              />
            </Field.Root>

            <Field.Root>
              <CheckboxRoot
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData((prev) => ({ ...prev }))}
              >
                I accept the terms and conditions
              </CheckboxRoot>
            </Field.Root>
          </VStack>
        </Card.Body>
      </Card.Root>

      <Button type="submit" colorScheme="blue" size="lg" width="full">
        Submit Booking
      </Button>
    </Box>
  );
};

export default BookRoom;
