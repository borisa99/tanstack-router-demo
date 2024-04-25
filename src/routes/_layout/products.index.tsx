import { Suspense, Fragment } from "react";
import { useDebounceCallback } from "usehooks-ts";

import {
  Await,
  Outlet,
  createFileRoute,
  defer,
  useNavigate,
} from "@tanstack/react-router";

import { SkeletonCard } from "@/components/skeleton-card";
import { Input } from "@/components/ui/input";
import { fetchProducts } from "@/data/products";
import { ProductCard } from "@/components/product-card";

type ProductSearch = {
  q: string;
};

export const Route = createFileRoute("/_layout/products/")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => {
    return {
      q: (search.q as string) || "",
    };
  },
  loaderDeps: ({ search: { q } }) => ({ q }),
  loader: async ({ deps: { q } }) => {
    return {
      products: defer(fetchProducts(q)),
    };
  },
  component: Products,
  staleTime: 600_000,
});

function Products() {
  const { products } = Route.useLoaderData();
  const navigate = useNavigate({ from: Route.fullPath });

  const handleSearchChange = (q: string) => {
    navigate({ search: (prev) => ({ ...prev, q }) });
  };

  const debouncedSearch = useDebounceCallback(handleSearchChange, 500);

  return (
    <div className="flex gap-3">
      <div className="h-full w-[400px]">
        <h1 className="mb-4 text-4xl font-semibold text-white">
          Search Products
        </h1>
        <Input
          type="text"
          placeholder="Enter product title"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </div>
      <div className="grid w-full grid-cols-3 gap-4">
        <Suspense
          fallback={
            <Fragment>
              {Array.from({ length: 20 }, (_, i) => (
                <SkeletonCard key={i} />
              ))}
            </Fragment>
          }
        >
          <Await promise={products}>
            {({ data }) =>
              data.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))
            }
          </Await>
        </Suspense>
      </div>
      <Outlet />
    </div>
  );
}
