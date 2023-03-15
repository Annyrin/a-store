import { Gap } from "@alfalab/core-components/gap";
import { Typography } from "@alfalab/core-components/typography";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Page } from "../../components/page";
import s from "./contacts.module.css";

export const Contacts: FC = () => {
  return (
    <YMaps>
      <Page>
        <Typography.Title
          view="large"
          tag="h1"
          className={s.title}
          weight="bold"
        >
          Контакты
        </Typography.Title>
        <div className={s.wrapper}>
          <Typography.Text view="primary-medium" weight="bold" tag="p">
            +7 906 061 60 20
          </Typography.Text>
          <Typography.Text view="primary-medium" weight="bold" tag="p">
            info@alfabankstore.ru
          </Typography.Text>
          <Gap size="l" />
          <Typography.Text view="primary-medium" weight="bold" tag="p">
            г. Москва, пр-т Андропова, 18 корп. 3
          </Typography.Text>
          <Gap size="l" />
          <Typography.Text view="primary-medium" weight="bold" tag="p">
            пн-чт:
          </Typography.Text>
          <Typography.Text view="primary-medium" weight="bold" tag="p">
            10:00—19:00
          </Typography.Text>
          <Typography.Text view="primary-medium" weight="bold" tag="p">
            пт:
          </Typography.Text>
          <Typography.Text view="primary-medium" weight="bold" tag="p">
            10:00—17:30
          </Typography.Text>
          <Gap size="l" />
          <Typography.Text view="primary-medium" weight="bold" tag="p">
            Принимаем к оплате карты Visa, Mastercard, МИР.
          </Typography.Text>
          <Link to="/policy" className={s.link}>
            <Typography.Text view="primary-medium" weight="bold" tag="p">
              Политика конфиденциальностии обработки персональных данных
            </Typography.Text>
          </Link>
          <Gap size="xl" />
          <div className={s.mapwrap}>
            <Map
              className={s.yamap}
              defaultState={{
                center: [55.694459, 37.661994],
                zoom: 15,
              }}
            >
              <Placemark defaultGeometry={[55.694459, 37.661994]} />
            </Map>
          </div>
        </div>
      </Page>
    </YMaps>
  );
};
