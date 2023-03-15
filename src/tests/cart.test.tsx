import { render, screen } from "@testing-library/react";
import { createTestStore, renderWithState } from "./test-utils";
import { Cart } from "../components/cart";
import { CartItem } from "../components/cart/cart-item";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { product } from "./mocks/cart-product";
import { ProductPage } from "../pages/product-page";
import userEvent from "@testing-library/user-event";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Cart tests", () => {
  it("Displays amount of products on CartIcon", async () => {
    renderWithState(<Cart amount={11} />);
    expect(await screen.findByText(/11/i)).toBeInTheDocument();
  });

  it("Displays product in Cart", async () => {
    renderWithState(<CartItem product={product} />);
    expect(
      await screen.findByText(/Чехол с кардхолдером/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/3/i)).toBeInTheDocument();
    expect(await screen.findByText(/799/i)).toBeInTheDocument();
  });
});

let store: any;
describe("Cart action", () => {
  beforeEach(() => {
    store = createTestStore();
  });

  it("Add to cart action test", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/product-page/0"]}>
          <Routes>
            <Route path="/product-page/:id" element={<ProductPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    userEvent.click(await screen.findByText(/В корзину/i));
    expect(await screen.findByTestId(/cart-icon/i)).toBeInTheDocument();
  });
});
