import axios from "axios";

// POST Api to Post data to server when user click on Submit
export async function postData(student) {
  try {
    console.log("student", student);

    // Transforming educational background data into an array of objects
    const educationalBackground = student.educationalBackground.map((edu) => ({
      institutionName: edu.institutionName,
      passOutYear: edu.passOutYear,
      cgpiScore: edu.cgpiScore,
    }));
    console.log("educationalBackground", educationalBackground);
    // Forming the data object to send to the server
    const data = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phoneNumber: student.phoneNumber,
      educationalBackground: educationalBackground,
    };
    console.log("data", data);
    const response = await axios.post(
      "http://localhost:8080/api/students",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}
