

import React, { useEffect, useState } from "react";
import { getCourses, addCourse, updateCourse, deleteCourse } from "../../services/coursesApi";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from 'lucide-react';

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [outcomes, setOutcomes] = useState("");
  const [marks, setMarks] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const departments = ["CO", "IT", "ENTC", "EE", "ME", "AUTO", "CE"];
  const years = ["FY", "SY", "TY"];
  const semesterOptions = { FY: ["1", "2"], SY: ["3", "4"], TY: ["5", "6"] };

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch courses ❌");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const courseData = {
      name,
      department,
      year,
      semester,
      outcomes: outcomes.split(",").map((o) => o.trim()),
      marks,
    };

    try {
      if (editingId) {
        await updateCourse(editingId, courseData);
        toast.success("Course updated successfully ✅");
        setEditingId(null);
      } else {
        await addCourse(courseData);
        toast.success("Course added successfully 🎉");
      }

      setName("");
      setDepartment("");
      setYear("");
      setSemester("");
      setOutcomes("");
      setMarks("");
      setShowForm(false);
      fetchCourses();
    } catch (err) {
      console.error(err);
      toast.error("Error saving course ❌");
    }
  };

  const handleEdit = (course) => {
    setEditingId(course._id);
    setName(course.name);
    setDepartment(course.department);
    setYear(course.year || "");
    setSemester(course.semester || "");
    setOutcomes(course.outcomes ? course.outcomes.join(", ") : "");
    setMarks(course.marks || "");
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      toast.success("Course deleted successfully 🗑");
      fetchCourses();
    } catch (err) {
      console.error(err);
      toast.error("Error deleting course ❌");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Courses
      </h1>

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-violet-600 to-purple-700 grid justify-items-end hover:scale-105 transition-transform duration-200 text-white font-semibold m-6 py-2 px-5 rounded-xl shadow-lg"
        >
          ➕ Add Course
        </button>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-purple-700">
            {editingId ? "✏ Edit Course" : "➕ Add Course"}
          </h2>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                placeholder="Enter course name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
                required
              >
                <option value="">-- Select Department --</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <select
                value={year}
                onChange={(e) => {
                  setYear(e.target.value);
                  setSemester("");
                }}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
                required
              >
                <option value="">-- Select Year --</option>
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </div>

            {year && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
                  required
                >
                  <option value="">-- Select Semester --</option>
                  {semesterOptions[year].map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Outcomes
              </label>
              <textarea
                placeholder="Enter outcomes, separated by commas"
                value={outcomes}
                onChange={(e) => setOutcomes(e.target.value)}
                className="w-full border rounded-lg p-3 h-20 focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marks
              </label>
              <input
                type="number"
                placeholder="Enter marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
            >
              {editingId ? "Update Course" : "Add Course"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setName("");
                setDepartment("");
                setYear("");
                setSemester("");
                setOutcomes("");
                setMarks("");
              }}
              className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Table */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr>
              <th className="p-3 border border-white/10">Name</th>
              <th className="p-3 border border-white/10">Department</th>
              <th className="p-3 border border-white/10">Year</th>
              <th className="p-3 border border-white/10">Semester</th>
              <th className="p-3 border border-white/10">Outcomes</th>
              <th className="p-3 border border-white/10">Marks</th>
              <th className="p-3 border border-white/10">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="p-3 border border-white/10">{course.name}</td>
                <td className="p-3 border border-white/10">{course.department}</td>
                <td className="p-3 border border-white/10">{course.year}</td>
                <td className="p-3 border border-white/10">{course.semester}</td>
                <td className="p-3 border border-white/10">{course.outcomes?.join(", ")}</td>
                <td className="p-3 border border-white/10">{course.marks}</td>
                <td className="p-3 border border-white/10 flex gap-4 justify-center">
                  <button
                    onClick={() => handleEdit(course)}
                    className="text-yellow-500 hover:text-blue-400 transition-transform transform hover:scale-125"
                    title="Edit"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="text-red-500 hover:text-red-400 transition-transform transform hover:scale-125"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {!courses.length && (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No courses available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCourses;
