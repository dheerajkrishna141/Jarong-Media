import DrawerElements from "@/Components/Admin/DrawerElements";
import NavBar from "@/Components/User/Layout/NavBar";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  useEffect(() => {});
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  return (
    <Box>
      <NavBar></NavBar>
      <Grid
        templateColumns={{
          base: " 1fr",
          lg: "250px 1fr",
        }}
        mt={5}
      >
        <Show when={isLargeScreen}>
          <GridItem ml={10}>
            <DrawerElements></DrawerElements>
          </GridItem>
        </Show>
        <GridItem>
          <Container>
            <Outlet></Outlet>
          </Container>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Admin;
