import React, { useState, useEffect } from "react";
import LeaveRequestTable from "../../components/LeaveRequestForm";

const FacultyLeaveRequests = () => {
  const [requests, setRequests] = useState([]); // faculty own requests
  const [studentRequests, setStudentRequests] = useState([]); // student requests
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

  // ✅ Fetch Faculty leaves (own requests)
  const fetchLeaves = async () => {
    try {
      const res = await fetch("https://project-pd83.onrender.com/api/v1/leave/faculty", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")} `},
      });
      const data = await res.json();
      if (data.success) setRequests(data.data || []);
    } catch (err) {
      console.error("Error fetching faculty leaves:", err);
    }
  };

  // ✅ Fetch Student leave requests (for faculty approval)
  const fetchStudentLeaves = async () => {
    try {
      const res = await fetch(
        "https://project-pd83.onrender.com/api/v1/leave/faculty",
        {
          headers: { Authorization:` Bearer ${localStorage.getItem("token")} `},
        }
      );
      const data = await res.json();
      if (data.success) setStudentRequests(data.data || []);
    } catch (err) {
      console.error("Error fetching student leaves:", err);
    }
  };

  useEffect(() => {
    fetchLeaves();
    fetchStudentLeaves();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({ ...formData, [name]: type === "file" ? files[0] : value });
  };

  // 📌 Faculty submit or update request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };

      let url = "https://project-pd83.onrender.com/api/v1/leave/faculty/create";
      let method = "POST";

      if (editingRequest) {
        url = `https://project-pd83.onrender.com/api/v1/leave/${editingRequest._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization:` Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        const updatedLeave = data.data || data.leave; // ✅ handle both cases
        if (editingRequest) {
          setRequests((prev) =>
            prev.map((req) => (req._id === editingRequest._id ? updatedLeave : req))
          );
          setMessage("✅ Leave request updated successfully!");
        } else {
          setMessage("✅ Leave request submitted successfully!");
          setRequests((prev) => [...prev, updatedLeave]); // ✅ instantly update UI
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
      const res = await fetch(`https://project-pd83.onrender.com/api/v1/leave/${id}`, {
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

  // 📌 Faculty approves/rejects student requests
  const handleStudentStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `https://project-pd83.onrender.com/api/v1/leave/faculty/student-status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization:` Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await res.json();
      if (data.success) {
        const updatedLeave = data.data || data.leave; // ✅ handle both cases
        setStudentRequests((prev) =>
          prev.map((req) => (req._id === id ? { ...req, status: updatedLeave.status } : req))
        );
      }
    } catch (err) {
      console.error("Error updating student leave status:", err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 pb-85 h-250 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Faculty Leave Requests</h2>

      {message && <div className="mb-4 text-green-600">{message}</div>}

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700"
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

      {/* ✅ Faculty own requests */}
      <LeaveRequestTable
        requests={requests}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* ✅ Student requests for approval */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Student Leave Requests</h2>
        <LeaveRequestTable
          requests={studentRequests}
          onStatusChange={handleStudentStatusChange}
          isFaculty={true} // extra prop for buttons
        />
      </div>
    </div>
  );
};

export default FacultyLeaveRequests;