import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { useParams } from 'react-router-dom';

export default function MultiRoleRoute({ allowedRoles, children }) {
  const token = sessionStorage.getItem("authToken");
  const { studentId } = useParams();

  if(!token) return <div>No token Present</div>

  const user = jwtDecode(token);

  if(!allowedRoles.includes(user.userRole)) return <div>You are not authorized</div>

  if(user.userRole == "student" && studentId !== String(user.id)){
    return <div>This is not your student account</div>
  }

  return children;
}
