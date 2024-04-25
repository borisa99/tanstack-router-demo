import "./globals.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouteMask,
  createRouter,
} from "@tanstack/react-router";

import { ThemeProvider } from "@/components/theme-provider";

import { routeTree } from "./routeTree.gen";

const productModalToProductMask = createRouteMask({
  routeTree,
  from: "/products/$productId/modal",
  to: "/product/$productId",
  params: (prev) => ({
    productId: prev.productId,
  }),
});
const router = createRouter({
  routeTree,
  routeMasks: [productModalToProductMask],
  defaultPreload: "intent",
  defaultPreloadDelay: 300,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

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
