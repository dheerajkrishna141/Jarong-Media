import HotelService from "@/services/HotelService";
import {
  Box,
  Button,
  Card,
  Field,
  Grid,
  Heading,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { z } from "zod";
import { toaster } from "../../UI/toaster";

const categorySchema = z.object({
  name: z.string().min(1, { message: "Category name is required" }),
  values: z
    .string()
    .min(1, { message: "At least one value is required" })
    .refine((val) => val.split(",").every((item) => item.trim() !== ""), {
      message: "Invalid format. Please enter comma-separated values",
    }),
});

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
  categories: z
    .array(categorySchema)
    .min(1, { message: "At least one category is required" }),
  description: z
    .string({ message: "description is required" })
    .min(50, { message: "Enter atleast 50 characters" }),
});

export interface hotelDTO {
  name: string;
  description: string;
  address: {
    city: string;
    state: string;
    zip: number;
    country: string;
  };
  amenities: {
    [name: string]: string;
  };
}

type FormValues = z.infer<typeof formSchema>;

const AddHotel = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    register,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const {
    fields: categoryFields,
    append: appendCategory,
    remove: removeCategory,
  } = useFieldArray({
    control,
    name: "categories",
  });

  const handleSubmitHelper = (data: FormValues) => {
    const processedData: hotelDTO = {
      name: data.name,
      description: data.description,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zip: parseInt(data.zip),
      },
      amenities: {},
    };

    data.categories.forEach((category) => {
      processedData.amenities[category.name] = category.values;
    });

    HotelService.addHotel({
      data: processedData,
    })
      .then(() => {
        reset();
        toaster.create({
          title: "Hotel Added successfully!",
          type: "success",
          duration: 5 * 1000, //5 seconds
        });
      })
      .catch((res) => {
        toaster.create({
          title: "Error Adding Hotel",
          type: "error",
          description: res.response.data.message,
          duration: 5 * 1000, //5 seconds
        });
      });

    // toaster.promise(hotelPromise, {
    //   success: {
    //     title: "Hotel Added successfully!",
    //     duration: 5 * 1000, //5 seconds
    //   },
    //   error: {
    //     title: "Error Adding Hotel",
    //     description: error,
    //     duration: 5 * 1000, //5 seconds
    //   },
    //   loading: {
    //     title: "Uploading...",
    //     description: "Please wait",
    //   },
    // });
  };
  return (
    <Box
      as="form"
      onSubmit={handleSubmit((data) => {
        handleSubmitHelper(data);
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
            <Box gridColumn={"span 3"}>
              <Text mb={2} mt={4}>
                Categories
              </Text>
              <Grid
                templateColumns={{
                  base: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={4}
              >
                {categoryFields.map((field, index) => (
                  <Box key={field.id} borderWidth={1} borderRadius="md" p={4}>
                    <Field.Root invalid={!!errors.categories?.[index]?.name}>
                      <Field.Label>Category Name</Field.Label>
                      <Input
                        {...register(`categories.${index}.name` as const)}
                      />
                      <Field.ErrorText>
                        {errors.categories?.[index]?.name?.message}
                      </Field.ErrorText>
                    </Field.Root>

                    <Field.Root
                      mt={2}
                      invalid={!!errors.categories?.[index]?.values}
                    >
                      <Field.Label mt={5}>Values (comma-separated)</Field.Label>
                      <Input
                        {...register(`categories.${index}.values` as const)}
                        placeholder="Enter comma-separated values"
                      />
                      <Field.ErrorText>
                        {errors.categories?.[index]?.values?.message}
                      </Field.ErrorText>
                    </Field.Root>
                    <Box className="flex justify-end">
                      <Button
                        mt={5}
                        size="md"
                        variant={"outline"}
                        colorPalette={"red"}
                        onClick={() => removeCategory(index)}
                      >
                        <MdDeleteForever />
                        Delete
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Grid>
              <Field.Root invalid={!!errors.categories?.message}>
                <Field.ErrorText>{errors.categories?.message}</Field.ErrorText>
              </Field.Root>

              <Button
                mt={4}
                variant={"outline"}
                colorPalette={"blue"}
                onClick={() => appendCategory({ name: "", values: "" })}
              >
                <IoMdAddCircleOutline />
                Add Category
              </Button>
            </Box>

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
