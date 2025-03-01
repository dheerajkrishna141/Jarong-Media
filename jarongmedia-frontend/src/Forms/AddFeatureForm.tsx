import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  Grid,
  Heading,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { z } from "zod";

interface props {
  handleFeatureSubmit: (data: FeatureFormValues) => void;
}

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
  name: z.string().min(5, { message: "Enter atleast 5 characters" }),
  categories: z
    .array(categorySchema)
    .min(1, { message: "At least one category is required" }),
  area: z.string({ message: "Area is required" }),
  bed: z.array(z.string().min(1, { message: "Hotel is required" })),
});

export type FeatureFormValues = z.infer<typeof formSchema>;

const AddFeatureForm = ({ handleFeatureSubmit }: props) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    control,
  } = useForm<FeatureFormValues>({
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
  const bedType = createListCollection({
    items: [
      { label: "Twin", value: "twin" },
      { label: "Queen", value: "queen" },
      { label: "King", value: "king" },
    ],
  });
  return (
    <div>
      <Box
        mb={5}
        as="form"
        onSubmit={handleSubmit((data) => {
          handleFeatureSubmit(data);
        })}
      >
        <Heading size={"3xl"} mb={6}>
          Add Feature
        </Heading>
        <Card.Root mb={6} shadow={"md"}>
          <Card.Header>
            <Heading size="2xl">Feature Details</Heading>
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

              <Field.Root required invalid={errors.area ? true : false}>
                <Field.Label>Area (in SFT)</Field.Label>
                <Input type="number" {...register("area")} />
                <Field.ErrorText>{errors.area?.message}</Field.ErrorText>
              </Field.Root>

              <Field.Root invalid={!!errors.bed}>
                <Field.Label>Bed</Field.Label>
                <Controller
                  control={control}
                  name="bed"
                  render={({ field }) => (
                    <SelectRoot
                      name={field.name}
                      value={field.value}
                      onValueChange={({ value }) => field.onChange(value)}
                      onInteractOutside={() => field.onBlur()}
                      collection={bedType}
                    >
                      <SelectTrigger>
                        <SelectValueText placeholder="Select Bed Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bedType.items.map((movie: any) => (
                          <SelectItem item={movie} key={movie.value}>
                            {movie.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>
                  )}
                />
                <Field.ErrorText>{errors.bed?.message}</Field.ErrorText>
              </Field.Root>
            </Grid>

            <Box>
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
    </div>
  );
};

export default AddFeatureForm;
