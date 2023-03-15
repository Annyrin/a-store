import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { ProductItem } from "../components/product-item";
import { ProductList } from "../components/product-list";
import { products } from "./mocks/get-product-200.json";
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

describe("ProductItem tests", () => {
  it("renders product title", async () => {
    const item = products[0];
    render(<ProductItem product={item} />, { wrapper: BrowserRouter });
    expect(screen.getByText(item.title)).toBeInTheDocument();
  });

  it("renders Product price", async () => {
    const item = products[0];
    render(<ProductItem product={item} />, { wrapper: BrowserRouter });
    expect(screen.getByText(/4999₽/i)).toBeInTheDocument();
  });

  it("renders alt msg if image loading failed", async () => {
    const item = products[0];
    item.preview = "";
    render(<ProductItem product={item} />, { wrapper: BrowserRouter });
    expect(screen.getByAltText(item.title)).toBeInTheDocument();
  });

  it("renders ProductList", async () => {
    render(<ProductList customProduct={products} />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByTestId("product-list"));
  });

  it("renders Product subtitle", async () => {
    const customItem = customProducts[0];
    render(<ProductItem product={customItem} />, { wrapper: BrowserRouter });
    expect(screen.getByText(customItem.subtitle)).toBeInTheDocument();
  });
});
