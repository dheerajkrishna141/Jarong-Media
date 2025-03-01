"use client";

import { useColorModeValue } from "@/Components/UI/color-mode";
import { toaster } from "@/Components/UI/toaster";
import useBookingConfirmation from "@/hooks/useBookingConfirmation";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import checkIcon from "../assets/checkIcon.svg";
import useSessionStorage from "@/hooks/useSessionStorage";
import { CONSTANTS } from "@/constants/AppConstants";

const BookingConfirmation = () => {
  const [searchParams] = useSearchParams();

  const bgColor = useColorModeValue("white", "gray.800");
  const codeBgColor = useColorModeValue("gray.50", "gray.700");
  const successColor = useColorModeValue("green.500", "green.300");
  const textColor = useColorModeValue("gray.600", "gray.300");

  const { data: bookingDetails, isError } = useBookingConfirmation();
  const { clear: clearCheckOut } = useSessionStorage(
    CONSTANTS.CHECKOUT_STORAGE_KEY
  );
  const navigate = useNavigate();
  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    clearCheckOut();
    if (!sessionId) {
      navigate("/admin/", { replace: true });
    }
  }, []);

  if (isError) {
    navigate("/admin/", { replace: true });
    toaster.create({
      title: "Error",
      description: "Error displaying information",
      type: "error",
      duration: 5 * 1000, //5seconds
    });
  }

  return (
    <Container maxW="container.md" py={20} px={4}>
      <VStack gap={8} align="center">
        <Text boxSize={40} color={successColor}>
          <Image src={checkIcon}></Image>
        </Text>

        <VStack gap={6}>
          <Heading size="2xl" textAlign="center">
            Your Booking Is Confirmed
          </Heading>

          {bookingDetails?.confirmationCode && (
            <Box
              p={6}
              bg={codeBgColor}
              borderRadius="xl"
              boxShadow="sm"
              maxW="400px"
              w="full"
            >
              <VStack gap={3}>
                <Text fontSize="sm" color={textColor}>
                  Confirmation Code
                </Text>
                <HStack gap={2} fontSize="2xl" fontWeight="bold">
                  {bookingDetails.confirmationCode
                    .split("")
                    .map((char, index) => (
                      <Box
                        key={index}
                        bg={bgColor}
                        px={3}
                        py={2}
                        borderRadius="md"
                        boxShadow="sm"
                      >
                        {char}
                      </Box>
                    ))}
                </HStack>
              </VStack>
            </Box>
          )}

          <Text color={textColor} textAlign="center" maxW="md">
            A confirmation email has been sent to your registered email address
            with all the booking details.
          </Text>
        </VStack>

        <Flex justify="center" pt={6}>
          <Button
            size="lg"
            colorScheme="green"
            onClick={() => {
              navigate("/admin/viewBookings");
            }}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            transition="all 0.2s"
          >
            View Bookings
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default BookingConfirmation;
