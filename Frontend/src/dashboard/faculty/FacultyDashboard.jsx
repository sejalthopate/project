// src/dashboard/faculty/FacultyDashboard.jsx

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const FacultyDashboard = () => {
  const pieData = [
    { name: "Present", value: 75 },
    { name: "Absent", value: 25 },
  ];

  const barData = [
    { name: "Jan", attendance: 45 },
    { name: "Feb", attendance: 65 },
    { name: "Mar", attendance: 60 },
    { name: "Apr", attendance: 70 },
    { name: "May", attendance: 85 },
    { name: "Jun", attendance: 95 },
  ];

  const COLORS = ["#38B2AC", "#F56565"]; // Present, Absent

  return (
    <div className="text-white w-full min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <h2 className="text-3xl font-extrabold text-cyan-400 mb-2">Faculty Dashboard</h2>
      <p className="text-gray-400 mb-6">Insightful overview of your classes</p>

      {/* Stat Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-[#1F1F2C] p-6 rounded-xl text-center shadow-md border border-gray-700">
          <p className="text-sm text-gray-400">Total Students</p>
          <p className="text-2xl font-bold mt-2">120</p>
        </div>
        <div className="bg-[#1F1F2C] p-6 rounded-xl text-center shadow-md border border-gray-700">
          <p className="text-sm text-gray-400">Total Classes</p>
          <p className="text-2xl font-bold mt-2">22</p>
        </div>
        <div className="bg-[#1F1F2C] p-6 rounded-xl text-center shadow-md border border-gray-700">
          <p className="text-sm text-gray-400">Total Attendance</p>
          <p className="text-2xl font-bold mt-2">874</p>
        </div>
        <div className="bg-[#1F1F2C] p-6 rounded-xl text-center shadow-md border border-gray-700">
          <p className="text-sm text-gray-400">Subjects Taught</p>
          <p className="text-2xl font-bold mt-2">4</p>
        </div>
      </div>

      {/* Present / Absent / Low Attendance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#16202A] p-6 rounded-xl text-center shadow-md border border-gray-700">
          <p className="text-sm text-gray-400">Present Today</p>
          <p className="text-2xl font-bold text-teal-400 mt-2">90</p>
        </div>
        <div className="bg-[#2C1A1D] p-6 rounded-xl text-center shadow-md border border-gray-700">
          <p className="text-sm text-gray-400">Absent Today</p>
          <p className="text-2xl font-bold text-red-400 mt-2">30</p>
        </div>
        <div className="bg-[#1C1B24] p-6 rounded-xl text-center shadow-md border border-gray-700">
          <p className="text-sm text-yellow-400">Low Attendance</p>
          <p className="text-2xl font-bold text-yellow-400 mt-2">13</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-[#1F1F2C] p-6 rounded-2xl shadow-md border border-gray-700">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">Today's Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-[#1F1F2C] p-6 rounded-2xl shadow-md border border-gray-700">
          <h3 className="text-xl font-semibold text-cyan-300 mb-4">Monthly Attendance</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" stroke="#A0AEC0" />
              <YAxis stroke="#A0AEC0" />
              <Tooltip />
              <Legend />
              <Bar dataKey="attendance" fill="#7F9CF5" barSize={40} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
