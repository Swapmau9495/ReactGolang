import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "./Form.js";

describe("Form component", () => {
  it("renders correctly", () => {
    const { getByText, getByLabelText } = render(<Form />);

    expect(getByText("Student Registration Form")).toBeInTheDocument();
    expect(getByLabelText("First Name")).toBeInTheDocument();
    expect(getByLabelText("Last Name")).toBeInTheDocument();
    expect(getByLabelText("Email")).toBeInTheDocument();
    expect(getByLabelText("Phone Number")).toBeInTheDocument();
    expect(getByLabelText("Institution Name")).toBeInTheDocument();
    expect(getByLabelText("Pass-out Year")).toBeInTheDocument();
    expect(getByLabelText("CGPI/Score")).toBeInTheDocument();
    expect(getByText("Submit")).toBeInTheDocument();
  });

  it("submits form data", async () => {
    const setSubmitted = jest.fn();
    const setIsError = jest.fn();
    const { getByText, getByLabelText } = render(
      <Form setSubmitted={setSubmitted} setIsError={setIsError} />
    );

    fireEvent.change(getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(getByLabelText("Phone Number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(getByLabelText("Institution Name"), {
      target: { value: "Example University" },
    });
    fireEvent.change(getByLabelText("Pass-out Year"), {
      target: { value: "2022" },
    });
    fireEvent.change(getByLabelText("CGPI/Score"), {
      target: { value: "9.5" },
    });
    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(setSubmitted).toHaveBeenCalledWith(true);
      expect(setIsError).not.toHaveBeenCalled();
    });
  });
});
