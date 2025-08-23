import React, { useState, useEffect } from "react";
import { createAssignmentAPI, updateAssignmentAPI } from "../services/AssignmentApi";

const FacultyAssignmentForm = ({ onAssignmentAdded, assignment }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    semester: "",
    department: "",
    subject: "",
    type: "Assignment",
    resourceLink: "",
    file: null,
  });

  // 🔹 Prefill form if editing
  useEffect(() => {
    if (assignment) {
      setFormData({
        title: assignment.title || "",
        description: assignment.description || "",
        dueDate: assignment.dueDate ? assignment.dueDate.split("T")[0] : "",
        semester: assignment.semester || "",
        department: assignment.department || "",
        subject: assignment.subject || "",
        type: assignment.type || "Assignment",
        resourceLink: assignment.resourceLink || "",
        file: null, // file always null initially; optional to replace
      });
    }
  }, [assignment]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData();
      for (let key in formData) formDataObj.append(key, formData[key]);

      if (assignment && assignment._id) {
        // 🔹 Update mode
        await updateAssignmentAPI(assignment._id, formDataObj);
        alert("Assignment updated successfully!");
      } else {
        // 🔹 Create mode
        await createAssignmentAPI(formDataObj);
        alert("Assignment uploaded successfully!");
      }

      setFormData({
        title: "",
        description: "",
        dueDate: "",
        semester: "",
        department: "",
        subject: "",
        type: "Assignment",
        resourceLink: "",
        file: null,
      });

      if (onAssignmentAdded) onAssignmentAdded();
    } catch (error) {
      console.error("Error submitting assignment:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-6 rounded-lg shadow-md text-white space-y-4"
    >
      <h2 className="text-xl font-bold">
        {assignment ? "Edit Assignment" : "Upload Assignment"}
      </h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 rounded bg-gray-800"
        required
      />

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 rounded bg-gray-800"
        required
      ></textarea>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      <input
        type="text"
        name="semester"
        value={formData.semester}
        onChange={handleChange}
        placeholder="Semester"
        className="w-full p-2 rounded bg-gray-800"
        required
      />

      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="department"
        className="w-full p-2 rounded bg-gray-800"
        required
      />

      <input
        type="text"
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="w-full p-2 rounded bg-gray-800"
        required
      />

      <select
        name="type"
        value={formData.type}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      >
        <option value="Assignment">Assignment</option>
        <option value="Study Material">Study Material</option>
      </select>

      <input
        type="url"
        name="resourceLink"
        placeholder="Optional Resource Link"
        value={formData.resourceLink}
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      <input
        type="file"
        name="file"
        onChange={handleChange}
        className="w-full p-2 rounded bg-gray-800"
      />

      <button
        type="submit"
        className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
      >
        {assignment ? "Update" : "Upload"}
      </button>
    </form>
  );
};

export default FacultyAssignmentForm;