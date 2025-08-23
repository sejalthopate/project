import React, { useEffect, useState } from 'react';
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
} from '../../services/ManageStudentApi';
import StudentForm from '../../components/ManageStudentForm';
import { Pencil, Trash2, GraduationCap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');

  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // ✅ Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    if (isNaN(date)) return '-';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ✅ Format date for form input value
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date)) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(Array.isArray(res.data.students) ? res.data.students : []);
    } catch (error) {
      console.error('Failed to fetch students', error);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = async (data) => {
    try {
      await createStudent(data);
      setShowForm(false);
      fetchStudents();
    } catch (error) {
      console.error('Error while creating student:', error.response?.data || error.message);
    }
  };

  const handleEdit = async (data) => {
    try {
      await updateStudent(editData._id, data);
      setEditData(null);
      setShowForm(false);
      fetchStudents();
    } catch (error) {
      console.error('Error while updating student:', error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error('Error while deleting student:', error.response?.data || error.message);
    }
  };

  const filteredStudents = students.filter((std) => {
    const matchesDepartment =
      selectedDepartment === 'All' || std.department === selectedDepartment;
    const matchesClass = selectedClass === 'All' || std.className === selectedClass;
    return matchesDepartment && matchesClass;
  });

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <GraduationCap className="text-3xl" />
        Manage Students
      </h2>

      <div className="flex justify-between items-center mb-4 flex-row-reverse">
        {isAdmin && (
          <button
            onClick={() => {
              setEditData(null);
              setShowForm(true);
            }}
            className="bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
          >
            Add Student
          </button>
        )}

        <div className="flex items-center">
          <label className="mr-2 font-medium text-sm">Select Department:</label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="border border-gray-300 rounded-md p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="All">All</option>
            <option value="Computer">Computer</option>
            <option value="IT">IT</option>
            <option value="ENTC">ENTC</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Auto Mobile">Auto Mobile</option>
            <option value="Electrical">Electrical</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <span className="font-medium text-sm mt-1">Select Class:</span>
        {['All', 'FY', 'SY', 'TY'].map((cls) => (
          <button
            key={cls}
            onClick={() => setSelectedClass(cls)}
            className={`py-1 px-3 rounded-full text-sm border transition duration-200 ${
              selectedClass === cls
                ? 'bg-violet-600 text-white'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
          >
            {cls}
          </button>
        ))}
      </div>

      {showForm && (
        <div className="mb-6">
          <StudentForm
            initialData={
              editData ? { ...editData, dob: formatDateForInput(editData.dob) } : {}
            }
            onSubmit={editData ? handleEdit : handleAdd}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
              <th className="p-3 border border-white/10">Name</th>
              <th className="p-3 border border-white/10">Enrollment No</th>
              <th className="p-3 border border-white/10">Course</th>
              <th className="p-3 border border-white/10">Semester</th>
              <th className="p-3 border border-white/10">Department</th>
              <th className="p-3 border border-white/10">Class</th>
              <th className="p-3 border border-white/10">Batch</th>
              <th className="p-3 border border-white/10">Phone</th>
              <th className="p-3 border border-white/10">DOB</th>
              <th className="p-3 border border-white/10">Gender</th>
              <th className="p-3 border border-white/10">Address</th>
              <th className="p-3 border border-white/10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((std) => (
              <tr key={std._id} className="text-center">
                <td className="p-3 border border-white/10">{std.name}</td>
                <td className="p-3 border border-white/10">{std.enrollmentNo}</td>
                <td className="p-3 border border-white/10">{std.course}</td>
                <td className="p-3 border border-white/10">{std.semester}</td>
                <td className="p-3 border border-white/10">{std.department}</td>
                <td className="p-3 border border-white/10">{std.className}</td>
                <td className="p-3 border border-white/10">{std.batch}</td>
                <td className="p-3 border border-white/10">{std.phone}</td>
                <td className="p-3 border border-white/10">{formatDate(std.dob)}</td>
                <td className="p-3 border border-white/10">{std.gender}</td>
                <td className="p-3 border border-white/10">{std.address}</td>
                <td className="p-3 border border-white/10">
                  {isAdmin && (
                    <>
                      <button
                        onClick={() => {
                          setEditData(std);
                          setShowForm(true);
                        }}
                        className="text-yellow-600 pr-3 hover:text-blue-800"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(std._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudents;
