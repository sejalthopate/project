// import React from "react";
// import { Outlet } from "react-router-dom";
// import StudentSidebar from "../../components/StudentSidebar";

// const StudentDashboard = () => {
//   return (
//     <div className="flex h-screen w-full ">
//       <StudentSidebar />
//       <div className="flex-1 p-4 overflow-y-auto bg-[#1e1e2f] text-white">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;


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





