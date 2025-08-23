import axios from "axios";

const API = "http://localhost:5000/api/v1/manageclass";

// Get token from localStorage
const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ✅ Get all classes
export const getAllClasses = async () => {
  try {
    const res = await axios.get(`${API}/getall-manageclass`, getAuthConfig());
    return res.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    return [];
  }
};

// ✅ Add class
export const addClass = async (data) => {
  try {
    const res = await axios.post(`${API}/create-manageclass`, data, getAuthConfig());
    return res.data;
  } catch (error) {
    console.error("Error adding class:", error);
    throw error;
  }
};

// ✅ Update class
export const updateClass = async (id, data) => {
  try {
    const res = await axios.put(`${API}/update-manageclass/${id}`, data, getAuthConfig());
    return res.data;
  } catch (error) {
    console.error("Error updating class:", error);
    throw error;
  }
};

// ✅ Delete class
export const deleteClass = async (id) => {
  try {
    const res = await axios.delete(`${API}/delete-manageclass/${id}`, getAuthConfig());
    return res.data;
  } catch (error) {
    console.error("Error deleting class:", error);
    throw error;
  }
};