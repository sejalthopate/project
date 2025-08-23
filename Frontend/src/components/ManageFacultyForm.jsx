// import React, { useState } from "react";

// const FacultyForm = ({ onSubmit, onCancel, initialData = {} }) => {
//   const [faculty, setFaculty] = useState({
//     user: "",
//     name: "",
//     employeeId: "",
//     department: "",
//     qualifications: "",
//     yearsOfExperience: "",
//     phone: "",
//     dob: "",
//     gender: "",
//     address: "",
//     ...initialData,
//   });

//   const handleChange = (e) => {
//     setFaculty({ ...faculty, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ ...faculty, yearsOfExperience: Number(faculty.yearsOfExperience) });
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-6 space-y-4"
//     >
//       <input
//         name="name"
//         value={faculty.name}
//         onChange={handleChange}
//         placeholder="Faculty Name"
//         required
//         className="w-full border border-gray-300 rounded-md p-2"
//       />

//       <input
//         name="employeeId"
//         value={faculty.employeeId}
//         onChange={handleChange}
//         placeholder="Employee ID"
//         required
//         className="w-full border border-gray-300 rounded-md p-2"
//       />

//       {/* Department Dropdown */}
//       <select
//         name="department"
//         value={faculty.department}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 rounded-md p-2"
//       >
//         <option value="">Select Department</option>
//         <option value="Computer">Computer</option>
//         <option value="IT">IT</option>
//         <option value="ENTC">ENTC</option>
//         <option value="Mechanical">Mechanical</option>
//         <option value="Civil">Civil</option>
//         <option value="Auto Mobile">Auto Mobile</option>
//         <option value="Electrical">Electrical</option>
//       </select>

//       <input
//         name="qualifications"
//         value={faculty.qualifications}
//         onChange={handleChange}
//         placeholder="Qualifications"
//         required
//         className="w-full border border-gray-300 rounded-md p-2"
//       />

//       <input
//         name="yearsOfExperience"
//         type="number"
//         value={faculty.yearsOfExperience}
//         onChange={handleChange}
//         placeholder="Years of Experience"
//         required
//         className="w-full border border-gray-300 rounded-md p-2"
//       />

//       <input
//         name="phone"
//         value={faculty.phone}
//         onChange={handleChange}
//         placeholder="Phone Number"
//         required
//         className="w-full border border-gray-300 rounded-md p-2"
//       />

//       <input
//         name="dob"
//         type="date"
//         value={faculty.dob}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 rounded-md p-2"
//       />

//       <select
//         name="gender"
//         value={faculty.gender}
//         onChange={handleChange}
//         required
//         className="w-full border border-gray-300 rounded-md p-2"
//       >
//         <option value="">Select Gender</option>
//         <option value="Male">Male</option>
//         <option value="Female">Female</option>
//         <option value="Other">Other</option>
//       </select>

//       <textarea
//         name="address"
//         value={faculty.address}
//         onChange={handleChange}
//         placeholder="Address"
//         required
//         className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
//       />

//       <div className="flex justify-end gap-4">
//         <button
//           type="submit"
//           className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2 rounded-md"
//         >
//           Save
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FacultyForm;
import React, { useState } from "react";

const FacultyForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [faculty, setFaculty] = useState({
    user: "",
    name: "",
    facultyEmail: "", // 👈 added
    employeeId: "",
    department: "",
    qualifications: "",
    yearsOfExperience: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    ...initialData,
  });

  const handleChange = (e) => {
    setFaculty({ ...faculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...faculty, yearsOfExperience: Number(faculty.yearsOfExperience) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-900 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-6 space-y-4"
    >
      <input
        name="name"
        value={faculty.name}
        onChange={handleChange}
        placeholder="Faculty Name"
        required
        className="w-full border border-gray-300 rounded-md p-2"
      />

      <input
        name="facultyEmail"
        type="email"
        value={faculty.facultyEmail}
        onChange={handleChange}
        placeholder="Faculty Email"
        required
        className="w-full border border-gray-300 rounded-md p-2"
      />

      <input
        name="employeeId"
        value={faculty.employeeId}
        onChange={handleChange}
        placeholder="Employee ID"
        required
        className="w-full border border-gray-300 rounded-md p-2"
      />

      <select
        name="department"
        value={faculty.department}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md p-2"
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

      <input
        name="qualifications"
        value={faculty.qualifications}
        onChange={handleChange}
        placeholder="Qualifications"
        required
        className="w-full border border-gray-300 rounded-md p-2"
      />

      <input
        name="yearsOfExperience"
        type="number"
        value={faculty.yearsOfExperience}
        onChange={handleChange}
        placeholder="Years of Experience"
        required
        className="w-full border border-gray-300 rounded-md p-2"
      />

      <input
        name="phone"
        value={faculty.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        required
        className="w-full border border-gray-300 rounded-md p-2"
      />

      <input
        name="dob"
        type="date"
        value={faculty.dob}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md p-2"
      />

      <select
        name="gender"
        value={faculty.gender}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <textarea
        name="address"
        value={faculty.address}
        onChange={handleChange}
        placeholder="Address"
        required
        className="w-full border border-gray-300 rounded-md p-2 h-24 resize-none"
      />

      <div className="flex justify-end gap-4">
        <button
          type="submit"
          className="bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2 rounded-md"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default FacultyForm;
