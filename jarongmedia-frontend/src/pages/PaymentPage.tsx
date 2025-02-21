import { useState } from "react";
import { useColorModeValue } from "@/Components/UI/color-mode";
import { CONSTANTS } from "@/constants/AppConstants";
import useLocalStorage from "@/hooks/useLocalStorage";
import HotelBookingService from "@/services/HotelBookingService";
import { HotelBookingDTOWithCC } from "@/services/httpHotelBookingService";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/Components/UI/checkbox";
import { toaster } from "@/Components/UI/toaster";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { getItem: getCheckOut, clear: clearCheckOut } = useLocalStorage(
    CONSTANTS.CHECKOUT_STORAGE_KEY
  );
  const bookingDTO: HotelBookingDTOWithCC = JSON.parse(getCheckOut() || "");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  // const calculateSubtotal = () => {
  //   return bookingDTO.totalAmount + bookingDTO.pricing.cleaningFee
  // }

  // const calculateTax = () => {
  //   return calculateSubtotal() * bookingDTO.pricing.taxRate
  // }

  const calculateTotal = () => {
    return bookingDTO.totalAmount;
  };

  const handlePayment = () => {
    if (bookingDTO.additionalDetails["payment_method"] === "cash") {
      navigate("/admin/viewBookings", { replace: true });
      toaster.create({
        type: "success",
        title: "Booking Confirmed",
        description: `Confirmation Code- ${bookingDTO.confirmationCode}`,
        duration: 1 * 60 * 1000, //2mins
      });
    } else {
      HotelBookingService.initiatePayment({
        data: bookingDTO,
      }).then((res) => {
        window.location.replace(res.sessionUrl);
        clearCheckOut();
      });
    }
  };

  return (
    <Box maxW="1200px" mx="auto" p={4}>
      <Grid
        templateColumns={{ base: "1fr", lg: "3fr 2fr" }}
        gap={8}
        alignItems="start"
      >
        {/* Guest Details Section */}
        <Card.Root shadow={"lg"}>
          <Card.Header fontWeight={"bold"} fontSize="md" mb={6}>
            Guest Details
          </Card.Header>
          <Card.Body>
            <Stack gap={6}>
              <Flex justify={"space-between"}>
                <Text fontWeight="medium">Guests</Text>
                <Text>{`${bookingDTO.roomDetails["adults"]} Adults`}</Text>
              </Flex>
              <Checkbox
                colorPalette={"black"}
                variant={"subtle"}
                checked={isCheckboxChecked}
                onCheckedChange={(e) => setIsCheckboxChecked(!!e.checked)}
                gap="4"
                alignItems="flex-start"
              >
                <Box lineHeight="1">I agree to the terms and conditions</Box>
                <Box fontWeight="normal" color="fg.muted" mt="1">
                  By completing this booking I acknowledge I have read and
                  accepted the{" "}
                  <Link color="blue.500" to="#">
                    Privacy Policies
                  </Link>
                  .
                </Box>
              </Checkbox>
            </Stack>
          </Card.Body>
        </Card.Root>

        {/* Order Summary Section */}
        <Card.Root>
          <Card.Header fontSize="md" mb={6}>
            Order Summary
          </Card.Header>
          <Card.Body>
            <Stack gap={6}>
              <Box borderRadius="md" overflow="hidden">
                <Image
                  src="/placeholder.svg?height=200&width=300"
                  alt="Room preview"
                  objectFit="cover"
                  w="100%"
                />
              </Box>

              <Grid templateColumns="1fr 1fr" gap={2}>
                {/* <Flex justify={"space-between"}> */}
                <Text fontWeight="medium">Room Type</Text>
                <Text>{bookingDTO.roomDetails["room_type"]}</Text>
                <Text fontWeight="medium">Dates</Text>
                <Text>{`${bookingDTO.checkInDate} to  ${bookingDTO.checkOutDate}`}</Text>
                {/* </Flex> */}
              </Grid>

              <Stack gap={3} pt={6} borderTopWidth="1px">
                {/* <Flex justify="space-between">
                <Text>{bookingDTO.bookingDetails.roomType}</Text>
                <Text>
                {bookingDTO.pricing.currency}
                {bookingDTO.pricing.roomRate}
                </Text>
                </Flex>
              <Flex justify="space-between">
                <Text>Cleaning Fee</Text>
                <Text>
                {bookingDTO.pricing.currency}
                {bookingDTO.pricing.cleaningFee}
                </Text>
                </Flex>
                <Flex justify="space-between" fontWeight="medium">
                <Text>Subtotal</Text>
                <Text>
                {bookingDTO.pricing.currency}
                {calculateSubtotal()}
                </Text>
                </Flex> */}
                {/* <Flex justify="space-between" fontSize="sm" color="gray.600">
                <Text>Tax ({bookingDTO.pricing.taxRate * 100}%)</Text>
                <Text>
                  {bookingDTO.pricing.currency}
                  {calculateTax()}
                  </Text>
                  </Flex> */}
                <Flex
                  justify="space-between"
                  fontWeight="bold"
                  fontSize="lg"
                  pt={2}
                  borderTopWidth="1px"
                >
                  <Text>Total</Text>
                  <Text>
                    {/* {bookingDTO.pricing.currency} */}${calculateTotal()}
                  </Text>
                </Flex>
              </Stack>

              <Button
                colorScheme="blue"
                size="lg"
                w="100%"
                onClick={handlePayment}
                disabled={!isCheckboxChecked}
              >
                Continue to Check Out
              </Button>
            </Stack>
          </Card.Body>
        </Card.Root>
      </Grid>
    </Box>
  );
};

export default PaymentPage;
