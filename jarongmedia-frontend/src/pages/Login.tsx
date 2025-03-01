import {
  Box,
  Grid,
  GridItem,
  Heading,
  Image,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import LoginForm from "../Components/LoginForm";
import login from "../assets/login.webp";
import { LightMode } from "@/Components/UI/color-mode";

const Login = () => {
  return (
    <LightMode>
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1fr 10px 1fr",
        }}
        templateRows={{
          base: "1fr 10px 1fr",
          lg: "1fr",
        }}
      >
        <GridItem bg={"white"}>
          <Box className="flex justify-center">
            <VStack mt={{ base: 100, lg: 150 }}>
              <Heading mb={10} size={"4xl"}>
                Jarong Media
              </Heading>
              <Image src={login} w={"55%"} h={"auto"}></Image>
              <Text>Welcome to jarong media. Best Hotels, at Best Prices</Text>
            </VStack>
          </Box>
        </GridItem>
        <GridItem>
          <Separator
            variant={"solid"}
            orientation={{ base: "horizontal", lg: "vertical" }}
            size={"lg"}
            height={{ lg: "100vh" }}
          ></Separator>
        </GridItem>
        <GridItem
          bg={"#f5f7fa"}
          className="flex justify-center"
          // mt={{ base: 20, lg: 0 }}
        >
          <LoginForm></LoginForm>
        </GridItem>
      </Grid>
    </LightMode>
  );
};

export default Login;
