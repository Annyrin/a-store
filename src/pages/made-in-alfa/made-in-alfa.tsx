import { Typography } from "@alfalab/core-components/typography";
import { FC, useLayoutEffect } from "react";
import { Page } from "../../components/page";
import { Loader } from "@alfalab/core-components/loader";
import { ProductList } from "../../components/product-list";
import {
  madeInAlfaProductsSelector,
  madeInAlfaProductsStatus,
} from "../../store/made-in-alfa/selector";
import { fetchProducts } from "../../store/made-in-alfa/thunk";
import { useAppDispatch, useAppSelector } from "../../store/store";
import s from "./made-in-alfa.module.css";

export const MadeInAlfa: FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(madeInAlfaProductsSelector);
  const status = useAppSelector(madeInAlfaProductsStatus);

  useLayoutEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Page>
      {status === "loading" ? (
        <Loader className={s.loader} />
      ) : (
        <>
          <Typography.Title
            tag="h1"
            view="xlarge"
            className={s.title}
            weight="bold"
            font="styrene"
            data-testid="on-page-made-in-alfa"
          >
            Сделано в Альфе
          </Typography.Title>
          <Typography.Text
            tag="p"
            className={s.paragraph}
            view="primary-large"
            weight="medium"
          >
            Хотим каждую из этих вещей! Себе, родным и друзьям
          </Typography.Text>
          <ProductList customProduct={products} />
        </>
      )}
    </Page>
  );
};
