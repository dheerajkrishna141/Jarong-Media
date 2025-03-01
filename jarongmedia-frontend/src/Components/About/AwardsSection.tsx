import {
  Box,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { FC } from "react";
import award1 from "@/assets/award-1.jpeg";
import award2 from "@/assets/award-2.png";
import award3 from "@/assets/award-3.png";

const awards = [
  {
    title: "TOP CHOICE",
    description:
      "This hotel was provided by the national hospitality association in 1995",
    image: award1,
  },
  {
    title: "WORLD LUXURY HOTEL",
    description:
      "The Award was presented by the national hospitality association in 1996",
    image: award2,
  },
  {
    title: "GLOBAL HOTEL",
    description:
      "We are honored to receive the best hotel award for our hard work in 2020",
    image: award3,
  },
];

const AwardsSection: FC = () => {
  return (
    <Box py={16}>
      <Container maxW="container.xl">
        <VStack gap={12}>
          <Heading size="lg">AWARDS</Heading>
          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={8}
          >
            {awards.map((award) => (
              // <VStack
              //   key={award.title}
              //   gap={4}
              //   p={6}
              //   borderRadius="lg"
              //   boxShadow="sm"
              //   align="center"
              // >
              <Card.Root shadow={"lg"} key={award.title}>
                <Card.Body>
                  <Image
                    mx="auto"
                    src={award.image}
                    alt={award.title}
                    mb={4}
                    boxSize="200px"
                  />
                  <Heading size="md" textAlign={"center"} mb={5}>
                    {award.title}
                  </Heading>
                  <Text textAlign={"center"}>{award.description}</Text>
                  {/* <Heading size="md">{award.title}</Heading>
                <Text textAlign="center">{award.description}</Text>
              </VStack> */}
                </Card.Body>
              </Card.Root>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default AwardsSection;
