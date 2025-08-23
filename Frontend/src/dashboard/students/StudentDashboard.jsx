


import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "../../components/StudentSidebar"

const StudentDashboard = () => {
  return (
    <div className="flex">
      <StudentSidebar />
      <div className="flex-1">
        <Outlet /> {/* ✅ This is very important */}
      </div>
    </div>
  );
};

export default StudentDashboard;





