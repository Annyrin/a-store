import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Gallery } from "../components/gallery";
import { customProducts } from "./mocks/get-product-200.json";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Gallery render", () => {
  it("Should render images", async () => {
    render(<Gallery product={customProducts[0]} />, { wrapper: BrowserRouter });
    expect(
      screen.getByTestId(
        "http://qa-games.ru/astore/public/images/43306375.jpeg"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("http://qa-games.ru/astore/public/images/25133982.png")
    ).toBeInTheDocument();
  });

  it("Should render mainImage", async () => {
    render(<Gallery product={customProducts[0]} />, { wrapper: BrowserRouter });
    userEvent.click(
      screen.getByTestId("http://qa-games.ru/astore/public/images/25133982.png")
    );

    expect(
      await screen.findByAltText("Изображение товара")
    ).toBeInTheDocument();
  });
});
