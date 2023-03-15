import { SidePanelResponsive } from "@alfalab/core-components/side-panel/Component.responsive";
import { Space } from "@alfalab/core-components/space";
import { FC } from "react";
import { Link } from "react-router-dom";
import s from "./sidebar-links.module.css";

export const SidebarLinks: FC = () => {
  return (
    <SidePanelResponsive.Content className={s.mobile}>
      <Space size={32} fullWidth={true}>
        <Link to="/sdelano-v-alfe" className={s.text}>
          Сделано в Альфе
        </Link>

        <Link to="/svoy-dizain" className={s.text}>
          Свой дизайн
        </Link>

        <Link to="/contact-us" className={s.text}>
          Контакты
        </Link>
      </Space>
    </SidePanelResponsive.Content>
  );
};
