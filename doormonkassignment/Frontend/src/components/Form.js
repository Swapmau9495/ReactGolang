import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import StudentList from "./StudentsList/StudentList";
import { Scrollbars } from "react-custom-scrollbars";
import schema from "./Validation/ValidationSchema";
import { postData } from "./PostAPI/Api";

const Form = ({ setSubmitted, setIsError }) => {
  //UseForm hook is used for handling form functionalities including validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //onSubmit function will run when user click on submit button
  const onSubmit = (data) => {
    console.log(data);
    setSubmitted(true);
    postData(data)
      .then((responseData) => {
        // Handle successful response
        console.log("Data posted successfully:", responseData);
      })
      .catch((error) => {
        // Handle error with setError
        setIsError(true);
      });
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            style={{ color: "whitesmoke" }}
          >
            Student Registration Form
          </Typography>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: "#FAF9F6",
              border: "1px solid #e0e0e0", // Add border style here
            }}
          >
            <Scrollbars style={{ height: 350 }}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
                >
                  Basic Info
                </Typography>
                <TextField
                  {...register("firstName")}
                  label="First Name"
                  fullWidth
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  margin="normal"
                />
                <TextField
                  {...register("lastName")}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  margin="normal"
                />
                <TextField
                  {...register("email")}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  margin="normal"
                />
                <TextField
                  {...register("phoneNumber")}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  margin="normal"
                />
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}
                >
                  Educational Background
                </Typography>
                <TextField
                  {...register("institutionName")}
                  label="Institution Name"
                  fullWidth
                  error={!!errors.institutionName}
                  helperText={errors.institutionName?.message}
                  margin="normal"
                />
                <TextField
                  {...register("passOutYear")}
                  label="Pass-out Year"
                  fullWidth
                  type="number"
                  error={!!errors.passOutYear}
                  helperText={
                    errors.passOutYear
                      ? "Invalid Passout Year"
                      : errors.passOutYear?.message
                  }
                  inputProps={{
                    min: 2010,
                    max: 2023,
                  }}
                  margin="normal"
                />
                <TextField
                  {...register("cgpiScore")}
                  label="CGPI/Score"
                  fullWidth
                  type="text"
                  error={!!errors.cgpiScore}
                  helperText={errors.cgpiScore?.message}
                  margin="normal"
                />
                <Box mt={2}>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </form>
            </Scrollbars>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <StudentList />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Form;
