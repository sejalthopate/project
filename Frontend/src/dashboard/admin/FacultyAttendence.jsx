
import React, { useEffect, useState } from "react";
import { getFacultyAssignments } from "../../services/FacultyAssignApi";
import {submitFacultyAttendance} from '../../services/AttendanceApi'

const FacultyAttendance = () => {
  const [faculties, setFaculties] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔽 Filters
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [searchFaculty, setSearchFaculty] = useState("");

  // Fetch assigned faculties
  useEffect(() => {
    const fetchAssignedFaculties = async () => {
      try {
        const assignments = await getFacultyAssignments();
        console.log("Assignments API response:", assignments);

        const uniqueFacultiesMap = {};
        assignments.forEach((a) => {
          if (!uniqueFacultiesMap[a.facultyName]) {
            uniqueFacultiesMap[a.facultyName] = {
              _id: a._id,
              name: a.facultyName,
              department: a.department,
              year: a.year,
            };
          }
        });
        const uniqueFaculties = Object.values(uniqueFacultiesMap);
        setFaculties(uniqueFaculties);

        const initialAttendance = {};
        uniqueFaculties.forEach((f) => {
          initialAttendance[f._id] = "present"; // default Present
        });
        setAttendance(initialAttendance);
      } catch (err) {
        console.error("Error fetching assigned faculties:", err);
        setFaculties([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedFaculties();
  }, []);

  // Change handler
  const handleChange = (facultyId, value) => {
    setAttendance((prev) => ({ ...prev, [facultyId]: value }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) return alert("Please select a date!");

    try {
      const facultiesArray = Object.entries(attendance).map(
        ([facultyId, status]) => ({
          facultyId,
          name: faculties.find((f) => f._id === facultyId)?.name || "",
          status: status === "present" ? "Present" : "Absent",
        })
      );

      await submitFacultyAttendance({
        date,
        department,
        year,
        faculties: facultiesArray,
      });

      alert("Faculty attendance saved successfully!");
    } catch (err) {
      console.error("Error submitting attendance:", err);
      alert("Error saving attendance!");
    }
  };

  // 🔽 Filtering faculties
  const filteredFaculties = faculties.filter((f) => {
    return (
      (!department || f.department === department) &&
      (!year || f.year === year) &&
      (!searchFaculty ||
        f.name.toLowerCase().includes(searchFaculty.toLowerCase()))
    );
  });

  if (loading) return <p>Loading faculties...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Faculty Attendance</h2>

      {/* 🔽 Filters */}
      <div className="flex gap-4 mb-4">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border text-black bg-white p-2"
        >
          <option value="">Select Department</option>
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
          className="border text-black bg-white p-2"
        >
          <option value="">Select Year</option>
          <option value="FY">FY</option>
          <option value="SY">SY</option>
          <option value="TY">TY</option>
        </select>

        {/* 🔽 Faculty Name Search */}
        <input
          type="text"
          placeholder="Search Faculty Name"
          value={searchFaculty}
          onChange={(e) => setSearchFaculty(e.target.value)}
          className="border p-2"
        />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mr-2">Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-1"
            required
          />
        </div>

      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
              <th className="p-3 border border-white/10">Faculty Name</th>
              <th className="p-3 border border-white/10">Department</th>
              <th className="p-3 border border-white/10">Year</th>
              <th className="p-3 border border-white/10">Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculties.length > 0 ? (
              filteredFaculties.map((f) => (
                <tr key={f._id}>
                  <td className="p-3 border border-white/10">{f.name}</td>
                  <td className="p-3 border border-white/10">{f.department}</td>
                  <td className="p-3 border border-white/10">{f.year}</td>
                  <td className="p-3 border border-white/10">
                    {/* ✅ Radio Buttons instead of select */}
                    <label className="mr-2">
                      <input
                        type="radio"
                        name={`attendance-${f._id}`}
                        value="present"
                        checked={attendance[f._id] === "present"}
                        onChange={() => handleChange(f._id, "present")}
                      />{" "}
                      Present
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`attendance-${f._id}`}
                        value="absent"
                        checked={attendance[f._id] === "absent"}
                        onChange={() => handleChange(f._id, "absent")}
                      />{" "}
                      Absent
                    </label>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center">
                  No faculty found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit Attendance
        </button>
      </form>
    </div>
  );
};

export default FacultyAttendance;
