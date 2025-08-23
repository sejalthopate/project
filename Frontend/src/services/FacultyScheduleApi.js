import axios from "axios";

const API = "http://localhost:5000/api/v1/facultyschedule";

export const getFacultySchedules = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addFacultySchedule = async (schedule) => {
  const res = await axios.post(API_URL, schedule);
  return res.data;
};

export const updateFacultySchedule = async (id, updatedSchedule) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedSchedule);
  return res.data;
};

export const deleteFacultySchedule = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};