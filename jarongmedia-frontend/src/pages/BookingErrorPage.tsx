import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import wrongIcon from "@/assets/wrong.png";
import { Link } from "react-router-dom";

const BookingErrorPage = () => {
  return (
    <Center minH="100vh" p={4}>
      <VStack gap={8} maxW="600px" textAlign="center" px={4}>
        {/* Error Icon */}
        <Text boxSize={40} color={"red"}>
          <Image src={wrongIcon}></Image>
        </Text>

        {/* Error Message */}
        <Heading
          as="h1"
          fontSize={["2xl", "3xl", "4xl"]}
          fontWeight="bold"
          color="#0A2463"
          lineHeight={1.2}
        >
          We sincerely apologize, but something went wrong with your booking
        </Heading>

        {/* Subtext */}
        <Text fontSize={["md", "lg"]} color="gray.600">
          We invite you to try again, or to contact the help center to help you
        </Text>

        {/* Action Button */}
        <Link to={"/user/booking"}>
          <Button
            bg="#F9B84F"
            color="black"
            size="lg"
            width="100%"
            py={6}
            _hover={{ bg: "#F8A72A" }}
            borderRadius="md"
            fontWeight="medium"
          >
            Back to search
          </Button>
        </Link>
      </VStack>
    </Center>
  );
};

export default BookingErrorPage;
