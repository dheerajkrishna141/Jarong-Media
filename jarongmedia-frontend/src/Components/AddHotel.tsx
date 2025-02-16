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
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toaster } from "./UI/toaster";
import { Radio } from "./UI/radio";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z
    .string({ message: "Name is required" })
    .min(5, { message: "Enter atleast 5 characters" }),
  city: z
    .string({ message: "City is required" })
    .min(5, { message: "Enter atleast 5 characters" }),
  state: z
    .string({ message: "State is required" })
    .min(5, { message: "Enter atleast 5 characters" }),
  zip: z
    .number({ message: "Zip is required" })
    .min(5, { message: "Enter atleast 5 characters" }),
  country: z
    .string({ message: "Country is required" })
    .min(5, { message: "Enter atleast 5 characters" }),
  description: z
    .string({ message: "description is required" })
    .min(50, { message: "Enter atleast 50 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const AddHotel = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Box
      as="form"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
      p={4}
    >
      <Heading mb={6} size={"3xl"}>
        Fill Out Hotel Details
      </Heading>

      {/* Reservation Details Card. */}
      <Card.Root mb={6} shadow={"md"}>
        <Card.Header>
          <Heading size="2xl">Hotel Details</Heading>
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
            <Field.Root required invalid={errors.name ? true : false}>
              <Field.Label>Name</Field.Label>
              <Input type="text" {...register("name")} />
              <Field.ErrorText>{errors.name?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={errors.city ? true : false}>
              <Field.Label>City</Field.Label>

              <Input type="text" {...register("city")} />
              <Field.ErrorText>{errors.city?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={errors.state ? true : false}>
              <Field.Label>State</Field.Label>

              <Input type="text" {...register("state")} />
              <Field.ErrorText>{errors.state?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root required invalid={errors.zip ? true : false}>
              <Field.Label>Zip</Field.Label>

              <Input type="number" {...register("zip")} />
              <Field.ErrorText>{errors.zip?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={errors.country ? true : false}>
              <Field.Label>Country</Field.Label>

              <Input {...register("country")} placeholder="Country.." />
              <Field.ErrorText>{errors.country?.message}</Field.ErrorText>
            </Field.Root>

            {/* <Field.Root>
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
            </Field.Root>

            <Field.Root>
              <Field.Label>Booking Reference No</Field.Label>
              <Input
                name="bookingReference"
                value={formData.bookingReference}
                onChange={handleInputChange}
                placeholder="Booking Reference No."
              />
            </Field.Root> */}

            {/* <Field.Root>
              <Field.Label>Purpose of Visit</Field.Label>
              <Input
                name="purposeOfVisit"
                value={formData.purposeOfVisit}
                onChange={handleInputChange}
                placeholder="Purpose of Visit"
              />
            </Field.Root> */}

            <Field.Root
              gridColumn={{ md: "span 2", lg: "span 3" }}
              invalid={errors.description ? true : false}
            >
              <Field.Label>Description</Field.Label>

              <Textarea
                {...register("description")}
                placeholder="Enter a detailed summary of the hotel."
                rows={3}
              />
              <Field.ErrorText>{errors.description?.message}</Field.ErrorText>
            </Field.Root>
          </Grid>
        </Card.Body>
      </Card.Root>
      <Box className="flex justify-end" gap={4}>
        <Button type="reset" variant={"outline"} size="lg">
          Cancel
        </Button>
        <Button type="submit" colorScheme="blue" size="lg">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddHotel;
