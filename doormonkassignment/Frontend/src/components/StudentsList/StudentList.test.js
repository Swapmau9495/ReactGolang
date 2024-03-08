import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axiosMock from "axios";
import StudentList from "./StudentList";

describe("StudentList component", () => {
  it("renders the list of students", async () => {
    const students = [
      {
        id: 1,
        firstName: "sanjay",
        lastName: "Doshi",
        email: "doshisanjay.com",
        phoneNumber: "1234567890",
        educationalBackground: [
          {
            institutionName: "a1 University",
            passOutYear: 2020,
            cgpiScore: 8.5,
          },
          {
            institutionName: "y2 College",
            passOutYear: 2018,
            cgpiScore: 9.0,
          },
        ],
      },
    ];

    axiosMock.get.mockResolvedValueOnce({ data: students });

    render(<StudentList />);

    // Wait for the students to be fetched and displayed
    await waitFor(() => {
      students.forEach((student) => {
        const studentName = screen.getByText(
          `${student.firstName} ${student.lastName}`
        );
        expect(studentName).toBeInTheDocument();

        const studentDetails = screen.getByText(
          `Email: ${student.email}, Phone: ${student.phoneNumber}, Educational Background: Institute: ${student.educationalBackground[0].institutionName}, Pass Out Year: ${student.educationalBackground[0].passOutYear}, CGPI: ${student.educationalBackground[0].cgpiScore}`
        );
        expect(studentDetails).toBeInTheDocument();
      });
    });
  });

  it("renders a message when no students are available", async () => {
    axiosMock.get.mockResolvedValueOnce({ data: [] });

    render(<StudentList />);

    // Wait for the message to be rendered
    await waitFor(() => {
      const message = screen.getByText("No student Registered yet");
      expect(message).toBeInTheDocument();
    });
  });

  it("handles error when fetching students fails", async () => {
    const errorMessage = "Failed to fetch students";
    axiosMock.get.mockRejectedValueOnce({ message: errorMessage });

    render(<StudentList />);

    // Wait for the error message to be rendered
    await waitFor(() => {
      const error = screen.getByText(errorMessage);
      expect(error).toBeInTheDocument();
    });
  });
});
