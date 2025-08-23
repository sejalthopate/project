import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/notices";

export const getAllNotices = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addNotice = async (noticeData) => {
  const response = await axios.post(BASE_URL, noticeData);
  return response.data;
};

export const updateNotice = async (id, noticeData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, noticeData);
  return response.data;
};


export const deleteNotice = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};