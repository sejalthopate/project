import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import {
  getFacultyAssignments,
  addFacultyAssignment,
  updateFacultyAssignment,
  deleteFacultyAssignment,
} from '../../services/FacultyAssignApi';
import AssignFacultyForm from '../../components/AssignFacultyForm';

export default function AssignTeachers() {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState('All');

  const [formData, setFormData] = useState({
    department: '',
    semester: '',
    year: '',       
    subjectName: '',
    facultyName: '',
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchAssignments = async () => {
    try {
      const data = await getFacultyAssignments();
      setAssignments(data);
      setFilteredAssignments(data);
      const uniqueDepts = ['All', ...new Set(data.map((a) => a.department))];
      setDepartments(uniqueDepts);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDeptChange = (e) => {
    const value = e.target.value;
    setSelectedDept(value);
    if (value === 'All') {
      setFilteredAssignments(assignments);
    } else {
      const filtered = assignments.filter((a) => a.department === value);
      setFilteredAssignments(filtered);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateFacultyAssignment(editId, formData);
      } else {
        await addFacultyAssignment(formData);
      }
      setFormData({ department: '', semester: '', year: '', subjectName: '', facultyName: '' });
      setEditId(null);
      setShowForm(false);
      fetchAssignments();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (assignment) => {
    setFormData({
      department: assignment.department,
      semester: assignment.semester,
      year: assignment.year || '',   // 👈 load year if present
      subjectName: assignment.subjectName,
      facultyName: assignment.facultyName,
    });
    setEditId(assignment._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteFacultyAssignment(id);
      fetchAssignments();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Assign Faculty</h1>

      {/* Filter and Button */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <label htmlFor="deptFilter" className="font-medium text-white-700">
            Select Department:
          </label>
          <select
            id="deptFilter"
            value={selectedDept}
            onChange={handleDeptChange}
            className="border p-2 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setShowForm(true);
            setEditId(null);
            setFormData({ department: '', semester: '', year: '', subjectName: '', facultyName: '' });
          }}
          className="bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
        >
          Assign Teacher
        </button>
      </div>

      {/* Show Form */}
      {showForm && (
        <AssignFacultyForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editId={editId}
          onCancel={() => {
            setShowForm(false);
            setFormData({ department: '', semester: '', year: '', subjectName: '', facultyName: '' });
            setEditId(null);
          }}
        />
      )}

      {/* Table */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
              <th className="p-3 border border-white/10">Department</th>
              <th className="p-3 border border-white/10">Semester</th>
              <th className="p-3 border border-white/10">Year</th> 
              <th className="p-3 border border-white/10">Subject</th>
              <th className="p-3 border border-white/10">Faculty</th>
              <th className="p-3 border border-white/10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.length > 0 ? (
              filteredAssignments.map((a) => (
                <tr key={a._id} className="border-t">
                  <td className="p-3 border border-white/10">{a.department}</td>
                  <td className="p-3 border border-white/10">{a.semester}</td>
                  <td className="p-3 border border-white/10">{a.year}</td>
                  <td className="p-3 border border-white/10">{a.subjectName}</td>
                  <td className="p-3 border border-white/10">{a.facultyName}</td>
                  <td className="p-3 border border-white/10">
                    <button
                      onClick={() => handleEdit(a)}
                      className="text-yellow-600 pr-5 hover:text-blue-800"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(a._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
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
