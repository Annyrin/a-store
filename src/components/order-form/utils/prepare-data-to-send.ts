import omit from "lodash/omit";
import { CartProduct, ProductPostRequest } from "../../../types/cart-products";

export const prepareDataToSend = (product: CartProduct): ProductPostRequest => {
  return {
    ...omit(product, ["productId", "title", "image", "price", "amount"]),
    totalPrice: product.amount * product.price,
    totalCount: product.amount,
  };
};
