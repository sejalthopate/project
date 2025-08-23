import React, { useEffect, useState } from "react";
import {
  addNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
} from "../../services/noticeApi";

const FacultyNotices = () => {
  const [adminNotices, setAdminNotices] = useState([]);
  const [myNotices, setMyNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibleTo, setVisibleTo] = useState("student");
  const [editingNotice, setEditingNotice] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const facultyId = user?.id;

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await getAllNotices();

      const adminCreated = data.filter(
        (n) =>
          n.createdBy === "Admin" &&
          (n.visibleTo === "faculty" || n.visibleTo === "all")
      );

      const facultyOwn = data.filter(
        (n) => n.createdBy === "Faculty" && n.createdById === facultyId
      );

      setAdminNotices(adminCreated);
      setMyNotices(facultyOwn);
    } catch (err) {
      console.error("Error fetching notices", err);
    }
  };

  const handleAddOrUpdateNotice = async (e) => {
    e.preventDefault();

    try {
      if (editingNotice) {
        await updateNotice(editingNotice._id, {
          title,
          content,
          visibleTo,
        });
      } else {
        await addNotice({
          title,
          content,
          visibleTo,
          createdBy: "Faculty",
          createdById: facultyId,
        });
      }

      setTitle("");
      setContent("");
      setVisibleTo("student");
      setShowForm(false);
      setEditingNotice(null);
      fetchNotices();
    } catch (err) {
      console.error("Error saving notice", err);
    }
  };

  const handleEdit = (notice) => {
    setTitle(notice.title);
    setContent(notice.content);
    setVisibleTo(notice.visibleTo);
    setEditingNotice(notice);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotice(id);
      fetchNotices();
    } catch (err) {
      console.error("Error deleting notice", err);
    }
  };

  const formatDateTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="p-6 bg-gradient-to-br from-purple-900 to-purple-700 min-h-screen pb-85 h-250 text-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Faculty Notices</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingNotice(null);
            setTitle("");
            setContent("");
            setVisibleTo("student");
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
        >
          {showForm ? "Cancel" : "➕ Add Notice"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddOrUpdateNotice}
          className="bg-white text-black shadow-lg rounded-lg p-6 mb-8"
        >
          <div className="mb-4">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-1">Content</label>
            <textarea
              className="w-full border px-3 py-2 rounded-md"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-1">Visible To</label>
            <select
              className="w-full border px-3 py-2 rounded-md"
              value={visibleTo}
              onChange={(e) => setVisibleTo(e.target.value)}
              required
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="all">All</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-200"
          >
            {editingNotice ? "Update Notice" : "Submit Notice"}
          </button>
        </form>
      )}

      {/* Admin Notices */}
      <div className="mb-10">
        <h3 className="text-2xl font-semibold mb-4">📢 Admin Notices</h3>
        {adminNotices.length === 0 ? (
          <p className="text-white-200">No admin notices available for faculty.</p>
        ) : (
          <div className="grid gap-4">
            {adminNotices.map((notice) => (
              <div
                key={notice._id}
                className=" p-5 rounded-lg shadow-md overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg"
              >
                <h4 className="text-xl text-white-900 font-bold ">{notice.title}</h4>
                <p className="text-sm text-white-800 mt-2">{notice.content}</p>
                <div className="text-xs text-white-700 mt-2">
                  Posted by: Admin <br />
                  {formatDateTime(notice.createdAt)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Faculty Notices */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">📢 My Created Notices</h3>
        {myNotices.length === 0 ? (
          <p className="text-gray-200">You haven’t posted any notices yet.</p>
        ) : (
          <div className="grid gap-4">
            {myNotices.map((notice) => (
              <div
                key={notice._id}
                className=" p-5 rounded-lg shadow-md overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg"
              >
                <h4 className="text-xl text-white-900 font-bold ">{notice.title}</h4>
                <p className="text-sm text-white-900 mt-2">{notice.content}</p>
                <p className="text-xs text-white-700 mt-1">
                  Visible To: {notice.visibleTo}
                </p>
                <p className="text-xs text-white-400 mt-1">
                  {formatDateTime(notice.createdAt)}
                </p>
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => handleEdit(notice)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyNotices;