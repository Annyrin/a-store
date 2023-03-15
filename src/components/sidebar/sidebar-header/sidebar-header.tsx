import { SidePanelResponsive } from "@alfalab/core-components/side-panel/Component.responsive";
import { FC } from "react";
import { Link } from "react-router-dom";
import s from "./sidebar-header.module.css";
import cn from "classnames";

export const SidebarHeader: FC = () => {
  return (
    <SidePanelResponsive.Header sticky={true} hasCloser={true}>
      <Link to="/" className={cn(s.text, s.logo)}>
        A-Store
      </Link>
    </SidePanelResponsive.Header>
  );
};
