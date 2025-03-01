import {
  VStack,
  Heading,
  HStack,
  Avatar,
  Button,
  Input,
  Field,
  Card, // Updated to use Field
} from "@chakra-ui/react";
import type { FC } from "react";

interface BasicInformationProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

const BasicInformation: FC<BasicInformationProps> = ({
  firstName,
  lastName,
}) => {
  return (
    <Card.Root shadow={"lg"} mt={10}>
      <VStack align="stretch" gap={8} mt={12}>
        <Card.Header>
          <Heading size="lg">Basic Information</Heading>
        </Card.Header>

        <Card.Body gap={10}>
          <Field.Root>
            <Field.Label>Avatar</Field.Label>
            <HStack gap={4}>
              {/* <Avatar size="xl" src={avatarUrl} bg="purple.500" /> */}
              <VStack align="stretch">
                <Button variant="solid" colorScheme="purple">
                  Change avatar
                </Button>
                <Button variant="outline">Remove avatar</Button>
              </VStack>
            </HStack>
          </Field.Root>

          <HStack gap={4} align="flex-start">
            <Field.Root>
              <Field.Label>First Name</Field.Label>
              <Input defaultValue={firstName} />
            </Field.Root>

            <Field.Root>
              <Field.Label>Last Name</Field.Label>
              <Input defaultValue={lastName} />
            </Field.Root>
          </HStack>
        </Card.Body>
      </VStack>
    </Card.Root>
  );
};

export default BasicInformation;
