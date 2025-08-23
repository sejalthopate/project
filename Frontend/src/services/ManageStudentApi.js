// import axios from 'axios'
// const API_BASE = "http://localhost:5000/api/v1/students"; // 👈 Your Express server port

// export const createStudent = (studentData) =>
//   axios.post(`${API_BASE}/create-managestudent`, studentData);

// export const getStudents = () =>
//   axios.get(`${API_BASE}/getall-managestudent`);

// export const updateStudent = (id, studentData) =>
//   axios.put(`${API_BASE}/update-managestudent/${id}`, studentData);

// export const deleteStudent = (id) =>
//   axios.delete(`${API_BASE}/delete-managestudent/${id}`);

import axios from 'axios';

const API_BASE = "http://localhost:5000/api/v1/students";

// ✅ Add token to headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Include headers in all requests
export const createStudent = (studentData) =>
  axios.post(`${API_BASE}/create-managestudent`, studentData, getAuthHeaders());

export const getStudents = () =>
  axios.get(`${API_BASE}/getall-managestudent`, getAuthHeaders());

export const updateStudent = (id, studentData) =>
  axios.put(`${API_BASE}/update-managestudent/${id}`, studentData, getAuthHeaders());

export const deleteStudent = (id) =>
  axios.delete(`${API_BASE}/delete-managestudent/${id}`, getAuthHeaders());

