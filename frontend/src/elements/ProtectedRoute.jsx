import React from 'react'
import { jwtDecode } from 'jwt-decode';

export default function ProtectedRoute({ role, children }) {
  const token = sessionStorage.getItem("authToken");

  if(!token) return <div>No token Present</div>

  const user = jwtDecode(token);

  if(user.userRole !== role) return <div>You are not authorized</div>

  return children;
}
