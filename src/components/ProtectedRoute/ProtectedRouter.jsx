import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";


const ProtectedRoute = ({ children, requiredRole }) => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

  if (!jwtToken) {
    // Si no hay token, redirige al login
    return <Navigate to="/acceso-denegado" />;
  }

  if (requiredRole && userData.rol !== requiredRole) {
    // Si el rol no coincido, redirige al acceso denegado
    return <Navigate to="/acceso-denegado" />;
  }

  return children;
};

ProtectedRoute.propTypes={
  children:PropTypes.node.isRequired,
  requiredRole:PropTypes.string.isRequired
}

export default ProtectedRoute;