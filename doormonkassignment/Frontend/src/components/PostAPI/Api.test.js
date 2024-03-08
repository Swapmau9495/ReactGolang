import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { postData } from "./api";

describe("postData function", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("should post student data to server", async () => {
    const student = {
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
    };

    const expectedData = {
      success: true,
      message: "Data posted successfully",
    };

    mockAxios
      .onPost("http://localhost:8080/api/students")
      .reply(200, expectedData);

    const result = await postData(student);

    expect(result).toEqual(expectedData);
  });

  it("should handle error when posting data fails", async () => {
    const student = {
      // Student data
    };

    const errorMessage = "Request failed with status code 404";

    mockAxios.onPost("http://localhost:8080/api/students").reply(404, {
      error: errorMessage,
    });

    await expect(postData(student)).rejects.toThrow(errorMessage);
  });
});
