import { Typography } from "@alfalab/core-components/typography";
import { FC } from "react";
import { CustomProducts } from "../../types/products";
import { AddToCartForm } from "../add-to-cart-form";
import s from "./product-details.module.css";

interface ProductDescriptionProps {
  product: CustomProducts;
}

export const ProductDetails: FC<ProductDescriptionProps> = ({ product }) => {
  return (
    <div className={s.container}>
      <Typography.Title
        tag="h1"
        view="medium"
        className={s.title}
        weight="bold"
        font="styrene"
        data-testid="on-page-made-in-alfa"
      >
        {product.title}
      </Typography.Title>
      <Typography.Text
        tag="p"
        view="primary-large"
        weight="bold"
        className={s.price}
      >
        {product.price}₽
      </Typography.Text>

      <div className={s.wrapper}>
        <AddToCartForm product={product} />
        <Typography.Text
          tag="p"
          className={s.paragraph}
          view="primary-small"
          weight="medium"
        >
          {product.description}
        </Typography.Text>
      </div>

      {product.subtitle && (
        <Typography.Text
          tag="p"
          className={s.paragraph}
          view="primary-small"
          weight="medium"
        >
          Посмотреть и потрогать все стикеры можно в A-Store на Технопарке.
          Также там можно добавить сразу несколько стикеров на одну вещь.
        </Typography.Text>
      )}
    </div>
  );
};
