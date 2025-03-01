import { CONSTANTS } from "@/constants/AppConstants";
import useSessionStorage from "@/hooks/useSessionStorage";
import { userWithId } from "@/services/httpUserService";
import {
  Box,
  Container,
  Flex,
  Show,
  useBreakpointValue,
} from "@chakra-ui/react";
import type { FC } from "react";
import NavBar from "./Layout/NavBar";
import BasicInformation from "./BasicInformation";
import Sidebar from "./Layout/SideBar";
import SignInMethod from "./SigninMethod";

const ProfilePage: FC = () => {
  const { getItem: getUser } = useSessionStorage(CONSTANTS.USER_STORAGE_KEY);
  const user: userWithId = JSON.parse(getUser() || "");
  const isLargeScreen = useBreakpointValue({ base: false, lg: true });

  return (
    <Box minH="100vh">
      <NavBar />

      <Container maxW="1200px">
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          <Show when={isLargeScreen}>
            <Sidebar currentPath="/settings/signin" />
          </Show>

          <Box flex="1">
            <SignInMethod email={user.email || ""} />
            <BasicInformation
              firstName={user.firstName || ""}
              lastName={user.lastName || ""}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default ProfilePage;
