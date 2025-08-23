


// Faculty.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import FacultySidebar from '../../components/FacultySidebar.jsx'

const Faculty = () => {
  return (
    <div className="flex">
  <FacultySidebar />
  <div className="flex-1 ml-64 p-6 overflow-y-auto h-screen">
    <Outlet />
  </div>
</div>

  );
};

export default Faculty;
