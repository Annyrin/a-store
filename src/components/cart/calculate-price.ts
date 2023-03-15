import { CartProducts } from "../../types/cart-products";

export const calculatePrice = (product: CartProducts) => {
  return product.cart.reduce((price, el) => (price += el.price * el.amount), 0);
};
