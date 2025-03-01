import { CONSTANTS } from "@/constants/AppConstants";
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
import { toaster } from "./UI/toaster";
import { useEffect } from "react";
import UserService from "@/services/UserService";
import useSessionStorage from "@/hooks/useSessionStorage";
import { PasswordInput } from "./UI/password-input";

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
  const { setItem: setUser } = useSessionStorage(CONSTANTS.USER_STORAGE_KEY);
  const {
    setItem: setUserStatus,
    getItem: getUserStatus,
    clear: clearUserStatus,
  } = useSessionStorage(CONSTANTS.USER_STATUS_KEY);

  const navigate = useNavigate();

  useEffect(() => {
    if (getUserStatus() === "false") {
      UserService.logout().then(() => {
        toaster.create({
          type: "info",
          title: "Session Invalid!",
          description: "Previous session was either expired or invalidated.",
          duration: 5 * 1000, //5 seconds
        });
      });
      clearUserStatus();
    }
  }, []);

  const handleLogin = (data: userLogin) => {
    UserService.login({
      auth: {
        username: data.email,
        password: data.password,
      },
    })
      .then((data) => {
        setUser(data.endUser);
        setUserStatus(data.status);
        if (data.endUser.roles[0].authority === "ROLE_ADMIN") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      })
      .catch((data) => {
        if (data.response.data.message === CONSTANTS.USER_NOT_VERIFIED) {
          navigate("/user/verify");
        } else {
          toaster.create({
            title: data.response.data.message,
            type: "error",
          });
        }
      });
  };

  const handleGoogleLogin = () => {
    window.location.replace(
      "http://localhost:8080/oauth2/authorization/google"
    );
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
    <Box>
      <VStack spaceY={10} mb={10} mt={{ base: 100, lg: 150 }}>
        <Card.Root shadow={"md"} w={"500px"}>
          <Card.Header>
            <Card.Title>Sign in</Card.Title>
          </Card.Header>
          <form
            onSubmit={handleSubmit((data) => {
              handleLogin(data);
            })}
          >
            <Card.Body>
              <Stack gap="4" w="full">
                <Field.Root invalid={errors.email ? true : false}>
                  <Field.Label>
                    Email<p className="text-red-700">*</p>
                  </Field.Label>
                  <Input
                    border={"sm"}
                    {...register("email")}
                    type="email"
                    id="EmailId"
                    autoFocus
                  />
                  <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
                </Field.Root>
                <Field.Root mt={5} invalid={errors.password ? true : false}>
                  <Field.Label>
                    Password<p className="text-red-700">*</p>
                  </Field.Label>
                  <PasswordInput border={"sm"} {...register("password")} />
                  <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
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
                Sign in
              </Button>
            </Card.Footer>
          </form>
        </Card.Root>

        <HStack>
          <Separator flex="1" w={"300px"} />
          <Text flexShrink="0">OR</Text>
          <Separator flex="1" />
        </HStack>
        <Box>
          <Button
            colorScheme={"light"}
            onClick={() => {
              handleGoogleLogin();
            }}
          >
            <Image boxSize={"25px"} src={google}></Image>
            Login with Google
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};

export default LoginForm;
