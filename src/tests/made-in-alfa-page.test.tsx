import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { MadeInAlfa } from "../pages/made-in-alfa";
import { MainPage } from "../pages/main-page";
import { ProductPage } from "../pages/product-page";
import { renderWithState } from "./test-utils";
import { products } from "./mocks/get-made-in-alfa-products-200.json";
import customProduct from "./mocks/get-product-200.json";
import { fetchMadeInAlfaProducts, fetchSpecificProduct } from "../api/request";
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
  fetchMadeInAlfaProducts: jest.fn(),
  fetchSpecificProduct: jest.fn(),
}));

describe("MadeInAlfa", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render products", async () => {
    jest
      .mocked(fetchMadeInAlfaProducts)
      .mockResolvedValue({ data: products, status: 200 } as AxiosResponse);
    renderWithState(
      <BrowserRouter>
        <MadeInAlfa />
      </BrowserRouter>
    );

    expect(
      await screen.findByText(/Рюкзак «Для умных и свободных»/i)
    ).toBeInTheDocument();
  });

  it("Sidebar on MadeInAlfa test", async () => {
    jest
      .mocked(fetchMadeInAlfaProducts)
      .mockResolvedValue({ data: products, status: 200 } as AxiosResponse);
    renderWithState(
      <BrowserRouter>
        <MadeInAlfa />
      </BrowserRouter>
    );
    expect(screen.getByText(/Сделано в Альфе/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/меню/i));
    expect(await screen.findByText(/Контакты/i)).toBeInTheDocument();
  });

  it("Should change page to MainPage", async () => {
    jest
      .mocked(fetchMadeInAlfaProducts)
      .mockResolvedValue({ data: products, status: 200 } as AxiosResponse);
    renderWithState(
      <MemoryRouter initialEntries={["/sdelano-v-alfe"]}>
        <Routes>
          <Route path="/sdelano-v-alfe" element={<MadeInAlfa />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Сделано в Альфе/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId("to-main-page"));
    expect(await screen.findByText(/Свой дизайн/i)).toBeInTheDocument();
  });

  it("Should change page to ProductPage", async () => {
    jest
      .mocked(fetchMadeInAlfaProducts)
      .mockResolvedValue({ data: products, status: 200 } as AxiosResponse);

    jest.mocked(fetchSpecificProduct).mockResolvedValue({
      data: customProduct.products[0],
      status: 200,
    } as AxiosResponse);

    renderWithState(
      <MemoryRouter initialEntries={["/sdelano-v-alfe"]}>
        <Routes>
          <Route path="/sdelano-v-alfe" element={<MadeInAlfa />} />
          <Route path="/product-page/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(
        /Хотим каждую из этих вещей! Себе, родным и друзьям/i
      )
    ).toBeInTheDocument();
    userEvent.click(screen.getByText(/Рюкзак «Для умных и свободных»/i));
    expect(
      await screen.findByText(
        /Поместится и ноутбук, и худи. У рюкзака широкие красные лямки и светоотражающие элементы — вас заметят и днём, и ночью./i
      )
    ).toBeInTheDocument();
  });
});
