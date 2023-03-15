import { Button } from "@alfalab/core-components/button";
import { FC, useState } from "react";
import { CustomProducts } from "../../types/products";
import { SelectResponsive } from "@alfalab/core-components/select/responsive";
import s from "./add-to-cart-form.module.css";
import { useProductFields } from "../../hooks/useProductFields";
import { BaseSelectChangePayload } from "@alfalab/core-components/select/typings";
import { useAppDispatch } from "../../store/store";
import { cartActions } from "../../store/cart/cart-slice";
import { createInitialState } from "./create-initial-state";

interface AddToCartFormProps {
  product: CustomProducts;
}

export const AddToCartForm: FC<AddToCartFormProps> = ({
  product,
}: AddToCartFormProps) => {
  const fields = useProductFields(product);

  const dispatch = useAppDispatch();

  const formInitialState = createInitialState(fields);

  const [selectedOptions, setSelectedOptions] = useState(formInitialState);

  const handleChange = ({ selected, name }: BaseSelectChangePayload) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [String(name)]: String(selected?.key),
    }));
  };

  const addToCart = () => {
    dispatch(
      cartActions.addToCart({
        id: product.id,
        title: product.title,
        image: product.preview,
        price: product.price,
        color: selectedOptions.colors,
        size: selectedOptions.sizes,
        model: selectedOptions.models,
        stickerNumber: selectedOptions.stickerNumbers,
      })
    );
  };

  return (
    <form className={s.container}>
      {fields.map(({ options, placeholder, name }, index) => (
        <SelectResponsive
          allowUnselect={false}
          key={index}
          name={name}
          size="m"
          block={true}
          options={options}
          placeholder={placeholder}
          multiple={false}
          onChange={handleChange}
          selected={selectedOptions.name}
        />
      ))}
      {product.availability ? (
        <Button
          view="primary"
          size="xs"
          className={s.button}
          onClick={addToCart}
        >
          В корзину
        </Button>
      ) : (
        <Button view="primary" size="xs" className={s.button} disabled={true}>
          Нет в наличии
        </Button>
      )}
    </form>
  );
};
