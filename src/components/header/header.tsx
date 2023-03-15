import { Typography } from "@alfalab/core-components/typography";
import { FC, useState } from "react";
import s from "./header.module.css";
import { Link } from "react-router-dom";
import BurgerMIcon from "@alfalab/icons-glyph/BurgerMIcon";
import { Link as LinkAlfa } from "@alfalab/core-components/link";
import { Sidebar } from "../sidebar";
import { Grid } from "@alfalab/core-components/grid";

export const Header: FC = () => {
  const [open, setOpen] = useState(false);
  const handleModalOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <header>
        <Grid.Row align="middle" justify="between">
          <Grid.Col width="auto">
            <Typography.Text view="primary-large">
              <Link
                rel="noopener"
                to="/"
                className={s.logo}
                data-testid="to-main-page"
              >
                A-Store
              </Link>
            </Typography.Text>
          </Grid.Col>
          <Grid.Col width="auto">
            <Typography.Text>
              <LinkAlfa
                underline={false}
                leftAddons={<BurgerMIcon width={30} height={30} />}
                onClick={handleModalOpen}
              >
                <div className={s.text}>меню</div>
              </LinkAlfa>
            </Typography.Text>
          </Grid.Col>
        </Grid.Row>
      </header>
      <Sidebar open={open} handleModalOpen={handleModalOpen} />
    </>
  );
};
