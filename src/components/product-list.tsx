import type { Product } from "@/api/products/products.type";
import { ProductCard } from "./product-card";

export const ProductList = ({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <li key={product.id} className="list-none">
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
};
