import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

// Courses (adjust to match backend)
const departments = ["Computer", "Electrical", "Civil", "Mechanical", "IT", "Automobile", "E&TC"];

export default function AttendanceReport() {
  const [studentClass, setStudentClass] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Backend data
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch students and attendance records
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Students data
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://project-pd83.onrender.com/api/v1/students/getall-managestudent",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudents(Array.isArray(res.data.students) ? res.data.students : []);

        // Attendance data
     const attendanceRes = await axios.get(
  "https://project-pd83.onrender.com/api/v1/AttendanceRoutes/student/view",
  { headers: { Authorization: `Bearer ${token} `} }
);
setAttendanceRecords(attendanceRes.data.attendance || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute percentage attendance per student
  const studentAttendancePercentage = useMemo(() => {
    const map = {}; // { studentId: { presentCount, totalCount } }
    attendanceRecords.forEach(record => {
      record.students.forEach(student => {
        if (!map[student._id]) map[student._id] = { present: 0, total: 0 };
        map[student._id].total += 1;
        if (student.status === "Present") map[student._id].present += 1;
      });
    });

    const result = {};
    Object.keys(map).forEach(studentId => {
      const { present, total } = map[studentId];
      result[studentId] = total ? ((present / total) * 100).toFixed(2) : "0";
    });
    return result;
  }, [attendanceRecords]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter(std =>
      (studentClass === "All" || std.className === studentClass) &&
      (searchTerm === "" ||
        std.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        std.enrollmentNo?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [students, studentClass, searchTerm]);

  if (loading) return <p className="text-center mt-6">Loading data...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Attendance Report</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <select
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 bg-white text-gray-900"
        >
          {["All", "FY", "SY", "TY"].map(cls => <option key={cls} value={cls}>{cls}</option>)}
        </select>
        <input
          type="text"
          placeholder="Search by name or enrollment"
          className="border px-4 py-2 rounded bg-white text-gray-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Data Table */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        {filteredStudents.length === 0 ? (
          <p className="text-gray-500 text-center">No students found.</p>
        ) : (
          <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
            <thead className="bg-purple-300/10 backdrop-blur-sm">
              <tr>
                <th className="p-3 border border-white/10">Enrollment</th>
                <th className="p-3 border border-white/10">Name</th>
             
                <th className="p-3 border border-white/10">Department</th>
                <th className="p-3 border border-white/10">Class</th>
                <th className="p-3 border border-white/10">% Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(std => (
                <tr key={std._id}>
                   <td className="p-3 border border-white/10">{std.enrollmentNo}</td>
                  <td className="p-3 border border-white/10">{std.name}</td>
               
                  <td className="p-3 border border-white/10">{std.department}</td>
                  <td className="p-3 border border-white/10">{std.className}</td>
                  <td className="p-3 border border-white/10">
                    {studentAttendancePercentage[std._id] || "0"}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
