import ProfilePage from "@/Components/User/Profile";
import AboutPage from "@/pages/About";
import BookingPage from "@/pages/BookingPage";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AllBookings from "../Components/Admin/AllBookings";
import Feature from "../Components/Admin/Feature";
import AddAvailability from "../Components/Admin/Hotel/AddAvailability";
import AddFeature from "../Components/Admin/Hotel/AddFeature";
import AddHotel from "../Components/Admin/Hotel/AddHotel";
import AddRoom from "../Components/Admin/Hotel/AddRoom";
import Hotel from "../Components/Admin/Hotel/Hotel";
import Promocode from "../Components/Admin/Promocode";
import Availability from "../Components/Admin/Room/Availability";
import BookRoom from "../Components/Admin/Room/BookRoom";
import Roombook from "../Components/Admin/Roombook";
import Admin from "../pages/Admin";
import BookingConfirmation from "../pages/BookingConfirmation";
import EmailVerify from "../pages/EmailVerify";
import GoogleLoginConfirmation from "../pages/GoogleLoginConfirmation";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PaymentPage from "../pages/PaymentPage";
import Register from "../pages/Register";
import AdminRoutes from "./AdminRoutes";
import RoomDetails from "@/Components/Booking/RoomDetails";
import RoomGrid from "@/Components/Booking/RoomGrid";
import CheckoutPage from "@/Components/Booking/CheckOut";
import UserRoutes from "./UserRoutes";
import UserPaymentPage from "@/pages/UserPaymentPage";
import BookingErrorPage from "@/pages/BookingErrorPage";
import UserRequestPage from "@/pages/UserRequestPage";
import ErrorPage from "@/pages/Error";
import { Dashboard } from "@/Components/Admin/Dashboard/Dashboard";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/google/login",
        element: <GoogleLoginConfirmation />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/request",
        element: <UserRequestPage />,
      },
      {
        path: "/user/verify",
        element: <EmailVerify />,
      },
    ],
  },
  {
    element: <UserRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/user",
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "booking",
            element: <BookingPage />,
            children: [
              {
                index: true,
                element: <RoomGrid />,
              },
              {
                path: "rooms/:id",
                element: <RoomDetails />,
              },
              {
                path: "checkout",
                element: <CheckoutPage />,
              },
              {
                path: "payment",
                element: <UserPaymentPage />,
              },
              {
                path: "confirmation",
                element: <BookingConfirmation />,
              },
            ],
          },
          {
            path: "booking/error",
            element: <BookingErrorPage />,
          },
        ],
      },
    ],
  },
  {
    element: <AdminRoutes />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/admin",
        element: <Admin />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "hotel",
            element: <Hotel />,
            children: [
              {
                path: "addFeature",
                element: <AddFeature />,
              },
              {
                path: "addAvailability",
                element: <AddAvailability />,
              },
              {
                path: "addRoom",
                element: <AddRoom />,
              },
              {
                path: "addHotel",
                element: <AddHotel />,
              },
            ],
          },
          {
            path: "promocodes",
            element: <Promocode />,
          },
          {
            path: "features",
            element: <Feature />,
          },
          {
            path: "roomList",
            element: <Roombook />,
          },
          {
            path: "bookRoom",
            element: <BookRoom />,
          },
          {
            path: "availability",
            element: <Availability />,
          },
          {
            path: "checkout",
            element: <PaymentPage />,
          },
          {
            path: "viewBookings",
            element: <AllBookings />,
          },
          {
            path: "bookingConfirmation",
            element: <BookingConfirmation />,
          },
        ],
      },
    ],
  },
]);

export default routes;
