import { Typography } from "@alfalab/core-components/typography";
import { FC } from "react";
import { Page } from "../../components/page";
import s from "./error-page.module.css";

export const ErrorPage: FC = () => {
  return (
    <Page>
      <Typography.Title
        tag="h1"
        view="xlarge"
        weight="bold"
        font="styrene"
        data-testid="on-page-made-in-alfa"
        className={s.title}
      >
        Ошибка, попробуйте обновить страницу или зайти позже, если данная
        проблема возникла снова, пожалуйста сообщите об этом нам
      </Typography.Title>
    </Page>
  );
};
