import { CONSTANTS } from "@/constants/AppConstants";
import useAuth from "@/hooks/useAuth";
import useSessionStorage from "@/hooks/useSessionStorage";
import { Loader } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  const { isError, data, isLoading } = useAuth();
  const { setItem: setStatus } = useSessionStorage(CONSTANTS.USER_STATUS_KEY);

  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    if (isError) {
      setStatus(false);
    }
    return <Navigate to={"/login"} replace={true}></Navigate>;
  }
  if (data) {
    const isAllowed = data.endUser.roles[0].authority === CONSTANTS.ADMIN_ROLE;
    if (!isAllowed) {
      setStatus(false);
      return <Navigate to={"/login"} replace={true}></Navigate>;
    }
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AdminRoutes;
