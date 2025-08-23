import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getFacultyAssignments } from "../../services/FacultyAssignApi"; // ✅ use existing API

export default function AssignSubjects() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth(); // token-verified user
useEffect(() => {
  const fetchAssignments = async () => {
    try {
      const data = await getFacultyAssignments(); 
      setAssignments(data); // backend आधीच filter केलंय
    } catch (err) {
      console.error("Error fetching assignments:", err);
    } finally {
      setLoading(false);
    }
  };

  if (user) fetchAssignments();
}, [user]);


  if (loading) return <p className="text-center mt-6">Loading...</p>;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800  pb-85 h-250 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Assignments
      </h1>

      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
              <th className="p-3 border border-white/10">Department</th>
              <th className="p-3 border border-white/10">Semester</th>
              <th className="p-3 border border-white/10">Year</th>
              <th className="p-3 border border-white/10">Subject</th>
              <th className="p-3 border border-white/10">Faculty</th> {/* ✅ added */}
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((a) => (
                <tr key={a._id} className="border-t">
                  <td className="p-3 border border-white/10">{a.department}</td>
                  <td className="p-3 border border-white/10">{a.semester}</td>
                  <td className="p-3 border border-white/10">{a.year}</td>
                  <td className="p-3 border border-white/10 font-medium">{a.subjectName}</td>
                  <td className="p-3 border border-white/10">{a.facultyName}</td> {/* ✅ show faculty */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No assignments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
