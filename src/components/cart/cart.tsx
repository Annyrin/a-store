import { Badge } from "@alfalab/core-components/badge";
import { Circle } from "@alfalab/core-components/icon-view/circle";
import { FC, useState } from "react";
import { CartIconSvg } from "../icons/svgs/cart-icon-svg";
import { Link } from "@alfalab/core-components/link";
import { CartSidebar } from "./cart-sidebar.tsx";
import s from "./cart-icon.module.css";
import cn from "classnames";

interface CartIconProps {
  amount: number;
  isCartPage?: boolean;
}

export const Cart: FC<CartIconProps> = ({ amount, isCartPage }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={cn({ [s.cartPage]: isCartPage })}>
      <Link
        onClick={handleOpen}
        className={s.cart}
        underline={false}
        data-testid="cart-icon"
      >
        <Circle
          className={s.icon}
          backgroundIcon={CartIconSvg}
          backgroundColor={"#ef3124"}
          size={80}
          bottomAddons={
            <Badge
              view="count"
              height={24}
              content={amount}
              iconColor="secondary"
            />
          }
        />
      </Link>
      <CartSidebar open={open} handleClose={handleClose} />
    </div>
  );
};
