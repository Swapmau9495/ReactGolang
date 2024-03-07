import React from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import StudentList from "./StudentList.js";

jest.mock("axios");

describe("StudentList component", () => {
  test("renders student list correctly", async () => {
    const mockStudents = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phoneNumber: "1234567890",
        institutionName: "ABC University",
        passOutYear: 2022,
        cgpiScore: 8.5,
      },
    ];

    axios.get.mockResolvedValueOnce({ data: mockStudents });

    render(<StudentList />);

    // Wait for axios to resolve and update the component
    const students = await screen.findAllByText(/John Doe/);
    expect(students).toHaveLength(1);
  });

  test("renders message when no students registered", async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<StudentList />);

    const noStudentMessage = await screen.findByText(
      "No student Registered yet"
    );
    expect(noStudentMessage).toBeInTheDocument();
  });
});
