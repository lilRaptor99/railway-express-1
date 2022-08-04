import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function RequireAuth({ authorizedUserRole }) {
  const { currentUser } = useAuth();

  if (currentUser?.role === authorizedUserRole) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
}
