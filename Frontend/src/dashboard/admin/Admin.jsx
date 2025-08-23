import React from "react";
import AdminSidebar from "../../components/AdminSidebar"; // योग्य path ठेवा
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* <AdminSidebar /> */}
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
