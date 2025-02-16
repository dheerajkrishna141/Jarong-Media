import {
  AvatarImage,
  AvatarRoot,
  Button,
  HStack,
  IconButton,
  Input,
  Link,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoChevronDownCircleOutline } from "react-icons/io5";

const ProfilePop = () => {
  return (
    <div>
      <MenuRoot>
        <MenuTrigger>
          <HStack>
            <AvatarRoot size="sm">
              <AvatarImage src="https://bit.ly/naruto-sage"></AvatarImage>
            </AvatarRoot>
            <Text display={{ base: "none", md: "block" }}>Michelle</Text>
            <IoChevronDownCircleOutline />
          </HStack>
        </MenuTrigger>
        <MenuContent
          w="320px"
          p={4}
          position={"absolute"}
          zIndex={1000}
          right={50}
        >
          <VStack align="stretch" gap={4}>
            <HStack>
              <VStack align="start" gap={0}>
                <Text fontWeight="bold" fontSize="lg">
                  Michelle Glover
                </Text>
                <Text color="gray.500">michelle.glover@gmail.com</Text>
              </VStack>
            </HStack>
            <Input placeholder="Update my status" size="sm" />
            <VStack align="stretch" gap={2}>
              <MenuItem value="My Profile">My Profile</MenuItem>
              <MenuItem value="Common Settings">Common Settings</MenuItem>
              <MenuItem value="Settings">Settings</MenuItem>
            </VStack>
            <Button colorScheme="purple" w="full">
              Logout
            </Button>
            <HStack justify="center" fontSize="sm" color="gray.500" gap={2}>
              <Link>Privacy policy</Link>
              <Text>•</Text>
              <Link>Terms</Link>
              <Text>•</Text>
              <Link>Cookies</Link>
            </HStack>
          </VStack>
        </MenuContent>
      </MenuRoot>
    </div>
  );
};

export default ProfilePop;

// <MenuRoot>
//   <MenuTrigger asChild>
//     <Box className="cursor-pointer">
//       <Image
//         src="https://bit.ly/naruto-sage"
//         boxSize="50px"
//         borderRadius="full"
//         fit="cover"
//         alt="Naruto Uzumaki"
//       />
//     </Box>
//   </MenuTrigger>
//   <MenuContent
//     minW={"250px"}
//     padding={5}
//     fontSize={12}
//     zIndex={1000}
//     position={"absolute"}
//   >
//     <MenuItem value="rename">Rename</MenuItem>
//     <MenuItem value="export">Export</MenuItem>
//     <MenuItem value="delete" color="fg.error">
//       Delete...
//     </MenuItem>
//   </MenuContent>
// </MenuRoot>
