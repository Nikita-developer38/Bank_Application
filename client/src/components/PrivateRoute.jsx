import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />; // Redirect to login if no token

  try {
    const decoded = jwtDecode(token);
    const isAdmin = decoded.isAdmin;

    // Restrict access if admin-only route and user is not an admin
    if (adminOnly && !isAdmin) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Access Denied</h1>
          <p>You do not have permission to access this page.</p>
        </div>
      );
    }

    // Allow access
    return children;
  } catch (error) {
    localStorage.removeItem("token"); // Remove invalid token
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
