import {
  Box,
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  HStack,
  Image,
  Show,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import Drawer from "../../Admin/Drawer";
import ProfilePop from "../../ProfilePop";
import { ColorModeButton, useColorMode } from "../../UI/color-mode";
import logo from "@/assets/logo.jpg";
import { HiHome } from "react-icons/hi2";
import { MdTour } from "react-icons/md";
import { FaBuilding } from "react-icons/fa6";
import { MdPermContactCalendar } from "react-icons/md";
import { DialogRoot, DialogTrigger } from "@/Components/UI/dialog";
import { RiBuilding4Fill } from "react-icons/ri";
const NavBar = () => {
  const isSmallScreen = useBreakpointValue({ base: true, lg: false });

  const isAdmin = useLocation().pathname.includes("/admin");

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "1rem",
  };

  const iconStyle = {
    marginRight: "6px",
    fontSize: "1.4rem",
  };
  const { colorMode } = useColorMode();
  return (
    <Box
      as={"nav"}
      position={"sticky"}
      top={0}
      zIndex={1000}
      bgColor={colorMode === "dark" ? "black" : "white"}
    >
      <HStack justify="space-between" gap={4}>
        <Image boxSize="100px" src={logo} />
        <Show when={isSmallScreen && isAdmin}>
          <Box>
            <Drawer />
          </Box>
        </Show>
        <HStack gap={8}>
          <Link to="/" style={linkStyle}>
            <HiHome style={iconStyle} />
            Home
          </Link>
          <Link to="/tour" style={linkStyle}>
            <MdTour style={iconStyle} />
            Tour
          </Link>
          <Link to="/user/booking" style={linkStyle}>
            <FaBuilding style={iconStyle} />
            Booking
          </Link>

          <Link to="/about" style={linkStyle} hidden={isSmallScreen}>
            <MdPermContactCalendar style={iconStyle} />
            About Us
          </Link>
        </HStack>

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
