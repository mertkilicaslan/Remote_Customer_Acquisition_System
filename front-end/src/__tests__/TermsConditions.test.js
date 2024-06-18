import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import EN from "../localization/localization-EN";
import TermsConditions from "../Components/TermsConditions";

describe("<TermsConditions>", () => {
  const testProps = {
    t: (key) => EN[key] || key,
    showPopup: true,
    setShowPopup: jest.fn(),
    setTermsConfirm: jest.fn(),
  };

  test("renders terms conditions text when showPopup is true", () => {
    render(<TermsConditions {...testProps} />);

    expect(screen.getByText(EN.termsConditionsPopupTitle)).toBeInTheDocument();
    expect(screen.getByText(EN.readAndApproveBtnName)).toBeInTheDocument();
  });

  test("does not render terms conditions text when showPopup is false", () => {
    render(<TermsConditions {...testProps} showPopup={false} />);

    expect(
      screen.queryByText(EN.termsConditionsPopupTitle)
    ).not.toBeInTheDocument();
  });

  test("closes popup without confirmation when close button is clicked", () => {
    render(<TermsConditions {...testProps} />);

    fireEvent.click(screen.getByText("✖"));

    expect(testProps.setShowPopup).toHaveBeenCalledWith(false);
    expect(testProps.setTermsConfirm).toHaveBeenCalledWith(false);
  });

  test("closes popup with confirmation when read and approve button is clicked", () => {
    render(<TermsConditions {...testProps} />);

    fireEvent.click(screen.getByText(EN.readAndApproveBtnName));

    expect(testProps.setShowPopup).toHaveBeenCalledWith(false);
    expect(testProps.setTermsConfirm).toHaveBeenCalledWith(true);
  });
});
