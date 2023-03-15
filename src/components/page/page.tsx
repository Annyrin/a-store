import { GenericWrapper } from "@alfalab/core-components/generic-wrapper";
import { FC, ReactNode } from "react";
import { Footer } from "../footer";
import { Header } from "../header";
import { Cart } from "../cart";
import { useAppSelector } from "../../store/store";
import { cartProductAmount } from "../../store/cart/selector";
import cn from "classnames";
import s from "./page.module.css";

interface PageProps {
  children: ReactNode;
  isMainPage?: boolean;
  isCartPage?: boolean;
}

export const Page: FC<PageProps> = ({
  children,
  isMainPage = false,
  isCartPage = false,
}) => {
  const prodAmount = useAppSelector(cartProductAmount);
  return (
    <GenericWrapper column grow>
      <GenericWrapper
        justifyContent="center"
        column={true}
        grow
        className={cn(s.header, { [s.headerMain]: isMainPage })}
      >
        <Header />
      </GenericWrapper>
      <GenericWrapper
        column
        grow
        className={cn(s.page, { [s.mainPage]: isMainPage }, s.body)}
      >
        <main>{children}</main>
      </GenericWrapper>
      <GenericWrapper
        justifyContent="end"
        column
        grow
        className={cn(
          s.page,
          { [s.mainPage]: isMainPage },
          { [s.mainFooter]: isMainPage }
        )}
      >
        <Footer isMainPage={isMainPage}></Footer>
      </GenericWrapper>
      {prodAmount !== 0 && <Cart amount={prodAmount} isCartPage={isCartPage} />}
    </GenericWrapper>
  );
};
