import AdminHome from "./pages/AdminEntry/AdminHome";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import StudentReg from "./pages/AdminEntry/StudentReg";
import StudentStatus from "./pages/AdminEntry/StudentStatus";
import UpdateStudent from "./pages/AdminEntry/UpdateStudent";
import UpdateSubmissions from "./pages/AdminEntry/UpdateSubmissions";
import DisplayStatus from "./pages/StudentDisplay/DisplayStatus";
import Login from "./pages/authentication/Login";
import ProtectedRoute from "./elements/ProtectedRoute";
import MultiRoleRoute from "./elements/MultiRoleRoute";
import AdminReg from "./pages/AdminEntry/AdminReg";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
        <ProtectedRoute role="admin">
          <AdminHome />
        </ProtectedRoute>
        } />

        <Route path="/StudentReg" element={
        <ProtectedRoute role="admin">
          <StudentReg />
        </ProtectedRoute>
        } />

        <Route path="/StudentStatus" element={
        <ProtectedRoute role="admin">
          <StudentStatus />
        </ProtectedRoute>
        } />

        <Route path="/UpdateStudent" element={
        <ProtectedRoute role="admin">
          <UpdateStudent />
        </ProtectedRoute>
        } />

        <Route path="/UpdateSubmissions" element={
        <ProtectedRoute role="admin">
          <UpdateSubmissions />
         </ProtectedRoute> 
        } />

        <Route path="/AdminRegistration" element={
        <ProtectedRoute role="admin">
          <AdminReg />
        </ProtectedRoute> 
        } />

        <Route path="/DisplayStatus/:studentId" element={
        <MultiRoleRoute allowedRoles={['admin', 'student']}>
          <DisplayStatus />
        </MultiRoleRoute>
        } />

        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
