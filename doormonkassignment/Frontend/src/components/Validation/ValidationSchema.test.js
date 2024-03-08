import * as yup from "yup";
import schema from "./schema";

describe("Validation schema", () => {
  it("validates input data with valid values", async () => {
    const validData = {
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

    await expect(schema.validate(validData)).resolves.toBe(validData);
  });

  it("throws validation error for missing required fields", async () => {
    const invalidData = {};

    await expect(
      schema.validate(invalidData)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("throws validation error for invalid email format", async () => {
    const invalidData = {
      firstName: "sanjay",
      lastName: "Doshi",
      email: "doshisanjay.com",
      phoneNumber: "1234567890",
      educationalBackground: [],
    };

    await expect(
      schema.validate(invalidData)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("throws validation error for invalid phone number format", async () => {
    const invalidData = {
      firstName: "sanjay",
      lastName: "Doshi",
      email: "doshisanjay.com",
      phoneNumber: "123",
      educationalBackground: [],
    };

    await expect(
      schema.validate(invalidData)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("throws validation error for invalid pass-out year", async () => {
    const invalidData = {
      firstName: "John",
      lastName: "Doe",
      email: "doshisanjay@example.com",
      educationalBackground: [
        {
          institutionName: "A1 University",
          passOutYear: 2025,
          cgpiScore: 9.5,
        },
      ],
    };

    await expect(
      schema.validate(invalidData)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("throws validation error for invalid CGPI/score", async () => {
    const invalidData = {
      firstName: "John",
      lastName: "Doe",
      email: "doshisanjay@example.com",
      educationalBackground: [
        {
          institutionName: "A1 University",
          passOutYear: 2022,
          cgpiScore: 11,
        },
      ],
    };

    await expect(
      schema.validate(invalidData)
    ).rejects.toThrowErrorMatchingSnapshot();
  });
});
