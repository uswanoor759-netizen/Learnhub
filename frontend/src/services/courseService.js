
import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

// Fetch all available courses
export const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fetch a single course by ID
export const getCourseById = async (courseId) => {
  const response = await axios.get(`${API_URL}/${courseId}`);
  return response.data;
};

export default {
  getCourses,
  getCourseById,
};
