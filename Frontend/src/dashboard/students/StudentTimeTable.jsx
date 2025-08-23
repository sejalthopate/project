import React, { useState, useEffect } from "react";

export default function StudentTimetable() {
  const [studentSchedule, setStudentSchedule] = useState({});

  const departments = ['Computer', 'Electrical', 'Civil', 'Mechanical', 'IT', 'Automobile', 'E&TC'];
  const years = ['FY', 'SY', 'TY'];
  const timeSlots = [
    "9:00–10:00",
    "10:00–11:00",
    "11:10–11:45", // Recess
    "11:45–1:45",
    "1:45–1:55",   // Short break
    "1:55–2:55",
    "2:55–3:55",
  ];
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Map for recess letters across days
  const recessLetters = {
    Monday: "R",
    Tuesday: "E",
    Wednesday: "C",
    Thursday: "E",
    Friday: "S",
    Saturday: "S",
  };

  // Selectable dept/year
  const [selectedDept, setSelectedDept] = useState('Computer');
  const [selectedYear, setSelectedYear] = useState('SY');

  useEffect(() => {
    const storedStudent = JSON.parse(localStorage.getItem("student_timetables"));
    if (storedStudent && typeof storedStudent === 'object') {
      setStudentSchedule(storedStudent);
    } else {
      setStudentSchedule({});
    }
  }, []);

  const timetable = studentSchedule?.[selectedDept]?.[selectedYear] || {};

  return (
    <div className="p-6 max-w-7xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Student Timetable</h2>

      <div className="flex gap-3 mb-4 items-center">
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="p-2 bg-slate-700 border border-gray-500 rounded-lg"
        >
          {departments.map(dept => <option key={dept}>{dept}</option>)}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 bg-slate-700 border border-gray-500 rounded-lg"
        >
          {years.map(yr => <option key={yr}>{yr}</option>)}
        </select>
      </div>

      {Object.keys(timetable).length === 0 ? (
        <p className="text-gray-300">No schedule available.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow-lg border border-gray-600 bg-slate-800">
          <table className="min-w-full text-white border-collapse">
            <thead>
              <tr className="bg-slate-700 text-blue-300">
                <th className="px-3 py-2">Day / Time</th>
                {timeSlots.map(slot => (
                  <th key={slot} className="px-3 py-2">
                    {slot === "11:10–11:45" ? (
                      <span className="text-orange-300">11:10-11:45</span>
                    ) : slot === "1:45–1:55" ? (
                      <span className="text-yellow-300">1:45-1:55</span>
                    ) : (
                      slot
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map(day => (
                <tr key={day} className="border-t border-slate-700">
                  <td className="px-3 py-2 font-semibold text-blue-300">{day}</td>
                  {timeSlots.map(slot => {
                    if (slot === "11:10–11:45") {
                      return (
                        <td
                          key={day + slot}
                          className="px-3 py-2 text-orange-300 font-bold text-center"
                        >
                          {recessLetters[day]}
                        </td>
                      );
                    }
                    if (slot === "1:45–1:55") {
                      return (
                        <td
                          key={day + slot}
                          className="px-3 py-2 text-yellow-300 font-semibold text-center"
                        >
                          SHORT BREAK
                        </td>
                      );
                    }

                    const entry = timetable[day]?.[slot];
                    const subject = entry?.subject || "—";
                    const teacher = entry?.teacher;
                    return (
                      <td key={day + slot} className="px-3 py-2">
                        {subject}{teacher ? ` - ${teacher}` : ""}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}