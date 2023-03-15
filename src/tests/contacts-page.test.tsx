import { MemoryRouter, Route, Routes } from "react-router-dom";
import { screen } from "@testing-library/react";
import { Contacts } from "../pages/contacts";
import { MainPage } from "../pages/main-page";
import userEvent from "@testing-library/user-event";
import { renderWithState } from "./test-utils";
import { Policy } from "../pages/policy";

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

describe("Contacts page tests", () => {
  it("Should render contacts", async () => {
    renderWithState(
      <MemoryRouter initialEntries={["/contact-us"]}>
        <Routes>
          <Route path="/contact-us" element={<Contacts />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText("+7 906 061 60 20")).toBeInTheDocument();
    expect(
      await screen.findByText(/info@alfabankstore.ru/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/г. Москва, пр-т Андропова, 18 корп. 3/i)
    ).toBeInTheDocument();
  });
});

describe("contacts page navigation tests", () => {
  it("Should change page to MainPage", async () => {
    renderWithState(
      <MemoryRouter initialEntries={["/contact-us"]}>
        <Routes>
          <Route path="/contact-us" element={<Contacts />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByTestId("to-main-page")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("to-main-page"));
    expect(await screen.findByText(/Сделано в альфе/i)).toBeInTheDocument();
  });

  it("Should change page to PolicyPage", async () => {
    renderWithState(
      <MemoryRouter initialEntries={["/contact-us"]}>
        <Routes>
          <Route path="/contact-us" element={<Contacts />} />
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </MemoryRouter>
    );

    userEvent.click(
      screen.getByText(
        /Политика конфиденциальностии обработки персональных данных/i
      )
    );
    expect(
      await screen.findByText(
        /Политика в отношении обработки персональных данных/i
      )
    ).toBeInTheDocument();
  });
});
