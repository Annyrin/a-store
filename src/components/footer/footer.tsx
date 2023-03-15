import { FC } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@alfalab/core-components/typography";
import s from "./footer.module.css";
import cn from "classnames";

interface FooterProps {
  isMainPage?: boolean;
}

export const Footer: FC<FooterProps> = ({ isMainPage }) => {
  return (
    <footer className={cn(s.root, { [s.rootMain]: isMainPage })}>
      <Typography.Text
        view="primary-medium"
        className={cn(s.text, { [s.textFixed]: isMainPage })}
        weight="bold"
      >
        Ⓒ ООО «Альфа Фьюче Пипл», <time dateTime="2023">2023</time>
      </Typography.Text>
      {isMainPage && (
        <Link rel="noopener" to="/policy">
          <Typography.Text
            view="primary-medium"
            weight="bold"
            className={cn(s.text, s.policy, { [s.textFixed]: isMainPage })}
          >
            Политика конфиденциальности и обработки персональных данных
          </Typography.Text>
        </Link>
      )}
    </footer>
  );
};
