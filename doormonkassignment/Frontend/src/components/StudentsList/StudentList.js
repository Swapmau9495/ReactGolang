import React, { useEffect, useState } from "react";
const axios = require("axios");
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
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: "whitesmoke" }}
      >
        Registered Students
      </Typography>
      <Paper elevation={3}>
        <Scrollbars style={{ height: 483 }}>
          <List sx={{ padding: 0 }}>
            {students && students.length > 0 ? (
              students.map((student) => (
                <ListItem key={student.id}>
                  <Paper elevation={0} sx={{ width: "100%", p: 2 }}>
                    <ListItemText
                      primary={`${student.firstName || ""} ${
                        student.lastName || ""
                      }`}
                      secondary={`Email: ${student.email || ""}, Phone: ${
                        student.phoneNumber || ""
                      },Institue:${student.institutionName}, Pass Out Year:${
                        student.passOutYear
                      }, CGPI:${student.cgpiScore}`}
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
