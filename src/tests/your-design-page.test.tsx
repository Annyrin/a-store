import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../pages/main-page";
import { ProductPage } from "../pages/product-page";
import { YourDesignPage } from "../pages/your-design-page";
import { renderWithState } from "./test-utils";
import { groups } from "./mocks/get-your-design-products-200.json";
import { customProducts } from "./mocks/get-product-200.json";
import { fetchDesignProducts, fetchSpecificProduct } from "../api/request";
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
  fetchDesignProducts: jest.fn(),
  fetchSpecificProduct: jest.fn(),
}));

describe("YourDesignPage render", () => {
  it("Should render titles", async () => {
    jest
      .mocked(fetchDesignProducts)
      .mockResolvedValue({ data: groups, status: 200 } as AxiosResponse);
    renderWithState(
      <BrowserRouter>
        <YourDesignPage />
      </BrowserRouter>
    );

    expect(await screen.findByText(/Бархатные стикеры/i)).toBeInTheDocument();
    expect(await screen.findByText(/FLAT-стикеры/i)).toBeInTheDocument();
    expect(await screen.findByText(/3D-стикеры/i)).toBeInTheDocument();
  });

  it("Render products for each category", async () => {
    jest
      .mocked(fetchDesignProducts)
      .mockResolvedValue({ data: groups, status: 200 } as AxiosResponse);
    renderWithState(
      <BrowserRouter>
        <YourDesignPage />
      </BrowserRouter>
    );
    expect(
      await screen.findByText(/Худи с бархатными стикерами/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Худи с FLAT-стикерами/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Худи с 3D-стикерами/i)).toBeInTheDocument();
  });

  it("Should change page to MainPage", async () => {
    jest
      .mocked(fetchDesignProducts)
      .mockResolvedValue({ data: groups, status: 200 } as AxiosResponse);
    renderWithState(
      <MemoryRouter initialEntries={["/svoy-dizain"]}>
        <Routes>
          <Route path="/svoy-dizain" element={<YourDesignPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/FLAT-стикеры/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId("to-main-page"));
    expect(await screen.findByText(/Сделано в альфе/i)).toBeInTheDocument();
  });

  it("Should change page to ProductPage", async () => {
    jest
      .mocked(fetchDesignProducts)
      .mockResolvedValue({ data: groups, status: 200 } as AxiosResponse);
    jest.mocked(fetchSpecificProduct).mockResolvedValue({
      data: customProducts[0],
      status: 200,
    } as AxiosResponse);
    renderWithState(
      <MemoryRouter initialEntries={["/svoy-dizain"]}>
        <Routes>
          <Route path="/svoy-dizain" element={<YourDesignPage />} />
          <Route path="/product-page/:id" element={<ProductPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText(/FLAT-стикеры/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/Худи с бархатными стикерами/i));
    expect(
      await screen.findByText(
        /Выберите стикер, а мы перенесём его на ткань — как на фото. Одежду можно стирать в машинке при 30 °C, вывернув наизнанку. Гладить — с внутренней стороны./i
      )
    ).toBeInTheDocument();
  });

  it("Sidebar on YourDesignPage test", async () => {
    jest
      .mocked(fetchDesignProducts)
      .mockResolvedValue({ data: groups, status: 200 } as AxiosResponse);
    renderWithState(
      <BrowserRouter>
        <YourDesignPage />
      </BrowserRouter>
    );
    expect(screen.getByText(/Свой дизайн/i)).toBeInTheDocument();
    userEvent.click(screen.getByText(/меню/i));
    expect(await screen.findByText(/Контакты/i)).toBeInTheDocument();
  });
});
