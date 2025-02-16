import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import AddHotel from "./Components/AddHotel";

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
        path: "/admin",
        element: <Admin></Admin>,
      },
      {
        path: "/admin/addHotel",
        element: <AddHotel></AddHotel>,
      },
    ],
  },
]);

export default routes;
