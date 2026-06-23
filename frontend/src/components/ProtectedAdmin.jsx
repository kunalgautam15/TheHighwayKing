import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const isAdminLoggedIn = localStorage.getItem("highwayKingAdmin") === "true";
  const adminToken = localStorage.getItem("highwayKingAdminToken");

  if (!isAdminLoggedIn || !adminToken) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default ProtectedAdmin;