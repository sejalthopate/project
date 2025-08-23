
import React from "react";
import { useParams, Link } from "react-router-dom";

const assignmentData = {
  "Operating System": [
    {
      title: "Process Scheduling",
      dueDate: "2025-07-28",
      description: "Explain FCFS, SJF, and Round Robin with examples.",
    },
  ],
  "Software Engineering": [
    {
      title: "UML Diagrams",
      dueDate: "2025-07-29",
      description: "Draw UML diagrams for a library system.",
    },
  ],
  "Advance DBMS": [
    {
      title: "Normalization",
      dueDate: "2025-07-30",
      description: "Normalize the given tables up to 3NF.",
    },
  ],
  "Entrepreneurship Development": [
    {
      title: "Startup Ideas",
      dueDate: "2025-08-01",
      description: "Create a pitch for your own startup idea.",
    },
  ],
  "Seminar & Project": [
    {
      title: "Project Abstract",
      dueDate: "2025-08-02",
      description: "Submit the abstract of your mini project.",
    },
  ],
};

const SubjectAssignmentData = () => {
  const { subject } = useParams();
  const decodedSubject = decodeURIComponent(subject);
  const assignments = assignmentData[decodedSubject] || [];

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 pb-8 to-gray-800 text-white">
      <Link
        to="/students/StudentAssignments"
        className="text-purple-200/10 hover:text-purple-300 underline mb-6 block"
      >
        ← Back to Subjects
      </Link>

      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-300">
        📘 {decodedSubject} Assignments
      </h2>

      {assignments.length === 0 ? (
        <p className="text-center text-gray-300">No assignments found.</p>
      ) : (
        <ul className="space-y-6 max-w-3xl mx-auto">
          {assignments.map((a, i) => (
            <li
              key={i}
              className="bg-[#] p-5 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition-all text-black"
            >
              <h3 className="text-lg font-semibold text-indigo-300">
                {a.title}
              </h3>
              <p className="text-sm text-yellow-400 mt-1">Due: {a.dueDate}</p>
              <p className="mt-2 text-gray-300">{a.description}</p>
              <button className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-black rounded-md text-sm">
                Add your work here
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubjectAssignmentData;

