import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  ListItemText,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  // GET api to retrive and Display Studentlist
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/students")
      .then((response) => {
        setStudents(response.data);
        console.log("Students data:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching students:",
          error.response ? error.response.data : error.message
        );
      });
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: "#ffffff" }}
      >
        Registered Students
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 10,
          backgroundColor: "#ffffff",
        }}
      >
        <Scrollbars
          style={{ height: 465 }}
          renderThumbVertical={({ style }) => (
            <div style={{ ...style, backgroundColor: "transparent" }} />
          )}
        >
          <List sx={{ padding: 0 }}>
            {students && students.length > 0 ? (
              students.map((student) => (
                <ListItem key={student.id}>
                  <Paper
                    elevation={0}
                    sx={{ width: "100%", p: 2, backgroundColor: "#ffffff" }}
                  >
                    <ListItemText
                      primary={`${student.firstName || ""} ${
                        student.lastName || ""
                      }`}
                      secondary={`Email: ${student.email || ""}, Phone: ${
                        student.phoneNumber || ""
                      }, Educational Background: ${
                        student.educationalBackground &&
                        student.educationalBackground
                          .map(
                            (edu) =>
                              `Institute: ${edu.institutionName}, Pass Out Year: ${edu.passOutYear}, CGPI: ${edu.cgpiScore}`
                          )
                          .join("\n")
                      }`}
                    />
                  </Paper>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No student Registered yet" />
              </ListItem>
            )}
          </List>
        </Scrollbars>
      </Paper>
    </Container>
  );
};

export default StudentList;
