import { CONSTANTS } from "@/constants/AppConstants";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  Box,
  Button,
  Card,
  Field,
  Image,
  Input,
  Stack,
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
  const { setItem: setUser } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const {
    setItem: setUserStatus,
    getItem: getUserStatus,
    clear: clearUserStatus,
  } = useLocalStorage(CONSTANTS.USER_STATUS_KEY);

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
          navigate("/admin", { replace: true });
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
      `https://accounts.google.com/o/oauth2/auth?client_id=${CONSTANTS.OAUTH2_CLIENT_ID}&redirect_uri=${CONSTANTS.OAUTH2_REDIRECT_URI}&response_type=code&scope=email profile&access_type=offline&prompt=consent`
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
    <div>
      <VStack spaceY={10} mb={10} mt={{ base: 0, lg: 150 }}>
        <Card.Root w={{ base: "500px", lg: "700" }}>
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
    </div>
  );
};

export default LoginForm;
