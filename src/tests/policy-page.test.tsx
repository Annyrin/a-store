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
  it("should render contacts", async () => {
    renderWithState(
      <MemoryRouter initialEntries={["/policy"]}>
        <Routes>
          <Route path="/policy" element={<Policy />} />
        </Routes>
      </MemoryRouter>
    );
    expect(await screen.findByText(/Общие положения/i)).toBeInTheDocument();
    expect(
      await screen.findByText(
        /Порядок сбора, хранения, передачи и других видов обработки персональных данных/i
      )
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Заключительные положения/i)
    ).toBeInTheDocument();
  });

  it("Should change page to MainPage", async () => {
    renderWithState(
      <MemoryRouter initialEntries={["/policy"]}>
        <Routes>
          <Route path="/policy" element={<Policy />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByTestId("to-main-page")).toBeInTheDocument();
    userEvent.click(screen.getByTestId("to-main-page"));
    expect(await screen.findByText(/Сделано в альфе/i)).toBeInTheDocument();
  });
});
