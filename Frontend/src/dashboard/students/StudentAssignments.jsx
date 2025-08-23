


import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);

  const fetchAssignments = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("https://project-pd83.onrender.com/api/assignments/all", {
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
