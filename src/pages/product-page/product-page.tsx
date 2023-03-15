import { FC, useEffect } from "react";
import { useParams } from "react-router";
import { Gallery } from "../../components/gallery";
import { Page } from "../../components/page";
import { ProductDetails } from "../../components/product-details";
import { fetchProduct } from "../../store/product/thunk";
import { productActions } from "../../store/product/product-slice";
import { productSelector, productStatus } from "../../store/product/selector";
import { useAppDispatch, useAppSelector } from "../../store/store";
import s from "./product-page.module.css";
import { Loader } from "@alfalab/core-components/loader";

export const ProductPage: FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(productSelector);
  const status = useAppSelector(productStatus);

  useEffect(() => {
    dispatch(fetchProduct(String(id)));
    return () => {
      dispatch(productActions.clearProductPage());
    };
  }, [id, dispatch]);

  return (
    <>
      <Page>
        {product === null || status === "loading" ? (
          <Loader className={s.loader} />
        ) : (
          <div className={s.container}>
            <Gallery product={product} />
            <ProductDetails product={product} />
          </div>
        )}
      </Page>
    </>
  );
};
