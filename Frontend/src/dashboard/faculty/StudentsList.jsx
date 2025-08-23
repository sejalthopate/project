import React, { useEffect, useState } from "react";
import axios from "axios";
import { GraduationCap } from "lucide-react";

// ✅ Date formatting function
const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function FacultyStudentsList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/v1/students/getall-managestudent",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(Array.isArray(res.data.students) ? res.data.students : []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      }
    };

    fetchStudents();
  }, []);

  // Filter logic
  const filteredStudents = students.filter((std) => {
    const matchesDepartment =
      selectedDepartment === "All" || std.department === selectedDepartment;

    const matchesClass =
      selectedClass === "All" || std.className === selectedClass;

    const matchesSearch =
      std.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.enrollmentNo?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDepartment && matchesClass && matchesSearch;
  });

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 pb-85 h-250 text-white">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <GraduationCap className="text-3xl font-bold mb-6 text-center" />
        Student List
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or enrollment no..."
          className="border p-2 rounded w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Department Filter */}
        <div className="flex items-center">
          <label className="mr-2 font-medium text-sm">Select Department:</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="All">All</option>
            <option value="Computer">Computer</option>
            <option value="IT">IT</option>
            <option value="ENTC">ENTC</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Auto Mobile">Auto Mobile</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>
      </div>

      {/* Class Filter */}
      <div className="flex gap-3 mb-4">
        <span className="font-medium text-sm mt-1">Select Class:</span>
        {["All", "FY", "SY", "TY"].map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`py-1 px-3 rounded-full text-sm border transition duration-200
              ${
                selectedClass === cls
                  ? "bg-violet-600 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
              <th className="p-3 border border-white/10">Name</th>
              <th className="p-3 border border-white/10">Enrollment No</th>
              <th className="p-3 border border-white/10">Course</th>
              <th className="p-3 border border-white/10">Semester</th>
              <th className="p-3 border border-white/10">Department</th>
              <th className="p-3 border border-white/10">Class</th>
              <th className="p-3 border border-white/10">Batch</th>
              <th className="p-3 border border-white/10">Phone</th>
              <th className="p-3 border border-white/10">DOB</th>
              <th className="p-3 border border-white/10">Gender</th>
              <th className="p-3 border border-white/10">Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((std) => (
                <tr key={std._id} className="text-center">
                  <td className="p-3 border border-white/10">{std.name}</td>
                  <td className="p-3 border border-white/10">{std.enrollmentNo}</td>
                  <td className="p-3 border border-white/10">{std.course}</td>
                  <td className="p-3 border border-white/10">{std.semester}</td>
                  <td className="p-3 border border-white/10">{std.department}</td>
                  <td className="p-3 border border-white/10">{std.className}</td>
                  <td className="p-3 border border-white/10">{std.batch}</td>
                  <td className="p-3 border border-white/10">{std.phone}</td>

                  {/* ✅ Formatted DOB */}
                  <td className="p-3 border border-white/10">
                    {formatDate(std.dob)}
                  </td>

                  <td className="p-3 border border-white/10">{std.gender}</td>
                  <td className="p-3 border border-white/10">{std.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="p-2 border text-center text-gray-500"
                  colSpan="11"
                >
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
