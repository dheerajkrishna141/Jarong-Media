import { Box, Text, VStack } from "@chakra-ui/react";
import type { FC } from "react";
import { useLocation } from "react-router-dom";

const HeroSection: FC = () => {
  const location = useLocation();
  const titleToRender =
    location.pathname === "/user/booking/checkout" ? "CHECK OUT" : "ROOMS";
  return (
    <Box
      h={{ base: "60vh", md: "70vh" }}
      bg="gray.600"
      position="relative"
      backgroundImage="url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gthuvt6XuB7Tu4R6YM62pmKuYng3Bu.png')"
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="blackAlpha.500"
      />
      <VStack
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        gap={4}
        textAlign="center"
        color="white"
      >
        <Text
          fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
          fontWeight="bold"
          letterSpacing="wider"
        >
          {titleToRender}
        </Text>
      </VStack>
    </Box>
  );
};

export default HeroSection;
