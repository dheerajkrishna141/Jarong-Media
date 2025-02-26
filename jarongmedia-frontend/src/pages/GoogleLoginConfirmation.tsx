import { toaster } from "@/Components/UI/toaster";
import { CONSTANTS } from "@/constants/AppConstants";
import useGoogleConfirmation from "@/hooks/useGoogleConfirmation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Flex, Spinner, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GoogleLoginConfirmation = () => {
  const { setItem: setUser } = useLocalStorage(CONSTANTS.USER_STORAGE_KEY);
  const { setItem: setUserStatus } = useLocalStorage(CONSTANTS.USER_STATUS_KEY);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { data, isError, error, isLoading } = useGoogleConfirmation(
    searchParams.get("code") || ""
  );

  useEffect(() => {
    if (data.endUser) {
      console.log(data);

      setUser(data.endUser);
      setUserStatus(data.status);
      navigate("/admin");
    }
    if (isError) {
      toaster.create({
        title: "Google signin error",
        description: error.response.data.message,
        type: "error",
        duration: 5 * 1000, //5seconds
      });
    }
  }, [isLoading, data.endUser]);

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
