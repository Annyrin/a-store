import { Typography } from "@alfalab/core-components/typography";
import { FC } from "react";
import { YourDesignProducts } from "../../types/products";
import { ProductList } from "../product-list";
import s from "./custom-product-container.module.css";

interface CustomProductContainerProps {
  block: YourDesignProducts;
}

export const CustomProductContainer: FC<CustomProductContainerProps> = ({
  block,
}) => {
  return (
    <div className={s.container}>
      <>
        <Typography.Title
          tag="h2"
          view="xlarge"
          className={s.title}
          color="accent"
          weight="bold"
        >
          {block.title}
        </Typography.Title>
        <Typography.Title
          tag="h3"
          className={s.paragraph}
          view="medium"
          weight="medium"
        >
          {block.description}
        </Typography.Title>
      </>
      <ProductList customProduct={block.products} />
    </div>
  );
};
