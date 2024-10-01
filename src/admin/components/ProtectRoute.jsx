import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types'; 

const ProtectedRoute = ({ requiredRole }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth) {
    return <Navigate to="/admin-hyundai/dashboard" replace />;
  }

  const { user } = auth;

  if (!user) {
    return <Navigate to="/admin-hyundai/dashboard" replace />;
  }

  if (user.role !== requiredRole) {
    return <Navigate to="/admin-hyundai/dashboard" replace />;
  }

  return <Outlet />;
};

ProtectedRoute.propTypes = {
  requiredRole: PropTypes.string.isRequired,
};
export default ProtectedRoute;
