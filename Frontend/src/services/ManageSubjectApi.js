
import axios from "axios";

const API = "https://project-pd83.onrender.com/api/v1/subjects";

// ✅ Token headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 👉 Create subject (Admin)
export const createSubject = (data) =>
  axios.post(`${API}/create-subject`, data, getAuthHeaders());

// 👉 Get all subjects
export const getAllSubjects = () =>
  axios.get(`${API}/getall-subjects`, getAuthHeaders());

// 👉 Update subject by ID (Admin)
export const updateSubject = (id, data) =>
  axios.put(`${API}/update-subject/${id}`, data, getAuthHeaders());

// 👉 Delete subject by ID (Admin)
export const deleteSubject = (id) =>
  axios.delete(`${API}/delete-subject/${id}`, getAuthHeaders());
