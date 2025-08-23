import React, { useEffect, useState } from "react";
import LeaveRequestTable from "../../components/LeaveRequestForm";

const AdminLeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📌 Fetch all faculty leave requests (for Admin)
  const fetchLeaves = async () => {
    try {
      const res = await fetch("https://project-pd83.onrender.com/api/v1/leave/admin/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setRequests(data.data); // backend sends {success:true, data:[...]}
      } else {
        console.error("Failed to fetch leaves:", data.message);
      }
    } catch (err) {
      console.error("Error fetching admin leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  // 📌 Handle status change (Admin updates)
const handleStatusChange = async (id, newStatus) => {
  try {
    const res = await fetch(`https://project-pd83.onrender.com/api/v1/leave/admin/status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await res.json();
    if (data.success) {
     
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status: data.leave.status } : req
        )
      );
    } else {
      console.error("Failed to update status:", data.message);
    }
  } catch (err) {
    console.error("Error updating status:", err);
  }
};

  if (loading) return <p className="p-4">Loading leave requests...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Leave Requests</h2>
      <LeaveRequestTable
        requests={requests}
        onStatusChange={handleStatusChange}
        isAdmin={true}
      />
    </div>
  );
};

export default AdminLeaveRequests;