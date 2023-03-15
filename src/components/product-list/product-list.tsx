import { FC } from "react";
import { Product } from "../../types/products";
import { ProductItem } from "../product-item";

import s from "./product-list.module.css";

interface CustomProductListProps {
  customProduct: Product[];
}

export const ProductList: FC<CustomProductListProps> = ({ customProduct }) => {
  return (
    <ul className={s.wrapper} data-testid="product-list">
      {customProduct.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </ul>
  );
};
