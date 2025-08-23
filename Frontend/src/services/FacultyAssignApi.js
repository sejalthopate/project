
// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api/v1/assignfaculty';

// // 📌 Create Assignment
// export const addFacultyAssignment = async (data) => {
//   try {
//     const res = await axios.post(`${BASE_URL}/create-assignfaculty`, data);
//     return res.data;
//   } catch (error) {
//     console.error("Error creating faculty assignment:", error);
//     throw error;
//   }
// };
// // 📌 Get All Assignments
// export const getFacultyAssignments = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/get-assignfaculty`);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching faculty assignments:", error);
//     throw error;
//   }
// };



// // ✅ 📌 Update Assignment by ID (path param)
// export const updateFacultyAssignment = async (id, data) => {
//   try {
//     const res = await axios.put(`${BASE_URL}/update-assignfaculty/${id}`, data);
//     return res.data;
//   } catch (error) {
//     console.error("Error updating faculty assignment:", error);
//     throw error;
//   }
// };

// // ✅ 📌 Delete Assignment by ID (path param)
// export const deleteFacultyAssignment = async (id) => {
//   try {
//     const res = await axios.delete(`${BASE_URL}/delete-assignfaculty/${id}`);
//     return res.data;
//   } catch (error) {
//     console.error("Error deleting faculty assignment:", error);
//     throw error;
//   }
// };

import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/v1/assignfaculty';

// ✅ Token headers function
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// 📌 Create Assignment
export const addFacultyAssignment = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/create-assignfaculty`, data, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error("Error creating faculty assignment:", error);
    throw error;
  }
};

// 📌 Get All Assignments
export const getFacultyAssignments = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/get-assignfaculty`, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error("Error fetching faculty assignments:", error);
    throw error;
  }
};

// 📌 Update Assignment by ID
export const updateFacultyAssignment = async (id, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/update-assignfaculty/${id}`, data, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error("Error updating faculty assignment:", error);
    throw error;
  }
};

// 📌 Delete Assignment by ID
export const deleteFacultyAssignment = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/delete-assignfaculty/${id}`, getAuthHeaders());
    return res.data;
  } catch (error) {
    console.error("Error deleting faculty assignment:", error);
    throw error;
  }
};
