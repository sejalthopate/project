import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
