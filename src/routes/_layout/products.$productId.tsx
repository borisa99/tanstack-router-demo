import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowBigLeftDashIcon } from "lucide-react";

import { fetchProduct } from "@/data/products";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_layout/products/$productId")({
  loader: async ({ params: { productId } }) => await fetchProduct(productId),
  errorComponent: ProductErrorComponent,
  component: ProductComponent,
  staleTime: 600_000,
});

function ProductComponent() {
  const product = Route.useLoaderData();

  return (
    <div className="space-y-2">
      <div
        className="h-[300px] w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>
      <h4 className="text-xl font-bold underline">{product.title}</h4>
      <div className="text-sm">{product.description}</div>
    </div>
  );
}

function ProductErrorComponent() {
  return (
    <div className="space-y-2">
      <h4 className="mb-4 text-lg font-bold ">Whoops, product not found!</h4>
      <Link to="/products" search={{ q: "" }}>
        <Button>
          <ArrowBigLeftDashIcon />
          Explore other products
        </Button>
      </Link>
    </div>
  );
}
