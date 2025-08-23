import React, { useState, useEffect } from "react";
import {
  getExamMarks,
  addExamMark,
  updateExamMark,
  deleteExamMark,
} from "../../services/ExamMarkApi";
import { getStudents } from "../../services/ManageStudentApi";

const ExamMarks = () => {
  const [studentList, setStudentList] = useState([]); // फक्त student names
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    ut1: "",
    ut2: "",
    practical: [{ no: "", marks: "" }],
    assignment: [{ no: "", marks: "" }],
    oral: [{ no: "", marks: "" }],
  });
  const [editIndex, setEditIndex] = useState(null);

  const calculateAverage = (ut1, ut2) =>
    ((Number(ut1) + Number(ut2)) / 2).toFixed(2);

  const sumMarks = (arr) =>
    arr.reduce((acc, item) => acc + Number(item.marks || 0), 0);

  const calculateTotal = (data) =>
    Number(data.ut1 || 0) +
    Number(data.ut2 || 0) +
    sumMarks(data.practical) +
    sumMarks(data.assignment) +
    sumMarks(data.oral);

  const calculateOverallAvg = (total) => (total / 5).toFixed(2);

useEffect(() => {
  const fetchStudents = async () => {
    try {
      const res = await getStudents();
      if (res.data && Array.isArray(res.data.students)) {
        setStudentList(res.data.students);
      } else {
        setStudentList([]);
      }
    } catch (err) {
      console.error("Error fetching students", err);
    }
  };

  const fetchExamMarks = async () => {
    try {
      const res = await getExamMarks();
      if (res.data && Array.isArray(res.data)) {
        setStudents(res.data);  // ✅ सुरुवातीला exam marks टेबल मध्ये सेट कर
      }
    } catch (err) {
      console.error("Error fetching exam marks", err);
    }
  };

  fetchStudents();
  fetchExamMarks();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (type, index, field, value) => {
    const updated = [...formData[type]];
    updated[index][field] = value;
    setFormData({ ...formData, [type]: updated });
  };

  const addRow = (type) => {
    setFormData({
      ...formData,
      [type]: [...formData[type], { no: "", marks: "" }],
    });
  };

  const handleSave = async () => {
  if (!formData.name) return alert("Please select Student Name");

  const avg = calculateAverage(formData.ut1, formData.ut2);
  const total = calculateTotal(formData);
  const overallAvg = calculateOverallAvg(total);

  const newData = { ...formData, average: avg, total, overallAvg };

  try {
    if (editIndex !== null) {
      await updateExamMark(students[editIndex]._id, newData);
      setEditIndex(null);
    } else {
      await addExamMark(newData);
    }

    // ✅ प्रत्येक save नंतर fresh data fetch कर
    const res = await getExamMarks();
    setStudents(res.data);

    // फॉर्म reset
    setFormData({
      name: "",
      ut1: "",
      ut2: "",
      practical: [{ no: "", marks: "" }],
      assignment: [{ no: "", marks: "" }],
      oral: [{ no: "", marks: "" }],
    });
  } catch (error) {
    console.error("Save Error:", error);
  }
};


  const handleDelete = async (index) => {
    try {
      await deleteExamMark(students[index]._id);
      setStudents(students.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleEdit = (index) => {
    setFormData(students[index]);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 pb-85 h-250 text-white">
      <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-white text-transparent">
        📊 Exam Marks Management
      </h1>

      {/* Form */}
      <div className="overflow-auto rounded-xl border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <select
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-white hover:scale-105 transition-transform mt-8 ml-8 duration-200 text-gray-700 font-semibold py-2 px-5 rounded-xl shadow-lg">
          <option value="">-- Select Student --</option>
          {studentList.map((stu) => (
          <option key={stu._id} value={stu.name}>
           {stu.name}
         </option>
         ))}
         </select>

          <input
            type="number"
            name="ut1"
            placeholder="UT1 Marks"
            value={formData.ut1}
            onChange={handleChange}
            className="bg-white hover:scale-105 transition-transform duration-200 mt-8 text-gray-900 font-semibold py-2 px-5 rounded-xl shadow-lg"
          />
          <input
            type="number"
            name="ut2"
            placeholder="UT2 Marks"
            value={formData.ut2}
            onChange={handleChange}
            className="bg-white hover:scale-105 transition-transform duration-200 mr-8  mt-8 text-gray-800 font-semibold py-2 px-5 rounded-xl shadow-lg"
          />
        </div>

        {/* Practical Section */}
        <h3 className="mt-4 ml-8 font-bold">Practical Marks</h3>
        {formData.practical.map((p, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              type="number"
              placeholder="Practical No"
              value={p.no}
              onChange={(e) =>
                handleArrayChange("practical", i, "no", e.target.value)
              }
              className="bg-white hover:scale-105 ml-8 transition-transform duration-200 text-gray-800 font-semibold py-2 px-5 rounded-xl shadow-lg"
            />
            {/* ✅ Practical dropdown 1-50 */}
            <select
              value={p.marks}
              onChange={(e) =>
                handleArrayChange("practical", i, "marks", e.target.value)
              }
              className="bg-white hover:scale-105 transition-transform duration-200 text-gray-800 font-semibold py-2 px-5 rounded-xl shadow-lg"
            >
              <option value="">Select Marks</option>
              {Array.from({ length: 50 }, (_, idx) => idx + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addRow("practical")}
          className="bg-gradient-to-r from-violet-600 to-purple-700 ml-8 mt-5 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
        >
          + Add Practical
        </button>

        {/* Assignment Section */}
        <h3 className="mt-4 ml-8 mt-8 font-bold">Assignment Marks</h3>
       {formData.assignment.map((a, i) => (
        <div key={i} className="flex gap-2 mt-2">
       <input
        type="number"
        placeholder="Assignment No"
         value={a.no}
         onChange={(e) =>
          handleArrayChange("assignment", i, "no", e.target.value)
         }
        className="bg-white hover:scale-105 ml-8 transition-transform duration-200 text-gray-800 font-semibold py-2 px-5 rounded-xl shadow-lg"
       />

      {/* ✅ Assignment dropdown 1-20 */}
       <select
      value={a.marks}
      onChange={(e) =>
        handleArrayChange("assignment", i, "marks", e.target.value)
      }
      className="bg-white hover:scale-105 transition-transform duration-200 text-gray-800 font-semibold py-2 px-5 rounded-xl shadow-lg"
       >
      <option value="">Select Marks</option>
      {Array.from({ length: 20 }, (_, idx) => idx + 1).map((num) => (
        <option key={num} value={num}>
          {num}
        </option>
      ))}
    </select>
  </div>
))}
<button
  type="button"
  onClick={() => addRow("assignment")}
  className="bg-gradient-to-r from-violet-600 ml-8 my-5 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
>
  + Add Assignment
</button>

        {/* Oral Section */}
        <h3 className="mt-4 ml-8  font-bold">Oral Marks</h3>
        {formData.oral.map((o, i) => (
          <div key={i} className="flex gap-2 mt-2">
            <input
              type="number"
              placeholder="Oral No"
              value={o.no}
              onChange={(e) =>
                handleArrayChange("oral", i, "no", e.target.value)
              }
              className="bg-white hover:scale-105 ml-8 transition-transform duration-200 text-gray-800 font-semibold py-2 px-5 rounded-xl shadow-lg"
            />
            {/* ✅ Oral dropdown 1-5 */}
            <select
              value={o.marks}
              onChange={(e) =>
                handleArrayChange("oral", i, "marks", e.target.value)
              }
              className="bg-white hover:scale-105 transition-transform duration-200 text-gray-800 font-semibold py-2 px-5 rounded-xl shadow-lg"
            >
              <option value="">Select Marks</option>
              {Array.from({ length: 5 }, (_, idx) => idx + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addRow("oral")}
          className="bg-gradient-to-r ml-8 mt-5 mb-8 from-violet-600 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
        >
          + Add Oral
        </button>

        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-violet-600 ml-5 mb-8 gap-8 to-purple-700 hover:scale-105 transition-transform duration-200 text-white font-semibold py-2 px-5 rounded-xl shadow-lg"
        >
          {editIndex !== null ? "✏ Update Marks" : "💾 Save Marks"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-auto rounded-xl m-8 border border-white/20 bg-purple-100/10 backdrop-blur-md shadow-lg">
        <table className="min-w-full text-sm text-white rounded-xl overflow-hidden border-separate border-spacing-0">
          <thead className="bg-purple-300/10 backdrop-blur-sm">
            <tr className="p-3 border border-white/10">
              {[
                "Student",
                "UT1",
                "UT2",
                "Average",
                "Practical",
                "Assignment",
                "Oral",
                "Total",
                "Overall Avg",
                "Actions",
              ].map((head, i) => (
                <th key={i} className="px-4 py-2 text-sm font-semibold">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((stu, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                  } hover:bg-gray-600 transition`}
                >
                  <td className="p-3 border border-white/10">{stu.name}</td>
                  <td>{stu.ut1}</td>
                  <td>{stu.ut2}</td>
                  <td className="p-3 border border-white/10">{stu.average}</td>
                  <td>
                    {stu.practical.map((p, i) => (
                      <div key={i}>
                        P{p.no}: {p.marks}
                      </div>
                    ))}
                  </td>
                  <td>
                    {stu.assignment.map((a, i) => (
                      <div key={i}>
                        A{a.no}: {a.marks}
                      </div>
                    ))}
                  </td>
                  <td>
                    {stu.oral.map((o, i) => (
                      <div key={i}>
                        O{o.no}: {o.marks}
                      </div>
                    ))}
                  </td>
                  <td className="font-bold text-yellow-400">{stu.total}</td>
                  <td className="text-purple-400">{stu.overallAvg}</td>
                  <td className="px-4 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="px-3 py-1 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="10"
                  className="text-center text-gray-400 py-4 italic"
                >
                  🚫 No records yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamMarks;