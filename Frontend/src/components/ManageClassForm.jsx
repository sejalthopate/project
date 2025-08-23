import React, { useState, useEffect } from "react";

const ManageClassForm = ({ onSubmit, initialData, setEditMode, setSelectedClass }) => {
  const [formData, setFormData] = useState({
    department: "",
    semester: "",
    date: "",
    day: "",
    time: "",
    previousLecture: "",
    previousStaff: "",
    manageLecture: "",
    manageStaff: "",
  });

  const departments = ["Computer", "Electrical", "Civil", "Mechanical", "IT", "Automobile", "E&TC"];
  const semesters = [1, 2, 3, 4, 5, 6];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    "9:00–10:00",
    "10:00–11:00",
    "11:10–11:45", // Lunch
    "11:45–1:45",
    "1:45–1:55",   // Short break
    "1:55–2:55",
    "2:55–3:55"
  ];

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      department: "",
      semester: "",
      date: "",
      day: "",
      time: "",
      previousLecture: "",
      previousStaff: "",
      manageLecture: "",
      manageStaff: "",
    });
    setEditMode(false);
    setSelectedClass(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">
        {initialData ? "Edit Class" : "Add Class"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Department Dropdown */}
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        {/* Semester Dropdown 1-6 */}
        <select
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        >
          <option value="">Select Semester</option>
          {semesters.map((sem) => (
            <option key={sem} value={sem}>{sem}</option>
          ))}
        </select>

        {/* Date Input */}
        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />

        {/* Day Dropdown */}
        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        >
          <option value="">Select Day</option>
          {days.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        {/* Time Dropdown */}
        <select
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        >
          <option value="">Select Time</option>
          {timeSlots.map((time) => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>

        {/* Previous Lecture */}
        <input
          name="previousLecture"
          value={formData.previousLecture}
          onChange={handleChange}
          placeholder="Previous Lecture"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />

        {/* Previous Staff */}
        <input
          name="previousStaff"
          value={formData.previousStaff}
          onChange={handleChange}
          placeholder="Previous Staff"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />

        {/* Manage Lecture */}
        <input
          name="manageLecture"
          value={formData.manageLecture}
          onChange={handleChange}
          placeholder="Manage Lecture"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />

        {/* Manage Staff */}
        <input
          name="manageStaff"
          value={formData.manageStaff}
          onChange={handleChange}
          placeholder="Manage Staff"
          className="bg-gray-700 text-white border border-gray-500 p-2 rounded"
        />
      </div>

      <div className="mt-6 text-center">
        <button type="submit" className="bg-gradient-to-r from-violet-600 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg">
          {initialData ? "Update Class" : "Add Class"}
        </button>
      </div>
    </form>
  );
};

export default ManageClassForm;