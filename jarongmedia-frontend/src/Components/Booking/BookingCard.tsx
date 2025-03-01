import {
  Box,
  Button,
  Field,
  Flex,
  Grid,
  Input,
  VStack,
} from "@chakra-ui/react";
import { StepperInput } from "../UI/stepper-input";
import useBookingQueryStore from "@/stateManagement/Store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useColorMode } from "../UI/color-mode";

// const NumberInput: FC<{ label: string; defaultValue?: number }> = ({ label, defaultValue = 0 }) => {
//   const { getIncrementButtonProps, getDecrementButtonProps, value } = useNumberInput({
//     step: 1,
//     defaultValue,
//     min: 0,
//     max: 99,
//   })

//   return (
//     <HStack gap={4}>
//       <Text minW="80px">{label}</Text>
//       <IconButton size="sm" icon={<LuMinus />} aria-label={`Decrease ${label}`} {...getDecrementButtonProps()} />
//       <Text minW="8">{value}</Text>
//       <IconButton size="sm" icon={<LuPlus />} aria-label={`Increase ${label}`} {...getIncrementButtonProps()} />
//     </HStack>
//   )
// }

const BookingCard = () => {
  const serachSchema = z
    .object({
      checkIn: z.string().min(1, { message: "Check In Required" }),
      checkOut: z.string().min(1, { message: "Check Out Required" }),
    })
    .refine((data) => new Date(data.checkOut) > new Date(data.checkIn), {
      message: "Check-out date must be after check-in date",
      path: ["checkOut"],
    });

  type SearchFormData = z.infer<typeof serachSchema>;

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(serachSchema),
  });

  const { colorMode } = useColorMode();

  const setCheckInAndOut = useBookingQueryStore((s) => s.setDates);
  return (
    <Box
      as={"form"}
      onSubmit={handleSubmit((data) => {
        setCheckInAndOut(data.checkIn, data.checkOut);
      })}
      bg={colorMode === "light" ? "white" : "gray.800"}
      borderRadius="xl"
      boxShadow="xl"
      p={8}
      maxW="900px"
      mx="auto"
      mt="-100px"
      position="relative"
      zIndex={10}
    >
      <VStack gap={6}>
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }}
          gap={6}
          w="full"
        >
          <Box>
            <Field.Root invalid={!!errors.checkIn}>
              <Field.Label mb={2}>Check-in</Field.Label>

              <Input
                borderColor={colorMode === "light" ? "gray.500" : "white"}
                {...register("checkIn")}
                type="date"
              />
              <Field.ErrorText>{errors.checkIn?.message}</Field.ErrorText>
            </Field.Root>
          </Box>
          <Box>
            <Field.Root invalid={!!errors.checkOut}>
              <Field.Label mb={2}>Check-Out</Field.Label>

              <Input
                borderColor={colorMode === "light" ? "gray.500" : "white"}
                {...register("checkOut")}
                type="date"
              />
              <Field.ErrorText>{errors.checkOut?.message}</Field.ErrorText>
            </Field.Root>
          </Box>
          <Field.Root>
            <Field.Label mb={2}>Adults</Field.Label>
            <StepperInput defaultValue="1" min={1} max={10} />
          </Field.Root>
          <Field.Root>
            <Field.Label mb={2}>Children</Field.Label>
            <StepperInput defaultValue="1" min={0} max={10} />
          </Field.Root>
        </Grid>

        <Button
          colorPalette="blue"
          type="submit"
          size="lg"
          w={{ base: "full", md: "auto" }}
        >
          Check Availability
        </Button>
      </VStack>
    </Box>
  );
};

export default BookingCard;
