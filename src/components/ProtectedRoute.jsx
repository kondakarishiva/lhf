import React from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn, getRole } from "../services/auth";

export default function ProtectedRoute({ children, allowedRole }) {
  if(!isLoggedIn()) return <Navigate to="/" replace />;
  if(allowedRole){
    const role = getRole();
    if(role !== allowedRole) return <Navigate to="/home" replace />;
  }
  return children;
}
