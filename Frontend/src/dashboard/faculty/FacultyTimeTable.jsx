import React, { useState, useEffect } from "react";

export default function TimetableViewer() {
  const [selectedView, setSelectedView] = useState("Student");
  const [facultySchedule, setFacultySchedule] = useState([]);
  const [studentSchedule, setStudentSchedule] = useState({});

  const departments = ["Computer", "Electrical", "Civil", "Mechanical", "IT", "Automobile", "E&TC"];
  const years = ["FY", "SY", "TY"];
  const timeSlots = [
    "9:00–10:00",
    "10:00–11:00",
    "11:10–11:45", // Recess/Lunch
    "11:45–1:45",
    "1:45–1:55",   // Short Break
    "1:55–2:55",
    "2:55–3:55",
  ];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [selectedDept, setSelectedDept] = useState("Computer");
  const [selectedYear, setSelectedYear] = useState("SY");

  const [loggedFacultyEmail, setLoggedFacultyEmail] = useState("");

  // filters
  const [searchTerm, setSearchTerm] = useState("");
  const [facultyDept, setFacultyDept] = useState("");
  const [facultyYear, setFacultyYear] = useState("");
  const [facultySubject, setFacultySubject] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("loggedFacultyEmail") || "";
    setLoggedFacultyEmail(email);

    const allSchedules = JSON.parse(localStorage.getItem("faculty_schedules")) || [];
    if (email) {
      setFacultySchedule(allSchedules.filter(f => f.facultyEmail === email));
    } else {
      setFacultySchedule(allSchedules);
    }

    const storedStudent = JSON.parse(localStorage.getItem("student_timetables")) || {};
    setStudentSchedule(storedStudent);
  }, []);

  const studentTimetable = studentSchedule?.[selectedDept]?.[selectedYear] || {};

  const subjectOptions = facultyDept
    ? [...new Set(facultySchedule.filter(f => f.department === facultyDept).map(f => f.subject))]
    : [];

  const filteredFaculty = facultySchedule.filter(f => {
    const matchesSearch =
      f.facultyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.subject?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = facultyDept ? f.department === facultyDept : true;
    const matchesYear = facultyYear ? f.year === facultyYear : true;
    const matchesSubject = facultySubject ? f.subject === facultySubject : true;

    return matchesSearch && matchesDept && matchesYear && matchesSubject;
  });

  // Recess letters mapping like admin
  const recessLetters = { Monday: "R", Tuesday: "E", Wednesday: "C", Thursday: "E", Friday: "S", Saturday: "S" };

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Diploma Timetable</h2>

      {/* View toggle */}
      <div className="flex gap-3 mb-4">
        {["Student", "Faculty"].map((v) => (
          <button
            key={v}
            onClick={() => setSelectedView(v)}
            className={`px-4 py-2 rounded-lg shadow ${
              selectedView === v ? "bg-blue-600 text-white" : "bg-slate-600 text-gray-300"
            }`}
          >
            {v} View
          </button>
        ))}
      </div>

      {/* STUDENT VIEW */}
      {selectedView === "Student" && (
        <>
          <div className="flex gap-3 mb-4 items-center">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="p-2 bg-slate-700 border border-gray-500 rounded-lg"
            >
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="p-2 bg-slate-700 border border-gray-500 rounded-lg"
            >
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
          </div>

          <div className="overflow-auto rounded-lg shadow-lg border border-gray-600 bg-slate-800">
            <table className="min-w-full text-white border-collapse">
              <thead>
                <tr className="bg-slate-700 text-blue-300">
                  <th className="px-3 py-2">Day / Time</th>
                  {timeSlots.map((slot) => (
                    <th key={slot} className="px-3 py-2">
                      {slot === "11:10–11:45" ? <span className="text-orange-300">11:10-11:45</span> :
                       slot === "1:45–1:55" ? <span className="text-yellow-300">1:45-1:55</span> : slot}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day} className="border-t border-slate-700">
                    <td className="px-3 py-2 font-semibold text-blue-300">{day}</td>
                    {timeSlots.map((slot) => {
                      if (slot === "11:10–11:45") {
                        return (
                          <td key={day+slot} className="px-3 py-2 text-orange-300 font-bold text-center">
                            {recessLetters[day]}
                          </td>
                        );
                      }
                      if (slot === "1:45–1:55") {
                        return (
                          <td key={day+slot} className="px-3 py-2 text-yellow-300 font-semibold text-center">
                            SHORT BREAK
                          </td>
                        );
                      }

                      const entry = studentTimetable[day]?.[slot];
                      const subject = entry?.subject || "—";
                      const teacher = entry?.teacher;
                      return (
                        <td key={day+slot} className="px-3 py-2">
                          {subject}{teacher ? ` - ${teacher}` : ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* FACULTY VIEW */}
      {selectedView === "Faculty" && (
        <>
          <div className="flex gap-3 mb-4 items-center flex-wrap">
            <input
              type="text"
              placeholder="Search by subject or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 bg-slate-700 border border-gray-500 rounded-lg w-64"
            />
            <select
              value={facultyDept}
              onChange={(e) => { setFacultyDept(e.target.value); setFacultySubject(""); }}
              className="p-2 bg-slate-700 border border-gray-500 rounded-lg"
            >
              <option value="">All Departments</option>
              {departments.map((d) => <option key={d}>{d}</option>)}
            </select>
            <select
              value={facultyYear}
              onChange={(e) => setFacultyYear(e.target.value)}
              className="p-2 bg-slate-700 border border-gray-500 rounded-lg"
            >
              <option value="">All Years</option>
              {years.map((y) => <option key={y}>{y}</option>)}
            </select>
         
          </div>

          <div className="overflow-auto rounded-lg shadow-lg border border-gray-600 bg-slate-800">
            <table className="min-w-full text-white border-collapse">
              <thead>
                <tr className="bg-slate-700 text-blue-300">
                  <th className="px-3 py-2">Faculty</th>
                  <th className="px-3 py-2">Subject</th>
                  <th className="px-3 py-2">Day</th>
                  <th className="px-3 py-2">Time</th>
                  <th className="px-3 py-2">Year</th>
                  <th className="px-3 py-2">Department</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaculty.length === 0 ? (
                  <tr><td colSpan="6" className="text-center text-gray-300 p-4">No schedule</td></tr>
                ) : (
                  filteredFaculty.map((f, idx) => (
                    <tr key={idx} className="border-t border-slate-700">
                      <td className="px-3 py-2">{f.facultyName}</td>
                      <td className="px-3 py-2">{f.subject}</td>
                      <td className="px-3 py-2">{f.day}</td>
                      <td className="px-3 py-2">
                        {f.time === "11:10–11:45" ? "Recess" :
                         f.time === "1:45–1:55" ? "Short Break" : f.time}
                      </td>
                      <td className="px-3 py-2">{f.year}</td>
                      <td className="px-3 py-2">{f.department}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}