import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
} from "@mui/material";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Student List
      </Typography>
      <List>
        {students.length > 0 ? (
          students.map((student) => (
            <ListItem key={student.id}>
              <ListItemText
                primary={`${student.firstName} ${student.lastName}`}
                secondary={`Email: ${student.email}, Phone: ${student.phoneNumber}`}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No students found" />
          </ListItem>
        )}
      </List>
    </Container>
  );
};

export default StudentList;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

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
//     <div>
//       <h2>Student List</h2>
//       {students !== null &&
//       students !== undefined &&
//       Array.isArray(students) &&
//       students.length > 0 ? (
//         <ul>
//           {students.map((student) => (
//             <li key={student.id}>
//               {student.firstName} {student.lastName} - {student.email}{" "}
//               {student.phoneNumber}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default StudentList;
