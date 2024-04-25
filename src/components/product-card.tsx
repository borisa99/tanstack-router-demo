import { FC } from "react";
import { Link } from "@tanstack/react-router";

import { type ProductType } from "@/data/products";

const ProductCard: FC<ProductType> = ({ id, title, image }) => {
  return (
    <Link
      key={id}
      to="/products/$productId/modal"
      params={{
        productId: id,
      }}
      search={{ q: "" }}
    >
      <div className="overflow-hidden">
        <div className="group flex flex-col space-y-3 hover:opacity-70">
          <div
            className="h-[180px] w-full rounded-xl bg-cover bg-center bg-no-repeat transition duration-300 ease-in-out group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="space-y-2">
            <span className="text-sm uppercase">{title}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export { ProductCard };
