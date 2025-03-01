import { toaster } from "@/Components/UI/toaster";
import { CONSTANTS } from "@/constants/AppConstants";
import useAuth from "@/hooks/useAuth";
import useSessionStorage from "@/hooks/useSessionStorage";
import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginConfirmation = () => {
  const { setItem: setUser } = useSessionStorage(CONSTANTS.USER_STORAGE_KEY);
  const { setItem: setUserStatus } = useSessionStorage(
    CONSTANTS.USER_STATUS_KEY
  );
  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useAuth();

  useEffect(() => {
    if (data?.endUser) {
      console.log(data);

      setUser(data.endUser);
      setUserStatus(data.status);

      if (data.endUser.roles[0].authority === CONSTANTS.ADMIN_ROLE) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    }
    if (isError) {
      toaster.create({
        title: "Google signin error",
        description: error.response.data.message,
        type: "error",
        duration: 5 * 1000, //5seconds
      });
    }
  }, [isLoading, data?.endUser]);

  return (
    <div>
      {isLoading && (
        <Flex align="center" justify="center">
          <VStack colorPalette="teal">
            <Spinner color="colorPalette.600" />
            <Text color="colorPalette.600">Loading...</Text>
          </VStack>
        </Flex>
      )}
    </div>
  );
};
export default GoogleLoginConfirmation;
