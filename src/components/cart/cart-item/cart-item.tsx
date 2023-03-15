import { Typography } from "@alfalab/core-components/typography";
import { FC } from "react";
import { useAppDispatch } from "../../../store/store";
import { Amount } from "@alfalab/core-components/amount";
import s from "./cart-item.module.css";
import { cartActions } from "../../../store/cart/cart-slice";
import { CartProducts } from "../../../types/cart-products";

interface CartItemProps {
  product: CartProducts;
}

export const CartItem: FC<CartItemProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  const decrement = (prodId: string) => {
    dispatch(cartActions.decrementAmount(prodId));
  };

  const increment = (prodId: string) => {
    dispatch(cartActions.incrementAmount(prodId));
  };

  const removeItem = (prodId: string) => {
    dispatch(cartActions.removeFromCart(prodId));
  };

  return (
    <>
      {product.cart.map((elem) => {
        return (
          <div key={elem.productId}>
            {elem.amount !== 0 && (
              <div className={s.container}>
                <img
                  src={elem.image}
                  alt="Изображение товара"
                  height={70}
                  width={70}
                  className={s.image}
                />

                <div className={s.textContainer}>
                  <Typography.Title
                    tag="h4"
                    view="xsmall"
                    className={s.title}
                    weight="bold"
                    font="styrene"
                  >
                    <em>{elem.title}</em>
                  </Typography.Title>
                  {elem.color && (
                    <Typography.Text
                      view="secondary-small"
                      weight="bold"
                      className={s.text}
                    >
                      Цвет: {elem.color}
                    </Typography.Text>
                  )}
                  {elem.model && (
                    <Typography.Text
                      view="secondary-small"
                      weight="bold"
                      className={s.text}
                    >
                      Модель: {elem.color}
                    </Typography.Text>
                  )}
                  {elem.size && (
                    <Typography.Text
                      view="secondary-small"
                      weight="bold"
                      className={s.text}
                    >
                      Размер: {elem.size}
                    </Typography.Text>
                  )}
                  {elem.stickerNumber && (
                    <Typography.Text
                      view="secondary-small"
                      weight="bold"
                      className={s.text}
                    >
                      Стикер: {elem.size}
                    </Typography.Text>
                  )}
                </div>

                <div className={s.wrapper}>
                  <div className={s.amount}>
                    <div
                      onClick={() => {
                        decrement(elem.productId);
                      }}
                      className={s.icon}
                    >
                      -
                    </div>
                    <Typography.Text view="primary-large" weight="bold">
                      {elem.amount}
                    </Typography.Text>
                    <div
                      className={s.icon}
                      onClick={() => {
                        increment(elem.productId);
                      }}
                    >
                      +
                    </div>
                  </div>
                  <Amount
                    value={elem.price}
                    minority={0}
                    currency="RUB"
                    view="default"
                    className={s.price}
                  />
                </div>
                <div
                  className={s.icon}
                  onClick={() => removeItem(elem.productId)}
                >
                  X
                </div>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};
