import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation, Outlet } from "react-router-dom";

export const RequireAuth = () => {
    const { token } = useAuth();
    const location = useLocation();
    return token ? (
      <Outlet />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  };
  