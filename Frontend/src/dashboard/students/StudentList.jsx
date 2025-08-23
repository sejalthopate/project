import React, { useEffect, useState } from "react";
import { getStudents } from "../../services/ManageStudentApi"; // ✅ same API use
import { GraduationCap } from "lucide-react";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(Array.isArray(res.data.students) ? res.data.students : []);
    } catch (error) {
      console.error("Failed to fetch students", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-lg">
        Loading students...
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <GraduationCap className="text-3xl text-violet-400" />
        Student List
      </h2>

      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
     
              <th className="p-3 border border-white/10">Enrollment No</th>
              <th className="p-3 border border-white/10">Name</th>

            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((std) => (
                <tr key={std._id} className="text-center">
                
                  <td className="p-3 border border-white/10">{std.enrollmentNo}</td>
                    <td className="p-3 border border-white/10">{std.name}</td>
           
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="text-center p-4 text-gray-300"
                >
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;
