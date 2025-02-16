import { Button } from "@chakra-ui/react";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/Components/UI/drawer";
import { TiThMenu } from "react-icons/ti";
import DrawerElements from "./DrawerElements";
import { useContext } from "react";
import MainContext from "@/stateManagement/MainContext";

const Drawer = () => {
  const { main, setMain } = useContext(MainContext);
  return (
    <DrawerRoot placement={"start"}>
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <TiThMenu />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <DrawerElements setMain={setMain}></DrawerElements>
        </DrawerBody>
        <DrawerFooter></DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Drawer;
