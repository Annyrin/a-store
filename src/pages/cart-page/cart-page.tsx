import { Button } from "@alfalab/core-components/button";
import { Typography } from "@alfalab/core-components/typography";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { calculatePrice } from "../../components/cart/calculate-price";
import { CartItem } from "../../components/cart/cart-item";
import { FullPrice } from "../../components/full-price";
import { OrderForm } from "../../components/order-form";
import { Page } from "../../components/page";
import { cartProduct } from "../../store/cart/selector";
import { useAppSelector } from "../../store/store";
import s from "./cart-page.module.css";

export const CartPage: FC = () => {
  const product = useAppSelector(cartProduct);
  const price = useMemo(() => calculatePrice(product), [product]);

  return (
    <Page isCartPage>
      <div className={s.container}>
        <OrderForm price={price} product={product} />
        <div className={s.wrapper}>
          <CartItem product={product} />
          {price !== 0 ? (
            <FullPrice price={price} />
          ) : (
            <div className={s.empty}>
              <Typography.Text
                view="primary-large"
                color="negative"
                weight="bold"
              >
                Ваша корзина пуста, необходимо добавить товар
              </Typography.Text>
              <Link to="/" className={s.link}>
                <Button block>К товарам</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};
