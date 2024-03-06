import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const schema = yup.object().shape({
  firstName: yup.string().required().max(20),
  lastName: yup.string().required().max(20),
  email: yup.string().required().email(),
  phoneNumber: yup
    .string()
    .required()
    .matches(/^\d{10}$/, "Invalid phone number"),
});

const Form = ({ setSubmitted }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function postData(student) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/students",
        student
      );
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }
  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
    postData(data)
      .then((responseData) => {
        console.log("Data posted successfully:", responseData);
        // Handle successful response
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      {errors.firstName && <p>{errors.firstName.message}</p>}
      <input {...register("lastName")} placeholder="Last Name" />
      {errors.lastName && <p>{errors.lastName.message}</p>}
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}
      <input {...register("phoneNumber")} placeholder="Phone Number" />
      {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
