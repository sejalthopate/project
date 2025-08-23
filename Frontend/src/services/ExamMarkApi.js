// Frontend/src/services/ExamMarkApi.js
import axios from "axios";

const API_BASE = "https://project-pd83.onrender.com/api/exammarks";

// ✅ Get all exam marks
export const getExamMarks = () => {
  return axios.get(API_BASE);
};


// ✅ Add new exam mark
export const addExamMark = (data) => {
  return axios.post(API_BASE, data);
};

// ✅ Update exam mark by ID
export const updateExamMark = (id, data) => {
  return axios.put(`${API_BASE}/${id}`, data);
};

// ✅ Delete exam mark by ID
export const deleteExamMark = (id) => {
  return axios.delete(`${API_BASE}/${id}`);
};