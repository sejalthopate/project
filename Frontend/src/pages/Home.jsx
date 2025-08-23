import React from "react";
import { useNavigate } from "react-router-dom";
import smartAttandance from "../assets/smart-attandance.gif";



const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 text-white px-4">

      {/* Navbar
      <nav className="flex justify-between items-center px-6 py-4 bg-blue-800 shadow-md">
        <h1 className="text-2xl font-bold text-green-300">AttendEase</h1>
        <div className="space-x-4">
          <a href="/" className="hover:text-green-300 font-medium">Home</a>
          <a href="/about" className="hover:text-green-300 font-medium">About</a>
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white font-semibold transition"
          >
            Go to Dashboard
          </button>
        </div>
      </nav> */}

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row items-center justify-between px-10 py-16">
        <div className="max-w-2xl">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Welcome to</h2>
          <h1 className="text-3xl lg:text-4xl font-semibold text-green-300 mb-4">
            Smart Attendance Management System
          </h1>
          <p className="text-lg text-blue-200">
            Seamlessly manage attendance, track performance, and simplify
            student-faculty workflows — all in one unified system.
          </p>
        </div>
        <div className="mt-10 lg:mt-0">
          <img
  src={smartAttandance}
  alt="Attendance GIF"
  className="w-[400px] h-auto rounded-md"
/>

        </div>

      </div>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 pb-16">
        <div
          className="bg-purple-800 hover:bg-purple-700 text-white p-6 rounded-lg shadow-lg text-center cursor-pointer transition"
          // onClick={() => navigate("/login?role=student")}
        >
          <div className="text-4xl mb-2">🎓</div>
          <h3 className="text-xl font-semibold">Student</h3>
        </div>
        <div
          className="bg-purple-800 hover:bg-purple-700 text-white p-6 rounded-lg shadow-lg text-center cursor-pointer transition"
          // onClick={() => navigate("/login?role=faculty")}
        >
          <div className="text-4xl mb-2">🧑‍🏫</div>
          <h3 className="text-xl font-semibold">Faculty</h3>
        </div>
        <div
          className="bg-purple-800 hover:bg-purple-700 text-white p-6 rounded-lg shadow-lg text-center "
          // onClick={() => navigate("/login?role=admin")}
        >
          <div className="text-4xl mb-2">🛡</div>
          <h3 className="text-xl font-semibold">Admin</h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
