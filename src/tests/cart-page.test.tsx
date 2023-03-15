import { fireEvent, render, screen } from "@testing-library/react";
import { createTestStore, renderWithState } from "./test-utils";
import { Provider } from "react-redux";
import { CartPage } from "../pages/cart-page";
import { MemoryRouter } from "react-router";
import { FullPrice } from "../components/full-price";
import userEvent from "@testing-library/user-event";
import { OrderForm } from "../components/order-form";
import { CartProduct } from "../types/cart-products";
import { postProduct } from "../api/request";
import { AxiosResponse } from "axios";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

let store: any;
describe("Order form tests", () => {
  beforeEach(() => {
    store = createTestStore();
  });

  it("Test OrderForm on CartPage", async () => {
    renderWithState(
      <MemoryRouter initialEntries={["/cart"]}>
        <CartPage />
      </MemoryRouter>
    );
    expect(await screen.findByText(/ФИО/i)).toBeInTheDocument();
    expect(
      await screen.findByPlaceholderText(/Фамилия Имя Отчество/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/E-mail/i)).toBeInTheDocument();
    expect(await screen.findByText(/Номер Телефона/i)).toBeInTheDocument();
    expect(await screen.findByText(/Адрес/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Выберите способ получения заказа/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Комментарий/i)).toBeInTheDocument();
    expect(await screen.findByText(/Перейти к оплате/i)).toBeInTheDocument();
  });

  it("Should display message of empty cart", async () => {
    renderWithState(
      <MemoryRouter initialEntries={["/cart"]}>
        <CartPage />
      </MemoryRouter>
    );
    expect(
      await screen.findByText(/Ваша корзина пуста, необходимо добавить товар/i)
    ).toBeInTheDocument();
  });
});

describe("Order form input test", () => {
  beforeEach(() => {
    store = createTestStore();
  });

  const setup: any = () => {
    const utils = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/cart"]}>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );
    const inputName = screen.getByPlaceholderText("Фамилия Имя Отчество");
    return {
      inputName,
      ...utils,
    };
  };

  it("Should change placeholder to user name", async () => {
    const { inputName } = setup();
    expect(inputName.value).toBe("");
    fireEvent.change(inputName, { target: { value: "Иванов Иван Иванович" } });
    expect(inputName.value).toBe("Иванов Иван Иванович");
  });
});

describe("Fullprice render", () => {
  it("Should render full price", async () => {
    renderWithState(<FullPrice price={555} />);
    expect(await screen.findByText(/905/i)).toBeInTheDocument();
  });
});

interface CartState {
  cart: CartProduct[];
}
const product: CartState = { cart: [] };

jest.mock("../api/request", () => ({
  postProduct: jest.fn(),
}));

describe("Notification tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Fail Notification pops up", async () => {
    jest
      .mocked(postProduct)
      .mockResolvedValue({ status: 400 } as AxiosResponse);
    renderWithState(
      <MemoryRouter initialEntries={["/cart"]}>
        <OrderForm price={250} product={product} />
      </MemoryRouter>
    );
    userEvent.click(await screen.findByText(/Перейти к оплате/i));
    expect(await screen.findByText("Что-то пошло не так")).toBeInTheDocument;
  });
});
