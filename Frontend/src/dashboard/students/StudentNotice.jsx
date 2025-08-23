import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentNotices = () => {
  const [adminNotices, setAdminNotices] = useState([]);
  const [facultyNotices, setFacultyNotices] = useState([]);

  useEffect(() => {
    getNotices();
  }, []);

  const getNotices = async () => {
    try {
      const { data } = await axios.get("https://project-pd83.onrender.com/api/v1/notices");

      const adminFiltered = data.filter(
        (notice) =>
          notice.createdBy === "Admin" &&
          (notice.visibleTo === "student" || notice.visibleTo === "all")
      );

   
      const facultyFiltered = data.filter(
        (notice) =>
          notice.createdBy === "Faculty" &&
          (notice.visibleTo === "student" || notice.visibleTo === "all")
      );

      setAdminNotices(adminFiltered);
      setFacultyNotices(facultyFiltered);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-3xl text-white  font-bold mb-6 text-center">Student Notices</h2>

      {/* Admin Notices Panel */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">📢 Admin Notices</h3>
        {adminNotices.length === 0 ? (
          <p>No admin notices available for students.</p>
        ) : (
          <div className="grid gap-4">
            {adminNotices.map((notice) => (
              <div key={notice._id} className="bg-purple-200/10 shadow-md p-4 rounded-md">
                <h3 className="text-lg text-gray-900 font-semibold">{notice.title}</h3>
                <p className="text-sm text-gray-600">{notice.content}</p>
                <p className="text-xs text-gray-400 mt-2">Posted by: Admin</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Faculty Notices Panel */}
      <div>
        <h3 className="text-xl font-semibold mb-2">📢 Faculty Notices</h3>
        {facultyNotices.length === 0 ? (
          <p>No faculty notices available for students.</p>
        ) : (
          <div className="grid gap-4">
            {facultyNotices.map((notice) => (
              <div key={notice._id} className="bg-purple-200 shadow-md p-4 rounded-md">
                <h3 className="text-lg text-gray-900 font-semibold">{notice.title}</h3>
                <p className="text-sm text-gray-600">{notice.content}</p>
                <p className="text-xs text-gray-400 mt-2">Posted by: Faculty</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentNotices;