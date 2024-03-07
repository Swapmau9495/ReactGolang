import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required().max(20),
  lastName: yup.string().required().max(20),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format"),
  phoneNumber: yup
    .string()
    .required()
    .matches(/^\d{10}$/, "Invalid phone number"),
  institutionName: yup.string().required().max(50),
  passOutYear: yup.number().required("Invalid Year").min(2010).max(2023),
  cgpiScore: yup
    .number()
    .typeError("CGPI/Score must be a number")
    .required("CGPI/Score is required"),
});

export default schema;
