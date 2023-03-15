import { useMemo } from "react";
import { CustomProducts } from "../types/products";

interface Option {
  key: string;
  name: string;
  content: string | number;
}

const params: Array<{ name: keyof CustomProducts; placeholder: string }> = [
  { name: "sizes", placeholder: "Выберите размер" },
  { name: "colors", placeholder: "Выберите цвет" },
  { name: "models", placeholder: "Выберите модель" },
  { name: "stickerNumbers", placeholder: "Выберите стикер" },
];

export const useProductFields = (product: CustomProducts) => {
  return useMemo(() => {
    const result: Array<{
      name: string;
      placeholder: string;
      options: Option[];
    }> = [];
    const productKeys = Object.keys(product);
    const existingFields = params.filter((param) =>
      productKeys.includes(param.name)
    );

    existingFields.forEach((field) => {
      result.push({
        name: field.name,
        placeholder: field.placeholder,
        options: (product[field.name] as string[]).map((property) => ({
          key: property,
          name: field.name,
          content: property,
        })),
      });
    });

    return result;
  }, [product]);
};
