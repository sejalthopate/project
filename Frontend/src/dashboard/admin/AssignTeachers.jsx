import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, PlusCircle } from "lucide-react";

const departments = [
  "Computer",
  "Electrical",
  "Civil",
  "Mechanical",
  "IT",
  "Automobile",
  "E&TC",
];

const AssignTeacher = () => {
  const [selectedDept, setSelectedDept] = useState("Computer");

  const teachers = {
    Computer: [
      { year: "FY", subject: "Maths", faculty: "Prof. A" },
      { year: "FY", subject: "Basic Electronics", faculty: "Prof. B" },
      { year: "SY", subject: "Data Structures", faculty: "Prof. C" },
      { year: "SY", subject: "Operating Systems", faculty: "Prof. D" },
      { year: "TY", subject: "Web Development", faculty: "Prof. E" },
      { year: "TY", subject: "Mobile App Dev", faculty: "Prof. F" },
    ],
    Electrical: [
      { year: "FY", subject: "Maths", faculty: "Prof. G" },
      { year: "FY", subject: "Physics", faculty: "Prof. H" },
      { year: "SY", subject: "Electrical Machines", faculty: "Prof. I" },
      { year: "SY", subject: "Control Systems", faculty: "Prof. J" },
      { year: "TY", subject: "Power System", faculty: "Prof. K" },
      { year: "TY", subject: "Electrical Design", faculty: "Prof. L" },
    ],
    Civil: [
      { year: "FY", subject: "Maths", faculty: "Prof. M" },
      { year: "FY", subject: "Engineering Drawing", faculty: "Prof. N" },
      { year: "SY", subject: "Structural Mechanics", faculty: "Prof. O" },
      { year: "SY", subject: "Hydraulics", faculty: "Prof. P" },
      { year: "TY", subject: "Estimation & Costing", faculty: "Prof. Q" },
      { year: "TY", subject: "Concrete Technology", faculty: "Prof. R" },
    ],
    Mechanical: [
      { year: "FY", subject: "Maths", faculty: "Prof. S" },
      { year: "FY", subject: "Workshop", faculty: "Prof. T" },
      { year: "SY", subject: "Thermodynamics", faculty: "Prof. U" },
      { year: "SY", subject: "Mechanics", faculty: "Prof. V" },
      { year: "TY", subject: "CAD/CAM", faculty: "Prof. W" },
      { year: "TY", subject: "Refrigeration", faculty: "Prof. X" },
    ],
    IT: [
      { year: "FY", subject: "Maths", faculty: "Prof. Y" },
      { year: "FY", subject: "Communication Skills", faculty: "Prof. Z" },
      { year: "SY", subject: "Database Management", faculty: "Prof. AA" },
      { year: "SY", subject: "Software Engineering", faculty: "Prof. AB" },
      { year: "TY", subject: "Cloud Computing", faculty: "Prof. AC" },
      { year: "TY", subject: "Cybersecurity", faculty: "Prof. AD" },
    ],
    Automobile: [
      { year: "FY", subject: "Maths", faculty: "Prof. AE" },
      { year: "FY", subject: "Workshop Practice", faculty: "Prof. AF" },
      { year: "SY", subject: "Engine Technology", faculty: "Prof. AG" },
      { year: "SY", subject: "Auto Systems", faculty: "Prof. AH" },
      { year: "TY", subject: "Vehicle Maintenance", faculty: "Prof. AI" },
      { year: "TY", subject: "Transmission Systems", faculty: "Prof. AJ" },
    ],
    "E&TC": [
      { year: "FY", subject: "Maths", faculty: "Prof. AK" },
      { year: "FY", subject: "Electronics Workshop", faculty: "Prof. AL" },
      { year: "SY", subject: "Analog Electronics", faculty: "Prof. AM" },
      { year: "SY", subject: "Digital Electronics", faculty: "Prof. AN" },
      { year: "TY", subject: "Communication Systems", faculty: "Prof. AO" },
      { year: "TY", subject: "Embedded Systems", faculty: "Prof. AP" },
    ],
  };

  const handleEdit = (index) => {
    alert(`Edit clicked for ${teachers[selectedDept][index].subject}`);
  };

  const handleDelete = (index) => {
    alert(`Delete clicked for ${teachers[selectedDept][index].subject}`);
  };

  return (
    <motion.div
      className="min-h-screen p-6 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">
        📘 Assign Teachers
      </h1>

      {/* Department dropdown */}
      <div className="mb-6">
        <label className="block text-lg font-medium mb-2">Select Department</label>
        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="w-full md:w-1/2 p-3 bg-slate-800 text-white border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Table of assigned teachers */}
      <div className="overflow-auto bg-slate-800 border border-gray-600 rounded-xl shadow">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-slate-700 text-blue-300">
            <tr>
              <th className="px-4 py-3 text-left">Year</th>
              <th className="px-4 py-3 text-left">Subject</th>
              <th className="px-4 py-3 text-left">Faculty</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers[selectedDept]?.map((item, index) => (
              <tr key={index} className="border-t border-slate-700">
                <td className="px-4 py-3">{item.year}</td>
                <td className="px-4 py-3">{item.subject}</td>
                <td className="px-4 py-3">{item.faculty}</td>
                <td className="px-4 py-3 space-x-4">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-yellow-400 hover:text-yellow-500"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            )) || (
              <tr>
                <td className="px-4 py-3" colSpan="4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Button */}
      <div className="mt-6">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition">
          <PlusCircle size={20} /> Add New Assignment
        </button>
      </div>
    </motion.div>
  );
};

export default AssignTeacher;