
import axios from "axios";

const BASE_URL = "https://project-pd83.onrender.com/api/v1/adminprofile";

// Create admin profile
export const createAdminProfile = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios.post(`${BASE_URL}/create-adminprofile`, data, {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
  return res.data;
};

// Get admin profile
export const getAdminProfile = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get(`${BASE_URL}/get-adminprofile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data; 
};

// Update admin profile
export const updateAdminProfile = async (data) => {
  const token = localStorage.getItem("token");
  const res = await axios.put(`${BASE_URL}/update-adminprofile`, data, {
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  });
  return res.data; 
};
