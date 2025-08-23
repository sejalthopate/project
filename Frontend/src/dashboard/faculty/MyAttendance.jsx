import React, { useEffect, useState } from "react";
import { fetchFacultyAttendance } from "../../services/AttendanceApi";

export default function MyAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchFacultyAttendance();
        // API madhe res.data.attendance ahe
        setAttendanceData(res.data.attendance || []);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    getData();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-xl font-bold mb-6">📋 My Attendance</h2>

      {attendanceData.length === 0 ? (
        <p>No attendance found</p>
      ) : (
        attendanceData.map((record) => (
          <div key={record._id} className="mb-8 overflow-auto rounded-lg border border-white/20 bg-white/10 p-4 shadow-md">
            <h3 className="font-semibold mb-4">
              📅 Date: {new Date(record.date).toLocaleDateString()}
            </h3>
            <table className="min-w-full table-auto border-collapse border border-white/30 text-white">
              <thead>
                <tr className="bg-purple-700/80">
                  <th className="border border-white/30 px-4 py-2 text-left">Faculty Name</th>
                  <th className="border border-white/30 px-4 py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {record.faculties.map((f) => (
                  <tr key={f._id} className="hover:bg-white/10">
                    <td className="border border-white/30 px-4 py-2">{f.name}</td>
                    <td
                      className={`border border-white/30 px-4 py-2 font-semibold ${
                        f.status === "Present" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {f.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
