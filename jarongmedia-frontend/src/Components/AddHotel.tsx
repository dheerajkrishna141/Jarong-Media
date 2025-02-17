import {
  Box,
  Button,
  Card,
  Field,
  Grid,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
    .string({ message: "Zip is required" })
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
        <Button type="reset" variant={"outline"} size="md">
          Cancel
        </Button>
        <Button type="submit" size="md">
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default AddHotel;
