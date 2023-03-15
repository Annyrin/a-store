import { FC } from "react";
import { Page } from "../../components/page";
import { MainPageLink } from "../../components/main-page-link";
import s from "./main-page.module.css";

export const MainPage: FC = () => {
  return (
    <Page isMainPage>
      <div className={s.root}>
        <MainPageLink
          link={"/sdelano-v-alfe"}
          text={"Сделано в альфе"}
          imgSrc={"/assets/Frame_46.jpeg"}
          imgAlt={"Модель с брендовым рюкзаком Альфа Банка"}
          data-testid="to-made-in-alfa"
        />
        <MainPageLink
          link={"/svoy-dizain"}
          text={"Свой дизайн"}
          imgSrc={"/assets/Frame_45.jpeg"}
          imgAlt={"Модель в брендовой футболке Альфа Банка"}
          data-testid="to-your-design"
        />
      </div>
    </Page>
  );
};
