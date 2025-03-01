import { useColorModeValue } from "@/Components/UI/color-mode";
import { Box, Grid, Heading, HStack, Text, VStack } from "@chakra-ui/react";

export const StatsSection = () => {
  const bgGray = useColorModeValue("gray.200", "gray.700");

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "300px 1fr" }}
      gap={8}
      alignItems="start"
    >
      <Box
        bg={bgGray}
        borderRadius="2xl"
        p={8}
        minH="300px"
        position="relative"
      >
        <Box
          position="absolute"
          bottom={8}
          left={8}
          bg="blackAlpha.800"
          p={4}
          borderRadius="md"
          color="white"
        >
          <Text fontSize="sm">
            "The decisions you don't take are more important than the ones you
            do make. Sometimes the journey itself can be more rewarding."
          </Text>
          <Text fontSize="sm" mt={2} fontStyle="italic">
            - Bryan
          </Text>
        </Box>
      </Box>

      <VStack align="stretch" gap={8}>
        <Text fontSize="lg" fontWeight="medium">
          Join me as I share Stories, Insights, and Experiences that fuel my
          passion for growth, learning, and fun. Dive into a world of
          exploration and discovery
        </Text>
        <HStack gap={4}>
          {[1, 2, 3, 4, 5].map((dot) => (
            <Box
              key={dot}
              w="2"
              h="2"
              borderRadius="full"
              bg={dot === 1 ? "blue.500" : "gray.300"}
            />
          ))}
        </HStack>
        <Grid templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }} gap={8}>
          <VStack align="stretch">
            <Heading>10,000+</Heading>
            <Text color="gray.500">Memorable Moments</Text>
          </VStack>
          <VStack align="stretch">
            <Heading>500+</Heading>
            <Text color="gray.500">Connections Around The World</Text>
          </VStack>
          <VStack align="stretch">
            <Heading>1,000+</Heading>
            <Text color="gray.500">Adventure Experience</Text>
          </VStack>
        </Grid>
      </VStack>
    </Grid>
  );
};
