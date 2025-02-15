import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import routes from "./routes.tsx";
import { Provider } from "./Components/UI/provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={routes}></RouterProvider>
    </Provider>
  </StrictMode>
);
