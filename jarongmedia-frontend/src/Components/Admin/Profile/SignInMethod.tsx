import React from "react";
import { Box, Heading, Text, Button, Flex, Icon } from "@chakra-ui/react";

const SignInMethod: React.FC = () => {
  return (
    <Box
      p={4}
      maxW="600px"
      mx="auto"
      mt={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="sm"
    >
      <Heading as="h2" size="lg" mb={4}>
        Sign in method
      </Heading>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="bold">Email Address</Text>
        <Text>chrissie.raj@gmail.com</Text>
        <Button variant="outline" colorScheme="purple" size="sm">
          Change email
        </Button>
      </Flex>
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="bold">Password</Text>
        <Text>************</Text>
        <Button variant="outline" colorScheme="purple" size="sm">
          Change password
        </Button>
      </Flex>
      <Flex p={4} bg="gray.50" borderRadius="md" align="center">
        <Box>
          <Text fontWeight="bold">Secure Your Account</Text>
          <Text fontSize="sm">
            Two-factor authentication adds an extra layer of security to your
            account. To log in, in addition you'll need to provide a 6 digit
            code
          </Text>
        </Box>
        <Button ml="auto" colorScheme="purple" size="sm">
          Enable
        </Button>
      </Flex>
    </Box>
  );
};

export default SignInMethod;
