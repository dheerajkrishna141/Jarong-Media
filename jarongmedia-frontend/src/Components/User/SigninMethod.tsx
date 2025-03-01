import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  HStack,
  Input,
  Icon,
  Field,
  Card, // Updated to use Field
} from "@chakra-ui/react";
import type { FC } from "react";
import { LuLock } from "react-icons/lu";

interface SignInMethodProps {
  email: string;
}

const SignInMethod: FC<SignInMethodProps> = ({ email }) => {
  return (
    <Card.Root shadow={"lg"}>
      <VStack align="stretch" gap={8}>
        <Card.Header>
          <Heading size="lg">Sign in method</Heading>
        </Card.Header>
        <Card.Body gap={10}>
          <Field.Root>
            <Field.Label>Email Address</Field.Label>
            <HStack>
              <Input width={"min-content"} value={email} readOnly />
              <Button variant="outline">Change email</Button>
            </HStack>
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <HStack>
              <Input type="password" readOnly value="****************" />
              <Button variant="outline">Change password</Button>
            </HStack>
          </Field.Root>
          <Box p={6} backgroundColor={"gray.100"} borderRadius="md">
            <HStack gap={4} align="flex-start">
              <Icon boxSize={6} color="purple.500" mt={1}>
                <LuLock />
              </Icon>
              <Box>
                <Text color={"black"} fontWeight="medium">
                  Secure Your Account
                </Text>
                <Text color={"black"} mt={1}>
                  Two-factor authentication adds an extra layer of security to
                  your account. To log in, in addition you'll need to provide a
                  6 digit code
                </Text>
              </Box>
            </HStack>
            <Button colorScheme="purple" mt={4} ml="44px">
              Enable
            </Button>
          </Box>
        </Card.Body>
      </VStack>
    </Card.Root>
  );
};

export default SignInMethod;
