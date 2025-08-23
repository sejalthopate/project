



import React, { useEffect, useState } from 'react';
import {
  createFaculty,
  getFaculties,
  updateFaculty,
  deleteFaculty,
} from '../../services/ManageFacultyApi';
import FacultyForm from '../../components/ManageFacultyForm';
import { Pencil, Trash2 } from 'lucide-react';

const ManageFaculty = () => {
  const [faculties, setFaculties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedDept, setSelectedDept] = useState('All');

  // ✅ Format DOB for table display
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date)) return '-';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // ✅ Format DOB for input field (for editing)
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const fetchFaculties = async () => {
    try {
      const res = await getFaculties();
      setFaculties(Array.isArray(res.data.faculties) ? res.data.faculties : []);
    } catch (error) {
      console.error('Failed to fetch faculties', error);
      setFaculties([]);
    }
  };

  useEffect(() => {
    fetchFaculties();
  }, []);

  const handleAdd = async (data) => {
    try {
      await createFaculty(data);
      setShowForm(false);
      fetchFaculties();
    } catch (error) {
      console.error('Error while creating faculty:', error.response?.data || error.message);
    }
  };

  const handleEdit = async (data) => {
    try {
      await updateFaculty(editData._id, data);
      setEditData(null);
      setShowForm(false);
      fetchFaculties();
    } catch (error) {
      console.error('Error while updating faculty:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteFaculty(id);
      fetchFaculties();
    } catch (error) {
      console.error('Error while deleting faculty:', error.response?.data || error.message);
    }
  };

  const departments = ['All', ...new Set(faculties.map(fac => fac.department))];
  const filteredFaculties =
    selectedDept === 'All'
      ? faculties
      : faculties.filter((fac) => fac.department === selectedDept);

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Faculty</h2>

      {/* Filters + Add Button */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <label className="font-medium">Select Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-white text-black border border-gray-300 p-2 rounded-lg shadow-md transition duration-300 hover:shadow-lg focus:outline-none"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => {
            setEditData(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
        >
          + Add Faculty
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-6 bg-white rounded-lg p-4 shadow-lg text-gray-900">
          <FacultyForm
            initialData={
              editData
                ? { ...editData, dob: formatDateForInput(editData.dob) }
                : { department: selectedDept === 'All' ? '' : selectedDept }
            }
            onSubmit={editData ? handleEdit : handleAdd}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
              <th className="p-3 border border-white/10">Name</th>
              <th className="p-3 border border-white/10">Emp ID</th>
              <th className="p-3 border border-white/10">Department</th>
              <th className="p-3 border border-white/10">Qualifications</th>
              <th className="p-3 border border-white/10">Experience</th>
              <th className="p-3 border border-white/10">Phone</th>
              <th className="p-3 border border-white/10">DOB</th>
              <th className="p-3 border border-white/10">Gender</th>
              <th className="p-3 border border-white/10">Address</th>
              <th className="p-3 border border-white/10 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculties.length > 0 ? (
              filteredFaculties.map((fac) => (
                <tr key={fac._id} className="hover:bg-purple-300/10 transition-all duration-300">
                  <td className="p-3 border border-white/10">{fac.name}</td>
                  <td className="p-3 border border-white/10">{fac.employeeId}</td>
                  <td className="p-3 border border-white/10">{fac.department}</td>
                  <td className="p-3 border border-white/10">{fac.qualifications}</td>
                  <td className="p-3 border border-white/10">{fac.yearsOfExperience}</td>
                  <td className="p-3 border border-white/10">{fac.phone}</td>
                  <td className="p-3 border border-white/10">{formatDate(fac.dob)}</td>
                  <td className="p-3 border border-white/10">{fac.gender}</td>
                  <td className="p-3 border border-white/10">{fac.address}</td>
                  <td className="p-3 border border-white/10 text-center space-x-4">
                    <button
                      onClick={() => {
                        setEditData(fac);
                        setShowForm(true);
                      }}
                      className="text-yellow-400 hover:text-yellow-300 transition"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(fac._id)}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="text-center p-6 text-white">
                  No faculty found in {selectedDept} department.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageFaculty;
