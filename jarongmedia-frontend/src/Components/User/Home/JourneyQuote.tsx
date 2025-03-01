import { useColorModeValue } from "@/Components/UI/color-mode";
import { Box, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";

export const JourneyQuote = () => {
  const bgGray = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      <Heading textAlign="center" size="lg" mb={16}>
        Travel not just to see the WORLD but to
        <br />
        DISCOVER new part of YOURSELF
      </Heading>

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
        <VStack align="stretch" gap={4}>
          <Text color="blue.500" fontWeight="bold">
            OUR LOVELY VISITOR SAYS
          </Text>
          <Heading size="lg">
            Find inspiration in every moment we share.
          </Heading>
          <Text color="gray.500">
            "To be sharing this collection of moments I am here to see how
            stories help!"
          </Text>
        </VStack>

        <VStack align="stretch" gap={8}>
          {[1, 2, 3].map((testimonial) => (
            <HStack key={testimonial} gap={4}>
              <Box
                bg={bgGray}
                w="50px"
                h="50px"
                borderRadius="full"
                flexShrink={0}
              />
              <VStack align="stretch" gap={1}>
                <Text fontSize="sm">
                  "I've followed many blogs, but this one stands out. The
                  content feels personal and the stories help me feel connected
                  to each adventure."
                </Text>
                <Text fontSize="sm" fontWeight="bold">
                  Jane Cooper
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Travel Enthusiast
                </Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
      </Grid>
    </>
  );
};
