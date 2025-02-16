import Availability from "@/Components/Availability";
import BookRoom from "@/Components/BookRoom";
import { Dashboard } from "@/Components/Dashboard";
import Drawer from "@/Components/Drawer";
import DrawerElements from "@/Components/DrawerElements";
import Feature from "@/Components/Feature";
import Hotels from "@/Components/Hotels";
import NavBar from "@/Components/NavBar";
import ProfilePop from "@/Components/ProfilePop";
import Promocode from "@/Components/Promocode";
import Room from "@/Components/Room";
import Roombook from "@/Components/Roombook";
import MainContext from "@/stateManagement/MainContext";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

const Admin = () => {
  const [main, setMain] = useState("Dashboard");

  const handleView = (val: string) => {
    setMain(val);
  };

  useEffect(() => {
    console.log(main);
  }, [main]);

  const renderMainComponent = () => {
    switch (main) {
      case "Dashboard":
        return <Dashboard></Dashboard>;
      case "Hotels":
        return <Hotels></Hotels>;
      case "Room":
        return <Room></Room>;
      case "BookRoom":
        return <BookRoom></BookRoom>;
      case "Availability":
        return <Availability></Availability>;
      case "Room List":
        return <Roombook></Roombook>;
      case "Feature List":
        return <Feature></Feature>;
      case "Promocode":
        return <Promocode></Promocode>;
      default:
        return null;
    }
  };
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  return (
    <div>
      <MainContext.Provider value={{ main, setMain }}>
        <NavBar></NavBar>
        <Grid
          templateColumns={{
            base: " 1fr",
            lg: "250px 1fr",
          }}
        >
          <Show when={isLargeScreen}>
            <GridItem ml={10}>
              <DrawerElements setMain={handleView}></DrawerElements>
            </GridItem>
          </Show>
          <GridItem>
            <Container>{renderMainComponent()}</Container>
          </GridItem>
        </Grid>
      </MainContext.Provider>
    </div>
  );
};

export default Admin;
