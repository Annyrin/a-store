import { FC, useCallback, useEffect, useState } from "react";
import { Gap } from "@alfalab/core-components/gap";
import { Input } from "@alfalab/core-components/input";
import { PhoneInput } from "@alfalab/core-components/phone-input";
import { Notification } from "@alfalab/core-components/notification";
import { Checkbox } from "@alfalab/core-components/checkbox";
import { RadioGroup } from "@alfalab/core-components/radio-group";
import { Radio } from "@alfalab/core-components/radio";
import { Textarea } from "@alfalab/core-components/textarea";
import { Button } from "@alfalab/core-components/button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import s from "./order-form.module.css";
import { CartProducts, Order } from "../../types/cart-products";
import { prepareDataToSend } from "./utils/prepare-data-to-send";
import { schema } from "./utils/schema";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { orderActions } from "../../store/order/order-slice";
import { postOrder } from "../../store/order/thunk";
import { orderStatus } from "../../store/order/selector";

interface OrderFormProps {
  price: number;
  product: CartProducts;
}

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  price: string;
  isChecked: boolean;
  paymentType: "Банковская карта";
  deliveryType: "Доставка по России — 350₽";
};

export const OrderForm: FC<OrderFormProps> = ({ price, product }) => {
  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      comment: "",
      price: "",
      isChecked: false,
      paymentType: "Банковская карта",
      deliveryType: "Доставка по России — 350₽",
    },
  });
  const dispatch = useAppDispatch();
  const requestStatus = useAppSelector(orderStatus);
  const [showNotification, setShowNotification] = useState(false);
  const hideNotification = useCallback(() => setShowNotification(false), []);

  useEffect(() => {
    const subscription = watch((value) =>
      dispatch(orderActions.setName(value))
    );
    return () => subscription.unsubscribe();
  }, [watch, dispatch]);

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    const data: Order = {
      ...formData,
      products: product.cart.map(prepareDataToSend),
    };
    dispatch(postOrder(data));
    setShowNotification(true);
  };

  return (
    <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        block={true}
        size="m"
        placeholder="Фамилия Имя Отчество"
        labelView="outer"
        label="ФИО"
        {...register("name")}
      />
      <p className={s.errorMessage}>{errors.name?.message}</p>
      <Gap size="m" />
      <Input
        type="text"
        block={true}
        size="m"
        placeholder="Example@alfalab.ru"
        labelView="outer"
        label="E-mail"
        {...register("email")}
      />
      <p className={s.errorMessage}>{errors.email?.message}</p>
      <Gap size="m" />
      <PhoneInput
        placeholder="+7 000 000-00-00"
        size="m"
        block={true}
        labelView="outer"
        label="Номер Телефона"
        {...register("phone")}
      />
      <p className={s.errorMessage}>{errors.phone?.message}</p>
      <Gap size="m" />
      <Input
        type="text"
        block={true}
        size="m"
        placeholder="Индекс, город, улица, дом, квартира"
        labelView="outer"
        label="Адрес (если вы выбрали самовывоз — оставьте поле пустым)"
        {...register("address")}
      />
      <p className={s.errorMessage}>{errors.address?.message}</p>
      <Gap size="m" />
      <Controller
        name="deliveryType"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <RadioGroup
            label="Выберите способ получения заказа"
            onChange={(e) => field.onChange(e)}
            className={s.radio}
          >
            <Radio
              label="Доставка по России — 350₽"
              value="Доставка по России — 350₽"
              size="s"
            />
            <Radio
              label="Курьером по Москве — 300₽"
              value="Курьером по Москве — 300₽"
              size="s"
            />
            <Radio
              label="Самовывоз (пр-т Андропова, 18 корп. 3)"
              value="Самовывоз (пр-т Андропова, 18 корп. 3)"
              size="s"
            />
          </RadioGroup>
        )}
      />
      <Gap size="m" />
      <Controller
        name="isChecked"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Checkbox
            block={true}
            size="s"
            className={s.checkbox}
            label="Согласен с политикой конфиденциальности и обработки персональных данных"
            checked={field.value}
            onChange={(event) => {
              field.onChange(event);
            }}
          />
        )}
      />
      <p className={s.errorMessage}>{errors.isChecked?.message}</p>
      <Gap size="m" />
      <Textarea
        block={true}
        label="Комментарий"
        placeholder="Здесь вы можете оставить свой комментарий к заказу"
        labelView="outer"
        minRows={2}
        {...register("comment")}
      />
      <p className={s.errorMessage}>{errors.comment?.message}</p>
      <Gap size="m" />
      <Button
        block={true}
        size="s"
        nowrap={true}
        type="submit"
        disabled={!price}
      >
        Перейти к оплате
      </Button>
      <Notification
        badge={requestStatus === "success" ? "positive" : "negative"}
        title="Статус заказа"
        visible={showNotification}
        offset={60}
        onClickOutside={hideNotification}
        onClose={hideNotification}
        onCloseTimeout={hideNotification}
      >
        {requestStatus === "success"
          ? "Ваш заказ успешно оформлен"
          : "Что-то пошло не так"}
      </Notification>
    </form>
  );
};
