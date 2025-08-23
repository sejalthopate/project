import axios from "axios";

export const getAdminStats = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get("https://project-pd83.onrender.com/api/v1/admin/get-dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};         