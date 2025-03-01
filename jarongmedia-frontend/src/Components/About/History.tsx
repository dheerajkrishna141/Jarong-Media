import { Container, Heading, Text, VStack } from "@chakra-ui/react";
import type { FC } from "react";

const HistorySection: FC = () => {
  return (
    <Container maxW="container.xl" py={16}>
      <VStack gap={8} align="start">
        <Text color="blue.500" fontWeight="medium">
          OUR STORY
        </Text>
        <Text
          fontSize={{ base: "6xl", md: "8xl" }}
          fontWeight="bold"
          color="gray.200"
        ></Text>
        <Heading size="4xl">
          A BRIEF HISTORY OF
          <br />
          OUR HOTEL.
        </Heading>
        <Text color="gray.600" maxW="xl">
          We started building our hotel in 1991. Since then, we've grown into
          the finest hotel chain serving all our guests with exceptional service
          and comfort. Our main object is to provide better quality service,
          seamless, elegant lifestyle.
        </Text>
      </VStack>
    </Container>
  );
};

export default HistorySection;
