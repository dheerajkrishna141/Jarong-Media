import { LuDoorClosed, LuDoorOpen, LuHouse } from "react-icons/lu";
import { ImAccessibility } from "react-icons/im";
import { IoList } from "react-icons/io5";
import { RiCouponFill } from "react-icons/ri";
import {
  Box,
  Button,
  ButtonGroup,
  Collapsible,
  Container,
  VStack,
} from "@chakra-ui/react";
import { FaChevronDown, FaTachometerAlt } from "react-icons/fa";
export const elements = [
  { value: "Dashboard", icon: "dashboard" },
  { value: "Hotels", icon: "house" },
  { value: "Room", icon: "door" },
  { value: "Feature List", icon: "features" },
  { value: "Room List", icon: "roomlist" },
  { value: "Promocode", icon: "promocode" },
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

interface props {
  setMain: (val: string) => void;
}

const DrawerElements = ({ setMain }: props) => {
  const conditionalCollapsibleRender = (element: {
    value: string;
    icon: string;
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
                setMain("BookRoom");
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
                setMain("Availability");
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
        <Button
          size={"lg"}
          key={element.value}
          variant={"ghost"}
          onClick={() => {
            setMain(element.value);
          }}
        >
          {getIcon(element.icon)}
          {element.value}
        </Button>
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
