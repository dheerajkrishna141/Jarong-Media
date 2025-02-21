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
import { useEffect, useState } from "react";
import { featureDTO } from "./AddFeature";
import HotelService from "@/services/HotelService";
import { hotelDTO } from "./AddHotel";
import { toaster } from "./UI/toaster";
import { availabilityDTO } from "./AddAvailability";

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

export interface roomDTO {
  id: string;
  category: string;
  features: string[];
  hotelId: string;
  pricePerNight: number;
  availability: availabilityDTO[];
}

export interface hotelDTOWithId extends hotelDTO {
  id: string;
}

const AddRoom = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const [featureInfo, setFeatureInfo] = useState<featureDTO[]>([]);
  const [hotelInfo, setHotelInfo] = useState<hotelDTOWithId[]>([]);

  useEffect(() => {
    HotelService.getFeatures().then((data) => {
      setFeatureInfo(data);
    });

    HotelService.getHotels().then((data) => {
      setHotelInfo(data);
    });
  }, []);

  const hotels = createListCollection({
    items: hotelInfo.map((hotel) => ({
      label: hotel.name,
      value: hotel.id,
    })),
  });

  const handleRoomSubmit = (data: FormValues) => {
    const processedData: roomDTO = {
      hotelId: data.hotel[0],
      category: data.category[0],
      features: [],
      id: data.name,
      pricePerNight: parseFloat(data.price),
      availability: [],
    };
    data.feature.forEach((feature) => processedData.features.push(feature));
    HotelService.addRoom({
      data: processedData,
    })
      .then(() => {
        toaster.create({
          type: "success",
          description: "Room Added Successfully!",
          duration: 5 * 1000, //5seconds
        });
      })
      .catch((res) => {
        toaster.create({
          title: "Error Adding Room",
          type: "error",
          description: res.response.data.message,
          duration: 5 * 1000, //5 seconds
        });
      });
  };

  const feature = useController({
    control,
    name: "feature",
    defaultValue: [],
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        handleRoomSubmit(data);
      })}
    >
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

            <Field.Root invalid={!!errors.hotel}>
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
                    collection={hotels}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder="Select Hotel" />
                    </SelectTrigger>
                    <SelectContent>
                      {hotels.items.map((hotel) => (
                        <SelectItem item={hotel} key={hotel.value}>
                          {hotel.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                )}
              />
              <Field.ErrorText>{errors.hotel?.message}</Field.ErrorText>
            </Field.Root>

            <Fieldset.Root invalid={!!errors.feature}>
              <Fieldset.Legend>Select features</Fieldset.Legend>

              <CheckboxGroup
                invalid={!!errors.feature}
                value={feature.field.value}
                onValueChange={feature.field.onChange}
                name={feature.field.name}
              >
                <Fieldset.Content>
                  {featureInfo.map((item) => (
                    <Checkbox key={item.id} value={item.id}>
                      {item.id}
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
