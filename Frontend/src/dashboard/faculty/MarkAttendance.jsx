// frontend/src/components/MarkAttendance.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MarkAttendance() {
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);

  // Fetch students from backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://project-pd83.onrender.com/api/v1/students/getall-managestudent",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const studentData = res.data.students.map((stu) => ({
          studentId: stu._id,
          name: stu.name,
          status: "Absent", // default to Absent
        }));
        setStudents(studentData);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  // Handle Present / Absent change
  const handleStatusChange = (index, status) => {
    const updated = [...students];
    updated[index].status = status;
    setStudents(updated);
  };

  // Submit attendance
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://project-pd83.onrender.com/api/v1/AttendanceRoutes/student/mark",
        { date, subject, students },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Attendance submitted successfully ✅");
    } catch (err) {
      console.error("Error submitting attendance:", err.response || err);
      alert("Error submitting attendance ❌");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 pb-85 h-250 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">📋 Mark Attendance</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex gap-4">
          <div>
            <label className="block mb-1">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Subject:</label>
            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="border p-2 rounded"
            />
          </div>
        </div>


      <div className="overflow-auto rounded-xl border border-white/20 m-5 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
              <th className="p-3 border border-white/10">#</th>
              <th className="p-3 border border-white/10">Name</th>
              <th className="p-3 border border-white/10">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map((stu, idx) => (
              <tr key={stu.studentId} className="text-center">
                <td className="p-3 border border-white/10">{idx + 1}</td>
                <td className="p-3 border border-white/10">{stu.name}</td>
                <td className="p-3 border border-white/10">
                  <label>
                    <input
                      type="radio"
                      checked={stu.status === "Present"}
                      onChange={() => handleStatusChange(idx, "Present")}
                    />{" "}
                    Present
                  </label>
                  <label>
                    <input
                      type="radio"
                      checked={stu.status === "Absent"}
                      onChange={() => handleStatusChange(idx, "Absent")}
                    />{" "}
                    Absent
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-violet-600 ml-8 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
        >
           Submit Attendance
        </button>
      </form>
    </div>
  );
}
