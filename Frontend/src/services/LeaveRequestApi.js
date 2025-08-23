import axios from "axios";

// Base API URL
const API_URL = "https://project-pd83.onrender.com/api/v1/leave";

// 🔐 Auth header
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ?` Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

/* ------------------- 📌 STUDENT APIs ------------------- */

// Create leave request
export const createStudentLeaveRequest = async (leaveData) => {
  const res = await axios.post(
   ` ${API_URL}/student/create,
    leaveData`,
    { headers: authHeader() }
  );
  return res.data;
};

// Get student's own leaves
export const fetchStudentLeaves = async () => {
  const res = await axios.get(`${API_URL}/student`, { headers: authHeader() });
  return res.data;
};

/* ------------------- 📌 FACULTY APIs ------------------- */

// Create faculty leave request
export const createFacultyLeaveRequest = async (leaveData) => {
  const res = await axios.post(
    `${API_URL}/faculty/create,
    leaveData`,
    { headers: authHeader() }
  );
  return res.data;
};

// Get faculty's own leaves
export const fetchFacultyLeaves = async () => {
  const res = await axios.get(`${API_URL}/faculty`, { headers: authHeader() });
  return res.data;
};

// ✅ Get student leave requests (for faculty to approve/reject)
export const fetchFacultyStudentLeaves = async () => {
  const res = await axios.get(`${API_URL}/faculty/student`, { headers: authHeader() });
  return res.data;
};

/* ------------------- 📌 ADMIN APIs ------------------- */

// Get all faculty leaves (for admin)
export const fetchAdminFacultyLeaves = async () => {
  const res = await axios.get(`${API_URL}/admin/faculty`, { headers: authHeader() });
  return res.data;
};

/* ------------------- 📌 COMMON APIs ------------------- */

// Update leave request
export const updateLeaveRequest = async (id, leaveData) => {
  const res = await axios.put(
    `${API_URL}/${id},
    leaveData`,
    { headers: authHeader() }
  );
  return res.data;
};

// Delete leave request
export const deleteLeaveRequest = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
  return res.data;
};