import {
  Await,
  Link,
  createFileRoute,
  defer,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { ArrowBigLeftDashIcon, CheckCircle2Icon, Copy } from "lucide-react";

import { fetchProduct } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SkeletonCard } from "@/components/skeleton-card";
import { Suspense, useState } from "react";

export const Route = createFileRoute("/_layout/products//$productId/modal")({
  loader: async ({ params: { productId } }) => {
    return { product: defer(fetchProduct(productId)) };
  },
  errorComponent: ProductErrorComponent,
  component: ProductComponent,
  staleTime: 600_000,
});

function ProductComponent() {
  const { product } = Route.useLoaderData();
  const router = useRouterState();

  const [linkCopied, setLinkCopied] = useState(false);

  const navigate = useNavigate();

  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          navigate({ to: "/products", search: { q: "" } });
        }
      }}
    >
      <DialogContent>
        <Suspense fallback={<SkeletonCard />}>
          <Await promise={product}>
            {({ image, title, description }) => (
              <>
                <DialogHeader className="mb-10">
                  <div
                    className="mb-5 h-[300px] w-full bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${image})` }}
                  ></div>
                  <DialogTitle className="mb-3">{title}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    className="w-full gap-x-3"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${import.meta.env.VITE_APP_URL}${router.location.maskedLocation?.pathname}`,
                      );
                      setLinkCopied(true);
                    }}
                  >
                    {linkCopied ? (
                      <>
                        <CheckCircle2Icon /> Link copied to clipboard
                      </>
                    ) : (
                      <>
                        <Copy />
                        Share with friends (copy link to clipboard)
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </>
            )}
          </Await>
        </Suspense>
      </DialogContent>
    </Dialog>
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
