import {
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
import { Button } from "@chakra-ui/react";
import { TiThMenu } from "react-icons/ti";
import DrawerElements from "./DrawerElements";

const Drawer = () => {
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
          <DrawerElements></DrawerElements>
        </DrawerBody>
        <DrawerCloseTrigger />

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Drawer;
