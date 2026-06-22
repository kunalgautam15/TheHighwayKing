import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const isAdminLoggedIn = localStorage.getItem("highwayKingAdmin") === "true";

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

export default ProtectedAdmin;