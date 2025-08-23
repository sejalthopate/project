import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  createSubject,
  updateSubject,
} from "../services/ManageSubjectApi";

function ManageSubjectForm({ fetchSubjects, editData, closeForm }) {
  const [formData, setFormData] = useState({
    subjectName: '',
    subjectCode: '',
    semester: '',
    department: '',
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        subjectName: editData.subjectName || '',
        subjectCode: editData.subjectCode || '',
        semester: editData.semester || '',
        department: editData.department || '',
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const subjectData = {
      ...formData,
    };

    try {
      if (editData) {
        await updateSubject(editData._id, subjectData);
      } else {
        await createSubject(subjectData);
      }
      fetchSubjects();
      closeForm();
    } catch (err) {
      console.error('Submit Error:', err);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-lg shadow-md grid grid-cols-1 gap-4 mb-6"
    >
      <input
        name="subjectName"
        value={formData.subjectName}
        onChange={handleChange}
        placeholder="Subject Name"
        className="p-2 border rounded text-gray-800 w-full"
        required
      />
      <input
        name="subjectCode"
        value={formData.subjectCode}
        onChange={handleChange}
        placeholder="Subject Code"
        className="p-2 border rounded text-gray-800 w-full"
        required
      />

      {/* Semester Dropdown */}
      <select
        name="semester"
        value={formData.semester}
        onChange={handleChange}
        className="p-2 border rounded text-gray-800 w-full"
        required
      >
        <option value="">Select Semester</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
       
      </select>

      {/* Department Dropdown */}
      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        className="p-2 border rounded text-gray-800 w-full"
        required
      >
        <option value="">Select Department</option>
        <option value="Computer">Computer</option>
        <option value="IT">IT</option>
        <option value="ENTC">ENTC</option>
        <option value="Mechanical">Mechanical</option>
        <option value="Civil">Civil</option>
        <option value="Auto Mobile">Auto Mobile</option>
        <option value="Electrical">Electrical</option>
      </select>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {editData ? 'Update' : 'Add'}
        </button>
        <button
          type="button"
          onClick={closeForm}
          className="flex items-center gap-1 px-4 py-2 text-red-600 hover:text-white hover:bg-red-500 border border-red-500 rounded transition"
        >
          <X size={16} />
          Cancel
        </button>
      </div>
    </motion.form>
  );
}

export default ManageSubjectForm;
