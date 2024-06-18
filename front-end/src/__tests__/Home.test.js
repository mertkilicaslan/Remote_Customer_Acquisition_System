import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";

import EN from "../localization/localization-EN";
import Home from "../Components/Home";

describe("<Home>", () => {
  const t = (key) => EN[key] || key;

  test("renders the greetings message", () => {
    const { getByText } = render(
      <Router>
        <Home t={t} />
      </Router>
    );
    expect(getByText(EN.greetingsMessage)).toBeInTheDocument();
  });

  test("renders the login button with the correct text", () => {
    const { getByText } = render(
      <Router>
        <Home t={t} />
      </Router>
    );
    expect(getByText(EN.loginBtnName)).toBeInTheDocument();
  });

  test("renders the signup button with the correct text", () => {
    const { getByText } = render(
      <Router>
        <Home t={t} />
      </Router>
    );
    expect(getByText(EN.signupBtnName)).toBeInTheDocument();
  });
});
