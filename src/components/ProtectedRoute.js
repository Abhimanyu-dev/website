// components/ProtectedRoute.tsx
import { useAuthStore } from "../store/useAuthStore";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuthStore();
  console.log(user, loading);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/authentication/sign-in" replace />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
