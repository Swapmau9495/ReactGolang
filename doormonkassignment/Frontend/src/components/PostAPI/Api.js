import axios from "axios";

export async function postData(student) {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/students",
      student
    );
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
}
