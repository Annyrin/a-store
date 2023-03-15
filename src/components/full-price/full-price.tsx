import { Typography } from "@alfalab/core-components/typography";
import { FC } from "react";
import { orderDeliveryType } from "../../store/order/selector";
import { useAppSelector } from "../../store/store";
import s from "./full-price.module.css";

interface FullPriceProps {
  price: number;
}

const getDeliveryPrice = (deliveryType: string): number => {
  return deliveryType === "Доставка по России — 350₽"
    ? 350
    : deliveryType === "Курьером по Москве — 300₽"
    ? 300
    : 0;
};

export const FullPrice: FC<FullPriceProps> = ({ price }) => {
  const deliveryType = useAppSelector(orderDeliveryType);
  const deliveryPrice = getDeliveryPrice(deliveryType);
  return (
    <div className={s.priceblock}>
      <Typography.Text view="primary-large" weight="medium" className={s.price}>
        <em>Cумма: {price} ₽</em>
      </Typography.Text>
      {deliveryPrice > 0 ? (
        <div className={s.priceblock}>
          <Typography.Text view="primary-small" weight="medium">
            {deliveryType}
          </Typography.Text>
          <Typography.Text view="primary-large" weight="medium">
            <em>Итоговая сумма: {price + deliveryPrice} ₽</em>
          </Typography.Text>
        </div>
      ) : null}
    </div>
  );
};
