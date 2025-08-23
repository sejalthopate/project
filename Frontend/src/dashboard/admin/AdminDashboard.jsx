import React, { useEffect, useState } from "react";
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
import { getAdminStats } from "../../services/AdminApi"; // ← API from services

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const AdminDashboardMenu = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats(); // call from services
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p className="text-white p-4">Loading Dashboard...</p>;

  const donutData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [stats.presentToday, stats.absentToday],
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
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Attendance",
        data: stats.monthlyAttendance || [0, 0, 0, 0, 0, 0],
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
    <div className="text-white min-h-screen p-4 md:p-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-cyan-300 tracking-wide">Admin Dashboard</h2>
        <p className="text-gray-400">Insightful overview of the system</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Students" value={stats.totalStudents} />
        <StatCard title="Total Faculty" value={stats.totalFaculty} />
        <StatCard title="Scheduled Classes" value={stats.scheduledClasses} />
        <StatCard title="Total Attendance" value={stats.totalAttendance} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <InfoCard title="Present Today" value={stats.presentToday} color="cyan" />
        <InfoCard title="Absent Today" value={stats.absentToday} color="red" />
        <InfoCard title="Low Attendance" value={stats.lowAttendance} color="yellow" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1F1F2C]/50 rounded-2xl p-6 shadow-2xl border border-[#2D3748] backdrop-blur-md transition hover:scale-[1.02]">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Today's Attendance</h3>
          <div className="flex justify-center">
            <div style={{ width: "250px", height: "250px" }}>
              <Doughnut data={donutData} options={donutOptions} />
            </div>
          </div>
        </div>

        <div className="bg-[#1F1F2C]/50 rounded-2xl p-6 shadow-2xl border border-[#2D3748] backdrop-blur-md transition hover:scale-[1.02]">
          <h3 className="text-xl font-semibold mb-4 text-cyan-400">Monthly Attendance</h3>
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
    <div className={`rounded-2xl p-6 shadow-md hover:shadow-2xl transition backdrop-blur-md border border-gray-700 hover:scale-[1.03] ${colors[color]}`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-semibold mt-1">{value}</h2>
    </div>
  );
};

export default AdminDashboardMenu;