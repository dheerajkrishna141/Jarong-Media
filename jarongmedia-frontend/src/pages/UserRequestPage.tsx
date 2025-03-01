import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaDollarSign } from "react-icons/fa";
import {
  Box,
  Button,
  Field,
  Input,
  Stack,
  Grid,
  Heading,
} from "@chakra-ui/react";
import { Radio, RadioGroup } from "@/Components/UI/radio";
import { Checkbox } from "@/Components/UI/checkbox";
import { toaster } from "@/Components/UI/toaster";
import { InputGroup } from "@/Components/UI/input-group";

const schema = z
  .object({
    firstName: z.string().nonempty("First Name is required"),
    lastName: z.string().nonempty("Last Name is required"),
    email: z.string().email("Invalid email address"),
    mobileNo: z
      .string()
      .nonempty("Mobile Number is required")
      .regex(/^\d{10}$/, "Mobile Number must be 10 digits"),
    arrivalFrom: z.string().nonempty("Arrival From is required"),
    arrivalTo: z.string().nonempty("Arrival To is required"),
    travelType: z.enum(["hotel", "flights"]),
    date1: z.string().nonempty("Date is required"),
    date2: z.string().nonempty("Date is required"),
    budget: z.string().nonempty("Budget is required"),
  })
  .refine((data) => new Date(data.date1) < new Date(data.date2), {
    message: "First date must be before second date",
    path: ["date2"],
  });

type UserRequest = z.infer<typeof schema>;

const UserRequestPage: React.FC = () => {
  const [travelType, setTravelType] = useState("flights");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserRequest>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    toaster.create({
      title: "Form submitted successfully.",
      type: "success",
      duration: 3000,
    });
    console.log(data);
  };
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Box
      maxW={{ base: "100%", md: "80%", lg: "60%" }}
      mx="auto"
      mt={10}
      p={5}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Box textAlign="center" mb={10}>
        <Heading size={"4xl"}>Request Form</Heading>
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={7}>
          <Field.Root invalid={!!errors.firstName}>
            <Field.Label>First Name</Field.Label>
            <Input {...register("firstName")} />
            <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.lastName}>
            <Field.Label>Last Name</Field.Label>
            <Input {...register("lastName")} />
            <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input {...register("email")} />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.mobileNo}>
            <Field.Label>Mobile No</Field.Label>
            <Input {...register("mobileNo")} />
            <Field.ErrorText>{errors.mobileNo?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.arrivalFrom}>
            <Field.Label>Arrival From</Field.Label>
            <Input {...register("arrivalFrom")} />
            <Field.ErrorText>{errors.arrivalFrom?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.arrivalTo}>
            <Field.Label>Arrival To</Field.Label>
            <Input {...register("arrivalTo")} />
            <Field.ErrorText>{errors.arrivalTo?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root as="fieldset">
            <Field.Label as="legend">Travel Type</Field.Label>
            <RadioGroup
              onValueChange={(e) => {
                setTravelType(e.value);
              }}
              value={travelType}
            >
              <Stack direction="row">
                <Radio value="hotel">Hotel</Radio>
                <Radio value="flights">Flights</Radio>
              </Stack>
            </RadioGroup>
          </Field.Root>

          <Field.Root invalid={!!errors.date1}>
            <Field.Label>
              {travelType === "flights" ? "Departure" : "Check-In"}
            </Field.Label>
            <Input type="date" {...register("date1")} />
            <Field.ErrorText>{errors.date1?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.date2}>
            <Field.Label>
              {travelType === "flights" ? "Return" : "Check-Out"}
            </Field.Label>
            <Input type="date" {...register("date2")} />
            <Field.ErrorText>{errors.date2?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root invalid={!!errors.budget}>
            <Field.Label>Budget</Field.Label>
            <InputGroup startElement={<FaDollarSign color="gray.300" />}>
              <Input {...register("budget")} />
            </InputGroup>
            <Field.ErrorText>{errors.budget?.message}</Field.ErrorText>
          </Field.Root>

          <Field.Root>
            <Checkbox onCheckedChange={(e) => setIsChecked(!!e.checked)}>
              I accept the terms and privacy policy
            </Checkbox>
          </Field.Root>
        </Grid>

        <Stack direction="row" justifyContent={"flex-end"} gap={4} mt={6}>
          <Button type="submit" colorScheme="blue" disabled={!isChecked}>
            Submit
          </Button>
          <Button onClick={() => reset()} colorScheme="gray">
            Reset
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UserRequestPage;
