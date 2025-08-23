import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaUserShield, FaTachometerAlt, FaUser, FaChalkboardTeacher,
  FaClipboardList, FaUsers, FaBook, FaUserTie, FaCalendarAlt, FaSignOutAlt,FaEye,FaCalendarCheck
} from "react-icons/fa";
import { FaChalkboardUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SidebarItem = ({ to, label, icon: Icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-md transition-all ${
        isActive ? "bg-purple-600 text-white" : "text-slate-300 hover:bg-slate-700"
      }`
    }
  >
    <Icon className="text-lg" />
    <span>{label}</span>
  </NavLink>
);

const AdminSidebar = () => {
  const navigate = useNavigate(); // ✅ Import आणि वापर

  // ✅ हे function आता define केलं आहे
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login"); // Redirect to login
  };

  return (
    <aside className="w-70 h-screen overflow-y-auto bg-slate-900 text-white p-5 shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-purple-400 flex items-center gap-9">
        <FaUserShield />
        Admin Panel
      </h2>
      <nav className="flex flex-col gap-2">
        <SidebarItem to="/admin/admindashboard" label="Admin Dashboard" icon={FaTachometerAlt} />
        <SidebarItem to="/admin/adminprofile" label="Admin Profile" icon={FaUser} />
        <SidebarItem to="/admin/assignfaculty" label="Assign faculty" icon={FaChalkboardTeacher} />
        <SidebarItem to="/admin/attendancdreport" label="Attendance Report" icon={FaClipboardList} />
        <SidebarItem to="/admin/manageclass" label="Manage Class" icon={FaCalendarAlt} />
        <SidebarItem to="/admin/managestudents" label="Manage Students" icon={FaUsers} />
        <SidebarItem to="/admin/managesubject" label="Manage Subjects" icon={FaBook} />
        <SidebarItem to="/admin/managefaculty" label="Manage faculty" icon={FaUserTie} />
        <SidebarItem to="/admin/scheduleclass" label="Schedule Class" icon={FaCalendarAlt} />
        <SidebarItem to="/admin/AdminNotices" label="Admin Notices" icon={FaEye} />
         <SidebarItem to="/admin/FacultyAttendence" label="Faculty Attendence" icon={FaCalendarCheck} />
          <SidebarItem to="/admin/ViewAttendence" label="View Attendence" icon={ FaChalkboardUser} />
           <SidebarItem to="/admin/courses" label="Courses" icon={ FaChalkboardUser} />
           <SidebarItem to="/admin/leaverequest" label="Leave Request" icon={ FaChalkboardUser} />
<Link to="/">
        {/* ✅ Logout Button */}
        <button
          onClick={logoutHandler}
          className="mt-4 flex items-center gap-3 px-4 py-3 rounded-md transition-all bg-red-500 hover:bg-red-700 text-white"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </button>
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;