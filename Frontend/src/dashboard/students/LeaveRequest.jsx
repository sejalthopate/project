// src/dashboard/student/StudentLeaveRequests.jsx
import React, { useState, useEffect } from "react";
import LeaveRequestTable from "../../components/LeaveRequestForm";

const StudentLeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [formData, setFormData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    dayType: "Full Day",
    reason: "",
    notes: "",
    contactInfo: "",
    department: "",
    delegationFaculty: "",
  });
  const [message, setMessage] = useState("");

  // ✅ Fetch Student leaves (own requests)
  const fetchLeaves = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/leave/student", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")} `},
      });
      const data = await res.json();
      if (data.success) setRequests(data.data || []);
    } catch (err) {
      console.error("Error fetching student leaves:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };

  // 📌 Student submit or update request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };

      let url = "http://localhost:5000/api/v1/leave/student/create";
      let method = "POST";

      if (editingRequest) {
        url = `http://localhost:5000/api/v1/leave/${editingRequest._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        const updatedLeave = data.data || data.leave;
        if (editingRequest) {
          setRequests((prev) =>
            prev.map((req) => (req._id === editingRequest._id ? updatedLeave : req))
          );
          setMessage("✅ Leave request updated successfully!");
        } else {
          setMessage("✅ Leave request submitted successfully!");
          setRequests((prev) => [...prev, updatedLeave]);
        }

        setShowForm(false);
        setEditingRequest(null);
        setFormData({
          leaveType: "",
          fromDate: "",
          toDate: "",
          dayType: "Full Day",
          reason: "",
          notes: "",
          contactInfo: "",
          department: "",
          delegationFaculty: "",
        });

        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠ Server error. Please try again.");
    }
  };

  const handleEdit = (request) => {
    setEditingRequest(request);
    setFormData(request);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/v1/leave/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")} `},
      });

      const data = await res.json();
      if (data.success) {
        setRequests(requests.filter((req) => req._id !== id));
        setMessage("🗑 Leave request deleted successfully!");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error deleting leave:", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Student Leave Requests</h2>

      {message && <div className="mb-4 text-green-600">{message}</div>}

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        {showForm ? "Cancel" : "➕ Add Request"}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-gray-100 p-4 rounded-lg shadow-md"
        >
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="leaveType"
              placeholder="Leave Type"
              value={formData.leaveType}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="reason"
              placeholder="Reason"
              value={formData.reason}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="notes"
              placeholder="Notes"
              value={formData.notes}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="contactInfo"
              placeholder="Contact Info"
              value={formData.contactInfo}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="delegationFaculty"
              placeholder="Delegation Faculty"
              value={formData.delegationFaculty}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            {editingRequest ? "Update Request" : "Submit Request"}
          </button>
        </form>
      )}

      {/* ✅ Student own requests */}
      <LeaveRequestTable
        requests={requests}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StudentLeaveRequests;