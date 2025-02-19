import {
  Box,
  Grid,
  GridItem,
  Image,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import LoginForm from "../Components/LoginForm";
import login from "../assets/login.webp";

const Login = () => {
  return (
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
      <GridItem>
        <Box className="flex justify-center">
          <VStack mt={{ base: 0, lg: 150 }}>
            <Image src={login} h={"300px"}></Image>
            <Text>Welcome to jarong media. Best Hotels, at Best Prices</Text>
          </VStack>
        </Box>
      </GridItem>
      <GridItem>
        <Separator
          variant={"solid"}
          orientation={{ base: "horizontal", lg: "vertical" }}
          size={"lg"}
        ></Separator>
      </GridItem>
      <GridItem className="flex justify-center" mt={{ base: 20, lg: 0 }}>
        <LoginForm></LoginForm>
      </GridItem>
    </Grid>
  );
};

export default Login;
