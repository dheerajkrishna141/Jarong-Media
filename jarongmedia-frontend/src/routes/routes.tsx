import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddAvailability from "../Components/Admin/Hotel/AddAvailability";
import AddFeature from "../Components/Admin/Hotel/AddFeature";
import AddHotel from "../Components/Admin/Hotel/AddHotel";
import AddRoom from "../Components/Admin/Hotel/AddRoom";
import Availability from "../Components/Admin/Room/Availability";
import BookRoom from "../Components/Admin/Room/BookRoom";
import { Dashboard } from "../Components/Admin/Dashboard";
import Feature from "../Components/Admin/Feature";
import Hotel from "../Components/Admin/Hotel/Hotel";
import Promocode from "../Components/Admin/Promocode";
import Roombook from "../Components/Admin/Roombook";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EmailVerify from "../pages/EmailVerify";
import PaymentPage from "../pages/PaymentPage";
import BookingConfirmation from "../pages/BookingConfirmation";
import AllBookings from "../Components/Admin/AllBookings";
import GoogleLoginConfirmation from "../pages/GoogleLoginConfirmation";
import PrivateRoutes from "./PrivateRoutes";
import SignInMethod from "@/Components/Admin/Profile/SignInMethod";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/google/login",
        element: <GoogleLoginConfirmation />,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/user/verify",
        element: <EmailVerify></EmailVerify>,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/admin",
        element: <Admin></Admin>,
        children: [
          {
            index: true,
            element: <Dashboard></Dashboard>,
          },
          {
            path: "commonSettings",
            element: <SignInMethod></SignInMethod>,
          },
          {
            path: "dashboard",
            element: <Dashboard></Dashboard>,
          },
          {
            path: "hotel",
            element: <Hotel></Hotel>,
            children: [
              {
                path: "addFeature",
                element: <AddFeature></AddFeature>,
              },
              {
                path: "addAvailability",
                element: <AddAvailability></AddAvailability>,
              },
              {
                path: "addRoom",
                element: <AddRoom></AddRoom>,
              },
              {
                path: "addHotel",
                element: <AddHotel></AddHotel>,
              },
            ],
          },
          {
            path: "promocodes",
            element: <Promocode></Promocode>,
          },
          {
            path: "features",
            element: <Feature></Feature>,
          },
          {
            path: "roomList",
            element: <Roombook></Roombook>,
          },
          {
            path: "bookRoom",
            element: <BookRoom></BookRoom>,
          },
          {
            path: "availability",
            element: <Availability></Availability>,
          },
          {
            path: "checkout",
            element: <PaymentPage></PaymentPage>,
          },
          {
            path: "viewBookings",
            element: <AllBookings></AllBookings>,
          },
          {
            path: "bookingConfirmation",
            element: <BookingConfirmation></BookingConfirmation>,
          },
        ],
      },
    ],
  },
]);

export default routes;
