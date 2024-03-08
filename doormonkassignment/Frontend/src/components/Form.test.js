import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form";

describe("Form component", () => {
  it("renders the form with all fields", () => {
    render(<Form />);

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Add Educational Background")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("displays validation errors when form is submitted with invalid data", async () => {
    render(<Form />);

    fireEvent.click(screen.getByText("Submit"));

    expect(
      await screen.findByText("First Name is a required field")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Last Name is a required field")
    ).toBeInTheDocument();
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(
      await screen.findByText("Phone Number is required")
    ).toBeInTheDocument();
    // Add more validation error checks for educational background fields if needed
  });

  it("adds and removes dynamic educational background fields", () => {
    render(<Form />);

    // Initial count of dynamic fields
    expect(screen.getAllByLabelText("Institution Name")).toHaveLength(1);
    expect(screen.getAllByLabelText("Pass-out Year")).toHaveLength(1);
    expect(screen.getAllByLabelText("CGPI/Score")).toHaveLength(1);

    // Add a dynamic field
    fireEvent.click(screen.getByText("Add Educational Background"));
    expect(screen.getAllByLabelText("Institution Name")).toHaveLength(2);
    expect(screen.getAllByLabelText("Pass-out Year")).toHaveLength(2);
    expect(screen.getAllByLabelText("CGPI/Score")).toHaveLength(2);

    // Remove a dynamic field
    fireEvent.click(screen.getAllByRole("button", { name: "Remove" })[0]);
    expect(screen.getAllByLabelText("Institution Name")).toHaveLength(1);
    expect(screen.getAllByLabelText("Pass-out Year")).toHaveLength(1);
    expect(screen.getAllByLabelText("CGPI/Score")).toHaveLength(1);
  });

  // Add more test cases as needed
});
