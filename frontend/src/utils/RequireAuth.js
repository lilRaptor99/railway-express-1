import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';

export default function RequireAuth({ authorizedUserRole, children }) {
  const { currentUser } = useAuth();

  if (currentUser?.role === authorizedUserRole) {
    return children;
  }

  return <Navigate to="/" replace />;
}
