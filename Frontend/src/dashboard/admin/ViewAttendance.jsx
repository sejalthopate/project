
import React, { useEffect, useState } from "react";
import {
  fetchFacultyAttendance,
  deleteFacultyAttendance,
  deleteSingleFacultyAttendance, 
} from "../../services/AttendanceApi";
import { getFacultyAssignments } from "../../services/FacultyAssignApi";
import { Pencil, Trash2 } from 'lucide-react';



const FacultyViewAttendance = () => {
  const [records, setRecords] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    loadAssignments();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetchFacultyAttendance();
      setRecords(res.data.attendance || []);
    } catch (error) {
      console.error("Error fetching faculty attendance:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAssignments = async () => {
    try {
      const res = await getFacultyAssignments();
      setAssignments(res || []);
    } catch (error) {
      console.error("Error fetching faculty assignments:", error);
    }
  };

  // पूर्ण record delete
  const handleDeleteRecord = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await deleteFacultyAttendance(id);
      setRecords(records.filter((rec) => rec._id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // फक्त single faculty delete
  const handleDeleteFaculty = async (recordId, facultyId) => {
    if (!window.confirm("Are you sure you want to delete this faculty?")) return;
    try {
      await deleteSingleFacultyAttendance(recordId, facultyId);
      setRecords((prev) =>
        prev.map((rec) =>
          rec._id === recordId
            ? { ...rec, faculties: rec.faculties.filter((f) => f._id !== facultyId) }
            : rec
        )
      );
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const getFacultyDeptYear = (facultyName) => {
    const found = assignments.find((a) => a.facultyName === facultyName);
    return {
      department: found?.department || "-",
      year: found?.year || "-",
    };
  };

  // Filter
  const filteredRecords = records
  .map((rec) => {
    const filteredFaculties = rec.faculties?.filter((f) => {
      const facultyNameMatch = f.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const { department: facDept, year: facYear } = getFacultyDeptYear(f.name);

      const departmentMatch = department
        ? facDept.toLowerCase() === department.toLowerCase()
        : true;

      const yearMatch = year ? facYear.toLowerCase() === year.toLowerCase() : true;

      return facultyNameMatch && departmentMatch && yearMatch;
    });

    return { ...rec, faculties: filteredFaculties };
  })
  .filter((rec) => rec.faculties?.length > 0); 


  if (loading)
    return <p className="text-center text-lg font-semibold">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        📊 Faculty Attendance Records
      </h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="🔍 Search by faculty name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-400 px-4 py-2 rounded-lg text-white w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border border-gray-400 px-4 py-2 text-black   bg-purple-100 opacity-0.3  rounded-lg w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Departments</option>
          <option value="Computer">Computer</option>
          <option value="IT">IT</option>
          <option value="ENTC">ENTC</option>
          <option value="Mechanical">Mechanical</option>
          <option value="Civil">Civil</option>
          <option value="Auto Mobile">Auto Mobile</option>
          <option value="Electrical">Electrical</option>
        </select>

        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border border-gray-400 px-4 py-2 text-black   bg-purple-100 opacity-0.3 rounded-lg w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Years</option>
          <option value="FY">FY</option>
          <option value="SY">SY</option>
          <option value="TY">TY</option>
          <option value="Final Year">Final Year</option>
        </select>
      </div>

      {/* Records */}
      {filteredRecords.length === 0 ? (
        <p className="text-gray-700 font-medium text-center">
          ❌ No attendance records found.
        </p>
      ) : (
        <div className="space-y-10">
          {filteredRecords.map((rec) => (
            <div
              key={rec._id}
              className="shadow-xl rounded-xl p-6 border border-gray-200"
            >
              {/* Date on Top */}
              <div className="flex justify-between items-center mb-6 border-b pb-3">
                <h3 className="text-xl font-semibold text-white">
                   Date: <span className="text-white">{rec.date}</span>
                </h3>
                <button
                  onClick={() => handleDeleteRecord(rec._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Delete 
                </button>
              </div>

              {/* Table for faculties */}
              <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
                <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
                  <thead className="bg-purple-700 backdrop-blur-sm">
                    <tr>
                      <th className="p-3 border border-white/10">Faculty Name</th>
                      <th className="p-3 border border-white/10">Department</th>
                      <th className="p-3 border border-white/10">Year</th>
                      <th className="p-3 border border-white/10">Status</th>
                      <th className="p-3 border border-white/10">Action</th> 
                    </tr>
                  </thead>
                  <tbody>
                    {rec.faculties?.map((f) => {
                      const { department, year } = getFacultyDeptYear(f.name);
                      return (
                        <tr key={f._id} className="p-3 border border-white/10">
                          <td className="p-3 border border-white/10">
                            {f.name || "Unnamed Faculty"}
                          </td>
                          <td className="p-3 border border-white/10">{department}</td>
                          <td className="p-3 border border-white/10">{year}</td>
                          <td
                            className={`px-6 py-3 font-bold ${
                              f.status === "Present" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {f.status}
                          </td>
                          <td className="p-3 border border-white/10">
                            {/* <button
                      onClick={() => {
                        setEditData(fac);
                        setShowForm(true);
                      }}
                      className="text-yellow-400 hover:text-yellow-300 transition "
                    >
                      <Pencil size={18} />
                    </button> */}
                   <button
  onClick={() => handleDeleteFaculty(rec._id, f._id)}
  className="text-red-400 hover:text-red-300 transition pl-5"
>
  <Trash2 size={18} />
</button>

                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyViewAttendance;
