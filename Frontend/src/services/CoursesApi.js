import axios from "axios";

const API_URL = "https://project-pd83.onrender.com/api/v1/courses";

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// ✅ Get all courses
export const getCourses = async () => {
  const token = getAuthToken();
  const res = await axios.get(`${API_URL}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token} `: "",
    },
  });
  return res.data;
};

// ✅ Add new course (Admin only)
export const addCourse = async (courseData) => {
  const token = getAuthToken();
  const res = await axios.post(`${API_URL}/`, courseData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return res.data;
};

// ✅ Update course (Admin only)
export const updateCourse = async (courseId, updatedData) => {
  const token = getAuthToken();
  const res = await axios.put(`${API_URL}/${courseId}`, updatedData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return res.data;
};

// ✅ Delete course (Admin only)
export const deleteCourse = async (courseId) => {
  const token = getAuthToken();
  const res = await axios.delete(`${API_URL}/${courseId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  return res.data;
};