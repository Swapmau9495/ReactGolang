import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is a required field").max(20),
  lastName: yup.string().required("Last Name is a required field").max(20),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNumber: yup
    .string()
    .required()
    .matches(/^\d{10}$/, "Invalid phone number"),
  // Define dynamic fields validation
  educationalBackground: yup.array().of(
    yup.object().shape({
      institutionName: yup
        .string()
        .required("Institution Name is a required field")
        .max(50),
      passOutYear: yup
        .number()
        .typeError("Pass-out Year Is required")
        .required("Pass-out Year is required")
        .integer("Pass-out Year must be an integer")
        .min(2010, "Pass-out Year must be greater than or equal to 2010")
        .max(2023, "Pass-out Year must be less than or equal to 2023"),
      cgpiScore: yup
        .number()
        .typeError("CGPI/Score must be a number")
        .required("CGPI/Score is required")
        .min(0, "CGPI/Score must be greater than or equal to 0")
        .max(10, "CGPI/Score must be less than or equal to 10"),
    })
  ),
});

export default schema;
