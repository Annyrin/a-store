import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";
import { MadeInAlfa } from "../pages/made-in-alfa";
import { MainPage } from "../pages/main-page";
import { YourDesignPage } from "../pages/your-design-page";
import { products } from "./mocks/get-made-in-alfa-products-200.json";
import { groups } from "./mocks/get-your-design-products-200.json";
import userEvent from "@testing-library/user-event";
import { renderWithState } from "./test-utils";
import { fetchDesignProducts, fetchMadeInAlfaProducts } from "../api/request";
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
  fetchDesignProducts: jest.fn(),
}));

describe("Navigation test on MainPage", () => {
  it("Should change page to YourDesignPage", async () => {
    jest
      .mocked(fetchDesignProducts)
      .mockResolvedValue({ data: groups, status: 200 } as AxiosResponse);
    renderWithState(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/svoy-dizain" element={<YourDesignPage />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Свой дизайн/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Свой дизайн/i));
    expect(await screen.findByText(/Бархатные стикеры/i)).toBeInTheDocument();
  });

  it("Should change page to MadeInAlfaPage", async () => {
    jest
      .mocked(fetchMadeInAlfaProducts)
      .mockResolvedValue({ data: products, status: 200 } as AxiosResponse);
    renderWithState(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/sdelano-v-alfe" element={<MadeInAlfa />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/Сделано в альфе/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Сделано в альфе/i));
    expect(
      await screen.findByText(
        /Хотим каждую из этих вещей! Себе, родным и друзьям/i
      )
    ).toBeInTheDocument();
  });

  it("Sidebar on MainPage test", async () => {
    renderWithState(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Свой дизайн/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/меню/i));
    expect(await screen.findByText(/Контакты/i)).toBeInTheDocument();
  });
});
