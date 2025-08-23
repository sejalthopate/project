

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (isAuthenticated === null) {
    return <div className="text-white text-center mt-10 text-xl">Loading...</div>;
  }

  // Not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // Role mismatch → Access Denied
  if (!allowedRoles.includes(user?.role)) {
    console.log("Role mismatch:", user?.role, "Allowed:", allowedRoles);
    return <Navigate to="/access-denied" replace />;
  }

  return children;
};

export default ProtectedRoute;
