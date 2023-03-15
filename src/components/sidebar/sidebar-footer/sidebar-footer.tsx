import { SidePanelResponsive } from "@alfalab/core-components/side-panel/responsive";
import { Space } from "@alfalab/core-components/space";
import { Typography } from "@alfalab/core-components/typography";
import WhatsappMIcon from "@alfalab/icons-logotype/WhatsappMIcon";
import MailMIcon from "@alfalab/icons-rocky/MailMIcon";
import PhoneMIcon from "@alfalab/icons-rocky/PhoneMIcon";
import { FC } from "react";
import { Link } from "react-router-dom";
import s from "./sidebar-footer.module.css";

export const SidebarFooter: FC = () => {
  return (
    <SidePanelResponsive.Footer sticky={true}>
      <Space fullWidth={true}>
        <Typography.Text view="primary-small" weight="bold">
          <Link className={s.footer} to="/policy">
            Политика конфиденциальности и обработки персональных данных
          </Link>
        </Typography.Text>
        <div className="burger-menu__footer">
          <Space direction="horizontal" className={s.footer}>
            <Link
              target="_blank"
              to="mailto:info@alfabankstore.ru"
              className={s.footer}
            >
              <MailMIcon />
            </Link>
            <Link target="_blank" to="tel:+79060616020" className={s.footer}>
              <PhoneMIcon />
            </Link>
            <Link
              target="_blank"
              to="https://wa.me/79060616020"
              className={s.footer}
            >
              <WhatsappMIcon />
            </Link>
          </Space>
        </div>
      </Space>
    </SidePanelResponsive.Footer>
  );
};
