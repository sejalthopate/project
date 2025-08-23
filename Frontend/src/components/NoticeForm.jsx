import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminNotice = () => {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [forRole, setForRole] = useState("all");

  const fetchNotices = async () => {
    try {
      const res = await axios.get("/api/notices", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNotices(res.data);
    } catch (err) {
      console.error("❌ Error fetching notices:", err);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post(
        "/api/notices",
        { title, description, forRole },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTitle("");
      setDescription("");
      setForRole("all");
      fetchNotices();
    } catch (err) {
      console.error("❌ Error creating notice:", err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">📢 Admin Notice Board</h1>

      <div className="bg-white/10 p-4 rounded-lg shadow mb-6">
        <input
          type="text"
          placeholder="Title"
          className="p-2 w-full mb-2 rounded bg-white/20"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="p-2 w-full mb-2 rounded bg-white/20"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="p-2 w-full mb-2 rounded bg-white/20"
          value={forRole}
          onChange={(e) => setForRole(e.target.value)}
        >
          <option value="all">All</option>
          <option value="faculty">Faculty</option>
          <option value="student">Student</option>
        </select>
        <button
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleCreate}
        >
          Create Notice
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">📝 All Notices</h2>
        {notices.map((notice) => (
          <div
            key={notice._id}
            className="bg-white/10 p-3 rounded mb-2 shadow"
          >
            <h3 className="text-lg font-bold">{notice.title}</h3>
            <p>{notice.description}</p>
            <p className="text-sm text-gray-300 mt-1">
              📤 For: {notice.forRole.toUpperCase()} | By:{" "}
              {notice.createdBy?.name || "Admin"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotice;