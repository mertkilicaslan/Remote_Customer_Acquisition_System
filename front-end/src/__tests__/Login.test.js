import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import EN from "../localization/localization-EN";
import Login from "../Components/Login";
import { loginCustomer } from "../api/CustomerApi";

jest.mock("../api/CustomerApi");

describe("<Login>", () => {
  const testProps = {
    t: (key) => EN[key] || key,
  };

  test("renders login form", () => {
    render(<Login {...testProps} />);
    expect(screen.getByLabelText(EN.email)).toBeInTheDocument();
    expect(screen.getByLabelText(EN.password)).toBeInTheDocument();
    expect(screen.getByText(EN.loginFormTitle)).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(<Login {...testProps} />);
    const emailInput = screen.getByLabelText(EN.email);
    const passwordInput = screen.getByLabelText(EN.password);

    fireEvent.change(emailInput, { target: { value: "mert@mert.com" } });
    fireEvent.change(passwordInput, { target: { value: "Valid_password12" } });

    expect(emailInput.value).toBe("mert@mert.com");
    expect(passwordInput.value).toBe("Valid_password12");
  });

  test("shows error message on login failure", async () => {
    loginCustomer.mockRejectedValue(new Error("Login failed"));
    render(<Login {...testProps} />);

    fireEvent.change(screen.getByLabelText(EN.email), {
      target: { value: "mert@mert.com" },
    });
    fireEvent.change(screen.getByLabelText(EN.password), {
      target: { value: "Valid_password12" },
    });
    fireEvent.click(screen.getByText(EN.loginBtnName));

    expect(await screen.findByText(EN.loginFailMessage)).toBeInTheDocument();
  });

  test("calls loginCustomer API on form submit", async () => {
    const mockData = { isSuccess: true, name: "Mert", surname: "Kilicaslan" };
    loginCustomer.mockResolvedValue(mockData);

    render(<Login {...testProps} />);

    fireEvent.change(screen.getByLabelText(EN.email), {
      target: { value: "mert@mert.com" },
    });
    fireEvent.change(screen.getByLabelText(EN.password), {
      target: { value: "Valid_password12" },
    });
    fireEvent.click(screen.getByText(EN.loginBtnName));

    expect(loginCustomer).toHaveBeenCalledWith({
      email: "mert@mert.com",
      password: "Valid_password12",
    });

    expect(await screen.findByText("Mert Kilicaslan")).toBeInTheDocument();
    expect(screen.queryByText(EN.loginFormTitle)).not.toBeInTheDocument();
  });

  test("renders Assets and MiniProfile components on successful login", async () => {
    const mockData = { isSuccess: true, name: "Mert", surname: "Kilicaslan" };
    loginCustomer.mockResolvedValue(mockData);

    render(<Login {...testProps} />);

    fireEvent.change(screen.getByLabelText(EN.email), {
      target: { value: "mert@mert.com" },
    });
    fireEvent.change(screen.getByLabelText(EN.password), {
      target: { value: "Valid_password12" },
    });
    fireEvent.click(screen.getByText(EN.loginBtnName));

    expect(await screen.findByText("Mert Kilicaslan")).toBeInTheDocument();
    fireEvent.click(screen.getByAltText("profile icon"));

    expect(screen.getByText(/Welcome Mert Kilicaslan/i)).toBeInTheDocument();
    expect(screen.getByText(EN.myProfileInformation)).toBeInTheDocument();
  });
});
