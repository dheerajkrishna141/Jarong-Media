import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AddAvailability from "./Components/AddAvailability";
import AddFeature from "./Components/AddFeature";
import AddHotel from "./Components/AddHotel";
import AddRoom from "./Components/AddRoom";
import Availability from "./Components/Availability";
import BookRoom from "./Components/BookRoom";
import { Dashboard } from "./Components/Dashboard";
import Feature from "./Components/Feature";
import Hotel from "./Components/Hotel";
import Promocode from "./Components/Promocode";
import Roombook from "./Components/Roombook";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import EmailVerify from "./pages/EmailVerify";
import PaymentPage from "./pages/PaymentPage";
import BookingConfirmation from "./pages/BookingConfirmation";
import AllBookings from "./Components/AllBookings";

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
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/user/verify",
        element: <EmailVerify></EmailVerify>,
      },
      {
        path: "/admin",
        element: <Admin></Admin>,
        children: [
          {
            index: true,
            element: <Dashboard></Dashboard>,
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
