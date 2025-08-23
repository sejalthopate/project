import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageClassView = () => {
  const [classes, setClasses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/manageclass/getall-manageclass",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setClasses(res.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Manage Classes 
      </h2>

      {classes.length === 0 ? (
        <p className="text-gray-300">No classes available.</p>
      ) : (
        <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
          <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
            <thead  className="bg-purple-300/10 backdrop-blur-sm">
              <tr>
                <th className="p-3 border border-white/10">Department</th>
                <th className="p-3 border border-white/10">Semester</th>
                <th className="p-3 border border-white/10">Date</th>
                <th className="p-3 border border-white/10">Day</th>
                <th className="p-3 border border-white/10">Time</th>
                <th className="p-3 border border-white/10">Previous Lecture</th>
                <th className="p-3 border border-white/10">Previous Staff</th>
                <th className="p-3 border border-white/10">Lecture</th>
                <th className="p-3 border border-white/10">Staff</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr>
                  <td className="p-3 border border-white/10">{cls.department}</td>
                  <td className="p-3 border border-white/10">{cls.semester}</td>
                  <td className="p-3 border border-white/10">{cls.date}</td>
                  <td className="p-3 border border-white/10">{cls.day}</td>
                  <td className="p-3 border border-white/10">{cls.time}</td>
                  <td className="p-3 border border-white/10">{cls.previousLecture}</td>
                  <td className="p-3 border border-white/10">{cls.previousStaff}</td>
                  <td className="p-3 border border-white/10">{cls.manageLecture}</td>
                  <td className="p-3 border border-white/10">{cls.manageStaff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageClassView;