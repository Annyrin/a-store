import { GenericWrapper } from "@alfalab/core-components/generic-wrapper";
import { Typography } from "@alfalab/core-components/typography";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types/products";
import s from "./product-item.module.css";

interface CustomProductItemProps {
  product: Product;
}

export const ProductItem: FC<CustomProductItemProps> = ({ product }) => {
  return (
    <li className={s.container}>
      <Link
        to={"/product-page/" + product.id}
        className={s.link}
        data-testid="open-product"
      >
        <GenericWrapper column={true} className={s.container}>
          <GenericWrapper className={s.imgcontainer}>
            <img
              src={product.preview}
              alt={product.title}
              className={s.image}
            />
          </GenericWrapper>
          <div className={s.description}>
            <GenericWrapper>
              <Typography.Text tag="p" view="primary-large" weight="medium">
                {product.title}
              </Typography.Text>
            </GenericWrapper>
            <GenericWrapper>
              <Typography.Text
                tag="p"
                view="secondary-large"
                weight="bold"
                className={s.subtitle}
              >
                {product.subtitle}
              </Typography.Text>
            </GenericWrapper>
            <GenericWrapper>
              <Typography.Text tag="p" view="primary-large" weight="medium">
                {product.price}₽
              </Typography.Text>
            </GenericWrapper>
          </div>
        </GenericWrapper>
      </Link>
    </li>
  );
};
