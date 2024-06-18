import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import EN from "../localization/localization-EN";
import Constants from "../utils/Constants";
import Assets from "../Components/Assets";

describe("<Assets>", () => {
  const testProps = {
    t: (key) => EN[key] || key,
    name: "Mert",
    surname: "Kilicaslan",
  };

  test("renders welcome message", () => {
    render(<Assets {...testProps} />);
    expect(screen.getByText(/Welcome Mert Kilicaslan/i)).toBeInTheDocument();
  });

  test("renders assets title", () => {
    render(<Assets {...testProps} />);
    expect(screen.getByText(/My Assets/i)).toBeInTheDocument();
  });

  test("renders debit card balance section", () => {
    render(<Assets {...testProps} />);
    expect(screen.getByText(/Debit Card/i)).toBeInTheDocument();
  });

  test("renders credit card balance section", () => {
    render(<Assets {...testProps} />);
    expect(screen.getByText(/Credit Card/i)).toBeInTheDocument();
  });

  test("increases and decreases bank balance", () => {
    render(<Assets {...testProps} />);
    const minusButton = screen.getAllByText(Constants.minusSign)[0];
    const plusButton = screen.getAllByText(Constants.plusSign)[0];
    const balanceElement = document.querySelectorAll(".balance")[0];

    const initialBalance = parseInt(
      balanceElement.textContent.split(",")[0],
      10
    );

    fireEvent.click(plusButton);
    expect(balanceElement).toHaveTextContent(
      `${initialBalance + 1},00 ${Constants.currencyTL}`
    );

    fireEvent.click(minusButton);
    fireEvent.click(minusButton);
    expect(balanceElement).toHaveTextContent(
      `${initialBalance - 1},00 ${Constants.currencyTL}`
    );
  });

  test("increases and decreases credit balance", () => {
    render(<Assets {...testProps} />);
    const minusButton = screen.getAllByText(Constants.minusSign)[1];
    const plusButton = screen.getAllByText(Constants.plusSign)[1];
    const balanceElement = document.querySelectorAll(".balance")[1];

    const initialBalance = parseInt(
      balanceElement.textContent.split(",")[0],
      10
    );

    fireEvent.click(plusButton);
    expect(balanceElement).toHaveTextContent(
      `${initialBalance + 1},00 ${Constants.currencyTL}`
    );

    fireEvent.click(minusButton);
    fireEvent.click(minusButton);
    expect(balanceElement).toHaveTextContent(
      `${initialBalance - 1},00 ${Constants.currencyTL}`
    );
  });
});
