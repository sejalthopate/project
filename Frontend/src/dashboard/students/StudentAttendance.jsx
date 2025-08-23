import React, { useState, useEffect } from "react";
import {
  fetchStudentAttendance

} from "../../services/AttendanceApi";

export default function StudentAttendance() {
  const [records, setRecords] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // ✅ Student Attendance Load
  useEffect(() => {
    const loadAttendance = async () => {
      try {
        const res = await fetchStudentAttendance();
        setRecords(res.data.attendance || []);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };
    loadAttendance();
  }, []);

  // ✅ Filters + Search
  const filteredRecords = records
    .filter((rec) => {
      const matchesDate = selectedDate
        ? new Date(rec.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
        : true;
      const matchesSubject = selectedSubject
        ? rec.subject === selectedSubject
        : true;
      return matchesDate && matchesSubject;
    })
    .flatMap((rec) =>
      rec.students.map((stu) => ({
        id: rec._id + stu._id,
        recordId: rec._id,
        studentId: stu._id,
        date: rec.date,
        subject: rec.subject,
        name: stu.name,
        status: stu.status,
      }))
    )
    .filter((stu) =>
      stu.name.toLowerCase().includes(searchName.toLowerCase())
    );

  // ✅ Pagination
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  const paginate = (pageNum) => setCurrentPage(pageNum);


  // ✅ Subjects Dropdown
  const subjects = [...new Set(records.map((rec) => rec.subject))];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 pb-85 h-250 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📋 Student Attendance Records
      </h2>

      {/* Filters + Search */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border p-2 rounded text-white"
        />
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="border p-2 bg-white rounded text-black"
        >
          <option value="">All Subjects</option>
          {subjects.map((subj, idx) => (
            <option key={idx} value={subj}>
              {subj}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by student name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="border p-2 rounded text-white"
        />
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
              <th className="p-3 border border-white/10">#</th>
              <th className="p-3 border border-white/10">Date</th>
              <th className="p-3 border border-white/10">Subject</th>
              <th className="p-3 border border-white/10">Student</th>
              <th className="p-3 border border-white/10">Status</th>
             
            </tr>
          </thead>
          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((rec, idx) => (
                <tr key={rec.id}>
                  <td className="p-3 border border-white/10">
                    {idx + 1 + (currentPage - 1) * recordsPerPage}
                  </td>
                  <td className="p-3 border border-white/10">
                    {new Date(rec.date).toLocaleDateString()}
                  </td>
                  <td className="p-3 border border-white/10">{rec.subject}</td>
                  <td className="p-3 border border-white/10">{rec.name}</td>
                  <td className="p-3 border border-white/10">{rec.status}</td>
                  
                
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  No attendance records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex p-6 justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => paginate(num)}
            className={`px-3 py-1 border rounded ${
              currentPage === num
                ? "bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
                : "bg-white text-black"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}
