import React, { useEffect, useState } from "react";
import {
  fetchStudentAttendance,
  deleteStudentAttendance,
  deleteSingleStudentAttendance,
} from "../../services/AttendanceApi";
import { Trash2 } from "lucide-react";

const StudentViewAttendance = () => {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7; // Show 7 dates per page

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetchStudentAttendance();
      setRecords(res.data.attendance || []);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = async (id) => {
    if (!window.confirm("Are you sure you want to delete this date's record?")) return;
    try {
      await deleteStudentAttendance(id);
      setRecords(records.filter((rec) => rec._id !== id));
    } catch (err) {
      console.error("Error deleting record:", err);
    }
  };

  const handleDeleteStudent = async (recordId, studentId) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await deleteSingleStudentAttendance(recordId, studentId);
      setRecords((prev) =>
        prev.map((rec) =>
          rec._id === recordId
            ? { ...rec, students: rec.students.filter((s) => s._id !== studentId) }
            : rec
        )
      );
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  const subjects = [...new Set(records.map((rec) => rec.subject))];

  if (loading) return <p className="text-center text-lg font-semibold mt-6">Loading...</p>;

  // Sort records by date descending
  const sortedRecords = [...records].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Apply search & subject filters
  const filteredRecords = sortedRecords
    .map((rec) => {
      const filteredStudents = rec.students?.filter(
        (s) =>
          s.name.toLowerCase().includes(search.toLowerCase()) &&
          (subject ? rec.subject === subject : true)
      );
      return { ...rec, students: filteredStudents };
    })
    .filter((rec) => rec.students?.length > 0);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">📋 Student Attendance Records</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="🔍 Search by student name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 px-4 py-2 rounded-lg text-white w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border border-gray-400 px-4 py-2 text-black bg-purple-100 rounded-lg w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Subjects</option>
          {subjects.map((subj, idx) => (
            <option key={idx} value={subj}>{subj}</option>
          ))}
        </select>
      </div>

      {/* Attendance Cards */}
      {currentRecords.length === 0 ? (
        <p className="text-gray-300 font-medium text-center">❌ No attendance records found.</p>
      ) : (
        <div className="space-y-10">
          {currentRecords.map((rec) => (
            <div key={rec._id} className="shadow-xl rounded-xl p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <h3 className="text-xl font-semibold text-white">
                  Date: {new Date(rec.date).toLocaleDateString()}
                </h3>
                <button
                  onClick={() => handleDeleteRecord(rec._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete 
                </button>
              </div>

              <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
                <table className="min-w-full text-sm text-white rounded-xl border-separate border-spacing-0">
                  <thead className="bg-purple-700 backdrop-blur-sm">
                    <tr>
                      <th className="p-3 border border-white/10">Student Name</th>
                      <th className="p-3 border border-white/10">Subject</th>
                      <th className="p-3 border border-white/10">Status</th>
                      <th className="p-3 border border-white/10">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rec.students?.map((s) => (
                      <tr key={s._id} className="p-3 border border-white/10">
                        <td className="p-3 border border-white/10">{s.name}</td>
                        <td className="p-3 border border-white/10">{rec.subject}</td>
                        <td className={`p-3 border border-white/10 font-bold ${s.status === "Present" ? "text-green-600" : "text-red-600"}`}>
                          {s.status}
                        </td>
                        <td className="p-3 border border-white/10">
                          <button
                            onClick={() => handleDeleteStudent(rec._id, s._id)}
                            className="text-red-400 hover:text-red-300 transition"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-6 gap-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-3 py-2 text-white font-medium">{currentPage} / {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentViewAttendance;
