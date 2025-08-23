// src/services/ScheduleAPI.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/schedule";

// ✅ Get all student schedules
export const getStudentSchedules = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    console.error("Error fetching student schedules:", error);
    throw error;
  }
};

// ✅ Add student schedule
export const addStudentSchedule = async (scheduleData) => {
  try {
    const res = await axios.post(API_URL, scheduleData);
    return res.data;
  } catch (error) {
    console.error("Error adding student schedule:", error);
    throw error;
  }
};

// ✅ Update student schedule
export const updateStudentSchedule = async (id, scheduleData) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, scheduleData);
    return res.data;
  } catch (error) {
    console.error("Error updating student schedule:", error);
    throw error;
  }
};

// ✅ Delete student schedule
export const deleteStudentSchedule = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting student schedule:", error);
    throw error;
  }
};