import React, { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
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
  Text,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Fieldset,
  RadioGroup,
  Flex,
  FieldsetErrorText,
} from "@chakra-ui/react";
import { Checkbox } from "@/Components/UI/checkbox";
import { toaster } from "@/Components/UI/toaster";
import { InputGroup } from "@/Components/UI/input-group";
import usa from "@/assets/usa.jpg";
import { Radio } from "@/Components/UI/radio";
import useCreateRequest from "@/hooks/useCreateRequest";
import { requestForm } from "@/services/httpUserService";

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

  const { mutate: createRequest } = useCreateRequest();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<UserRequest>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: UserRequest) => {
    const processedData: requestForm = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobileNo,
      arrivalFrom: data.arrivalFrom,
      arrivalTo: data.arrivalTo,
      travelType: data.travelType,
      date1: new Date(data.date1).toISOString().split("T")[0],
      date2: new Date(data.date2).toISOString().split("T")[0],
      budget: parseInt(data.budget),
      status: "pending",
      createdDate: new Date().toISOString().split("T")[0],
    };
    createRequest(processedData);
  };
  const [isChecked, setIsChecked] = useState(false);

  return (
    <Box bgGradient="linear(to-r, teal.500, yellow.400)">
      <Card.Root
        maxW={{ base: "100%", md: "80%", lg: "60%" }}
        mx="auto"
        mt={10}
        p={5}
        shadow="lg"
      >
        <Card.Header textAlign="center" mb={10}>
          <Heading size={"4xl"}>Request Form</Heading>
        </Card.Header>
        <Card.Description ml={5}>
          {/* <Text mb={5}> */}
          Fill out this form to get the best fares from our side.
          {/* </Text> */}
        </Card.Description>
        <Card.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={7}
            >
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

              <Fieldset.Root invalid={!!errors.travelType}>
                <Fieldset.Legend mb={3}>Travel Type</Fieldset.Legend>
                <Controller
                  name="travelType"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup.Root
                      name={field.name}
                      value={field.value}
                      onValueChange={({ value }) => {
                        field.onChange(value);
                        setTravelType(value);
                      }}
                    >
                      <Flex gap={6}>
                        <Radio
                          value={"hotel"}
                          inputProps={{ onBlur: field.onBlur }}
                        >
                          Hotel
                        </Radio>
                        <Radio
                          value={"flights"}
                          inputProps={{ onBlur: field.onBlur }}
                        >
                          Flights
                        </Radio>
                      </Flex>
                    </RadioGroup.Root>
                  )}
                />
                <FieldsetErrorText>
                  {errors.travelType?.message}
                </FieldsetErrorText>
              </Fieldset.Root>

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
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default UserRequestPage;
