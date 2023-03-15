import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Обязательное поле")
    .matches(
      /^[А-ЯЁ][а-яё]+(-[А-ЯЁ][а-яё]+)? [А-ЯЁ][а-яё]+( [А-ЯЁ][а-яё]+)?$/gi,
      "Введенное вами имя некорректно"
    ),
  email: yup
    .string()
    .required("Обязательное поле")
    .email("Укажите, пожалуйста, корректный email"),
  phone: yup
    .string()
    .required("Обязательное поле")
    .min(16, "Укажите, пожалуйста, корректный номер телефона"),
  address: yup.string(),
  comment: yup.string().max(99, "Превышен максимальный лимит символов"),
  isChecked: yup
    .boolean()
    .oneOf([true], "Необходимо ваше согласие")
    .required("Необходимо ваше согласие"),
});
