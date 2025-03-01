import { useColorModeValue } from "@/Components/UI/color-mode";
import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { LuArrowRight } from "react-icons/lu";
export const HeroSection = () => {
  const bgGray = useColorModeValue("gray.200", "gray.700");

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
      gap={8}
      alignItems="center"
    >
      <VStack mr={{ lg: 100 }} textAlign={"center"} gap={8}>
        <Text fontSize="sm" color="gray.500">
          Your Next Great Escape
        </Text>
        <Heading as="h1" size="5xl" lineHeight="1.2">
          Journey Beyond
          <br />
          the Ordinary
          <br />
          Adventure Trip
        </Heading>
        <HStack gap={4}>
          <Button variant="outline" size="sm">
            MEDIUM
          </Button>
          <Button variant="outline" size="sm">
            PINTEREST
          </Button>
        </HStack>
      </VStack>

      <Box
        bg={bgGray}
        borderRadius="2xl"
        p={8}
        position="relative"
        minH="400px"
      >
        <VStack align="stretch" position="absolute" bottom={8} left={8}>
          <Heading size="md" color="white">
            Adventures in the Swiss Alps
          </Heading>
          <Text color="whiteAlpha.900" fontSize="sm">
            Start your next journey today, exploring the breathtaking views of
            the Swiss Alps
          </Text>
          <Button
            variant="outline"
            colorScheme="whiteAlpha"
            alignSelf="flex-start"
            size="sm"
          >
            SEE DETAILS
            <LuArrowRight />
          </Button>
        </VStack>
      </Box>
    </Grid>
  );
};
