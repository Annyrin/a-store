export interface CartProduct {
  productId: string;
  id: number;
  title: string;
  image: string;
  price: number;
  amount: number;
  color?: string;
  size?: string;
  model?: string;
  stickerNumber?: number;
}

export interface CartProducts {
  cart: CartProduct[];
}

export type DeliveryType =
  | "Доставка по России — 350₽"
  | "Курьером по Москве — 300₽"
  | "Самовывоз (пр-т Андропова, 18 корп. 3)";

export interface ProductPostRequest {
  id: number;
  totalPrice: number;
  totalCount: number;
  sticketNumber?: number;
  color?: string;
  size?: string;
  model?: string;
}
export interface Order {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment?: string;
  deliveryType: DeliveryType;
  paymentType: "Банковская карта";
  products: ProductPostRequest[];
}
