
// // import axios from 'axios';

// // const API = 'http://localhost:5000/api/v1/subjects';


// // // 👉 Create new subject
// // export const createSubject = (data) => axios.post(`${API}/create-subject`,data);


// // // 👉 Get all subjects
// // export const getSubjects = () => axios.get(`${API}/getall-subjects`);

// // // 👉 Update subject by ID
// // export const updateSubject = (id, data) => axios.put(`${API}/update-subject/${id}`,data);

// // // 👉 Delete subject by ID
// // export const deleteSubject = (id) => axios.delete(`${API}/delete-subject/${id}`);
// import axios from 'axios';

// const API = 'http://localhost:5000/api/v1/subjects';

// // ✅ Function to add token in headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
// };

// // 👉 Create new subject (फक्त admin)
// export const createSubject = (data) =>
//   axios.post(`${API}/create-subject`, data, getAuthHeaders());

// // 👉 Get all subjects (कोणताही logged-in user)
// export const getSubjects = () =>
//   axios.get(`${API}/getall-subjects`, getAuthHeaders());

// // 👉 Update subject by ID (फक्त admin)
// export const updateSubject = (id, data) =>
//   axios.put(`${API}/update-subject/${id}`, data, getAuthHeaders());

// // 👉 Delete subject by ID (फक्त admin)
// export const deleteSubject = (id) =>
//   axios.delete(`${API}/delete-subject/${id}`, getAuthHeaders());
// src/services/SubjectApi.js
import axios from "axios";

const API = "http://localhost:5000/api/v1/subjects";

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
