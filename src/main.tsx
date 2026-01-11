import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Root from "./routes/root";
import ProductListing from "./routes/product-listing";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";

// TODO - set default query client options
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // TODO - Add not found page
    errorElement: <div>Error</div>,
    children: [
      {
        path: ":category",
        element: <ProductListing />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </NuqsAdapter>
  </React.StrictMode>
);
