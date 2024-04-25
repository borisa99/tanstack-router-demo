import { ShoppingBasket } from "lucide-react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative flex h-[calc(100vh-72px)] w-full flex-col items-center justify-center overflow-hidden rounded-md bg-black">
      <div className="absolute inset-0 w-full">
        <SparklesCore
          id="tsparticlesfullpage"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="h-full w-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="relative z-20 flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-3xl font-bold text-white md:text-7xl lg:text-6xl">
          This is my awesome store
        </h1>
        <p className="mb-4 max-w-[500px] text-center text-sm text-gray-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
          minus earum voluptatibus dicta expedita asperiores assumenda sunt?
        </p>
        <Link to="/products" search={{ q: "" }}>
          <Button>
            <ShoppingBasket className="mr-2" />
            Click to explore
          </Button>
        </Link>
      </div>
    </div>
  );
}
