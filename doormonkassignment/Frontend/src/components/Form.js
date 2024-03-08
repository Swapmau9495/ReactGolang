import React, { useState } from "react";
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
  IconButton,
  Divider,
} from "@mui/material";
import StudentList from "./StudentsList/StudentList.js";
import { Scrollbars } from "react-custom-scrollbars";
import schema from "./Validation/ValidationSchema.js";
import { postData } from "./PostAPI/Api.js";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Form = ({ setSubmitted, setIsError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  // State created to handle array of objects for dynamic fields data
  const [dynamicFields, setDynamicFields] = useState([
    { institutionName: "", passOutYear: "", cgpiScore: "" },
  ]);

  //addition of dynamic fields
  const addDynamicField = () => {
    setDynamicFields([
      ...dynamicFields,
      { institutionName: "", passOutYear: "", cgpiScore: "" },
    ]);
  };

  // function to remove dynamic fields education details
  const removeDynamicField = (index) => {
    if (index > 0) {
      const updatedFields = dynamicFields.filter((_, i) => i !== index);
      setDynamicFields(updatedFields);
    }
  };

  const onSubmit = (data) => {
    const studentData = {
      ...data,
      educationalBackground: data.educationalBackground || [],
    };

    console.log(studentData);
    setSubmitted(true);
    postData(studentData)
      .then((responseData) => {
        console.log("Data posted successfully:", responseData);
      })
      .catch((error) => {
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
            style={{ color: "#ffffff" }}
          >
            Student Registration Form
          </Typography>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 10,
            }}
          >
            <Scrollbars
              style={{ height: 450 }}
              renderThumbVertical={({ style }) => (
                <div style={{ ...style, backgroundColor: "transparent" }} />
              )}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontFamily: "Roboto, sans-serif" }}
                  style={{ color: "#000000" }}
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
                  InputProps={{
                    sx: {
                      borderRadius: 10,
                      backgroundColor: "#ffffff",
                      borderColor: "#ff0000",
                    },
                    disableUnderline: true,
                  }}
                />
                <TextField
                  {...register("lastName")}
                  label="Last Name"
                  fullWidth
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  margin="normal"
                  InputProps={{
                    sx: {
                      borderRadius: 10,
                      backgroundColor: "#ffffff",
                    },
                  }}
                />
                <TextField
                  {...register("email")}
                  label="Email"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  margin="normal"
                  InputProps={{
                    sx: {
                      borderRadius: 10,
                      backgroundColor: "#ffffff",
                    },
                  }}
                />
                <TextField
                  {...register("phoneNumber")}
                  label="Phone Number"
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  margin="normal"
                  InputProps={{
                    sx: {
                      borderRadius: 10,
                      backgroundColor: "#ffffff",
                    },
                  }}
                />
                <Divider sx={{ my: 2 }} />
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ color: "#000000" }}
                >
                  Educational Background
                </Typography>
                {dynamicFields.map((field, index) => (
                  <Box
                    key={index}
                    sx={{
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box sx={{ width: "calc(100% - 48px)" }}>
                      <TextField
                        {...register(
                          `educationalBackground[${index}].institutionName`
                        )}
                        label="Institution Name"
                        fullWidth
                        error={
                          !!errors.educationalBackground?.[index]
                            ?.institutionName
                        }
                        helperText={
                          errors.educationalBackground?.[index]?.institutionName
                            ?.message
                        }
                        margin="normal"
                        InputProps={{
                          sx: {
                            borderRadius: 10,
                            backgroundColor: "#ffffff",
                          },
                        }}
                      />
                      <TextField
                        {...register(
                          `educationalBackground[${index}].passOutYear`
                        )}
                        label="Pass-out Year"
                        fullWidth
                        type="number"
                        error={
                          !!errors.educationalBackground?.[index]?.passOutYear
                        }
                        helperText={
                          errors.educationalBackground?.[index]?.passOutYear
                            ?.message
                        }
                        margin="normal"
                        InputProps={{
                          sx: {
                            borderRadius: 10,
                            backgroundColor: "#ffffff",
                          },
                        }}
                      />
                      <TextField
                        {...register(
                          `educationalBackground[${index}].cgpiScore`
                        )}
                        label="CGPI/Score"
                        fullWidth
                        error={
                          !!errors.educationalBackground?.[index]?.cgpiScore
                        }
                        helperText={
                          errors.educationalBackground?.[index]?.cgpiScore
                            ?.message
                        }
                        margin="normal"
                        InputProps={{
                          sx: {
                            borderRadius: 10,
                            backgroundColor: "#ffffff",
                          },
                        }}
                      />
                    </Box>
                    {Object.keys(dynamicFields).length > 1 && index > 0 && (
                      <IconButton onClick={() => removeDynamicField(index)}>
                        <RemoveIcon />
                      </IconButton>
                    )}
                  </Box>
                ))}
                <Button onClick={addDynamicField} startIcon={<AddIcon />}>
                  Add Educational Background
                </Button>

                <Box mt={2}>
                  <Button
                    style={{
                      borderRadius: 10,
                    }}
                    variant="contained"
                    type="submit"
                  >
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
