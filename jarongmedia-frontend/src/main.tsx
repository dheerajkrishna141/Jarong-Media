import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "./Components/UI/provider.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import routes from "./routes.tsx";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={routes}></RouterProvider>
        <ReactQueryDevtools></ReactQueryDevtools>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
