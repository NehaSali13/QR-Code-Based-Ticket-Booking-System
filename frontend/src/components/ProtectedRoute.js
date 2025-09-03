// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const token =
    localStorage.getItem('adminToken') ||
    localStorage.getItem('staffToken') ||
    localStorage.getItem('userToken');

  const role = localStorage.getItem('role');

  // Redirect if not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Admin Route Protection
  if (location.pathname.startsWith('/admin') && role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  // Staff Route Protection
  if (location.pathname.startsWith('/staff') && role !== 'staff') {
    return <Navigate to="/staff/login" replace />;
  }

  // User Route Protection
  if (
    (location.pathname.startsWith('/user') ||
      location.pathname === '/book-ticket' ||
      location.pathname === '/my-tickets') &&
    role !== 'user'
  ) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
