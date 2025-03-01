"use client";

import { Box, Container, Flex, IconButton } from "@chakra-ui/react";
import { type FC, useEffect, useState, useRef, useCallback } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";

const images = [
  { id: 1, width: 1070, height: 520 },
  { id: 2, width: 520, height: 520 },
  { id: 3, width: 520, height: 520 },
  { id: 4, width: 1070, height: 520 },
  { id: 5, width: 520, height: 520 },
];

const ImageGallery: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => {
      resetTimeout();
    };
  }, [resetTimeout]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box py={16} overflow="hidden">
      <Container maxW="container.xl" position="relative">
        <Flex
          transition="transform 0.5s ease-in-out"
          transform={`translateX(-${currentIndex * 100}%)`}
          gap={4}
        >
          {images.map((image) => (
            <Box
              key={image.id}
              flexShrink={0}
              w={
                image.width === 1070
                  ? { base: "100%", md: "66.666%" }
                  : { base: "100%", md: "33.333%" }
              }
              position="relative"
              overflow="hidden"
            >
              <Box
                bg="gray.300"
                w="full"
                paddingBottom={`${(image.height / image.width) * 100}%`}
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.05)" }}
              />
            </Box>
          ))}
        </Flex>

        <IconButton
          aria-label="Previous image"
          position="absolute"
          left={4}
          top="50%"
          transform="translateY(-50%)"
          onClick={prevSlide}
          colorScheme="blackAlpha"
          rounded="full"
          size="lg"
        >
          <LuArrowLeft />
        </IconButton>

        <IconButton
          aria-label="Next image"
          position="absolute"
          right={4}
          top="50%"
          transform="translateY(-50%)"
          onClick={nextSlide}
          colorScheme="blackAlpha"
          rounded="full"
          size="lg"
        >
          <LuArrowRight />
        </IconButton>
      </Container>
    </Box>
  );
};

export default ImageGallery;
