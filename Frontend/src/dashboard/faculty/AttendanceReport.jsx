import React, { useState, useEffect, useMemo } from "react";
import { getFacultyAssignments } from "../../services/FacultyAssignApi";
import { fetchFacultyAttendance } from "../../services/AttendanceApi";
import axios from "axios";


const departments = ["Computer", "Electrical", "Civil", "Mechanical", "IT", "Automobile", "E&TC"];

export default function AttendanceReport() {
  // Filters
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");

  // Backend data
  const [faculties, setFaculties] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch faculty assignments, attendance
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Faculty assignments
        const assignments = await getFacultyAssignments();
        setFaculties(assignments.map(a => ({
          id: a._id,
          name: a.facultyName,
          department: a.department,
          subject: a.subjectName
        })));

        // Faculty Attendance
        const attendanceRes = await fetchFacultyAttendance();
        setAttendanceRecords(attendanceRes.data.attendance || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Compute percentage attendance per faculty
  const facultyAttendancePercentage = useMemo(() => {
    const map = {}; // { facultyName: { presentCount, totalCount } }
    attendanceRecords.forEach(record => {
      record.faculties.forEach(f => {
        if (!map[f.name]) map[f.name] = { present: 0, total: 0 };
        map[f.name].total += 1;
        if (f.status === "Present") map[f.name].present += 1;
      });
    });
    const result = {};
    Object.keys(map).forEach(fac => {
      const { present, total } = map[fac];
      result[fac] = total ? ((present / total) * 100).toFixed(2) : "0";
    });
    return result;
  }, [attendanceRecords]);

  // Filtered faculty
  const filteredFaculty = useMemo(() => {
    return faculties.filter(f =>
      (department === "" || f.department === department) &&
      (subject === "" || f.subject === subject)
    );
  }, [faculties, department, subject]);

  if (loading) return <p className="text-center mt-6">Loading data...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Faculty Attendance Report</h1>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <select
          value={department}
          onChange={(e) => { setDepartment(e.target.value); setSubject(""); }}
          className="border border-gray-400 rounded px-4 py-2 bg-white text-gray-900"
        >
          <option value="">Select Department</option>
          {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
        </select>

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border border-gray-400 rounded px-4 py-2 bg-white text-gray-900"
        >
          <option value="">Select Subject</option>
          {Array.from(new Set(faculties.map(f => f.subject))).map(subj => (
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>
      </div>

      {/* Faculty Data Table */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        {filteredFaculty.length === 0 ? (
          <p className="text-gray-500 text-center">No faculty records found.</p>
        ) : (
          <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
            <thead className="bg-purple-300/10 backdrop-blur-sm">
              <tr>
                <th className="p-3 border border-white/10">Name</th>
                <th className="p-3 border border-white/10">Department</th>
                <th className="p-3 border border-white/10">Attendance %</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.map(f => (
                <tr key={f.id}>
                  <td className="p-3 border border-white/10">{f.name}</td>
                  <td className="p-3 border border-white/10">{f.department}</td>
                  <td className="p-3 border border-white/10">{facultyAttendancePercentage[f.name] || "0"}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
