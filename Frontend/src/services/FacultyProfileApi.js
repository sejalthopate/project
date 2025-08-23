import axios from "axios";

const BASE_URL = "https://project-pd83.onrender.com/api/faculty";

export const getFacultyProfile = async (userId) => {
  try {
    const res = await axios.get(`${BASE_URL}/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching faculty:", err);
    return null;
  }
};

export const updateFacultyProfile = async (userId, data) => {
  try {
    const res = await axios.put(`${BASE_URL}/${userId}, data`);
    return res.data;
  } catch (err) {
    console.error("Error updating faculty:", err);
    return null;
  }
};

export const uploadFacultyProfileImage = async (userId, file) => {
  try {
    const form = new FormData();
    form.append("profileImage", file);
    const res = await axios.post(`${BASE_URL}/${userId}/upload-photo, form`);
    return res.data;
  } catch (err) {
    console.error("Upload failed:", err);
    return null;
  }
};