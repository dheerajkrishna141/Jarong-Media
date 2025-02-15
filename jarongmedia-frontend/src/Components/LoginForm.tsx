import {
  Box,
  Button,
  Card,
  Icon,
  Image,
  Input,
  Separator,
  Stack,
  VStack,
  Field,
} from "@chakra-ui/react";
import google from "../assets/google.jpeg";
import { INVALID, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email({ message: "Enter a valid Email" }),
  password: z
    .string()
    .min(6, { message: "Password must contain atleast 6 characters" }),
});

type FormData = z.infer<typeof schema>;

interface userLogin {
  email: string;
  password: string;
}
const LoginForm = () => {
  const handleLogin = (data: userLogin) => {
    //handle login
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  return (
    <div>
      <VStack spaceY={10} mb={10}>
        <Card.Root w={{ base: "500px", lg: "700" }}>
          <Card.Header>
            <Card.Title>Sign up</Card.Title>
            <Card.Description>
              Fill in the form below to create an account
            </Card.Description>
          </Card.Header>
          <form
            onSubmit={handleSubmit((data) => {
              handleLogin(data);
              // reset();
            })}
          >
            <Card.Body>
              <Stack gap="4" w="full">
                <Field.Root invalid={errors.email ? true : false}>
                  <Field.Label>Email</Field.Label>
                  <Input
                    {...register("email")}
                    type="email"
                    id="EmailId"
                    autoFocus
                  />
                  <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={errors.password ? true : false}>
                  <Field.Label>Password</Field.Label>
                  <Input {...register("password")} type="password"></Input>
                  <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>
              </Stack>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline" type="reset">
                Cancel
              </Button>
              <Button variant="solid" type="submit">
                Sign in
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>
        <Box>
          <Button colorScheme={"light"}>
            <Image boxSize={"25px"} src={google}></Image>
            Login with Google
          </Button>
        </Box>
      </VStack>
    </div>
  );
};

export default LoginForm;
