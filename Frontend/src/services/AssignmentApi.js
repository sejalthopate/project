


import axios from "axios";

const BASE = "https://project-pd83.onrender.com/api/assignments";

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

