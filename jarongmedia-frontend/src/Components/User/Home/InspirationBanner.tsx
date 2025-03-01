import { useColorModeValue } from "@/Components/UI/color-mode";
import { Box, Button, Heading, VStack } from "@chakra-ui/react";

export const InspirationBanner = () => {
  const bgGray = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bgGray} borderRadius="2xl" p={8} position="relative" minH="300px">
      <VStack align={"stretch"} maxW="md" gap={4} justify="space-between">
        <Box />
        <Heading size="4xl" mt={"70%"} color="white">
          Find inspiration in every moment we share.
        </Heading>
        <Button
          variant="solid"
          bg="white"
          color="gray.800"
          size="sm"
          alignSelf="flex-start"
          _hover={{ bg: "gray.100" }}
        >
          START YOUR JOURNEY
        </Button>
      </VStack>
    </Box>
  );
};
