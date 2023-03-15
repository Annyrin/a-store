import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/main-page";
import { ProductPage } from "../pages/product-page";
import products from "./mocks/get-product-200.json";
import { renderWithState } from "./test-utils";
import { ProductDetails } from "../components/product-details";
import { fetchSpecificProduct } from "../api/request";
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

jest.mock("../api/request", () => ({
  fetchSpecificProduct: jest.fn(),
}));

describe("ProductPage render", () => {
  it("Should render Gallery", async () => {
    jest.mocked(fetchSpecificProduct).mockResolvedValue({
      data: products.customProducts[0],
      status: 200,
    } as AxiosResponse);

    renderWithState(
      <MemoryRouter initialEntries={["/product-page/5"]}>
        <Routes>
          <Route path="/product-page/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(
        screen.getByTestId(
          "http://qa-games.ru/astore/public/images/43306375.jpeg"
        )
      ).toBeInTheDocument()
    );
  });

  it("Should render ProductDescription", async () => {
    renderWithState(
      <BrowserRouter>
        <ProductDetails product={products.customProducts[0]} />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/Худи с бархатными стикерами/i)
    ).toBeInTheDocument();
  });

  it("Button should be rendered and active if we have product in stock", async () => {
    renderWithState(
      <BrowserRouter>
        <ProductDetails product={products.customProducts[0]} />
      </BrowserRouter>
    );
    expect(screen.getByText(/В корзину/i)).toBeInTheDocument();
  });

  it("Button should be disabled if product is out of stock", async () => {
    renderWithState(
      <BrowserRouter>
        <ProductDetails product={products.products[3]} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Нет в наличии/i)).toBeInTheDocument(); //Поправить тест на то, что кнопка будет в дизейбле Чехол с кардхолдером
  });

  it("Check that Form is correct for specific item", async () => {
    renderWithState(
      <BrowserRouter>
        <ProductDetails product={products.products[3]} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Выберите модель/i)).toBeInTheDocument();
  });

  it("Simulates selection", async () => {
    renderWithState(
      <BrowserRouter>
        <ProductDetails product={products.customProducts[5]} />
      </BrowserRouter>
    );
    userEvent.click(screen.getByText(/Выберите размер/i));
    userEvent.click(screen.getByText(/XL/i));
    await waitFor(() =>
      expect(screen.queryByText(/Выберите размер/i)).not.toBeInTheDocument()
    ); // Проверяем что placeholder пропал и на его месте выбранный элемент
    expect(await screen.findByText(/XL/i)).toBeInTheDocument();
  });
});

describe("ProductPage clicks", () => {
  it("Should change page to MainPage", async () => {
    jest.mocked(fetchSpecificProduct).mockResolvedValue({
      data: products.customProducts[0],
      status: 200,
    } as AxiosResponse);
    renderWithState(
      <MemoryRouter initialEntries={["/product-page/5"]}>
        <Routes>
          <Route path="/product-page/:id" element={<ProductPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByTestId("to-main-page")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("to-main-page"));
    expect(await screen.findByText(/Сделано в альфе/i)).toBeInTheDocument();
  });
});
