import "./globals.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouteMask,
  createRouter,
} from "@tanstack/react-router";

import { ThemeProvider } from "@/components/theme-provider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

const photoModalToPhotoMask = createRouteMask({
  routeTree,
  from: "/products/$productId/modal",
  to: "/products/$productId",
  params: (prev) => ({
    productId: prev.productId,
  }),
});

// Create a new router instance
const router = createRouter({
  routeTree,
  routeMasks: [photoModalToPhotoMask],
  defaultPreload: "intent",
  defaultPreloadDelay: 300,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  );
}
