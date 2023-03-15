import { FC } from "react";
import { Link } from "react-router-dom";
import s from "./main-page-link.module.css";

interface MainPageLinkProps {
  link: string;
  text: string;
  imgSrc: string;
  imgAlt: string;
}

export const MainPageLink: FC<MainPageLinkProps> = ({
  link,
  text,
  imgSrc,
  imgAlt,
}) => {
  return (
    <Link to={link} className={s.link}>
      <div className={s.text}>{text}</div>
      <img src={imgSrc} alt={imgAlt} className={s.image} />
    </Link>
  );
};
