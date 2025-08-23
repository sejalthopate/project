import axios from 'axios';

const BASE_URL = 'https://project-pd83.onrender.com/api/v1/AttendanceRoutes';

// ================= Student Attendance =================
export const submitStudentAttendance = (data) =>
  axios.post(`${BASE_URL}/student/mark`, data);

export const fetchStudentAttendance = () =>
  axios.get(`${BASE_URL}/student/view`);

export const deleteStudentAttendance = (id) =>
  axios.delete(`${BASE_URL}/student/delete/${id}`); // ✅ Uses correct backend path

export const deleteSingleStudentAttendance = (recordId, studentId) =>
  axios.delete(`${BASE_URL}/student/${recordId}/deleteStudent/${studentId}`);

// ================= Faculty Attendance =================
export const submitFacultyAttendance = (data) =>
  axios.post(`${BASE_URL}/faculty/mark`, data);

export const fetchFacultyAttendance = () =>
  axios.get(`${BASE_URL}/faculty/view`);

export const deleteFacultyAttendance = (id) =>
  axios.delete(`${BASE_URL}/faculty/delete/${id}`);

export const deleteSingleFacultyAttendance = (recordId, facultyId) =>
  axios.delete(`${BASE_URL}/faculty/${recordId}/deleteFaculty/${facultyId}`);
