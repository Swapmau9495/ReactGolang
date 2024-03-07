import * as yup from "yup";
import schema from "./ValidationSchema.js";

describe("Form Validation Schema", () => {
  it("Validates correct input data", async () => {
    const validData = {
      firstName: "Sanjay",
      lastName: "Doshi",
      email: "john.doe@example.com",
      phoneNumber: "1234567890",
      institutionName: "ABC University",
      passOutYear: 2022,
      cgpiScore: 8.5,
    };

    // Validate the data against the schema
    const isValid = await schema.isValid(validData);
    expect(isValid).toBeTruthy();
  });

  it("Returns errors for invalid input data", async () => {
    const invalidData = {
      firstName: "", // Empty first name
      lastName: "Doshi",
      email: "invalid-email", // Invalid email format
      phoneNumber: "123", // Invalid phone number
      institutionName: "abc University",
      passOutYear: 2025, // Invalid year
      cgpiScore: "A", // Invalid CGPI score format
    };

    try {
      // Attempt to validate the invalid data against the schema
      await schema.validate(invalidData, { abortEarly: false });
    } catch (error) {
      console.log(error);
      // Expecting errors
      expect(error.errors).toHaveLength(7); // Number of expected errors
      expect(error.errors).toContain("First Name is required");
      expect(error.errors).toContain("Email is required");
      expect(error.errors).toContain("Invalid email format");
      expect(error.errors).toContain("Invalid phone number");
      expect(error.errors).toContain("Invalid Year");
      expect(error.errors).toContain("CGPI/Score must be a number");
      expect(error.errors).toContain("CGPI/Score is required");
    }
  });
});
