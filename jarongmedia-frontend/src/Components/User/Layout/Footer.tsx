import {
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { FC } from "react";

const Footer: FC = () => {
  return (
    <Box bg="gray.900" color="white" py={16}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={12}
        >
          <VStack align="start" gap={4}>
            <Heading size="md">FT.</Heading>
            <Text>JARONGDEV@GMAIL.COM</Text>
            <Text>NUMBER</Text>
            <Text>ADDRESS</Text>
            <Link href="#" color={"white"}>
              Find on map
            </Link>
          </VStack>

          <VStack align="start" gap={4}>
            <Heading size="md">USEFUL LINKS</Heading>
            <Stack gap={2}>
              <Link href="#" color={"white"}>
                About us
              </Link>
              <Link href="#" color={"white"}>
                Rooms
              </Link>
              <Link href="#" color={"white"}>
                Service
              </Link>
              <Link href="#" color={"white"}>
                Contact
              </Link>
              <Link href="#" color={"white"}>
                Gallery
              </Link>
              <Link href="#" color={"white"}>
                Blog
              </Link>
            </Stack>
          </VStack>

          <VStack align="start" gap={4}>
            <Heading size="md">STAY IN TOUCH</Heading>
            <HStack>
              <Input
                placeholder="Enter your email"
                bg="whiteAlpha.100"
                border="none"
                _placeholder={{ color: "whiteAlpha.500" }}
              />
              <Button colorPalette="blue">Subscribe</Button>
            </HStack>
          </VStack>

          <VStack align="start" gap={4}>
            <HStack gap={4}>
              <Link href="#" color={"white"}>
                Facebook
              </Link>
              <Link href="#" color={"white"}>
                Twitter
              </Link>
              <Link href="#" color={"white"}>
                Instagram
              </Link>
              <Link href="#" color={"white"}>
                YouTube
              </Link>
            </HStack>
          </VStack>
        </Grid>

        <Box pt={12} mt={12} borderTopWidth={1} borderColor="whiteAlpha.100">
          <Text textAlign="center">
            JARONGDEV'S © {new Date().getFullYear()}. All rights reserved.
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
