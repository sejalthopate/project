import React, { useEffect, useState } from "react";
import {
  getFacultyAssignments,
  deleteAssignmentAPI,
} from "../../services/AssignmentApi";
import FacultyAssignmentForm from "../../components/FacultyAssignmentForm";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  // ✅ Fetch assignments with token & role check
  const fetchAssignments = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
      console.error("No token found. User not logged in.");
      return;
    }

    if (!user || user.role !== "faculty") {
      console.error("User is not faculty or not logged in");
      return;
    }

    try {
      const data = await getFacultyAssignments();
       console.log("Assignments fetched:", data); // 👈 इथे बघ
      setAssignments(data || []);
    } catch (error) {
      console.error(
        "Error fetching assignments:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleAssignmentAddedOrUpdated = () => {
    setShowForm(false);
    setEditingAssignment(null);
    fetchAssignments();
  };

  const handleEdit = (assignment) => {
    setEditingAssignment(assignment);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      try {
        await deleteAssignmentAPI(id);
        fetchAssignments();
      } catch (error) {
        console.error(
          "Error deleting assignment:",
          error.response?.data || error.message
        );
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br pb-85 h-250 from-gray-900 via-purple-900 to-gray-800 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Uploaded Assignments</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingAssignment(null);
          }}
          className="bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
        >
          {showForm ? "Close Form" : "Add Assignment"}
        </button>
      </div>

      {showForm && (
        <FacultyAssignmentForm
          assignment={editingAssignment}
          onAssignmentAdded={handleAssignmentAddedOrUpdated}
        />
      )}

      {assignments.length === 0 ? (
        <p>No assignments uploaded yet.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="bg-gray-800 p-4 rounded-lg shadow flex justify-between items-start overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg"
            >
              <div>
                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                <p>{assignment.description}</p>
                <p>
                  <strong>Semester:</strong> {assignment.semester} |{" "}
                  <strong>department:</strong> {assignment.department} |{" "}
                  <strong>Subject:</strong> {assignment.subject}
                </p>
                {assignment.fileUrl && (
                  <a
                    href={assignment.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Download File
                  </a>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(assignment)}
                  className="bg-yellow-500 px-2 py-1 rounded hover:bg-yellow-600 text-black"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(assignment._id)}
                  className="bg-red-500 px-2 py-1 rounded hover:bg-red-600 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;