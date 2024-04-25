import { notFound } from "@tanstack/react-router";
import axios from "axios";

export type ProductType = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
};

export class ProductNotFoundError extends Error {}

export const fetchProduct = async (productId: string) => {
  console.log(`Fetching post with id ${productId}...`);
  const product = await axios
    .get<ProductType>(`https://fakestoreapi.com/products/${productId}`)
    .then((r) => r.data)
    .catch((err) => {
      if (err.response.status === 404) {
        throw notFound();
      }
      throw err;
    });

  if (!product) {
    throw new ProductNotFoundError(`Post with id "${productId}" not found!`);
  }

  return product;
};
export const fetchProductCount = async () => {
  console.log("Fetching products length...");
  return (await axios.get<ProductType[]>("https://fakestoreapi.com/products"))
    .data.length;
};

export const fetchProducts = async (q: string) => {
  console.log("Fetching products..." + q);
  return axios.get<ProductType[]>("https://fakestoreapi.com/products");
};
