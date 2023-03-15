import { Order } from "../types/cart-products";
import HttpClient from "./service-helper";

export const fetchSpecificProduct = (id: string) => {
  return HttpClient.call("GET", `http://qa-games.ru/astore/product/${id}`);
};

export const fetchMadeInAlfaProducts = () => {
  return HttpClient.call("GET", "http://qa-games.ru/astore/made-in-alfa");
};

export const fetchDesignProducts = () => {
  return HttpClient.call("GET", "http://qa-games.ru/astore/your-design");
};

export const postProduct = (data: Order) => {
  return HttpClient.call(
    "POST",
    "http://qa-games.ru/astore/create-order",
    data
  );
};
