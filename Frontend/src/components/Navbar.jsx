import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, setIsAuthenticated, setUser } = useAuth(); // context functions
  const navigate = useNavigate();

  const goToDashboard = () => {
    if (user?.role === "admin") navigate("/admin/admindashboard");
    else if (user?.role === "faculty") navigate("/faculty/dashboard"); // if exists
    else if (user?.role === "student") navigate("/students/StudentDashboardMenu");
  };

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setIsAuthenticated(false);
  setUser(null);

  // Delay so ProtectedRoute redirect न होईपर्यंत navigate होईल
  setTimeout(() => {
    navigate("/");
  }, 1); // 1ms is enough
};



  return (
    <nav className="bg-slate-900 text-white flex justify-between items-center px-6 py-3 shadow-md">
      <div className="text-xl font-bold text-purple-400">Student Attendance</div>
      <div className="flex items-center gap-4">
        <Link to="/home" className="hover:text-purple-400">Home</Link>
        <Link to="/about" className="hover:text-purple-400">About Us</Link>

        {/* ✅ Dashboard Button */}
        <button onClick={goToDashboard} className="bg-purple-600 px-4 py-1 rounded-md">
          Go to Dashboard
        </button>

        <button onClick={handleLogout} className="bg-red-600 px-4 py-1 rounded-md">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
