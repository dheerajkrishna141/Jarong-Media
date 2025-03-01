import { CONSTANTS } from "@/constants/AppConstants";
import useAuth from "@/hooks/useAuth";
import useSessionStorage from "@/hooks/useSessionStorage";
import { Loader } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";

const UserRoutes = () => {
  const { data, isLoading, isError } = useAuth();
  const { setItem: setStatus } = useSessionStorage(CONSTANTS.USER_STATUS_KEY);

  console.log(data);

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (!data) {
    if (isError) setStatus("false");
    return <Navigate to={"/login"}></Navigate>;
  }

  return <Outlet />;
};

export default UserRoutes;
