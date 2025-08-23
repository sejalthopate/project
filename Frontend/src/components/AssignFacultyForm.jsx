// import React, { useEffect, useState } from "react";
// import { getAllSubjects } from "../services/ManageSubjectApi";
// import { Plus } from "lucide-react";
// import { getFaculties } from "../services/ManageFacultyApi"; // ✅ fetch admin-created faculties

// export default function AssignFacultyForm({
//   formData,
//   handleChange,
//   handleSubmit,
//   editId,
//   onCancel,
// }) {
//   const [subjects, setSubjects] = useState([]);
//   const [faculties, setFaculties] = useState([]); // ✅ new state

//   // Fetch subjects
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const res = await getAllSubjects();
//         setSubjects(res.data);
//       } catch (error) {
//         console.error("Error fetching subjects:", error);
//       }
//     };
//     fetchSubjects();
//   }, []);

//   // Fetch admin-created faculties
//  useEffect(() => {
//   const fetchFaculties = async () => {
//     try {
//       const res = await getFaculties();
//       console.log("Faculties fetched:", res); // 🔹 Check structure
//       setFaculties(Array.isArray(res.data) ? res.data : res.data.faculties || []);
//     } catch (error) {
//       console.error("Error fetching faculties:", error);
//     }
//   };
//   fetchFaculties();
// }, []);


//   // Unique subjects
//   const uniqueSubjects = Array.from(
//     new Set(subjects.map((sub) => sub.subjectName))
//   ).map((name) => subjects.find((sub) => sub.subjectName === name));

//   const departments = ["Computer", "IT", "ENTC", "Mechanical", "Civil", "Auto Mobile", "Electrical"];
//   const semesters = ["1", "2", "3", "4", "5", "6"];

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="grid grid-cols-1 gap-4 mb-8 bg-white p-4 rounded shadow"
//     >
//       {/* Department */}
//       <select
//         name="department"
//         value={formData.department}
//         onChange={handleChange}
//         className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         required
//       >
//         <option value="">Select Department</option>
//         {departments.map((dep, index) => (
//           <option key={index} value={dep}>{dep}</option>
//         ))}
//       </select>

//       {/* Semester */}
//       <select
//         name="semester"
//         value={formData.semester}
//         onChange={handleChange}
//         className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         required
//       >
//         <option value="">Select Semester</option>
//         {semesters.map((sem, index) => (
//           <option key={index} value={sem}>{sem}</option>
//         ))}
//       </select>

//       {/* Subject */}
//       <select
//         name="subjectName"
//         value={formData.subjectName}
//         onChange={handleChange}
//         className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         required
//       >
//         <option value="">Select Subject</option>
//         {uniqueSubjects.map((subj) => (
//           <option key={subj._id} value={subj.subjectName}>{subj.subjectName}</option>
//         ))}
//       </select>

//       {/* Faculty Dropdown */}
//       <select
//         name="facultyName"
//         value={formData.facultyName}
//         onChange={handleChange}
//         className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         required
//       >
//         <option value="">Select Faculty</option>
//         {faculties.map((fac) => (
//           <option key={fac._id} value={fac.name}>{fac.name}</option>
//         ))}
//       </select>

//       {/* Add/Update & Cancel */}
//       <div className="flex gap-4">
//         <button
//           type="submit"
//           className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center gap-2"
//         >
//           {editId ? "Update" : "Add"}
//           <Plus size={16} />
//         </button>

//         {onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// }


import React, { useEffect, useState } from "react";
import { getAllSubjects } from "../services/ManageSubjectApi";
import { Plus } from "lucide-react";
import { getFaculties } from "../services/ManageFacultyApi"; // ✅ fetch admin-created faculties

export default function AssignFacultyForm({
  formData,
  handleChange,
  handleSubmit,
  editId,
  onCancel,
}) {
  const [subjects, setSubjects] = useState([]);
  const [faculties, setFaculties] = useState([]);

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await getAllSubjects();
        setSubjects(res.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  // Fetch admin-created faculties
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await getFaculties();
        console.log("Faculties fetched:", res);
        setFaculties(Array.isArray(res.data) ? res.data : res.data.faculties || []);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };
    fetchFaculties();
  }, []);

  // Unique subjects
  const uniqueSubjects = Array.from(
    new Set(subjects.map((sub) => sub.subjectName))
  ).map((name) => subjects.find((sub) => sub.subjectName === name));

  const departments = ["Computer", "IT", "ENTC", "Mechanical", "Civil", "Auto Mobile", "Electrical"];
  const semesters = ["1", "2", "3", "4", "5", "6"];
  const years = ["FY","SY","TY"]; // ✅ new year dropdown

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 mb-8 bg-white p-4 rounded shadow"
    >
      {/* Department */}
      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
        className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      >
        <option value="">Select Department</option>
        {departments.map((dep, index) => (
          <option key={index} value={dep}>{dep}</option>
        ))}
      </select>

      {/* Year */}
      <select
        name="year"
        value={formData.year}
        onChange={handleChange}
        className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      >
        <option value="">Select Year</option>
        {years.map((yr, index) => (
          <option key={index} value={yr}>{yr}</option>
        ))}
      </select>

      {/* Semester */}
      <select
        name="semester"
        value={formData.semester}
        onChange={handleChange}
        className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      >
        <option value="">Select Semester</option>
        {semesters.map((sem, index) => (
          <option key={index} value={sem}>{sem}</option>
        ))}
      </select>

      {/* Subject */}
      <select
        name="subjectName"
        value={formData.subjectName}
        onChange={handleChange}
        className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      >
        <option value="">Select Subject</option>
        {uniqueSubjects.map((subj) => (
          <option key={subj._id} value={subj.subjectName}>{subj.subjectName}</option>
        ))}
      </select>

      {/* Faculty Dropdown */}
      <select
        name="facultyName"
        value={formData.facultyName}
        onChange={handleChange}
        className="border p-2 rounded text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      >
        <option value="">Select Faculty</option>
        {faculties.map((fac) => (
          <option key={fac._id} value={fac.name}>{fac.name}</option>
        ))}
      </select>

      {/* Add/Update & Cancel */}
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded flex items-center gap-2"
        >
          {editId ? "Update" : "Add"}
          <Plus size={16} />
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

