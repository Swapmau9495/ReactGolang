import React from "react";
import { render } from "@testing-library/react";
import SuccessMessage from "./SuccessMessage";

describe("SuccessMessage component", () => {
  it('should render "Registration Failed" message if isError is true', () => {
    const { getByText } = render(<SuccessMessage isError={true} />);
    const errorMessage = getByText("Registration Failed");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render success message if isError is false", () => {
    const { getByText } = render(<SuccessMessage isError={false} />);
    const successMessage = getByText("Form submitted successfully!");
    expect(successMessage).toBeInTheDocument();
    const thankYouMessage = getByText("Thank you for Registration!");
    expect(thankYouMessage).toBeInTheDocument();
  });
});
