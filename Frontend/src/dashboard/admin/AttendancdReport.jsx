// import React, { useState, useEffect, useMemo } from "react";
// import { getFacultyAssignments } from "../../services/FacultyAssignApi";
// import { fetchFacultyAttendance } from "../../services/AttendanceApi";

// // Departments (backend प्रमाणे exact)
// const departments = ["Computer", "Electrical", "Civil", "Mechanical", "IT", "Automobile", "E&TC"];

// export default function AttendanceReport() {
//   const [view, setView] = useState("faculty");

//   // Filters
//   const [department, setDepartment] = useState("");
//   const [subject, setSubject] = useState("");

//   // Backend data
//   const [faculties, setFaculties] = useState([]);
//   const [attendanceRecords, setAttendanceRecords] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch faculty assignments & attendance
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const assignments = await getFacultyAssignments();
//         setFaculties(assignments.map(a => ({
//           id: a._id,
//           name: a.facultyName,
//           department: a.department,
//           subject: a.subjectName
//         })));

//         const attendanceRes = await fetchFacultyAttendance();
//         setAttendanceRecords(attendanceRes.data.attendance || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   // Compute percentage attendance per faculty
//   const facultyAttendancePercentage = useMemo(() => {
//     const map = {}; // { facultyName: { presentCount, totalCount } }

//     attendanceRecords.forEach(record => {
//       record.faculties.forEach(f => {
//         if (!map[f.name]) map[f.name] = { present: 0, total: 0 };
//         map[f.name].total += 1;
//         if (f.status === "Present") map[f.name].present += 1;
//       });
//     });

//     const result = {};
//     Object.keys(map).forEach(fac => {
//       const { present, total } = map[fac];
//       result[fac] = total ? ((present / total) * 100).toFixed(2) : "0";
//     });
//     return result;
//   }, [attendanceRecords]);

//   // Filtered faculty
//   const filteredFaculty = useMemo(() => {
//     return faculties.filter(f =>
//       (department === "" || f.department === department) &&
//       (subject === "" || f.subject === subject)
//     );
//   }, [faculties, department, subject]);

//   if (loading) return <p className="text-center mt-6">Loading faculties...</p>;

//   return (
//     <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
//       <h1 className="text-3xl font-bold mb-6 text-center">Attendance Report</h1>

//       {/* Toggle Buttons */}
//       <div className="flex justify-center gap-6 mb-6">
//         <button
//           onClick={() => setView("faculty")}
//           className={`py-2 px-5 rounded-xl font-semibold shadow-lg transition-transform duration-200 ${
//             view === "faculty"
//               ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white scale-105"
//               : "bg-white text-violet-700 border border-violet-600 hover:bg-violet-50"
//           }`}
//         >
//           Faculty
//         </button>
//         <button
//           onClick={() => setView("student")}
//           className={`py-2 px-5 rounded-xl font-semibold shadow-lg transition-transform duration-200 ${
//             view === "student"
//               ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white scale-105"
//               : "bg-white text-violet-700 border border-violet-600 hover:bg-violet-50"
//           }`}
//         >
//           Student
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap justify-center gap-4 mb-10">
//         <select
//           value={department}
//           onChange={(e) => { setDepartment(e.target.value); setSubject(""); }}
//           className="border border-gray-400 rounded px-4 py-2 bg-white text-gray-900"
//         >
//           <option value="">Select Department</option>
//           {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
//         </select>

//         <select
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//           className="border border-gray-400 rounded px-4 py-2 bg-white text-gray-900"
//         >
//           <option value="">Select Subject</option>
//           {Array.from(new Set(faculties.map(f => f.subject))).map(subj => (
//             <option key={subj} value={subj}>{subj}</option>
//           ))}
//         </select>
//       </div>

//       {/* Data Table */}
//       <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
//         {view === "faculty" ? (
//           filteredFaculty.length === 0 ? (
//             <p className="text-gray-500 text-center">No faculty records found.</p>
//           ) : (
//             <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
//               <thead className="bg-purple-300/10 backdrop-blur-sm">
//                 <tr>
//                   <th className="p-3 border border-white/10">Name</th>
//                   <th className="p-3 border border-white/10">Department</th>
//                   <th className="p-3 border border-white/10">Attendance %</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredFaculty.map(f => (
//                   <tr key={f.id}>
//                     <td className="p-3 border border-white/10">{f.name}</td>
//                     <td className="p-3 border border-white/10">{f.department}</td>
//                     <td className="p-3 border border-white/10">{facultyAttendancePercentage[f.name] || "0"}%</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )
//         ) : (
//           <p className="text-gray-500 text-center">Student view not implemented yet.</p>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect, useMemo } from "react";
import { getFacultyAssignments } from "../../services/FacultyAssignApi";
import { fetchFacultyAttendance } from "../../services/AttendanceApi";
import axios from "axios";

// Departments (backend प्रमाणे exact)
const departments = ["Computer", "Electrical", "Civil", "Mechanical", "IT", "Automobile", "E&TC"];

export default function AttendanceReport() {
  const [view, setView] = useState("faculty");

  // Filters
  const [department, setDepartment] = useState("");
  const [subject, setSubject] = useState("");
  const [studentClass, setStudentClass] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Backend data
  const [faculties, setFaculties] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch faculty assignments, attendance & students
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

        // Attendance
        const attendanceRes = await fetchFacultyAttendance();
        setAttendanceRecords(attendanceRes.data.attendance || []);

        // Students
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/v1/students/getall-managestudent",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudents(Array.isArray(res.data.students) ? res.data.students : []);
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

  // Filtered faculty
  const filteredFaculty = useMemo(() => {
    return faculties.filter(f =>
      (department === "" || f.department === department) &&
      (subject === "" || f.subject === subject)
    );
  }, [faculties, department, subject]);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter(std =>
      (department === "" || std.department === department) &&
      (studentClass === "All" || std.className === studentClass) &&
      (searchTerm === "" ||
        std.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        std.enrollmentNo?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [students, department, studentClass, searchTerm]);

  if (loading) return <p className="text-center mt-6">Loading data...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Attendance Report</h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          onClick={() => setView("faculty")}
          className={`py-2 px-5 rounded-xl font-semibold shadow-lg transition-transform duration-200 ${
            view === "faculty"
              ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white scale-105"
              : "bg-white text-violet-700 border border-violet-600 hover:bg-violet-50"
          }`}
        >
          Faculty
        </button>
        <button
          onClick={() => setView("student")}
          className={`py-2 px-5 rounded-xl font-semibold shadow-lg transition-transform duration-200 ${
            view === "student"
              ? "bg-gradient-to-r from-violet-600 to-purple-700 text-white scale-105"
              : "bg-white text-violet-700 border border-violet-600 hover:bg-violet-50"
          }`}
        >
          Student
        </button>
      </div>

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

        {view === "faculty" && (
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
        )}

        {view === "student" && (
          <>
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
          </>
        )}
      </div>

      {/* Data Table */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        {view === "faculty" ? (
          filteredFaculty.length === 0 ? (
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
          )
        ) : filteredStudents.length === 0 ? (
          <p className="text-gray-500 text-center">No students found.</p>
        ) : (
          <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
            <thead className="bg-purple-300/10 backdrop-blur-sm">
              <tr>
                <th className="p-3 border border-white/10">Name</th>
                <th className="p-3 border border-white/10">Enrollment</th>
                <th className="p-3 border border-white/10">Department</th>
                <th className="p-3 border border-white/10">Class</th>
                <th className="p-3 border border-white/10">% Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(std => (
                <tr key={std._id}>
                  <td className="p-3 border border-white/10">{std.name}</td>
                  <td className="p-3 border border-white/10">{std.enrollmentNo}</td>
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
