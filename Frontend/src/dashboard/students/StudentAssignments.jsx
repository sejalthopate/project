// import React, { useEffect, useState } from "react";
// import {getFacultyAssignments  } from "../../services/AssignmentApi";

// const StudentAssignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 👉 हे values तू login झाल्यावर मिळवू शकतोस (student profile मधून)
//   const semester = "6";          // example: 6th sem
//   const department = "Computer"; // example: Computer Dept

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const data = await getFacultyAssignments (semester, department);
//         console.log("📌 Student fetched assignments:", data);
//         setAssignments(data);
//       } catch (error) {
//         console.error("Error fetching assignments:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   if (loading) return <p>Loading assignments...</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-3">📚 Your Assignments</h2>
//       {assignments.length === 0 ? (
//         <p>No assignments found</p>
//       ) : (
//         <ul className="space-y-3">
//           {assignments.map((a) => (
//             <li key={a._id} className="border p-3 rounded-md">
//               <h3 className="font-semibold">{a.title}</h3>
//               <p>{a.description}</p>
//               <p><strong>Subject:</strong> {a.subject}</p>
//               <p><strong>Due Date:</strong> {a.dueDate ? new Date(a.dueDate).toLocaleDateString() : "N/A"}</p>
//               {a.fileUrl && (
//                 <a
//                   href={a.fileUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 underline"
//                 >
//                   Download File
//                 </a>
//               )}
//               {a.resourceLink && (
//                 <a
//                   href={a.resourceLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-green-600 underline ml-3"
//                 >
//                   Resource Link
//                 </a>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default StudentAssignments;


import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/assignments/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Student fetched assignments:", res.data);
      setAssignments(res.data || []);
    } catch (error) {
      console.error("Error fetching assignments:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-3xl font-bold flex justify-center mb-4">All Assignments</h2>
      {assignments.length === 0 ? (
        <p>No assignments uploaded yet.</p>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment._id} className="bg-purple-200/10 shadow-md p-4 rounded-md">
              <h3 className="text-lg font-semibold">{assignment.title}</h3>
              <p>{assignment.description}</p>
              <p>
                <strong>Semester:</strong> {assignment.semester} |{" "}
                <strong>Department:</strong> {assignment.department} |{" "}
                <strong>Subject:</strong> {assignment.subject}
              </p>
              {assignment.fileUrl && (
                <a
                  href={assignment.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Download File
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentAssignments;
