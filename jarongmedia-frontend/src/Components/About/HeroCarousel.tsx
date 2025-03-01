"use client";

import { Box, Text, VStack } from "@chakra-ui/react";
import { type FC, useEffect, useState } from "react";

const slides = [
  { id: 1, text: "ABOUT US", bg: "gray.600" },
  { id: 2, text: "WELCOME", bg: "gray.700" },
  { id: 3, text: "EXPERIENCE", bg: "gray.800" },
];

const HeroCarousel: FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box position="relative" h={{ base: "60vh", md: "80vh" }} overflow="hidden">
      {slides.map((slide, index) => (
        <Box
          key={slide.id}
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg={slide.bg}
          opacity={index === currentSlide ? 1 : 0}
          transition="opacity 0.5s ease-in-out"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack gap={4}>
            <Text
              fontSize={{ base: "4xl", md: "6xl", lg: "8xl" }}
              fontWeight="bold"
              color="white"
              letterSpacing="wider"
            >
              {slide.text}
            </Text>
          </VStack>
        </Box>
      ))}
    </Box>
  );
};

export default HeroCarousel;
