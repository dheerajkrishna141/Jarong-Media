import {
  Box,
  VStack,
  Link,
  Text,
  AccordionRoot,
  AccordionItem,
  AccordionItemTrigger,
  AccordionItemContent,
  Button,
  Flex,
} from "@chakra-ui/react";
import type { FC } from "react";

interface SidebarProps {
  currentPath: string;
}

const Sidebar: FC<SidebarProps> = ({ currentPath }) => {
  const menuItems = [
    { lable: "Profile", navigateTo: "/profile" },
    { lable: "Basic Information", navigateTo: "/basic" },
    { lable: "Deactivate Account", navigateTo: "/deactivate" },
    { lable: "Referrals", navigateTo: "/referrals" },
  ];

  return (
    <Box
      as="aside"
      w={{ base: "full", md: "250px" }}
      py={8}
      px={4}
      borderRight="10px"
      borderColor="gray.200"
    >
      <VStack alignItems={"flex-start"}>
        <Text fontSize="xl" fontWeight="bold" mb={6}>
          Account Settings
        </Text>
        {menuItems.map((val, index) => (
          <Button
            textAlign={"left"}
            colorPalette={"purple"}
            rounded={"full"}
            alignItems={"center"}
            alignContent={"start"}
            variant={"ghost"}
            key={index}
          >
            {val.lable}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
