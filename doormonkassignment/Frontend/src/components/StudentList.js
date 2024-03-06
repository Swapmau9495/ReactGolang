import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, ListItem, ListItemText, Container, Paper } from "@mui/material";
import { Scrollbars } from "react-custom-scrollbars";

const StudentList = () => {
  const [students, setStudents] = useState([]);

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
      <Paper elevation={3}>
        <Scrollbars style={{ height: 400 }}>
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
                      },Institue:${student.institutionName}, Year:${
                        student.passOutYear
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Container,
// } from "@mui/material";

// const StudentList = () => {
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/students")
//       .then((response) => {
//         setStudents(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching students:", error);
//       });
//   }, []);

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" align="center" gutterBottom>
//         Student List
//       </Typography>
//       <List>
//         {students.length > 0 ? (
//           students.map((student) => (
//             <ListItem key={student.id}>
//               <ListItemText
//                 primary={`${student.firstName} ${student.lastName}`}
//                 secondary={`Email: ${student.email}, Phone: ${student.phoneNumber}`}
//               />
//             </ListItem>
//           ))
//         ) : (
//           <ListItem>
//             <ListItemText primary="No students found" />
//           </ListItem>
//         )}
//       </List>
//     </Container>
//   );
// };

// export default StudentList;
