import { useColorModeValue } from "@/Components/UI/color-mode";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export const SocialConnect = () => {
  const bgBlue = useColorModeValue("blue.500", "blue.600");
  const bgDarkBlue = useColorModeValue("blue.600", "blue.700");

  return (
    <Box bg={bgBlue} py={16} color="white">
      <Container maxW="container.xl">
        <VStack gap={8} align="stretch">
          <Heading size="lg" textAlign="center">
            STAY CONNECTED, STAY INSPIRED
          </Heading>
          <Text textAlign="center">
            Follow along for more updates, tips, and exciting journeys across
            different platforms. Let's stay in touch!
          </Text>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={4}
            maxW="3xl"
            mx="auto"
            w="full"
          >
            {[
              { icon: FaInstagram, label: "INSTAGRAM" },
              { icon: FaTwitter, label: "TWITTER" },
              { icon: FaFacebook, label: "FACEBOOK" },
            ].map((social) => (
              <Link
                key={social.label}
                href="#"
                _hover={{ textDecoration: "none" }}
              >
                <Flex
                  bg={bgDarkBlue}
                  p={4}
                  borderRadius="lg"
                  align="center"
                  justify="center"
                  gap={2}
                >
                  <Icon as={social.icon} boxSize={5} />
                  <Text>{social.label}</Text>
                </Flex>
              </Link>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};
