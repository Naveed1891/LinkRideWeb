import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, requiredRole = null }) {
  const { token, role } = useAuth();
  const location = useLocation();

 
  if (!token) {
    toast.warning("Please login to continue.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    toast.error("You are not authorized to access this page.");
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
