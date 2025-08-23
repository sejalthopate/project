// import axios from "axios";
// const BASE = "http://localhost:5000/api/assignments";

// const getToken = () => localStorage.getItem("token"); // token helper

// // ✅ Create Assignment
// export const createAssignmentAPI = async (formData) => {
//   const token = getToken();

//   return await axios.post(${BASE}/create, formData, {
//     headers: {
//       Authorization: Bearer ${token},
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// // Student साठी assignments fetch करणे
//  export const fetchAssignmentsForStudent = async () => {
//   const token = localStorage.getItem("token");
//   return await axios.get(${BASE}/student, {
//     headers: { Authorization: Bearer ${token} }
//   });
// };

// export const getFacultyAssignments = async () => {
//   const token = getToken();  // localStorage मधून token घे
//   try {
//     const res = await axios.get(${BASE}/faculty, {
//       headers: {
//         Authorization: Bearer ${token},  // 🔑 token पाठवला
//       },
//     });
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching faculty assignments", error);
//     throw error;
//   }
// };


// // ✅ Update assignment (faculty only)
// export const updateAssignmentAPI = async (id, formData) => {
//   const token = getToken();
//   return await axios.put(${BASE}/${id}, formData, {
//     headers: {
//       Authorization: Bearer ${token},
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// // ✅ Delete assignment (faculty only)
// export const deleteAssignmentAPI = async (id) => {
//   const token = getToken();
//   return await axios.delete(${BASE}/${id}, {
//     headers: {
//       Authorization: Bearer ${token},
//     },
//   });
// };



import axios from "axios";

const BASE = "http://localhost:5000/api/assignments";

// Helper: get token from localStorage
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token found");
  return token;
};

// ✅ Create Assignment (faculty only, with file)
export const createAssignmentAPI = async (formData) => {
  try {
    const token = getToken();
    const res = await axios.post(`${BASE}/create`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating assignment:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Update Assignment (faculty only, with optional new file)
export const updateAssignmentAPI = async (id, formData) => {
  try {
    const token = getToken();
    const res = await axios.put(`${BASE}/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating assignment:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Delete Assignment (faculty only)
export const deleteAssignmentAPI = async (id) => {
  try {
    const token = getToken();
    const res = await axios.delete(`${BASE}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting assignment:", error.response?.data || error.message);
    throw error;
  }
};

// ✅ Fetch assignments for faculty
export const getFacultyAssignments = async () => {
  try {
    const token = getToken();
    const res = await axios.get(`${BASE}/faculty`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching faculty assignments:", error.response?.data || error.message);
    throw error;
  }
};

