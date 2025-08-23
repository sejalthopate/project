import axios from "axios";

export const getAdminStats = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get("http://localhost:5000/api/v1/admin/get-dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};         