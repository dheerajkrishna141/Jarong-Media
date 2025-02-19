import {
  Box,
  HStack,
  Image,
  Input,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import logo from "../assets/logo.jpg";
import Drawer from "./Drawer";
import ProfilePop from "./ProfilePop";
import { ColorModeButton, useColorMode } from "./UI/color-mode";
import { InputGroup } from "./UI/input-group";
const NavBar = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  const { colorMode } = useColorMode();
  return (
    <Box
      position={"sticky"}
      top={0}
      zIndex={1000}
      bgColor={colorMode === "dark" ? "black" : "white"}
    >
      <HStack justify="space-between" gap={4}>
        <Image boxSize="100px" src={logo} />
        <Show when={isSmallScreen}>
          <Box>
            <Drawer />
          </Box>
        </Show>
        <InputGroup startElement={<FiSearch />}>
          <Input maxW="300px" />
        </InputGroup>
        <Box className="flex justify-end" gap={10}>
          <div>
            <ProfilePop></ProfilePop>
          </div>
          <div>
            <ColorModeButton marginEnd="auto" />
          </div>
        </Box>
      </HStack>
    </Box>
  );
};

export default NavBar;
