import { Loader } from "@alfalab/core-components/loader";
import { Typography } from "@alfalab/core-components/typography";
import { FC, useEffect } from "react";
import { CustomProductContainer } from "../../components/custom-product-container";
import { Page } from "../../components/page";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { fetchProducts } from "../../store/your-design/thunk";
import {
  yourDesignProductsSelector,
  yourDesignProductsStatus,
} from "../../store/your-design/selector";
import s from "./your-design-page.module.css";

export const YourDesignPage: FC = () => {
  const dispatch = useAppDispatch();
  const yourDesignProducts = useAppSelector(yourDesignProductsSelector);
  const status = useAppSelector(yourDesignProductsStatus);

  useEffect(() => {
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
            font="styrene"
            weight="bold"
            data-testid="on-page-your-design"
          >
            Свой дизайн
          </Typography.Title>
          <Typography.Text
            tag="p"
            className={s.paragraph}
            view="primary-large"
            weight="medium"
          >
            Выберите вещь, а затем — цвет, размер и стикер.
            <br />А мы перенесём стикер на вещь как на фото
          </Typography.Text>
          {yourDesignProducts.map((product) => (
            <CustomProductContainer block={product} key={product.id} />
          ))}
          <Typography.Text
            tag="p"
            className={s.description}
            view="primary-large"
            weight="medium"
          >
            Посмотреть и потрогать все стикеры можно в A-Store на Технопарке. А
            ещё там можно добавить сразу несколько стикеров на одну вещь.
          </Typography.Text>
        </>
      )}
    </Page>
  );
};
