import { Button } from "@alfalab/core-components/button";
import { Divider } from "@alfalab/core-components/divider";
import { Gap } from "@alfalab/core-components/gap";
import { GenericWrapper } from "@alfalab/core-components/generic-wrapper";
import { SidePanelResponsive } from "@alfalab/core-components/side-panel/Component.responsive";
import { Typography } from "@alfalab/core-components/typography";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { cartProduct } from "../../../store/cart/selector";
import { useAppSelector } from "../../../store/store";
import { calculatePrice } from "../calculate-price";
import { CartItem } from "../cart-item";
import s from "./cart-sidebar.module.css";

interface CartSidebarProps {
  open: boolean;
  handleClose: () => void;
}

export const CartSidebar: FC<CartSidebarProps> = ({ open, handleClose }) => {
  const product = useAppSelector(cartProduct);

  const price = useMemo(() => calculatePrice(product), [product]);

  return (
    <SidePanelResponsive
      open={open}
      onClose={handleClose}
      size="s"
      placement="right"
      className={s.sidepanel}
    >
      <SidePanelResponsive.Header sticky={true} hasCloser={true} />
      <GenericWrapper grow={true} column={true} className={s.container}>
        <GenericWrapper>
          <Typography.Title
            tag="h2"
            view="xlarge"
            className={s.title}
            weight="bold"
            font="styrene"
          >
            <em>Ваш заказ</em>
          </Typography.Title>
        </GenericWrapper>
        <Gap size={"m"} />
        <Divider />
        <CartItem product={product} />
        <Divider />
        <Gap size={"m"} />
        <Typography.Text weight="bold" className={s.fullprice}>
          Итоговая сумма: {price} ₽
        </Typography.Text>
        <Link to="/tcart" className={s.link}>
          <Button block>Перейти к оформлению заказа</Button>
        </Link>
      </GenericWrapper>
    </SidePanelResponsive>
  );
};
