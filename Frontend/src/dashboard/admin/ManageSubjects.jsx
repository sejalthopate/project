import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {
  createSubject,
  updateSubject,
  deleteSubject,
  getAllSubjects
} from "../../services/ManageSubjectApi";
import ManageSubjectForm from "../../components/ManageSubjectForm";

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedDept, setSelectedDept] = useState("All");

  const fetchSubjects = async () => {
    try {
      const res = await getAllSubjects();
      setSubjects(res.data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleEdit = (subject) => {
    setEditData(subject);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await deleteSubject(id);
    fetchSubjects();
  };

  const departments = [
    "All", "Computer", "IT", "Civil", "Electrical", "Mechanical", "Automobile", "E&TC"
  ];

  const filteredSubjects =
    selectedDept === "All"
      ? subjects
      : subjects.filter((subj) => subj.department === selectedDept);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">📚 Manage Subjects</h2>

      {/* Department Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <label className="font-semibold text-white-700">Select Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="border border-white-300 rounded px-3 py-1 text-black   bg-purple-100 opacity-0.3"
          >
            {departments.map((dept, idx) => (
              <option key={idx} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Add Subject Button */}
        {!showForm && (
          <button
            onClick={() => {
              setShowForm(true);
              setEditData(null);
            }}
            className="bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
          >
            Add Subject
          </button>
        )}
      </div>

      {/* Subject Form */}
     {showForm && (
  <ManageSubjectForm
    fetchSubjects={fetchSubjects}
    editData={editData} // ← pass as-is (null if adding)
    closeForm={() => {
      setShowForm(false);
      setEditData(null);
    }}
  />
)}


      {/* Subjects Table */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
              <th className="p-3 border border-white/10">Subject</th>
              <th className="p-3 border border-white/10">Code</th>
              <th className="p-3 border border-white/10">Semester</th>
              <th className="p-3 border border-white/10">Department</th>
              <th className="p-3 border border-white/10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredSubjects) && filteredSubjects.length > 0 ? (
              filteredSubjects.map((subj) => (
                <tr  className="text-center hover:bg-purple-500 transition text-gray-700">
                  <td className="p-3 border text-white border-white/10">{subj.subjectName}</td>
                  <td className="p-3 border  text-white border-white/10">{subj.subjectCode}</td>
                  <td className="p-3 border text-white border-white/10">{subj.semester}</td>
                  <td className="p-3 border text-white border-white/10">{subj.department}</td>
                  
                  <td className="p-3 border text-white border-white/10">
                    <button
                      onClick={() => handleEdit(subj)}
                      className="text-yellow-600 pr-5 hover:text-yellow-800"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(subj._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No subjects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
