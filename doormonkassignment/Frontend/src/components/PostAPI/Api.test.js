import axios from "axios";
import { postData } from "./postData";

jest.mock("axios");

describe("postData function", () => {
  it("Posts data successfully", async () => {
    // Mock the axios post method to return a successful response
    axios.post.mockResolvedValueOnce({
      data: { message: "Data posted successfully" },
    });

    // Define sample student data
    const studentData = {
      firstName: "sanjay",
      lastName: "Doshi",
      email: "doshisanju@egmail.com",
      phoneNumber: "1234567890",
      institutionName: "abc University",
      passOutYear: 2022,
      cgpiScore: 8.5,
    };

    // Call the postData function
    const response = await postData(studentData);

    // Check if the axios post method was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/students",
      studentData
    );

    // Check if the function returns the expected response
    expect(response).toEqual({ message: "Data posted successfully" });
  });

  it("Throws an error when posting data fails", async () => {
    // Mock the axios post method to throw an error
    axios.post.mockRejectedValueOnce(new Error("Failed to post data"));

    // Define sample student data
    const studentData = {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      institutionName: "Example University",
      passOutYear: 2022,
      cgpiScore: 8.5,
    };

    // Call the postData function and expect it to throw an error
    await expect(postData(studentData)).rejects.toThrow("Failed to post data");

    // Check if the axios post method was called with the correct arguments
    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/students",
      studentData
    );
  });
});
