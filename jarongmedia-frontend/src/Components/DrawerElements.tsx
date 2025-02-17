import { Box, Button, Collapsible, VStack } from "@chakra-ui/react";
import { FaChevronDown, FaTachometerAlt } from "react-icons/fa";
import { ImAccessibility } from "react-icons/im";
import { IoList } from "react-icons/io5";
import { LuDoorClosed, LuDoorOpen, LuHouse } from "react-icons/lu";
import { RiCouponFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

const elements = [
  { value: "Dashboard", icon: "dashboard", navigateTo: "/" },
  { value: "Hotels", icon: "house", navigateTo: "/hotel" },
  { value: "Room", icon: "door", navigateTo: "" },
  { value: "Feature List", icon: "features", navigateTo: "/features" },
  { value: "Room List", icon: "roomlist", navigateTo: "/roomList" },
  { value: "Promocode", icon: "promocode", navigateTo: "/promocodes" },
];

const getIcon = (icon: string) => {
  switch (icon) {
    case "dashboard":
      return <FaTachometerAlt />;
    case "house":
      return <LuHouse />;
    case "door":
      return <LuDoorClosed />;
    case "features":
      return <ImAccessibility />;
    case "roomlist":
      return <IoList />;
    case "promocode":
      return <RiCouponFill />;
    default:
      return null;
  }
};

const DrawerElements = () => {
  const navigate = useNavigate();
  const conditionalCollapsibleRender = (element: {
    value: string;
    icon: string;
    navigateTo: string;
  }) => {
    if (element.value === "Room") {
      return (
        <Collapsible.Root>
          <Collapsible.Trigger paddingY="3">
            <Button size={"lg"} key={element.value} variant={"ghost"}>
              {getIcon(element.icon)}
              {element.value}

              <FaChevronDown />
            </Button>
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Button
              size={"lg"}
              key={"bookRoom"}
              variant={"ghost"}
              onClick={() => {
                navigate("bookRoom");
              }}
            >
              {getIcon(element.icon)}
              {"Book Room"}
            </Button>
            <Button
              size={"lg"}
              key={"View Availability"}
              variant={"ghost"}
              onClick={() => {
                navigate("availability");
              }}
            >
              {<LuDoorOpen />}
              {"View Availability"}
            </Button>
          </Collapsible.Content>
        </Collapsible.Root>
      );
    } else
      return (
        <Link to={`/admin${element.navigateTo}`} key={element.value}>
          <Button size={"lg"} key={element.value} variant={"ghost"}>
            {getIcon(element.icon)}
            {element.value}
          </Button>
        </Link>
      );
  };
  return (
    <Box>
      <VStack alignItems={"flex-start"}>
        {elements.map((val) => conditionalCollapsibleRender(val))}
      </VStack>
    </Box>
  );
};

export default DrawerElements;
