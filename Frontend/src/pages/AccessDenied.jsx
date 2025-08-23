import React from "react";

const AccessDenied = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img
        src="/access-denied.png"
        alt="Access Denied"
        className="w-200 h-100 mb-4"
      />
      <h1 className="text-xl text-red-600 font-semibold text-center">
        Access Denied: You are not authorized to view this page.
      </h1>
    </div>
  );
};

export default AccessDenied;
