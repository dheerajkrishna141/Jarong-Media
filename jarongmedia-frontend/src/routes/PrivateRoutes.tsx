import { CONSTANTS } from "@/constants/AppConstants";
import useAuth from "@/hooks/useAuth";
import useLocalStorage from "@/hooks/useLocalStorage";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { isError } = useAuth();
  const { setItem: setStatus } = useLocalStorage(CONSTANTS.USER_STATUS_KEY);

  if (isError) {
    setStatus(false);
    return <Navigate to={"/login"}></Navigate>;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoutes;
