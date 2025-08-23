// // import axios from 'axios';

// // const API_URL = 'http://localhost:5000/api/v1/faculty';

// // // 👉 Create Faculty
// // export const createFaculty = async (facultyData) => {
// //   return await axios.post(API_URL, facultyData);
// // };

// // // 👉 Get All Faculties
// // export const getFaculties = async () => {
// //   return await axios.get(API_URL);
// // };

// // // 👉 Update Faculty
// // export const updateFaculty = async (id, updatedData) => {
// //   return await axios.put(`${API_URL}/${id}`, updatedData);
// // };

// // // 👉 Delete Faculty
// // export const deleteFaculty = async (id) => {
// //   return await axios.delete(`${API_URL}/${id}`);
// // };
// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api/v1/faculty';

// // 👉 Create Faculty
// export const createFaculty = async (facultyData) => {
//   return await axios.post(`${BASE_URL}/create-managefaculty`, facultyData);
// };

// // 👉 Get All Faculties
// export const getFaculties = async () => {
//   return await axios.get(`${BASE_URL}/get-managefaculty`);
// };

// // 👉 Get Faculty by ID (Using Path param)
// export const getFacultyById = async (id) => {
//   return await axios.get(`${BASE_URL}/get-managefaculty/${id}`);
// };

// // 👉 Update Faculty by ID (Using Path param)
// export const updateFaculty = async (id, updatedData) => {
//   return await axios.put(`${BASE_URL}/update-managefaculty/${id}`, updatedData);
// };

// // 👉 Delete Faculty by ID (Using Path param)
// export const deleteFaculty = async (id) => {
//   return await axios.delete(`${BASE_URL}/delete-managefaculty/${id}`);
// };
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/faculty';

// Helper to get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// 👉 Create Faculty
export const createFaculty = async (facultyData) => {
  return await axios.post(`${BASE_URL}/create-managefaculty`, facultyData, getAuthHeaders());
};

// 👉 Get All Faculties
export const getFaculties = async () => {
  return await axios.get(`${BASE_URL}/get-managefaculty`, getAuthHeaders());
};

// 👉 Get Faculty by ID
export const getFacultyById = async (id) => {
  return await axios.get(`${BASE_URL}/get-managefaculty/${id}`, getAuthHeaders());
};

// 👉 Update Faculty by ID
export const updateFaculty = async (id, updatedData) => {
  return await axios.put(`${BASE_URL}/update-managefaculty/${id}`, updatedData, getAuthHeaders());
};

// 👉 Delete Faculty by ID
export const deleteFaculty = async (id) => {
  return await axios.delete(`${BASE_URL}/delete-managefaculty/${id}`, getAuthHeaders());
};
