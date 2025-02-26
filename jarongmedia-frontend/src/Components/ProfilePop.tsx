import { CONSTANTS } from "@/constants/AppConstants";
import useLocalStorage from "@/hooks/useLocalStorage";
import { user } from "@/services/httpUserService";
import UserService from "@/services/UserService";
import {
  AvatarRoot,
  Button,
  HStack,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BsIncognito } from "react-icons/bs";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const ProfilePop = () => {
  const { getItem: getUser, clear: clearUser } = useLocalStorage(
    CONSTANTS.USER_STORAGE_KEY
  );
  const { clear: clearUserStatus } = useLocalStorage(CONSTANTS.USER_STATUS_KEY);
  const navigate = useNavigate();

  const handleLogout = () => {
    UserService.logout().then(() => {
      clearUser();
      clearUserStatus();
      navigate("/login", { replace: true });
    });
  };
  const user: user = JSON.parse(getUser() || "");

  return (
    <div>
      <MenuRoot>
        <MenuTrigger>
          <HStack>
            <AvatarRoot size="lg">
              <BsIncognito />
            </AvatarRoot>
            <Text display={{ base: "none", md: "block" }}>ADMIN</Text>
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
                  {user.firstName} {user.lastName}
                </Text>
                <Text color="gray.500">{user.email}</Text>
              </VStack>
            </HStack>

            <VStack align="stretch" gap={2}>
              <MenuItem value="My Profile">My Profile</MenuItem>
              <MenuItem value="Common Settings">
                <Link to={"/admin/commonSettings"}>Common Settings</Link>
              </MenuItem>
              <MenuItem value="Settings">Settings</MenuItem>
            </VStack>
            <Button
              colorScheme="purple"
              w="full"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </Button>
            <HStack justify="center" fontSize="sm" color="gray.500" gap={2}>
              <Link to={"/"}>Privacy policy</Link>
              <Text>•</Text>
              <Link to={"/"}>Terms</Link>
              <Text>•</Text>
              <Link to={"/"}>Cookies</Link>
            </HStack>
          </VStack>
        </MenuContent>
      </MenuRoot>
    </div>
  );
};

export default ProfilePop;
