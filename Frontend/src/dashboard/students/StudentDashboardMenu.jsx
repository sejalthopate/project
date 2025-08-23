import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const StudentDashboardMenu = () => {
  const stats = {
    totalSubjects: 6,
    assignmentsPending: 3,
    upcomingExams: 2,
    totalAttendance: 92,
    presentDays: 85,
    absentDays: 7,
    lowAttendanceSubjects: 1,
  };

  const donutData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [stats.presentDays, stats.absentDays],
        backgroundColor: ["#4FD1C5", "#F56565"],
        borderColor: "#1A202C",
        borderWidth: 3,
      },
    ],
  };

  const donutOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#E2E8F0",
          font: { size: 14 },
        },
      },
    },
  };

  const barData = {
    labels: ["Math", "Science", "English", "History", "Physics", "Chemistry"],
    datasets: [
      {
        label: "Attendance (%)",
        data: [90, 88, 95, 85, 92, 89],
        backgroundColor: "#667EEA",
        borderRadius: 10,
        barThickness: 28,
      },
    ],
  };

  const barOptions = {
    plugins: {
      legend: { labels: { color: "#CBD5E0" } },
    },
    scales: {
      x: {
        ticks: { color: "#A0AEC0" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#A0AEC0" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <div className="text-white min-h-screen p-4 md:p-8 h-screen bg-slate-900 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-cyan-300 tracking-wide">Student Dashboard</h2>
        <p className="text-gray-400">Personal academic overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Subjects" value={stats.totalSubjects} />
        <StatCard title="Assignments Due" value={stats.assignmentsPending} />
        <StatCard title="Upcoming Exams" value={stats.upcomingExams} />
        <StatCard title="Total Attendance (%)" value={stats.totalAttendance + "%"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <InfoCard title="Days Present" value={stats.presentDays} color="cyan" />
        <InfoCard title="Days Absent" value={stats.absentDays} color="red" />
        <InfoCard title="Low Attendance Subjects" value={stats.lowAttendanceSubjects} color="yellow" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1F1F2C]/50 rounded-2xl h-80 p-6 shadow-2xl border border-[#2D3748] backdrop-blur-md transition hover:scale-[1.02]">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Attendance Overview</h3>
          <div className="flex justify-center">
            <div style={{ width: "250px", height: "250px" }}>
              <Doughnut data={donutData} options={donutOptions} />
            </div>
          </div>
        </div>

        <div className="bg-[#1F1F2C]/50 rounded-2xl p-6 shadow-2xl  h-80 border border-[#2D3748] backdrop-blur-md transition hover:scale-[1.02]">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Subject-wise Attendance</h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-[#2D3748]/60 rounded-2xl p-6 shadow-lg hover:shadow-xl transition backdrop-blur-md border border-gray-600 hover:scale-[1.03]">
    <p className="text-sm text-gray-300">{title}</p>
    <h2 className="text-2xl font-bold mt-1 text-white">{value}</h2>
  </div>
);

const InfoCard = ({ title, value, color }) => {
  const colors = {
    cyan: "text-cyan-300 bg-cyan-900/20",
    red: "text-red-400 bg-red-900/20",
    yellow: "text-yellow-300 bg-yellow-900/20",
  };

  return (
    <div
      className={`rounded-2xl p-6 shadow-md hover:shadow-2xl transition backdrop-blur-md border border-gray-700 hover:scale-[1.03] ${colors[color]}`}
    >
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-semibold mt-1">{value}</h2>
    </div>
  );
};

export default StudentDashboardMenu;

