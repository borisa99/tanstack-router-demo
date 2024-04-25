import { lazy, Suspense } from "react";

import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "@/components/logo";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null
    : lazy(() =>
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex items-center p-4">
        <div className="justify flex flex-1 items-center gap-5">
          <Logo />
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link
            to="/products"
            className="[&.active]:font-bold"
            search={{ q: "" }}
          >
            Products
          </Link>
        </div>
        <ModeToggle />
      </div>
      <hr />
      <div className="relative">
        <Outlet />
      </div>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
