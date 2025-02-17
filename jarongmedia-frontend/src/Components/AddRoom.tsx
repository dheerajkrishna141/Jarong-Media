import {
  Button,
  Card,
  CheckboxGroup,
  createListCollection,
  Field,
  Fieldset,
  FieldsetErrorText,
  Flex,
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
import { Controller, useController, useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "./UI/checkbox";

const formSchema = z.object({
  name: z.string().min(5, { message: "Enter atleast 5 characters" }),
  category: z.array(z.string().min(1, { message: "Category is required" })),
  hotel: z.array(z.string().min(1, { message: "Hotel is required" })),
  feature: z.array(z.string()).min(1, {
    message: "You must select at least one feature.",
  }),
  price: z.string().min(1, { message: "Price is required" }),
  gallery: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

const category = createListCollection({
  items: [
    { label: "Economy", value: "economy" },
    { label: "Premium", value: "premium" },
    { label: "Deluxe", value: "deluxe" },
    { label: "Premium Deluxe", value: "premium_deluxe" },
  ],
});

const items = [
  { label: "React", value: "react" },
  { label: "Svelte", value: "svelte" },
  { label: "Vue", value: "vue" },
  { label: "Angular", value: "angular" },
];
const AddRoom = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));
  const feature = useController({
    control,
    name: "feature",
    defaultValue: [],
  });
  return (
    <form onSubmit={onSubmit}>
      <Card.Root mb={6} shadow={"md"}>
        <Card.Header>
          <Heading size="2xl">Room Details</Heading>
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

            <Field.Root invalid={!!errors.category}>
              <Field.Label>Category</Field.Label>
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <SelectRoot
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={category}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {category.items.map((movie: any) => (
                        <SelectItem item={movie} key={movie.value}>
                          {movie.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
              <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.category}>
              <Field.Label>Hotel</Field.Label>
              <Controller
                control={control}
                name="hotel"
                render={({ field }) => (
                  <SelectRoot
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => field.onChange(value)}
                    onInteractOutside={() => field.onBlur()}
                    collection={category}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select Hotel" />
                    </SelectTrigger>
                    <SelectContent>
                      {category.items.map((movie: any) => (
                        <SelectItem item={movie} key={movie.value}>
                          {movie.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
              <Field.ErrorText>{errors.category?.message}</Field.ErrorText>
            </Field.Root>

            <Fieldset.Root invalid={!!errors.feature}>
              <Fieldset.Legend>Select your framework</Fieldset.Legend>

              <CheckboxGroup
                invalid={!!errors.feature}
                value={feature.field.value}
                onValueChange={feature.field.onChange}
                name={feature.field.name}
              >
                <Fieldset.Content>
                  {items.map((item) => (
                    <Checkbox key={item.value} value={item.value}>
                      {item.label}
                    </Checkbox>
                  ))}
                </Fieldset.Content>
              </CheckboxGroup>
              <FieldsetErrorText>{errors.feature?.message}</FieldsetErrorText>
            </Fieldset.Root>

            <Field.Root invalid={errors.price ? true : false}>
              <Field.Label>Price Per Night</Field.Label>

              <Input type="number" {...register("price")} />
              <Field.ErrorText>{errors.price?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.gallery}>
              <Field.Label>Gallery</Field.Label>

              <Input type="url" {...register("gallery")} />
              <Field.ErrorText>{errors.gallery?.message}</Field.ErrorText>
            </Field.Root>
          </Grid>
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
    </form>
  );
};

export default AddRoom;
