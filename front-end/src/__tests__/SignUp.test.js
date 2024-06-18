import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";

import EN from "../localization/localization-EN";
import SignUp from "../Components/SignUp";
import { signupCustomer } from "../api/CustomerApi";

jest.mock("../api/CustomerApi");

describe("<SignUp>", () => {
  const borderStyleOnInvalidInput = "border: 1px solid #ff4444";
  const testProps = {
    t: (key) => EN[key] || key,
  };

  test("renders email and password form", () => {
    render(
      <Router>
        <SignUp {...testProps} />
      </Router>
    );
    expect(screen.getByLabelText(EN.email)).toBeInTheDocument();
    expect(screen.getByLabelText(EN.password)).toBeInTheDocument();
    expect(screen.getByText(EN.signupFormTitle)).toBeInTheDocument();
  });

  test("validates email and password inputs", () => {
    render(
      <Router>
        <SignUp {...testProps} />
      </Router>
    );

    fireEvent.click(screen.getByText(EN.continueBtnName));

    expect(screen.getByLabelText(EN.email)).toHaveStyle(
      borderStyleOnInvalidInput
    );
    expect(screen.getByLabelText(EN.password)).toHaveStyle(
      borderStyleOnInvalidInput
    );
  });

  test("navigates to name and surname form on valid email and password", () => {
    render(
      <Router>
        <SignUp {...testProps} />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(EN.email), {
      target: { value: "mert@mert.com" },
    });
    fireEvent.change(screen.getByLabelText(EN.password), {
      target: { value: "Valid_password12" },
    });
    fireEvent.click(screen.getByText(EN.continueBtnName));

    expect(screen.getByLabelText(EN.name)).toBeInTheDocument();
    expect(screen.getByLabelText(EN.surname)).toBeInTheDocument();
  });

  test("validates name, surname and birthday inputs", () => {
    render(
      <Router>
        <SignUp {...testProps} />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(EN.email), {
      target: { value: "mert@mert.com" },
    });
    fireEvent.change(screen.getByLabelText(EN.password), {
      target: { value: "Valid_password12" },
    });
    fireEvent.click(screen.getByText(EN.continueBtnName));
    fireEvent.click(screen.getByText(EN.continueBtnName));

    expect(screen.getByLabelText(EN.name)).toHaveStyle(
      borderStyleOnInvalidInput
    );
    expect(screen.getByLabelText(EN.surname)).toHaveStyle(
      borderStyleOnInvalidInput
    );
    expect(screen.getByLabelText(EN.birthday)).toHaveStyle(
      borderStyleOnInvalidInput
    );
  });

  test("submits the form successfully", async () => {
    signupCustomer.mockResolvedValue({ isSuccess: true });

    render(
      <Router>
        <SignUp {...testProps} />
      </Router>
    );

    // Step 1: Fill out email and password form
    fireEvent.change(screen.getByLabelText(EN.email), {
      target: { value: "mert@mert.com" },
    });
    fireEvent.change(screen.getByLabelText(EN.password), {
      target: { value: "Valid_password12" },
    });
    fireEvent.click(screen.getByText(EN.continueBtnName));

    // Step 2: Fill out name, surname and birthday form
    fireEvent.change(screen.getByLabelText(EN.name), {
      target: { value: "Mert" },
    });
    fireEvent.change(screen.getByLabelText(EN.surname), {
      target: { value: "Kilicaslan" },
    });
    fireEvent.change(screen.getByLabelText(EN.birthday), {
      target: { value: "2000-01-01" },
    });
    fireEvent.click(screen.getByText(EN.continueBtnName));

    // Step 3: Fill out TC and phone form
    fireEvent.change(screen.getByLabelText(EN.tcNo), {
      target: { value: "96314258176" },
    });
    fireEvent.change(screen.getByLabelText(EN.phoneNo), {
      target: { value: "123-456-7890" },
    });

    fireEvent.click(screen.getByLabelText(EN.termsConditions));
    fireEvent.click(screen.getByText(EN.readAndApproveBtnName));

    fireEvent.click(screen.getByText(EN.signupBtnName));

    await waitFor(() => {
      expect(screen.getByText(EN.signupSuccessMessage)).toBeInTheDocument();
      expect(screen.getByText(EN.signupThankYouMessage)).toBeInTheDocument();
    });
  });
});
