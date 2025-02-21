import userDTOFunction, { userRegister } from "@/services/httpUserService";
import {
  Box,
  Button,
  Card,
  Field,
  HStack,
  Image,
  Input,
  Separator,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import google from "../assets/google.jpeg";
import UserService from "@/services/UserService";
import { toaster } from "./UI/toaster";
import { CONSTANTS } from "@/constants/AppConstants";

const schema = z
  .object({
    email: z.string().email({ message: "Enter a valid Email" }),
    password: z
      .string()
      .min(6, { message: "Password must contain atleast 6 characters" }),
    reEnterPassword: z
      .string()
      .min(6, { message: "Password must contain atleast 6 characters" }),
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    dob: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.reEnterPassword;
    },
    {
      message: "Passwords don't match!",
      path: ["reEnterPassword"],
    }
  );

type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleRegister = (data: userRegister) => {
    if (data.dob === "") {
      delete data.dob;
    }
    const regPromise = UserService.register({
      data: data,
    }).then(() => {
      navigate("/login");
    });

    toaster.promise(regPromise, {
      success: {
        title: "User Successfully Created!",
        description: "Login and verfiy your email to continue.",
        type: "success",
        duration: 5 * 1000, //5 seconds
      },
      error: {
        title: "Registration Failed",
        type: "error",
        duration: 5 * 1000, //5 seconds
      },
      loading: {
        title: "One moment..!",
      },
    });
  };

  const {
    register,
    handleSubmit,
    reset,
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
              handleRegister({ ...data, roles: [CONSTANTS.ADMIN_ROLE] });
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
                <Field.Root invalid={errors.firstName ? true : false}>
                  <Field.Label>First Name</Field.Label>
                  <Input {...register("firstName")} type="firstName" />
                  <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={errors.lastName ? true : false}>
                  <Field.Label>Last Name</Field.Label>
                  <Input {...register("lastName")} type="lastName" />
                  <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={errors.dob ? true : false}>
                  <Field.Label>Date Of Birth</Field.Label>
                  <Input {...register("dob")} type="date"></Input>
                  <Field.ErrorText>{errors.dob?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={errors.password ? true : false}>
                  <Field.Label>Password</Field.Label>
                  <Input {...register("password")} type="password"></Input>
                  <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root invalid={errors.reEnterPassword ? true : false}>
                  <Field.Label>Re-Enter Password</Field.Label>
                  <Input
                    {...register("reEnterPassword")}
                    type="password"
                  ></Input>
                  <Field.ErrorText>
                    {errors.reEnterPassword?.message}
                  </Field.ErrorText>
                </Field.Root>
              </Stack>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button
                variant="outline"
                type="reset"
                onClick={() => {
                  reset();
                }}
              >
                Cancel
              </Button>
              <Button variant="solid" type="submit">
                Register
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>
        <HStack>
          <Separator flex="1" />
          <Text flexShrink="0">or</Text>
          <Separator flex="1" />
        </HStack>
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

export default RegisterForm;
