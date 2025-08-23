import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "../context/AuthContext";

const AdminDashboardLayout = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated === null) {
    return <div className="text-white text-center mt-10 text-xl">Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/access-denied" replace />;
  }

  return (
    <div className="flex h-screen">
      <div className="w-0.9/5">
        <AdminSidebar />
      </div>
      <div className="w-4/5 overflow-y-auto bg-[#1E1F2B] text-white p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
