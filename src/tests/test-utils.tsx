import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { cartReducer } from "../store/cart/cart-slice";
import { madeInAlfaReducer } from "../store/made-in-alfa/made-in-alfa-slice";
import { orderReducer } from "../store/order/order-slice";
import { productReducer } from "../store/product/product-slice";
import store from "../store/store";
import { yourDesignReducer } from "../store/your-design/your-design-slice";

export const renderWithState = (component: JSX.Element) => {
  render(<Provider store={store}>{component}</Provider>);
};

export function createTestStore() {
  const store = configureStore({
    reducer: combineReducers({
      madeInAlfa: madeInAlfaReducer,
      yourDesign: yourDesignReducer,
      product: productReducer,
      cartProduct: cartReducer,
      order: orderReducer,
    }),
  });
  return store;
}
