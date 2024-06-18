import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import EN from "../localization/localization-EN";
import MiniProfile from "../Components/MiniProfile";

describe("<MiniProfile>", () => {
  const testProps = {
    t: (key) => EN[key] || key,
    userInformation: {
      phoneNo: "123-456-7890",
      tcNo: "12345678901",
      birthday: "2000-01-01",
      harvestCard: "true",
    },
  };

  test("renders the profile information heading", () => {
    const { getByText } = render(<MiniProfile {...testProps} />);
    expect(getByText(EN.myProfileInformation)).toBeInTheDocument();
  });

  test("renders the phone number", () => {
    const { getByText } = render(<MiniProfile {...testProps} />);
    expect(getByText(EN.phoneNo + ":")).toBeInTheDocument();
    expect(getByText(testProps.userInformation.phoneNo)).toBeInTheDocument();
  });

  test("renders the TC NO", () => {
    const { getByText } = render(<MiniProfile {...testProps} />);
    expect(getByText(EN.tcNo + ":")).toBeInTheDocument();
    expect(getByText(testProps.userInformation.tcNo)).toBeInTheDocument();
  });

  test("renders the birthday", () => {
    const { getByText } = render(<MiniProfile {...testProps} />);
    expect(getByText(EN.birthday + ":")).toBeInTheDocument();
    expect(getByText(testProps.userInformation.birthday)).toBeInTheDocument();
  });

  test("renders the harvest card ownership (true)", () => {
    const { getByText } = render(<MiniProfile {...testProps} />);
    expect(getByText(EN.harvestCard)).toBeInTheDocument();
    expect(getByText("'a sahipsiniz.")).toBeInTheDocument();
  });

  test("renders the harvest card ownership (false)", () => {
    const testPropsWithHarvestCardFalse = {
      ...testProps,
    };
    testPropsWithHarvestCardFalse.userInformation.harvestCard = "false";

    const { getByText } = render(
      <MiniProfile {...testPropsWithHarvestCardFalse} />
    );
    expect(getByText(EN.harvestCard)).toBeInTheDocument();
    expect(getByText("'a sahip değilsiniz.")).toBeInTheDocument();
  });
});
