import { Box, Container, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import type { FC } from "react";

const features = [
  {
    title: "Luxury Amenities",
    description:
      "We use high quality products for our hotel from reliable reputable brands",
  },
  {
    title: "Free Airport Pickup",
    description:
      "We have comfortable transportation around the time and bring facilities at no extra cost anytime you require our service",
  },
  {
    title: "Special Offers",
    description:
      "New and returning guests can save more money and receive special benefits",
  },
  {
    title: "Online Payment",
    description:
      "Stay at hotels and take advantage payment without the use of checks or card",
  },
  {
    title: "Best Location",
    description:
      "The location of FT is perfect and very central, so it's convenient for moving",
  },
  {
    title: "Friendly Staff",
    description:
      "Our staff are helpful. They respond all questions of clients in a happy way",
  },
];

const FeaturesGrid: FC = () => {
  return (
    <Box py={16}>
      <Container maxW="container.xl">
        <VStack gap={12}>
          <Heading size="lg">WHY CHOOSE US</Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={8}
          >
            {features.map((feature) => (
              <VStack
                _hover={{
                  transform: "scale(1.02)",
                  transition: "transform 0.3s ease-in-out",
                }}
                key={feature.title}
                align="start"
                p={6}
                borderRadius="lg"
                boxShadow="lg"
              >
                <Heading size="md">{feature.title}</Heading>
                <Text>{feature.description}</Text>
              </VStack>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default FeaturesGrid;
